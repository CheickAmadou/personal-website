/**
 * Parses a resume written in Jake Gutierrez's LaTeX template
 * (https://github.com/jakegut/resume) into structured data so the
 * website's /resume page renders the same content as the PDF.
 *
 * Supported macros:
 *   \section{Title}
 *   \resumeSubheading{title}{right}{subtitle}{subright}
 *   \resumeSubSubheading{subtitle}{subright}
 *   \resumeProjectHeading{heading}{right}
 *   \resumeItem{bullet}
 *   \item <text>              (plain list items, e.g. Skills / Additional)
 *
 * Inline LaTeX inside arguments is converted to HTML: \href, \textbf,
 * \emph, \textit, \underline, escaped characters, -- dashes, $|$ pipes.
 */

export type ResumeEntry =
  | {
      kind: 'subheading';
      title: string;
      right: string;
      subtitle: string;
      subright: string;
      items: string[];
    }
  | { kind: 'subsubheading'; subtitle: string; subright: string; items: string[] }
  | { kind: 'project'; heading: string; right: string; items: string[] }
  | { kind: 'line'; html: string };

export type ResumeSection = { title: string; entries: ResumeEntry[] };

export type Resume = {
  name: string;
  /** HTML for the contact line under the name. */
  contact: string;
  sections: ResumeSection[];
};

// ---------- low-level helpers ----------

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Remove LaTeX comments (a % not preceded by a backslash, to end of line). */
const stripComments = (s: string) => s.replace(/(^|[^\\])%.*$/gm, '$1');

/**
 * Read one brace-balanced argument starting at s[i] (which must be '{').
 * Returns [content, indexAfterClosingBrace].
 */
function readArg(s: string, i: number): [string, number] {
  if (s[i] !== '{') throw new Error(`Expected '{' at ${i}: ${s.slice(i, i + 40)}`);
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    const ch = s[j];
    if (ch === '\\') {
      j++; // skip escaped char
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return [s.slice(i + 1, j), j + 1];
    }
  }
  throw new Error(`Unbalanced braces starting at ${i}`);
}

const skipWs = (s: string, i: number) => {
  while (i < s.length && /\s/.test(s[i]!)) i++;
  return i;
};

/** Read `n` consecutive brace arguments (whitespace between them is allowed). */
function readArgs(s: string, i: number, n: number): [string[], number] {
  const args: string[] = [];
  for (let k = 0; k < n; k++) {
    i = skipWs(s, i);
    const [arg, next] = readArg(s, i);
    args.push(arg);
    i = next;
  }
  return [args, i];
}

// ---------- inline LaTeX -> HTML ----------

const WRAP: Record<string, string> = {
  textbf: 'strong',
  emph: 'em',
  textit: 'em',
};
// Commands whose argument we keep but whose formatting we drop.
const UNWRAP = new Set(['underline', 'small', 'scshape', 'textnormal', 'mbox']);
// Commands with one argument we discard entirely.
const DROP_ARG = new Set(['vspace', 'hspace', 'color']);
// Bare switches with no argument.
const DROP = new Set(['Huge', 'huge', 'LARGE', 'Large', 'large', 'small', 'scshape', 'bfseries', 'itshape']);

export function inlineToHtml(src: string): string {
  let out = '';
  let i = 0;
  const s = src;

  while (i < s.length) {
    const ch = s[i]!;

    if (ch === '\\') {
      const next = s[i + 1] ?? '';
      if ('&%$#_{}'.includes(next)) {
        out += escapeHtml(next);
        i += 2;
        continue;
      }
      if (next === '\\') {
        out += '<br>';
        i += 2;
        continue;
      }
      if (next === ' ' || next === ',') {
        out += ' ';
        i += 2;
        continue;
      }
      const m = /^\\([a-zA-Z]+)\*?/.exec(s.slice(i));
      if (!m) {
        i++;
        continue;
      }
      const name = m[1]!;
      i += m[0].length;
      const hasArg = s[skipWs(s, i)] === '{';

      if (name === 'href') {
        const [[url, text], next2] = readArgs(s, i, 2);
        out += `<a href="${escapeHtml(url!.trim())}">${inlineToHtml(text!)}</a>`;
        i = next2;
      } else if (name === 'url') {
        const [[url], next2] = readArgs(s, i, 1);
        out += `<a href="${escapeHtml(url!.trim())}">${escapeHtml(url!.trim())}</a>`;
        i = next2;
      } else if (WRAP[name] && hasArg) {
        const [[arg], next2] = readArgs(s, i, 1);
        out += `<${WRAP[name]}>${inlineToHtml(arg!)}</${WRAP[name]}>`;
        i = next2;
      } else if (UNWRAP.has(name) && hasArg) {
        const [[arg], next2] = readArgs(s, i, 1);
        out += inlineToHtml(arg!);
        i = next2;
      } else if (DROP_ARG.has(name) && hasArg) {
        const [, next2] = readArgs(s, i, 1);
        i = next2;
      } else if (DROP.has(name)) {
        i = skipWs(s, i); // swallow the space after a bare switch
      } else if (hasArg) {
        // Unknown command with an argument: keep the content, drop the command.
        const [[arg], next2] = readArgs(s, i, 1);
        out += inlineToHtml(arg!);
        i = next2;
      }
      continue;
    }

    if (ch === '{') {
      // Bare group, e.g. \textbf{Languages}{: Python} — just unwrap it.
      const [arg, next] = readArg(s, i);
      out += inlineToHtml(arg);
      i = next;
      continue;
    }

    if (ch === '$') {
      // Inline math: the template only uses $|$ as a separator.
      const end = s.indexOf('$', i + 1);
      const math = end === -1 ? s.slice(i + 1) : s.slice(i + 1, end);
      out += math.trim() === '|' ? ' | ' : escapeHtml(math);
      i = end === -1 ? s.length : end + 1;
      continue;
    }

    if (ch === '-' && s[i + 1] === '-') {
      if (s[i + 2] === '-') {
        out += '—';
        i += 3;
      } else {
        out += '–';
        i += 2;
      }
      continue;
    }

    if (ch === '~') {
      out += '&nbsp;';
      i++;
      continue;
    }

    out += escapeHtml(ch);
    i++;
  }

  return out.replace(/\s+/g, ' ').trim();
}

// ---------- document structure ----------

const BLOCK_CMD =
  /\\(resumeSubheading|resumeSubSubheading|resumeProjectHeading|resumeItem|item)\b/g;

function parseSectionBody(body: string): ResumeEntry[] {
  const entries: ResumeEntry[] = [];
  let current: Extract<ResumeEntry, { items: string[] }> | null = null;

  const pushItem = (html: string) => {
    if (current) current.items.push(html);
    else entries.push({ kind: 'line', html });
  };

  let i = 0;
  while (i < body.length) {
    BLOCK_CMD.lastIndex = i;
    const m = BLOCK_CMD.exec(body);
    if (!m) break;
    const name = m[1]!;
    let pos = m.index + m[0].length;

    switch (name) {
      case 'resumeSubheading': {
        const [[title, right, subtitle, subright], next] = readArgs(body, pos, 4);
        current = {
          kind: 'subheading',
          title: inlineToHtml(title!),
          right: inlineToHtml(right!),
          subtitle: inlineToHtml(subtitle!),
          subright: inlineToHtml(subright!),
          items: [],
        };
        entries.push(current);
        pos = next;
        break;
      }
      case 'resumeSubSubheading': {
        const [[subtitle, subright], next] = readArgs(body, pos, 2);
        current = {
          kind: 'subsubheading',
          subtitle: inlineToHtml(subtitle!),
          subright: inlineToHtml(subright!),
          items: [],
        };
        entries.push(current);
        pos = next;
        break;
      }
      case 'resumeProjectHeading': {
        const [[heading, right], next] = readArgs(body, pos, 2);
        current = {
          kind: 'project',
          heading: inlineToHtml(heading!),
          right: inlineToHtml(right!),
          items: [],
        };
        entries.push(current);
        pos = next;
        break;
      }
      case 'resumeItem': {
        const [[text], next] = readArgs(body, pos, 1);
        pushItem(inlineToHtml(text!));
        pos = next;
        break;
      }
      case 'item': {
        // Plain \item: content runs until the next block command or \end{itemize}.
        BLOCK_CMD.lastIndex = pos;
        const nextCmd = BLOCK_CMD.exec(body);
        const endItemize = body.indexOf('\\end{itemize}', pos);
        const candidates = [nextCmd?.index, endItemize === -1 ? undefined : endItemize].filter(
          (n): n is number => n !== undefined,
        );
        const end = candidates.length ? Math.min(...candidates) : body.length;
        const html = inlineToHtml(body.slice(pos, end));
        if (html) pushItem(html);
        pos = end;
        break;
      }
    }
    i = pos;
  }

  return entries;
}

export function parseResume(tex: string): Resume {
  const src = stripComments(tex);
  const docStart = src.indexOf('\\begin{document}');
  const docEnd = src.indexOf('\\end{document}');
  const doc = src.slice(docStart === -1 ? 0 : docStart + '\\begin{document}'.length, docEnd === -1 ? undefined : docEnd);

  // Heading block
  let name = '';
  let contact = '';
  const center = /\\begin\{center\}([\s\S]*?)\\end\{center\}/.exec(doc);
  if (center) {
    const block = center[1]!;
    const lines = block
      .split(/\\\\/)
      .map((l) => l.trim())
      .filter(Boolean);
    name = inlineToHtml(lines[0] ?? '');
    contact = inlineToHtml(lines.slice(1).join(' '));
  }

  // Sections
  const sections: ResumeSection[] = [];
  const sectionRe = /\\section\*?\s*\{/g;
  const starts: { title: string; bodyStart: number; cmdStart: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = sectionRe.exec(doc))) {
    const [title, next] = readArg(doc, m.index + m[0].length - 1);
    starts.push({ title: inlineToHtml(title), bodyStart: next, cmdStart: m.index });
  }
  starts.forEach((s, idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1]!.cmdStart : doc.length;
    sections.push({ title: s.title, entries: parseSectionBody(doc.slice(s.bodyStart, end)) });
  });

  return { name, contact, sections };
}
