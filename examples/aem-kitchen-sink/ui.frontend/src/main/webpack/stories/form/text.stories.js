import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Form/Text',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/form/text';

export const TextField = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/input.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "text",
      "text_141321348",
      "text_2015789815"
    ],
    ":items": {
      "text": {
        "id": "form-text-1673594539",
        "title": "Name",
        "name": "firstName",
        "value": "",
        "helpMessage": "First Name",
        "placeholder": "First Name",
        "type": "text",
        "readOnly": false,
        "required": false,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 2,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "text_141321348": {
        "id": "form-text-109625527",
        "title": "E-Mail",
        "name": "email",
        "value": "",
        "helpMessage": "E-Mail",
        "placeholder": "E-Mail",
        "type": "email",
        "readOnly": false,
        "required": true,
        "requiredMessage": "You need to add your email to log in",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "text_2015789815": {
        "id": "form-text-1264745934",
        "title": "Message",
        "name": "textarea",
        "value": "",
        "helpMessage": "Message",
        "placeholder": "Message",
        "type": "textarea",
        "readOnly": false,
        "required": false,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 2,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});

export const TextNumbers = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/input.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "text_217965579",
      "text_1768656118",
      "text_1361995724"
    ],
    ":items": {
      "text_217965579": {
        "id": "form-text-1190565094",
        "title": "Phone Number",
        "name": "phonenumber",
        "value": "",
        "helpMessage": "+44 87 299 777 22",
        "placeholder": "+44 87 299 777 22",
        "type": "tel",
        "readOnly": false,
        "required": false,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "text_1768656118": {
        "id": "form-text-1353586212",
        "title": "Date",
        "name": "date",
        "value": "",
        "helpMessage": "01.01.2020",
        "placeholder": "01.01.2020",
        "type": "date",
        "readOnly": false,
        "required": false,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "text_1361995724": {
        "id": "form-text-1834531460",
        "title": "Favorite number",
        "name": "favoritenumber",
        "value": "",
        "helpMessage": "",
        "type": "number",
        "readOnly": false,
        "required": false,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});

export const TextPassword = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/input.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "text_854476329",
      "text"
    ],
    ":items": {
      "text_854476329": {
        "id": "form-text-1283012419",
        "title": "Set Password",
        "name": "pw",
        "value": "12345",
        "helpMessage": "password",
        "placeholder": "password",
        "type": "password",
        "readOnly": false,
        "required": true,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "text": {
        "id": "form-text-1261613410",
        "title": "Confirm",
        "name": "confirmpw",
        "value": "",
        "helpMessage": "password",
        "placeholder": "password",
        "type": "password",
        "readOnly": false,
        "required": true,
        "requiredMessage": "It is required to insert password twice ",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});