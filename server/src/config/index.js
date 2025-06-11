export default {
  default: {
    baseURL:   "https://esputnik.com/api",  // or your actual host
    email:     "",                         // ← API login
    password:  "",                         // ← API password
  },
  validator(config) {
    if (!config.email)    throw new Error("strapi-plugin: `email` is required");
    if (!config.password) throw new Error("strapi-plugin: `password` is required");
    if (typeof config.baseURL !== "string")
      throw new Error("strapi-plugin: `baseURL` must be a string");
  },
};
