import { useMutation } from "@pinia/colada";

export type SupportPayload = {
  message: string;
  subject: string;
  email?: string;
  name?: string;
};

export function useSupportMutation() {
  return useMutation({
    mutation: (payload: SupportPayload) =>
      $fetch("/api/support", {
        method: "POST",
        body: payload,
      }),
  });
}
