// Ambient type declarations for imports that don't ship their own .d.ts files.
// CONCEPT: TypeScript needs to know what type an import resolves to; Vite's
// own client types cover plain "*.css" files, but @fontsource-variable
// packages are imported by bare package name (no .css suffix), so TS can't
// match that pattern automatically — this line tells it "this import exists,
// treat it as a side-effect-only module with no exports."
/// <reference types="vite/client" />

declare module '@fontsource-variable/fraunces';
declare module '@fontsource-variable/newsreader';
