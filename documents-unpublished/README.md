# Unpublished client documents

Client-supplied PDFs that are deliberately **not** served by the website.

Nothing in this directory is under `public/`, so Next.js does not serve it and
no route can reach it. Keep it that way: to withdraw a document, move the file
here and remove its entry from `lib/documents.ts`. To publish one, move it to
`public/documents/` and add it there.

| File | Why it is not published |
| --- | --- |
| `doc-food-contact-material-frosts.pdf` | Declaration of Compliance — Food contact material (19 February 2025). Withdrawn at the client's request: it describes the older Frosts/PUG context rather than the current range. It is not to be replaced by another declaration, and no PUG or handle content is to be written from it — the updated catalogue that work depends on has not been supplied yet. |
