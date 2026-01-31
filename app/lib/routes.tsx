import { sign } from "crypto";
import { register } from "module";

export const routes = {
  home: "/",

  client: {
    home: "/client",
    university: "/client/university",
    scholarship: "/client/scholarship",
  },

  admin: {
    dashboard: "/admin",
    university: "/admin/university",
    scholarship: "/admin/scholarship",
  },

  login: "/login",
  signup: "/login/signup",

  components: {
    admin: "/components/admin",
    client: "/components/client",
    common: "/components/common",
    providers: "/components/providers",
  },
} as const;
