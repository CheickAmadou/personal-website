/// <reference types="astro/client" />

declare module '*.tex?raw' {
  const content: string;
  export default content;
}
