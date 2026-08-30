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
 * Interim privacy notice.
 *
 * WHAT THIS PAGE MAY SAY, AND WHAT IT MAY NOT.
 * Every statement below describes what this website actually does with the
 * data someone types into the enquiry form, and each one can be checked against
 * `lib/actions/enquiry.ts`, `lib/validation/enquiry.ts` and `lib/email/`. The
 * data controller is Akmal Station, taken from the client's own business
 * details in `lib/site.ts`.
 *
 * The elements a complete privacy notice additionally requires — the retention
 * period, the lawful basis relied upon, the statutory rights wording under the
 * PDPA 2010, the complaints route and any processor disclosure — rest on
 * decisions only the client and their legal adviser can make. They are OMITTED
 * rather than invented, and they are not published as open questions either:
 * a public page is not the place to address the client.
 *
 * Do not add any of them without reviewed copy. The `robots` directive below
 * stays until that copy exists.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How enquiries submitted through the Morakniv Food Industry Malaysia website are handled: what the form collects, how it reaches us, and what this site does not do.",
  alternates: { canonical: "/legal/privacy-policy" },
  /* Kept out of search results until the notice has been through legal review.
     Still fully reachable — the enquiry form links straight to it. */
  robots: { index: false, follow: true },
};

/* Mirrors the fields in lib/validation/enquiry.ts. Keep the two in step. */
const collectedFields = [
  {
    term: "Who is responsible",
    description: `This website is operated by ${distributor.legalName} (registration no. ${distributor.registrationNumber}), ${distributor.address.join(", ")} — the distributor and importer of Morakniv Food Industry products in Malaysia. ${manufacturer.legalName} in Sweden is a separate company and does not operate this website.`,
  },
  {
    term: "Details you enter",
    description:
      "Name, company, email address, country and your message are required. Telephone number, product article number and quantity are optional. Nothing else is requested, and no field is collected silently.",
  },
  {
    term: "How it reaches us",
    description:
      "The completed form is sent to our enquiry inbox as an email, transmitted through an external email delivery service. This website has no customer database and stores no copy of your enquiry after the email has been sent.",
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
          What the site actually does — every line verifiable in the source
          --------------------------------------------------------------- */}
      <Section divided size="sm">
        <Container>
          <SectionHeading
            eyebrow="What we collect"
            title="What the enquiry form does."
            lede="The following describes how this website handles the details you submit."
          />

          <DefinitionGrid items={collectedFields} columns={1} className="mt-12" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
          Where to ask
          --------------------------------------------------------------- */}
      <Section tone="alt" divided size="sm">
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
            This notice describes current practice and will be updated as
            operational details are confirmed.
          </SourceNote>
        </Container>
      </Section>
    </>
  );
}
