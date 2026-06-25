import { parseMarkdown } from "@nuxtjs/mdc/runtime";

export default async function useParseMarkdown(
  key: MaybeRefOrGetter<string>,
  content: MaybeRefOrGetter<string | null | undefined>,
) {
  return useAsyncData(
    () => `markdown-${toValue(key)}`,
    async () => {
      const raw = toValue(content);
      if (raw) return parseMarkdown(raw);
    },
    { watch: [() => toValue(content), () => toValue(key)] },
  );
}
