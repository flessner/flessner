import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("_design", "routes/design.tsx"),
] satisfies RouteConfig;
