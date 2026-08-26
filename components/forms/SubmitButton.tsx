import type { ReactNode } from "react";

/**
 * Form submit control.
 *
 * `pending` is passed down from the single `useActionState` call in the form
 * rather than read from `useFormStatus` here, so the button, the fieldset and
 * the status banner cannot disagree about whether a submission is in flight.
 */
type SubmitButtonProps = {
  pending: boolean;
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
};

export function SubmitButton({
  pending,
  children,
  pendingLabel = "Sending",
  className = "",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "inline-flex h-13 items-center justify-center gap-2.5 rounded-sm bg-brand px-8 " +
        "text-base font-medium text-white transition-colors duration-150 " +
        "ease-[var(--ease-out-quiet)] hover:bg-brand-hover active:bg-brand-active " +
        "disabled:cursor-not-allowed disabled:opacity-70 " +
        className
      }
    >
      {pending && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        />
      )}
      {pending ? pendingLabel : children}
    </button>
  );
}
