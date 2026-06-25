import { useMutation } from "@pinia/colada";

export function useReportMutation() {
  return useMutation({
    mutation: (payload: Record<string, string>) =>
      $fetch("/api/report", {
        method: "POST",
        body: payload,
      }),
  });
}
