import type { EnquiryState } from "@/lib/validation/enquiry";

/**
 * Submission feedback banner.
 *
 * Rendered as a live region rather than being focused programmatically: the
 * message is announced without yanking focus away from the field someone was
 * about to correct. Errors use `alert` (assertive) because the form is now
 * blocking them; success uses `status` (polite).
 */
export function FormStatus({ state }: { state: EnquiryState }) {
  if (state.status === "idle" || !state.message) return null;

  const isSuccess = state.status === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className={`border-l-2 px-4 py-3.5 text-sm leading-relaxed ${
        isSuccess
          ? "border-ink bg-surface-alt text-ink"
          : "border-brand bg-brand-tint text-ink"
      }`}
    >
      {state.message}
    </div>
  );
}
