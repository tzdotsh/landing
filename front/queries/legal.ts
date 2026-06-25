import type { LegalDocument } from "~/data/legal-documents";

export type Legal = LegalDocument;

export {
  getHardcodedLegalDocument,
  isHardcodedLegalSlug,
} from "~/data/legal-documents";
