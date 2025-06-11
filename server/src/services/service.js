import axios from "axios";

export default ({ strapi }) => ({
  async subscribeContact({ contact, groups = [], formType }) {
    // 1) Load & log plugin config
    const { baseURL, email, password } = strapi.config.get("plugin::strapi-plugin");
    console.log("⚙️ eSputnik config:", { baseURL, email: email?.replace(/.(?=.{2}@)/g, "*"), password: password && "••••••" });

    // 2) Build & log Basic auth header
    const raw = `${email}:${password}`;
    const auth = Buffer.from(raw).toString("base64");
    console.log("🔑 Basic auth (base64):", auth);

    // 3) Create axios instance
    const client = axios.create({
      baseURL,
      headers: {
        Authorization: `Basic ${auth}`,
        Accept:        "application/json; charset=UTF-8",
        "Content-Type": "application/json",
      },
    });

    // 4) Build & log request details
    const url = "/v1/contact/subscribe";
    const payload = { contact, groups, ...(formType && { formType }) };
    console.log("📬 POST:", baseURL + url);
    console.log("📦 Payload:", JSON.stringify(payload, null, 2));

    // 5) Execute & log response or error
    try {
      const response = await client.post(url, payload);
      console.log("✅ Response:", response.status, response.data);
      return response.data;
    } catch (err) {
      console.error("❌ eSputnik error:");
      console.error("   Status:", err.response?.status);
      console.error("   Data:  ", err.response?.data);
      console.error("   Msg:   ", err.message);
      throw err;
    }
  },

  async addContacts({
    contacts,                    // array of contact objects
    dedupeOn,                    // optional: "email"|"phone"
    customFieldsIDs,             // optional array of field IDs
    groupNames,                  // optional array to ADD
    groupNamesExclude,           // optional array to REMOVE
    restoreDeleted,              // optional boolean
    eventKeyForNewContacts,      // optional string
    externalCustomerId,          // optional ID to search on first
  }) {
    const { baseURL, email, password } = strapi.config.get("plugin::strapi-plugin");
    console.log("⚙️ eSputnik config:", { baseURL, email: email?.replace(/.(?=.{2}@)/g, "*"), password: password && "••••••" });

    // 2) Build & log Basic auth header
    const raw = `${email}:${password}`;
    const auth = Buffer.from(raw).toString("base64");
    const client = axios.create({
      baseURL,
      headers: {
        Authorization: `Basic ${auth}`,
         Accept:        "application/json; charset=UTF-8",
        "Content-Type": "application/json",
      },
    });

    const payload = { contacts };
    if (dedupeOn) payload.dedupeOn = dedupeOn;
    if (customFieldsIDs) payload.customFieldsIDs = customFieldsIDs;
    if (groupNames) payload.groupNames = groupNames;
    if (groupNamesExclude) payload.groupNamesExclude = groupNamesExclude;
    if (restoreDeleted != null) payload.restoreDeleted = restoreDeleted;
    if (eventKeyForNewContacts) payload.eventKeyForNewContacts = eventKeyForNewContacts;
    if (externalCustomerId) payload.externalCustomerId = externalCustomerId;

    const { data } = await client.post("/api/v1/contacts/", payload);
    return data;
  },
});
