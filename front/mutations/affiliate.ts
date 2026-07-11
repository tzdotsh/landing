import { useMutation } from "@pinia/colada";

export type AffiliateApplyPayload = {
  name: string;
  email: string;
  website?: string;
  channels: string;
  audience: string;
  promotion: string;
  experience?: string;
};

export function useAffiliateApplyMutation() {
  return useMutation({
    mutation: (payload: AffiliateApplyPayload) =>
      $fetch("/api/affiliate/apply", {
        method: "POST",
        body: payload,
      }),
  });
}
