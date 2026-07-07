<script lang="ts" setup>
/**
 * Landing-owned LiveChat trigger — mounted from app.vue (outside layout stacking).
 */

const GREETING_DISMISSED_KEY = "mxcGreetingDismissed";
const GREETING_DELAY_MS = 4000;
const POLL_INTERVAL_MS = 250;
const POLL_MAX_TRIES = 40;

const greetingVisible = ref(false);
const hasUnread = ref(false);
const chatOpen = ref(false);

let greetingTimer: ReturnType<typeof setTimeout> | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
let pollTries = 0;

function openChat() {
  greetingVisible.value = false;
  hasUnread.value = false;

  if (!import.meta.client) return;

  const widget = window.LiveChatWidget;
  if (widget) {
    widget.call("maximize");
    return;
  }

  // Widget stub not ready yet — retry briefly (home can hydrate before plugin runs).
  let tries = 0;
  const retry = setInterval(() => {
    tries += 1;
    if (window.LiveChatWidget) {
      clearInterval(retry);
      window.LiveChatWidget.call("maximize");
    } else if (tries >= 20) {
      clearInterval(retry);
    }
  }, 200);
}

function dismissGreeting() {
  greetingVisible.value = false;

  if (import.meta.client) {
    try {
      sessionStorage.setItem(GREETING_DISMISSED_KEY, "1");
    } catch {
      // sessionStorage can throw in private mode — ignore.
    }
  }
}

function wireLiveChat() {
  const widget = window.LiveChatWidget;
  if (!widget) return;

  widget.on("new_event", () => {
    if (!chatOpen.value) {
      hasUnread.value = true;
    }
  });

  widget.on("visibility_changed", (payload?: unknown) => {
    const visibility =
      payload && typeof payload === "object" && "visibility" in payload
        ? (payload as { visibility?: string }).visibility
        : undefined;

    chatOpen.value = visibility === "maximized";

    if (chatOpen.value) {
      hasUnread.value = false;
      greetingVisible.value = false;
    }
  });
}

function startGreetingTimer() {
  let dismissed = false;

  try {
    dismissed = sessionStorage.getItem(GREETING_DISMISSED_KEY) === "1";
  } catch {
    dismissed = false;
  }

  if (dismissed) return;

  greetingTimer = setTimeout(() => {
    if (!chatOpen.value) {
      greetingVisible.value = true;
    }
  }, GREETING_DELAY_MS);
}

function startLiveChatPolling() {
  pollTimer = setInterval(() => {
    pollTries += 1;

    if (window.LiveChatWidget) {
      stopPolling();
      wireLiveChat();
    } else if (pollTries >= POLL_MAX_TRIES) {
      stopPolling();
    }
  }, POLL_INTERVAL_MS);
}

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

onMounted(() => {
  if (!import.meta.client) return;

  startGreetingTimer();
  startLiveChatPolling();
});

onBeforeUnmount(() => {
  if (greetingTimer !== null) {
    clearTimeout(greetingTimer);
    greetingTimer = null;
  }
  stopPolling();
});
</script>

<template>
  <Teleport to="body">
    <div class="mxc-chat">
      <Transition name="mxc-greeting">
        <div
          v-if="greetingVisible"
          class="mxc-greeting"
          role="button"
          tabindex="0"
          @click="openChat"
          @keydown.enter.prevent="openChat"
          @keydown.space.prevent="openChat"
        >
          <p class="mxc-greeting__text">
            Need help? <strong>Chat with us</strong> — we're online
          </p>

          <button
            type="button"
            class="mxc-greeting__close"
            aria-label="Dismiss message"
            @click.stop="dismissGreeting"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 6 6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </Transition>

      <button
        type="button"
        class="mxc-bubble"
        aria-label="Open live chat"
        @click="openChat"
      >
        <span
          v-if="hasUnread"
          class="mxc-bubble__badge"
          aria-hidden="true"
        />

        <svg
          class="mxc-bubble__icon"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            stroke="#06160f"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.mxc-chat {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  font-family: var(--font-body, "Hanken Grotesk", system-ui, sans-serif);
  pointer-events: auto;
}

.mxc-bubble {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: linear-gradient(
    135deg,
    #22c8a0 0%,
    #44d77a 55%,
    #d4f04d 130%
  );
  box-shadow:
    0 6px 24px rgba(34, 200, 160, 0.45),
    0 2px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(0) scale(1);
  transition:
    transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.28s ease;
  transform-origin: bottom right;
  animation: mxc-bubble-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
}

.mxc-bubble:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 10px 30px rgba(34, 200, 160, 0.6),
    0 3px 10px rgba(0, 0, 0, 0.35);
}

.mxc-bubble:active {
  transform: translateY(-1px) scale(0.98);
}

.mxc-bubble:focus-visible {
  outline: 2px solid #d4f04d;
  outline-offset: 3px;
}

.mxc-bubble__icon {
  position: relative;
  z-index: 1;
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mxc-bubble:hover .mxc-bubble__icon {
  transform: scale(1.08);
}

.mxc-bubble::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(34, 200, 160, 0.6);
  animation: mxc-pulse 2.4s ease-out infinite;
  pointer-events: none;
}

.mxc-bubble__badge {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 2;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #081623;
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.4);
}

.mxc-greeting {
  max-width: 250px;
  padding: 12px 38px 12px 16px;
  position: relative;
  border-radius: 14px;
  background: rgba(14, 32, 48, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(34, 200, 160, 0.35);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.35),
    0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.mxc-greeting__text {
  margin: 0;
  font-family: var(--font-body, "Hanken Grotesk", system-ui, sans-serif);
  font-size: 14px;
  line-height: 1.4;
  color: #edf3f8;
}

.mxc-greeting__text strong {
  color: #44d77a;
  font-weight: 700;
}

.mxc-greeting__close {
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #8aa0b2;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.mxc-greeting__close:hover {
  color: #edf3f8;
  background: rgba(255, 255, 255, 0.08);
}

.mxc-greeting__close:focus-visible {
  outline: 2px solid rgba(34, 200, 160, 0.6);
  outline-offset: 1px;
}

.mxc-greeting-enter-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mxc-greeting-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.mxc-greeting-enter-from,
.mxc-greeting-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

@keyframes mxc-bubble-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes mxc-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mxc-bubble {
    animation: none;
  }

  .mxc-bubble::after {
    animation: none;
    display: none;
  }

  .mxc-bubble,
  .mxc-bubble__icon,
  .mxc-greeting-enter-active,
  .mxc-greeting-leave-active {
    transition: none;
  }
}

@media (max-width: 600px) {
  .mxc-chat {
    right: 18px;
    bottom: 18px;
    gap: 10px;
  }

  .mxc-bubble {
    width: 56px;
    height: 56px;
  }

  .mxc-greeting {
    max-width: 210px;
    padding: 10px 34px 10px 14px;
  }

  .mxc-greeting__text {
    font-size: 13px;
  }
}
</style>
