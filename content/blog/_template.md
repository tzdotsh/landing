---
title: "Article template — do not publish"
slug: "article-template"
description: "Reference frontmatter and body patterns for Maxco blog authors."
datePublished: 2026-01-01
dateUpdated: 2026-01-15
author: "Maxco Editorial"
authorBio: "Product and support updates from the Maxco team."
tags:
  - template
  - reference
category: "Guides"
image: "/og-image.webp"
locale: en-en
draft: true
faq:
  - question: "What is this file?"
    answer: "A private reference template. Set draft true and exclude from production builds."
  - question: "How do I add a FAQ block in the body?"
    answer: "Use the ::faq MDC component or the faq frontmatter array for JSON-LD."
---

## Section heading (H2)

Write clear, scannable paragraphs. Lead with the answer, then expand with detail for readers and AI crawlers.

### Subsection (H3)

- Use lists for steps or benefits
- Keep sentences short
- Link internally to `/channels`, `/apps`, or other blog posts

::stat{value="15,000+" label="Live channels on Maxco"}
::

::pull-quote{author="Maxco team"}
Premium streaming should feel instant — not like homework.
::

::faq{question="Can I publish this template?" answer="No. Duplicate this file, set draft false, and give it a unique slug before publishing."}
::

## Internal links

When you publish, add related posts at the bottom automatically — or link manually to [another article](/blog/example-slug).
