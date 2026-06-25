export default function useParams() {
  const device = useRouteParams("device", null, { transform: String });
  const app = useRouteParams("app", null, { transform: String });
  const slug = useRouteParams("slug", null, { transform: String });
  const version = useRouteParams("version", null, { transform: Number });

  return {
    device,
    app,
    slug,
    version,
  };
}
