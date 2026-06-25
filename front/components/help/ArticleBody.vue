<script lang="ts" setup>
import { resolveKbBodyHtml } from "~/utils/kb";

const props = defineProps<{
  body: string;
}>();

const { version } = useProject();
const localePath = useLocalePath();

const html = computed(() =>
  resolveKbBodyHtml(props.body, localePath, version),
);
</script>

<template>
  <div class="kb-prose" v-html="html" />
</template>

<style scoped lang="postcss">
.kb-prose :deep(h2),
.kb-prose :deep(h3),
.kb-prose :deep(h4) {
  font-family: var(--font-heading);
  color: var(--color-ink);
  font-weight: 600;
  scroll-margin-top: 7rem;
}

.kb-prose :deep(h2) {
  font-size: 1.75rem;
  line-height: 1.25;
  margin: 2.5rem 0 1rem;
}

.kb-prose :deep(h2:first-child),
.kb-prose :deep(h3:first-child) {
  margin-top: 0;
}

.kb-prose :deep(h3) {
  font-size: 1.25rem;
  line-height: 1.35;
  margin: 2rem 0 0.75rem;
}

.kb-prose :deep(h4) {
  font-size: 1.125rem;
  line-height: 1.4;
  margin: 1.5rem 0 0.5rem;
}

.kb-prose :deep(p),
.kb-prose :deep(li) {
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.75;
}

.kb-prose :deep(p) {
  margin-bottom: 1rem;
}

.kb-prose :deep(strong),
.kb-prose :deep(b) {
  color: var(--color-ink);
  font-weight: 600;
}

.kb-prose :deep(a) {
  color: var(--color-teal);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 200ms var(--ease-brand);
}

.kb-prose :deep(a:hover) {
  color: var(--color-lime);
}

.kb-prose :deep(ul),
.kb-prose :deep(ol) {
  margin: 1rem 0 1.25rem;
  padding-left: 1.5rem;
}

.kb-prose :deep(ul) {
  list-style: disc;
}

.kb-prose :deep(ol) {
  list-style: decimal;
}

.kb-prose :deep(li) {
  margin-bottom: 0.5rem;
}

.kb-prose :deep(blockquote) {
  border-left: 3px solid var(--color-teal);
  background: color-mix(in srgb, var(--color-panel) 80%, transparent);
  border-radius: 0 var(--radius-card) var(--radius-card) 0;
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
}

.kb-prose :deep(code) {
  background: var(--color-panel-2);
  border-radius: 0.375rem;
  color: var(--color-ink);
  font-size: 0.875em;
  padding: 0.125rem 0.375rem;
}

.kb-prose :deep(pre) {
  background: var(--color-panel-2);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  margin: 1.25rem 0;
  overflow-x: auto;
  padding: 1rem 1.25rem;
}

.kb-prose :deep(pre code) {
  background: transparent;
  padding: 0;
}

.kb-prose :deep(img) {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  display: block;
  height: auto;
  margin: 1.25rem 0;
  max-width: 100%;
}

.kb-prose :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-line);
  margin: 2rem 0;
}

@media (prefers-reduced-motion: reduce) {
  .kb-prose :deep(a) {
    transition: none;
  }
}
</style>
