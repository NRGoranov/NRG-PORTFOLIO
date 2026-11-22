/**
 * Facts already published on the site. Do not invent a street address,
 * company number, or VAT ID here.
 */
export const controller = {
  name: "Nikolay Goranov",
  brand: "NRG",
  site: "https://www.nrgtrw.com",
  email: "nrgoranov@gmail.com",
  phone: "+359 89 733 8635",
  location: "Sofia, Bulgaria",
  /**
   * Geographic address required before distance contracts (Bulgarian Electronic
   * Commerce Act / Directive 2000/31/EC Art. 5). Empty until you put the real one.
   */
  postalAddress: "",
} as const;

export const privacyUpdated = "22 November 2026";

/** Shown next to the checkbox and required by the API. Not a mailing list. */
export const WISHLIST_CONSENT_TEXT =
  "Email me only about this piece: whether it goes into production, and when the drop is ready. I can withdraw at any time.";

export const ANALYTICS_OBJECTION_KEY = "nrg-analytics-objection";
export const ANALYTICS_OBJECTION_EVENT = "nrg-analytics-objection";
