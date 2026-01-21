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

  components: {
    admin: "/components/admin",
    client: "/components/client",
    common: "/components/common",
    providers: "/components/providers",
  },
} as const;
