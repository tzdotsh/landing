import { TRUSTPILOT_REVIEWS } from "~/data/trustpilotReviews";

/** Verbatim Trustpilot entry for VOD page (value / breadth). */
const VOD_REVIEW_NAME = "Steve";

export const VOD_FEATURED_REVIEW = (() => {
  const review = TRUSTPILOT_REVIEWS.find((entry) => entry.name === VOD_REVIEW_NAME);

  if (!review) {
    throw new Error(`Missing Trustpilot review for VOD page: ${VOD_REVIEW_NAME}`);
  }

  return review;
})();
