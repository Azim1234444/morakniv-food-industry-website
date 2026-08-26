import type { ReactNode } from "react";

/**
 * Label, hint and error wrapper for a single form control.
 *
 * The control is supplied through a render prop so that the accessibility
 * wiring lives in exactly one place: the `id`, the `aria-describedby` chain
 * (hint and error, in reading order) and `aria-invalid` are all derived here
 * and handed to the input, rather than being retyped on nine separate fields
 * and drifting out of sync on the tenth.
 */

export type ControlProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

/** Shared control styling — inputs, selects and textareas all use this. */
export const controlClass =
  "w-full rounded-sm border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink " +
  "placeholder:text-ink-subtle transition-colors duration-150 " +
  "focus:border-ink focus:outline-none " +
  "disabled:cursor-not-allowed disabled:bg-surface-alt disabled:text-ink-subtle";

export function controlBorder(hasError: boolean): string {
  return hasError ? "border-brand" : "border-line-strong hover:border-ink-subtle";
}

type FormFieldProps = {
  name: string;
  label: string;
  hint?: string;
  errors?: string[];
  required?: boolean;
  className?: string;
  children: (control: ControlProps) => ReactNode;
};

export function FormField({
  name,
  label,
  hint,
  errors,
  required = false,
  className = "",
  children,
}: FormFieldProps) {
  const id = `enquiry-${name}`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasError = Boolean(errors?.length);

  const describedBy =
    [hint ? hintId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-ink"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-ink-subtle">
            Optional
          </span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="mb-2 text-xs leading-relaxed text-ink-subtle">
          {hint}
        </p>
      )}

      {children({
        id,
        name,
        required: required || undefined,
        "aria-invalid": hasError || undefined,
        "aria-describedby": describedBy,
      })}

      {hasError && (
        <p id={errorId} className="mt-2 text-sm leading-snug text-brand">
          {errors![0]}
        </p>
      )}
    </div>
  );
}
