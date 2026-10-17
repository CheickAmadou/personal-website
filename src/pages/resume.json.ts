import type { APIRoute } from 'astro';
import { parseResume } from '../lib/parseResume';
import resumeTex from '../data/resume.tex?raw';

// Machine-readable version of the resume, generated from the same LaTeX source.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(parseResume(resumeTex), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
