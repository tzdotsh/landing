export default function () {
  const route = useRoute();

  const pathWithoutVersion = route.path
    .split("/")
    .filter((el) => !el.startsWith("v"))
    .join("/");

  return pathWithoutVersion;
}
