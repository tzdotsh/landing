import { breakpointsTailwind } from "@vueuse/core";

export default function () {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const hasMounted = shallowRef(false);
  const largeScreenQuery = breakpoints.greaterOrEqual("lg");
  const smallScreenQuery = breakpoints.smaller("lg");

  onMounted(() => {
    hasMounted.value = true;
  });

  const isLargeScreen = computed(() =>
    hasMounted.value ? largeScreenQuery.value : false,
  );
  const isSmallScreen = computed(() =>
    hasMounted.value ? smallScreenQuery.value : false,
  );

  return {
    isLargeScreen,
    isSmallScreen,
  };
}
