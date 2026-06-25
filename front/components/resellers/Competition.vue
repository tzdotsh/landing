<script lang="ts" setup>
import type { BarSeriesOption } from "echarts/charts";

const { isSmallScreen } = useDeviceType();
const { t } = useI18n();

const chartBox = ref<HTMLElement | null>(null);
const chartIsland = ref<{ refresh: () => Promise<void> } | null>(null);

function getDefaultChartSize() {
  return {
    width: isSmallScreen.value ? 340 : 1100,
    height: 444,
  };
}

const chartSize = ref(getDefaultChartSize());

const initOption = computed(() => ({
  width: chartSize.value.width,
  height: chartSize.value.height,
}));

function updateChartSize() {
  if (!chartBox.value) {
    chartSize.value = getDefaultChartSize();
    return false;
  }

  const { width, height } = chartBox.value.getBoundingClientRect();
  const fallbackSize = getDefaultChartSize();
  const nextSize = {
    width: Math.round(width) || fallbackSize.width,
    height: Math.round(height) || fallbackSize.height,
  };

  const hasChanged =
    nextSize.width !== chartSize.value.width ||
    nextSize.height !== chartSize.value.height;

  chartSize.value = nextSize;

  return hasChanged;
}

let resizeObserver: ResizeObserver | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function queueChartRefresh() {
  if (!import.meta.client) return;

  if (refreshTimer !== null) {
    clearTimeout(refreshTimer);
  }

  refreshTimer = setTimeout(async () => {
    refreshTimer = null;
    await nextTick();
    await chartIsland.value?.refresh();
  }, 120);
}

watch(
  isSmallScreen,
  async () => {
    await nextTick();
    updateChartSize();
    queueChartRefresh();
  },
  { flush: "post" },
);

onMounted(async () => {
  await nextTick();
  updateChartSize();
  queueChartRefresh();

  resizeObserver = new ResizeObserver(() => {
    if (updateChartSize()) {
      queueChartRefresh();
    }
  });

  if (chartBox.value) {
    resizeObserver.observe(chartBox.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;

  if (refreshTimer !== null) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
});

const seriesType = computed<BarSeriesOption>(() => ({
  type: "bar",
  label: {
    show: true,
    position: isSmallScreen.value ? "outside" : "top",
    fontSize: isSmallScreen.value ? 14 : 22,
    opacity: 0.5,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#FFFFFF",
    distance: 11,
  },
  itemStyle: {
    borderRadius: 10,
  },
  barGap: "15%",
}));

const competitors = computed(() =>
  ["A", "B", "C"]
    .map((alphabet) => ({
      name: t("resellers.competition.competitor", { alphabet }),
      color:
        alphabet === "A"
          ? "#E8D460"
          : alphabet === "B"
            ? "#FFCD38"
            : alphabet === "C"
              ? "#FFAA00"
              : isSmallScreen.value
                ? "linear-gradient(to right, #F600FF, #00BCFF)"
                : "linear-gradient(to bottom, #F600FF, #00BCFF)",
      default: false,
    }))
    .concat([
      {
        name: t("seo.site.name"),
        color: isSmallScreen.value
          ? "linear-gradient(to right, #F600FF, #00BCFF)"
          : "linear-gradient(to bottom, #F600FF, #00BCFF)",
        default: true,
      },
    ]),
);

const option = computed<ECOption>(() => ({
  dataset: {
    dimensions: [
      "Feature",
      ...competitors.value.map((competitor) => competitor.name),
    ],
    source: [
      t("resellers.competition.technology"),
      t("resellers.competition.support"),
      t("resellers.competition.stability"),
      t("resellers.competition.pricing"),
      t("resellers.competition.integration"),
    ].map((feature, index) => {
      const data = [
        [5, 6, 4, 9], // technology
        [4, 5, 1, 10], // support
        [7, 5, 6, 10], // stability
        [5, 4, 5, 9], // pricing
        [5, 2, 1, 10], // integration
      ];

      return {
        Feature: feature,
        ...competitors.value.reduce(
          (acc: Record<string, number | undefined>, competitor, i) => {
            acc[competitor.name] = data[index]?.[i];
            return acc;
          },
          {},
        ),
      };
    }),
  },
  xAxis: {
    show: !isSmallScreen.value,
    type: isSmallScreen.value ? "value" : "category",
    axisLabel: {
      align: "center",
      fontSize: 22,
      lineHeight: 26,
      fontWeight: "bold",
      fontFamily: "Inter",
      color: "#FFFFFF",
      margin: 37,
    },
    splitArea: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: !isSmallScreen.value,
      lineStyle: {
        color: "#FFFFFF",
        width: 1,
        opacity: 0.09,
      },
    },
    splitLine: {
      lineStyle: {
        color: "#FFFFFF",
        opacity: 0.09,
        width: 1,
        type: "dashed",
        cap: "round",
      },
      showMinLine: false,
    },
  },
  yAxis: {
    type: isSmallScreen.value ? "category" : "value",
    inverse: isSmallScreen.value,
    splitLine: {
      lineStyle: {
        color: "#FFFFFF",
        opacity: 0.09,
        width: 1,
        type: "dashed",
        cap: "round",
      },
      showMinLine: false,
    },
    axisLabel: {
      show: isSmallScreen.value,
      align: "right",
      fontSize: 14,
      fontWeight: "bold",
      fontFamily: "Inter",
      color: "#FFFFFF",
      margin: 20,
      rotate: 30,
    },
    axisLine: {
      show: isSmallScreen.value,
      lineStyle: {
        color: "#FFFFFF",
        width: 1,
        opacity: 0.09,
      },
    },
  },
  series: [
    deepMerge(seriesType.value, { itemStyle: { color: "#E8D460" } }),
    deepMerge(seriesType.value, { itemStyle: { color: "#FFCD38" } }),
    deepMerge(seriesType.value, { itemStyle: { color: "#FFAA00" } }),
    deepMerge(seriesType.value, {
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: isSmallScreen.value ? 1 : 0,
          y2: isSmallScreen.value ? 0 : 1,
          colorStops: [
            {
              offset: 0,
              color: "#F600FF",
            },
            {
              offset: 1,
              color: "#00BCFF",
            },
          ],
        },
      },
    }),
  ],
  grid: isSmallScreen.value
    ? {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0,
      }
    : {
        top: 37,
        left: 0,
        right: 0,
        bottom: 63,
      },
}));
</script>

<template>
  <section id="competition">
    <div class="container flex flex-col gap-y-[74px]">
      <Heading
        :title="t('resellers.competition.title')"
        :description="t('resellers.competition.description')"
        title-class="font-black tracking-normal!"
        description-class="text-[22px]/[calc(26/22)] tracking-normal"
        gap="30"
        animation
      />

      <div class="flex flex-col gap-y-[70px]">
        <div class="flex flex-col gap-y-[30px]">
          <div
            class="glass-effect-ring flex flex-col gap-y-[33px] rounded-[15px] pt-10 pb-[43px] pl-5 lg:pr-[30px] lg:pl-[21px]"
          >
            <p
              class="text-[clamp(18px,2vw,22px)]/[calc(26/22)] text-white italic opacity-50"
            >
              {{ t("resellers.competition.chart_note") }}
            </p>

            <div ref="chartBox" class="h-111! w-full">
              <VChartIsland
                ref="chartIsland"
                :init-options="initOption"
                :option="option"
                class="h-full w-full"
              />
            </div>
          </div>

          <div
            class="flex flex-wrap items-center justify-center gap-x-[52px] gap-y-7"
          >
            <div
              v-for="(competitor, i) in competitors"
              :key="i"
              class="flex items-center gap-x-2"
            >
              <div
                :style="`background: ${competitor.color}`"
                class="aspect-square h-8 w-auto rounded-lg"
              ></div>

              <p
                :class="{
                  'font-bold': competitor.default,
                }"
                class="text-[18px]/[calc(21/18)] text-white"
              >
                {{ competitor.name }}
              </p>
            </div>
          </div>
        </div>

        <p
          class="mx-auto max-w-[1012px] text-center text-[22px]/[calc(26/22)] text-white opacity-60"
        >
          {{ t("resellers.competition.chart_description") }}
        </p>
      </div>
    </div>
  </section>
</template>
