export default function useParams() {
  const device = useRouteParams("device", null, { transform: String });
  const app = useRouteParams("app", null, { transform: String });
  const slug = useRouteParams("slug", null, { transform: String });

  return {
    device,
    app,
    slug,
  };
}
