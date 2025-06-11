export default [
  {
    method: "POST",
    path: "/contact/subscribe",
    handler: "controller.subscribeContact",
    config: { policies: [] },
  },
  {
    method: "POST",
    path: "/contacts",
    handler: "controller.addContacts",
    config: { policies: [] },
  },
];
