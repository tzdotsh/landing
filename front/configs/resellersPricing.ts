export type ResellerModel = "prepaid" | "unlimited";

export type PrepaidTier = {
  id: string;
  name: string;
  price: number;
  credits: number;
  rate: string;
  subResellers: boolean;
  featured?: boolean;
  orderUrl: string;
};

export type UnlimitedTier = {
  id: string;
  name: string;
  price: number;
  capacity: string;
  subResellers: string;
  featured?: boolean;
  orderUrl: string;
};

export const PREPAID_TIERS: PrepaidTier[] = [
  {
    id: "maxco-plus",
    name: "Maxco Plus",
    price: 300,
    credits: 80,
    rate: "£3.75/credit",
    subResellers: false,
    orderUrl: "#",
  },
  {
    id: "maxco-silver",
    name: "Maxco Silver",
    price: 500,
    credits: 160,
    rate: "£3.13/credit",
    subResellers: true,
    featured: true,
    orderUrl: "#",
  },
  {
    id: "maxco-platinum",
    name: "Maxco Platinum",
    price: 1000,
    credits: 400,
    rate: "£2.50/credit",
    subResellers: true,
    orderUrl: "#",
  },
];

export const UNLIMITED_TIERS: UnlimitedTier[] = [
  {
    id: "basic-unlimited",
    name: "Basic Unlimited",
    price: 1000,
    capacity: "1K–2K lines",
    subResellers: "No",
    orderUrl: "#",
  },
  {
    id: "plus-unlimited",
    name: "Plus Unlimited",
    price: 1600,
    capacity: "2K–3.5K lines",
    subResellers: "Up to 5",
    featured: true,
    orderUrl: "#",
  },
  {
    id: "platinum-unlimited",
    name: "Platinum Unlimited",
    price: 2000,
    capacity: "5K–7K lines",
    subResellers: "Up to 20",
    orderUrl: "#",
  },
];

export function featuredTierIndex(model: ResellerModel) {
  const tiers = model === "prepaid" ? PREPAID_TIERS : UNLIMITED_TIERS;
  const index = tiers.findIndex((tier) => tier.featured);

  return index === -1 ? 1 : index;
}

export function formatGbp(amount: number, suffix = "") {
  return `£${amount.toLocaleString("en-GB")}${suffix}`;
}
