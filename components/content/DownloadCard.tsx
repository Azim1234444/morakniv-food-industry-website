import { type ClientDocument, formatBytes } from "@/lib/documents";

type DownloadCardProps = {
  document: ClientDocument;
};

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2.5H6.5v19h11V6z" strokeLinejoin="round" />
      <path d="M14 2.5V6h3.5" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadCard({ document }: DownloadCardProps) {
  const size = formatBytes(document.bytes);

  return (
    <article className="flex h-full flex-col border border-line bg-surface p-6 transition-colors duration-150 hover:border-ink-subtle">
      <div className="flex items-start gap-3">
        <DocumentIcon />
        <h3 className="text-base leading-snug font-medium text-ink">
          <a
            href={document.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-brand hover:underline"
          >
            {document.title}
            {/* Size and format are in the visible text below, so screen-reader
                users get the same warning sighted users do. */}
            <span className="sr-only"> — PDF, {size}, opens in a new tab</span>
          </a>
        </h3>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        {document.description}
      </p>

      <dl className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-4 text-xs text-ink-subtle">
        <div className="flex gap-1.5">
          <dt className="sr-only">Format</dt>
          <dd>PDF</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="sr-only">File size</dt>
          <dd className="tabular-nums">{size}</dd>
        </div>
        {document.issued && (
          <div className="flex gap-1.5">
            <dt>Issued</dt>
            <dd className="tabular-nums">{document.issued}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
