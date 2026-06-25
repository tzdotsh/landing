<script lang="ts" setup>
const { isLargeScreen } = useDeviceType();
</script>

<template>
  <section id="search">
    <div class="container max-lg:grid max-lg:gap-y-5">
      <div id="mobile-category"></div>

      <div
        class="max-lg:bg-panel max-lg:ring-line flex flex-col max-lg:gap-y-5 max-lg:rounded-card max-lg:px-[11px] max-lg:pt-5 max-lg:ring-1 lg:gap-y-[57px]"
      >
        <ChannelsSearch />

        <div
          class="grid h-[calc(100vh-320px)] min-h-[300px] items-start gap-x-5 lg:h-[calc(100vh-250px)] lg:grid-cols-[300px_1fr]"
        >
          <ClientOnly>
            <Teleport :disabled="isLargeScreen" to="#mobile-category">
              <ChannelsCategory />
            </Teleport>

            <template #fallback>
              <ChannelsCategory />
            </template>
          </ClientOnly>

          <ChannelsList />
        </div>
      </div>
    </div>
  </section>
</template>
