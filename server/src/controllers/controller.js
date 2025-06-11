export default ({ strapi }) => ({
  async subscribeContact(ctx) {
    try {
      const result = await strapi
        .plugin("strapi-plugin")
        .service("service")
        .subscribeContact(ctx.request.body);
      ctx.send(result);
    } catch (err) {
      ctx.throw(err.response?.status || 500, err.message);
    }
  },

  async addContacts(ctx) {
    try {
      const result = await strapi
        .plugin("strapi-plugin")
        .service("service")
        .addContacts(ctx.request.body);
      ctx.send(result);
    } catch (err) {
      ctx.throw(err.response?.status || 500, err.message);
    }
  },
});
