import type { Metadata } from "next";

import { DefinitionGrid } from "@/components/content/DefinitionGrid";
import { PageHeader } from "@/components/content/PageHeader";
import { Prose } from "@/components/content/Prose";
import { SectionHeading } from "@/components/content/SectionHeading";
import { SourceNote } from "@/components/content/SourceNote";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { distributor, manufacturer } from "@/lib/site";

/**
 * PLACEHOLDER — NOT APPROVED LEGAL COPY.
 *
 * This page describes, factually and verifiably, what the website actually
 * does with the data someone types into the enquiry form. That much is drawn
 * from the code in `lib/actions/enquiry.ts` and `lib/email/`, so it is true
 * today and can be checked.
 *
 * Everything a real privacy notice additionally requires — the retention
 * period, the lawful basis, the complaints route, and the PDPA 2010 rights
 * wording itself — rests on decisions only the client and their legal adviser
 * can make. Those are marked as outstanding rather than filled in with
 * plausible-sounding text, because an invented privacy notice is worse than an
 * obviously unfinished one. The data controller is now identified: Akmal
 * Station, the Malaysian business that operates this website.
 *
 * LAUNCH BLOCKER: this page must be replaced with reviewed copy before
 * production, and the `robots` directive below removed at the same time.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How enquiries submitted through this website are handled. This notice is a working draft pending legal review.",
  alternates: { canonical: "/legal/privacy-policy" },
  /* Kept out of search results while the wording is unapproved. Still fully
     reachable — the enquiry form links straight to it. */
  robots: { index: false, follow: true },
};

/* Mirrors the fields in lib/validation/enquiry.ts. Keep the two in step. */
const collectedFields = [
  {
    term: "Who is responsible",
    description:
      `This website is operated by ${distributor.legalName} (registration no. ${distributor.registrationNumber}), ${distributor.address.join(", ")} — the distributor and importer of Morakniv Food Industry products in Malaysia. ${manufacturer.legalName} in Sweden is a separate company and does not operate this website.`,
  },
  {
    term: "Details you enter",
    description:
      "Name, company, email address, country and your message are required. Telephone number, product article number and quantity are optional. Nothing else is requested, and no field is collected silently.",
  },
  {
    term: "How it reaches us",
    description:
      "The completed form is sent to our enquiry inbox as an email. This website has no customer database and stores no copy of your enquiry after the email has been sent.",
  },
  {
    term: "Technical information",
    description:
      "To limit automated abuse of the form, the server briefly holds a counter derived from the network address the submission came from. It is held in memory only, expires within minutes, and is not stored, logged alongside your enquiry, or used to identify you.",
  },
  {
    term: "Cookies and analytics",
    description:
      "This website sets no cookies and runs no analytics, advertising or tracking scripts. There is no consent banner because there is nothing to consent to.",
  },
];

const outstanding = [
  {
    term: "Retention period",
    description:
      "How long enquiry emails are kept in the business inbox before deletion, and who is responsible for that deletion.",
  },
  {
    term: "Lawful basis and consent wording",
    description:
      "The basis relied upon under the Personal Data Protection Act 2010, and the exact consent language shown beside the form's checkbox, both to be confirmed by the client's legal adviser.",
  },
  {
    term: "Access, correction and complaints",
    description:
      "The contact point for requesting access to or correction of personal data, the response process, and the escalation route for complaints.",
  },
  {
    term: "Third-party processors",
    description:
      "Disclosure of the email delivery provider used to transmit enquiries, the jurisdictions data passes through, and any cross-border transfer notice required.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy."
        lede="How information submitted through the enquiry form on this website is handled."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      {/* ---------------------------------------------------------------
          The status of this page, stated first rather than in a footnote
          --------------------------------------------------------------- */}
      <Section size="sm">
        <Container>
          <SourceNote variant="caution">
            <strong className="font-medium text-ink">
              Working draft — pending legal review.
            </strong>{" "}
            This page is a structural placeholder. The description of what the
            enquiry form does is accurate and reflects how the website is built.
            The formal privacy notice — including the identity of the data
            controller, retention periods and the rights available to you under
            the Personal Data Protection Act 2010 — has not yet been drafted or
            approved, and this page must not be relied upon as a complete legal
            notice. It will be replaced with reviewed wording before the site
            goes live.
          </SourceNote>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          What is factually true today
          --------------------------------------------------------------- */}
      <Section divided size="sm">
        <Container>
          <SectionHeading
            eyebrow="What we collect"
            title="What the enquiry form actually does."
            lede="The following describes the current behaviour of this website and can be verified against its source code."
          />

          <DefinitionGrid items={collectedFields} columns={1} className="mt-12" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          What is deliberately missing
          --------------------------------------------------------------- */}
      <Section tone="alt" divided>
        <Container>
          <SectionHeading
            eyebrow="Still to be confirmed"
            title="What this notice does not yet cover."
            lede="These sections require information and decisions from the client and their legal adviser. They have been left blank rather than filled with placeholder legal text."
          />

          <DefinitionGrid items={outstanding} className="mt-12" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Where to ask in the meantime
          --------------------------------------------------------------- */}
      <Section divided size="sm">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Questions"
            title="If you have a question about your data."
          />

          <Prose className="mt-6">
            <p>
              If you have submitted an enquiry through this website and want it
              deleted, or want to know what we hold, use the enquiry form and
              say so — it reaches the same people who receive the enquiries.
            </p>
            <p>
              For questions concerning {manufacturer.legalName} in Sweden, who
              manufacture the products described on this site and who operate
              their own systems separately from this website, contact{" "}
              <a href={`mailto:${manufacturer.email}`}>{manufacturer.email}</a>.
            </p>
          </Prose>

          <SourceNote className="mt-8">
            Last reviewed: not yet reviewed. This page has no approved
            publication date.
          </SourceNote>
        </Container>
      </Section>
    </>
  );
}
