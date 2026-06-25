import {
  getHardcodedLegalDocument,
  isHardcodedLegalSlug,
} from "~/data/legal-documents";
import { renderLegalMarkdown } from "~/utils/renderLegalMarkdown.server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") ?? "";

  if (!isHardcodedLegalSlug(slug)) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }

  const locale = getQuery(event).locale?.toString() ?? "en-en";
  const contentLocale = locale.startsWith("es") ? "es" : "en";
  const doc = getHardcodedLegalDocument(slug, contentLocale);

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }

  const html = await renderLegalMarkdown(doc.content);

  return {
    title: doc.title,
    description: doc.description,
    html,
  };
});
