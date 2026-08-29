type VerificationNoticeProps = {
  /** `detail` adds the explanation of where verified data will come from. */
  variant?: "detail" | "listing";
  className?: string;
};

/**
 * The single canonical wording for unverified specifications. Used on both the
 * product detail page and category listings so the message never drifts.
 */
export function VerificationNotice({
  variant = "detail",
  className = "",
}: VerificationNoticeProps) {
  return (
    <div
      className={`border border-line bg-surface-alt p-5 md:p-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
        />
        <div>
          <p className="text-[0.9375rem] leading-relaxed font-medium text-ink">
            Product specifications are currently being verified against the
            manufacturer&rsquo;s product data.
          </p>

          {variant === "detail" && (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Handle type, colour, blade length, blade stiffness and NSF status
              are not published for this article yet. Nothing is shown here
              rather than risk publishing an incorrect specification.
              Confirmed data is loaded from the manufacturer&rsquo;s product
              data export.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
