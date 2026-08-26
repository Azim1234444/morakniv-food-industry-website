/**
 * Country list for the enquiry form.
 *
 * Geography, not company information — nothing here is invented client data.
 * Ordered with the ASEAN region first (the site's stated market) then other
 * common trade destinations, then Other. Kept deliberately short so the select
 * stays usable on a phone; extend as real enquiries arrive.
 */
export const COUNTRIES = [
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Brunei",
  "Cambodia",
  "Laos",
  "Myanmar",
  "Australia",
  "New Zealand",
  "China",
  "Hong Kong SAR",
  "Taiwan",
  "Japan",
  "South Korea",
  "India",
  "Bangladesh",
  "Pakistan",
  "Sri Lanka",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Bahrain",
  "Kuwait",
  "United Kingdom",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Belgium",
  "Denmark",
  "Norway",
  "Sweden",
  "Finland",
  "Poland",
  "Spain",
  "Italy",
  "United States",
  "Canada",
  "Mexico",
  "Brazil",
  "South Africa",
  "Other",
] as const;

export type Country = (typeof COUNTRIES)[number];
