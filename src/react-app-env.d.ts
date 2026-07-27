/// <reference types="vite/client" />

/*
  Vite's own client types already declare the asset modules this project
  imports (*.png, *.jpg, *.svg, *.pdf, ...), so the hand-written declarations
  that used to live here are no longer needed — and they were missing *.pdf,
  which the Resume download link now imports.
*/
