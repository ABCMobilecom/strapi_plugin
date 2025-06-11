import React from 'react';
import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main style={{ fontSize: '2em' }}>
      {/* Plugin title */}
      <h1>
        {formatMessage({ id: getTranslation('plugin.name') })} API Documentation
      </h1>

      {/* 1. Base URL */}
      <h2>1. Base URL</h2>
      <p>All endpoints are exposed under your Strapi host at:</p>
      <pre>
        <code>
          https://{'<'}your-host{'>'}/api/strapi-esputnik-plugin
        </code>
      </pre>
      <p>
        <em>
          No authentication is required on these routes (unless you add policies).
        </em>
      </p>
      <hr />

      {/* 2. Endpoints */}
      <h2>2. Endpoints</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>/contact/subscribe</td>
            <td>POST</td>
            <td>Create or update a single contact, triggering subscribe workflows.</td>
          </tr>
          <tr>
            <td>/contacts</td>
            <td>POST</td>
            <td>Bulk-add/update up to 3,000 contacts (async import).</td>
          </tr>
        </tbody>
      </table>
      <hr />

      {/* 3. POST /contact/subscribe */}
      <h2>3. <code>POST /api/strapi-esputnik-plugin/contact/subscribe</code></h2>
      <h3>Description</h3>
      <p>
        Adds or updates one contact with <strong>unconfirmed</strong> email and/or phone,
        then emits a <code>subscribeFromApi</code> or <code>subscribeUpdateFromApi</code> event
        (plus optional <code>-&lt;formType&gt;</code> suffix).
      </p>
      <h3>Request Body</h3>
      <pre>
        <code>{`{
  "contact": {
    "channels": [
      { "type": "email", "value": "mail@example.com" },
      { "type": "sms", "value": "+380942583691" }
    ],
    "firstName": "John",
    "lastName": "Smith",
    "address": {
      "town": "London",
      "region": "West",
      "address": "First str. 1",
      "postcode": "12345"
    },
    "fields": [ { "id": "12345", "value": "…" } ]
  },
  "groups": ["Subscribers"],    // optional
  "formType": "abc"             // optional, suffix for event key
}`}</code>
      </pre>
      <h3>Response</h3>
      <pre>
        <code>{`{
  "ContactId": 123456,
  "EmailAddress": "mail@example.com",
  "Result": "OK"
}`}</code>
      </pre>
      <hr />

      {/* 4. POST /contacts */}
      <h2>4. <code>POST /api/strapi-esputnik-plugin/contacts</code></h2>
      <h3>Description</h3>
      <p>
        Synchronously import or update up to 3,000 contacts with <strong>confirmed</strong> emails,
        returning an <code>asyncSessionId</code> to poll import status.
      </p>
      <h3>Request Body</h3>
      <pre>
        <code>{`{
  "contacts": [
    {
      "channels": [
        { "type": "email", "value": "mail@example.com" },
        { "type": "sms",   "value": "+380942583691" }
      ],
      "firstName": "John",
      "lastName":  "Smith",
      "address": {
        "town":     "London",
        "region":   "West",
        "address":  "First str. 1",
        "postcode": "12345"
      },
      "fields": [
        { "id": 12345, "value": "…" }
      ]
    }
  ],
  "dedupeOn":               "email",            // optional: "email" or "phone"
  "customFieldsIDs":        [12345],            // optional
  "groupNames":             ["Customers"],      // optional to ADD
  "groupNamesExclude":      ["Subscribers"],    // optional to REMOVE
  "restoreDeleted":         false,              // optional
  "eventKeyForNewContacts": "newContact",       // optional
  "externalCustomerId":     "my-crm-id-123"     // optional
}`}</code>
      </pre>
      <h3>Response</h3>
      <pre>
        <code>{`{
  "asyncSessionId": "abcdef123456",
  "imported": 100,
  "failedContacts": []
}`}</code>
      </pre>
      <hr />

      {/* 5. Usage Examples */}
      <h2>5. Usage Examples</h2>

      <h3>Single-contact subscribe</h3>
      <pre>
        <code>{`curl -X POST https://localhost:1337/api/strapi-esputnik-plugin/contact/subscribe \\
  -H "Content-Type: application/json" \\
  -d '{
        "contact": { "channels":[{"type":"email","value":"mail@example.com"}], "firstName":"John" },
        "groups": ["Subscribers"],
        "formType":"abc"
      }'`}</code>
      </pre>

      <h3>Bulk import</h3>
      <pre>
        <code>{`curl -X POST https://localhost:1337/api/strapi-esputnik-plugin/contacts \\
  -H "Content-Type: application/json" \\
  -d '{
        "contacts":[{ "channels":[{"type":"email","value":"mail@example.com"}] }],
        "dedupeOn":"email"
      }'`}</code>
      </pre>
    </Main>
  );
};

export { HomePage };
