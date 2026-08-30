"use client";

import { useActionState, useState } from "react";

import {
  FormField,
  controlBorder,
  controlClass,
} from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { submitEnquiry } from "@/lib/actions/enquiry";
import { COUNTRIES } from "@/lib/countries";
import { ENQUIRY_TYPES, initialEnquiryState } from "@/lib/validation/enquiry";

type ContactFormProps = {
  /**
   * Server-stamped render time, used for the minimum-completion-time check.
   * Stamped on the server so a skewed browser clock cannot fail a real person.
   */
  renderedAt: number;
  /** Article number carried in from `?product=`. Treated as plain user text. */
  defaultArticleNo?: string;
};

const initialValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  enquiryType: "",
  articleNo: "",
  quantity: "",
  message: "",
  consent: false,
};

type Values = typeof initialValues;

/**
 * Contact form.
 *
 * Fields are controlled rather than uncontrolled so that a failed server-side
 * validation pass returns typed field errors *without* emptying the form the
 * person just spent two minutes filling in.
 *
 * Nothing on the client is a security boundary. `required`, `type="email"` and
 * `maxLength` exist to catch honest mistakes early; the Server Action re-parses
 * every submission from scratch and is the only thing that decides what is
 * valid.
 */
export function ContactForm(props: ContactFormProps) {
  /* Bumping the key remounts the form, resetting `useActionState` to idle. */
  const [instance, setInstance] = useState(0);

  return (
    <EnquiryForm
      key={instance}
      {...props}
      onStartOver={() => setInstance((n) => n + 1)}
    />
  );
}

function EnquiryForm({
  renderedAt,
  defaultArticleNo,
  onStartOver,
}: ContactFormProps & { onStartOver: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialEnquiryState,
  );

  const [values, setValues] = useState<Values>({
    ...initialValues,
    articleNo: defaultArticleNo ?? "",
    /* An article number in the URL is a strong hint about intent. */
    enquiryType: defaultArticleNo ? "product" : "",
  });

  function set<K extends keyof Values>(field: K, value: Values[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  const errors = state.fieldErrors;

  /* -----------------------------------------------------------------------
     Success replaces the form outright — there is nothing useful left to do
     with a set of fields that have already been sent, and leaving them live
     invites a duplicate submission.
     ----------------------------------------------------------------------- */
  if (state.status === "success") {
    return (
      <div className="border border-line bg-surface p-8 md:p-10">
        <p className="label-eyebrow mb-5 flex items-center gap-3 text-ink-subtle">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-brand" />
          Enquiry sent
        </p>

        <h2
          role="status"
          className="text-2xl font-medium tracking-tight text-ink"
        >
          Thank you — we have your enquiry.
        </h2>

        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
          {state.message}
        </p>

        <button
          type="button"
          onClick={onStartOver}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-sm border border-line-strong bg-surface px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-surface-alt"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-8">
      {/* Honeypot. Positioned off-screen rather than display:none, which some
          bots detect, and kept out of the tab order and the a11y tree. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <input type="hidden" name="renderedAt" value={renderedAt} />

      {state.status === "error" && <FormStatus state={state} />}

      <fieldset disabled={pending} className="contents">
        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <FormField name="name" label="Name" required errors={errors.name}>
            {(control) => (
              <input
                {...control}
                type="text"
                autoComplete="name"
                maxLength={100}
                value={values.name}
                onChange={(event) => set("name", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.name))}`}
              />
            )}
          </FormField>

          <FormField
            name="company"
            label="Company"
            required
            errors={errors.company}
          >
            {(control) => (
              <input
                {...control}
                type="text"
                autoComplete="organization"
                maxLength={120}
                value={values.company}
                onChange={(event) => set("company", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.company))}`}
              />
            )}
          </FormField>

          <FormField name="email" label="Email" required errors={errors.email}>
            {(control) => (
              <input
                {...control}
                type="email"
                autoComplete="email"
                maxLength={200}
                value={values.email}
                onChange={(event) => set("email", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.email))}`}
              />
            )}
          </FormField>

          <FormField name="phone" label="Phone" errors={errors.phone}>
            {(control) => (
              <input
                {...control}
                type="tel"
                autoComplete="tel"
                maxLength={40}
                value={values.phone}
                onChange={(event) => set("phone", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.phone))}`}
              />
            )}
          </FormField>

          <FormField
            name="country"
            label="Country"
            required
            errors={errors.country}
          >
            {(control) => (
              <select
                {...control}
                autoComplete="country-name"
                value={values.country}
                onChange={(event) => set("country", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.country))}`}
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField
            name="enquiryType"
            label="Enquiry type"
            required
            errors={errors.enquiryType}
          >
            {(control) => (
              <select
                {...control}
                value={values.enquiryType}
                onChange={(event) => set("enquiryType", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.enquiryType))}`}
              >
                <option value="">Select an enquiry type</option>
                {ENQUIRY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField
            name="articleNo"
            label="Product article number"
            hint="If you already know it — for example 14872."
            errors={errors.articleNo}
          >
            {(control) => (
              <input
                {...control}
                type="text"
                maxLength={60}
                value={values.articleNo}
                onChange={(event) => set("articleNo", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.articleNo))}`}
              />
            )}
          </FormField>

          <FormField
            name="quantity"
            label="Quantity"
            hint="An approximate volume is fine."
            errors={errors.quantity}
          >
            {(control) => (
              <input
                {...control}
                type="text"
                maxLength={60}
                value={values.quantity}
                onChange={(event) => set("quantity", event.target.value)}
                className={`${controlClass} ${controlBorder(Boolean(errors.quantity))}`}
              />
            )}
          </FormField>

          <FormField
            name="message"
            label="Message"
            required
            errors={errors.message}
            className="sm:col-span-2"
          >
            {(control) => (
              <textarea
                {...control}
                rows={6}
                maxLength={4000}
                value={values.message}
                onChange={(event) => set("message", event.target.value)}
                className={`${controlClass} resize-y ${controlBorder(Boolean(errors.message))}`}
              />
            )}
          </FormField>
        </div>

        {/* PDPA consent ---------------------------------------------------- */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="enquiry-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(event) => set("consent", event.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={
                errors.consent ? "enquiry-consent-error" : undefined
              }
              className="mt-1 h-4 w-4 shrink-0 accent-brand"
            />
            <label
              htmlFor="enquiry-consent"
              className="text-sm leading-relaxed text-ink-muted"
            >
              I agree that the details submitted in this form may be stored and
              used to respond to my enquiry, as described in the{" "}
              <a
                href="/legal/privacy-policy"
                className="text-ink underline underline-offset-4 transition-colors hover:text-brand"
              >
                privacy policy
              </a>
              .
              <span className="ml-1 text-brand" aria-hidden="true">
                *
              </span>
            </label>
          </div>

          {errors.consent && (
            <p
              id="enquiry-consent-error"
              className="mt-2 text-sm leading-snug text-brand"
            >
              {errors.consent[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-2 text-xs leading-relaxed text-ink-subtle sm:order-1">
            <span className="text-brand" aria-hidden="true">
              *
            </span>{" "}
            Required fields.
          </p>

          <SubmitButton
            pending={pending}
            className="order-1 w-full sm:order-2 sm:w-auto"
          >
            Send enquiry
          </SubmitButton>
        </div>
      </fieldset>
    </form>
  );
}
