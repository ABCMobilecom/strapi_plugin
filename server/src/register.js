export default ({ strapi }) => {
  const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });

  // Define a 'view' permission
  strapi.service('plugin::users-permissions.permission').actionProvider.register({
    plugin: PLUGIN_ID,
    action: 'view',
    subject: null,
    properties: {},
    conditions: []
  });
};
