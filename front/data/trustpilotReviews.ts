export const TRUSTPILOT_PROFILE_URL =
  "https://www.trustpilot.com/review/maxcotv.com";

export type TrustpilotReview = {
  name: string;
  loc: string;
  stars: number;
  date: string;
  text: string;
};

/** Verbatim Trustpilot reviews — do not edit copy or add fabricated entries. */
export const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  {
    name: "Mr Mark Fishlock",
    loc: "GB",
    stars: 5,
    date: "Jun 2026",
    text: "Great service, very good customer support and a good deal on 3 connections. Used Maxco for a few years and the best service I have had — and I use it internationally too.",
  },
  {
    name: "Steve",
    loc: "GB",
    stars: 5,
    date: "Apr 2026",
    text: "What an incredible person-centred service Maxco delivers. Instant support from the chat facility regardless of what time of night! Value for money is second to none — I've been with them over three years and completely satisfied.",
  },
  {
    name: "I.D.",
    loc: "GB",
    stars: 5,
    date: "Mar 2026",
    text: "Always available on chat and very helpful. A pleasure to deal with. Second to none customer service.",
  },
  {
    name: "Helen Alice Driscoll",
    loc: "GB",
    stars: 5,
    date: "Mar 2026",
    text: "I wasn't able to pay my invoice as the system wasn't working. I used live chat and they sorted my problem out — very helpful and always available.",
  },
  {
    name: "Stuart Burgess",
    loc: "IE",
    stars: 5,
    date: "Feb 2026",
    text: "Maxco customer service is very attentive, friendly and professional. I thoroughly recommend this excellent service.",
  },
  {
    name: "Eric M",
    loc: "GB",
    stars: 5,
    date: "Feb 2026",
    text: "I don't often write reviews but Maxco deserve a good write-up. The picture quality is very stable and good even in bad weather. Helpline is spot-on and swift. Been with them several years and staying next year too. Highly recommended!",
  },
  {
    name: "Russ",
    loc: "GB",
    stars: 5,
    date: "Dec 2025",
    text: "These guys really do deliver an excellent service. Had an issue with my IP, Maxco sorted it in minutes. Amazing.",
  },
  {
    name: "Jamil Hussain",
    loc: "GB",
    stars: 5,
    date: "Jul 2025",
    text: "I spoke to Mark on the web chat and he was incredibly helpful. He guided me through the setup from start to finish. I'd absolutely recommend their service!",
  },
  {
    name: "Sean Murray",
    loc: "GB",
    stars: 5,
    date: "Mar 2026",
    text: "Very helpful.",
  },
  {
    name: "David Collier",
    loc: "GB",
    stars: 5,
    date: "Jun 2025",
    text: "Superb service. Prompt, knowledgeable. Five stars.",
  },
  {
    name: "Rachael",
    loc: "GB",
    stars: 5,
    date: "Jun 2025",
    text: "Excellent customer service, always quick to answer any query you may have.",
  },
  {
    name: "chris wynne",
    loc: "GB",
    stars: 5,
    date: "Oct 2025",
    text: "Great to deal with — speedy reply and very helpful.",
  },
  {
    name: "Paul Doran",
    loc: "IE",
    stars: 5,
    date: "May 2025",
    text: "Great service, great support when needed.",
  },
  {
    name: "Consumer",
    loc: "GB",
    stars: 5,
    date: "May 2025",
    text: "Great customer service, A++.",
  },
];

export const TRUSTPILOT_AGGREGATE_RATING = 4.6;
export const TRUSTPILOT_REVIEW_COUNT = 334;
