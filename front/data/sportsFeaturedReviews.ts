import { TRUSTPILOT_REVIEWS } from "~/data/trustpilotReviews";

/** Verbatim Trustpilot entries surfaced on the sports page (reliability / setup). */
const SPORTS_REVIEW_NAMES = ["Russ", "Eric M"] as const;

export const SPORTS_FEATURED_REVIEWS = SPORTS_REVIEW_NAMES.map((name) => {
  const review = TRUSTPILOT_REVIEWS.find((entry) => entry.name === name);

  if (!review) {
    throw new Error(`Missing Trustpilot review for sports page: ${name}`);
  }

  return review;
});
