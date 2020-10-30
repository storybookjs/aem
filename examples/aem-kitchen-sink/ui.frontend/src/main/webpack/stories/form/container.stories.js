import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Form/Container',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/form/container';

export const Standard = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/container.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "text",
      "text_854476329",
      "options",
      "hidden",
      "button"
    ],
    ":items": {
      "text": {
        "id": "form-text-1104835627",
        "title": "E-Mail",
        "name": "email",
        "value": "",
        "helpMessage": "E-Mail",
        "placeholder": "E-Mail",
        "type": "email",
        "readOnly": false,
        "required": false,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 2,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "text_854476329": {
        "id": "form-text-1788423476",
        "title": "Set Password",
        "name": "pw",
        "value": "",
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
      "options": {
        "id": "form-options-1655286956",
        "title": "Newsletter",
        "name": "newsletter",
        "type": "RADIO",
        "items": [{
            "text": "Do you want to get notified about News and Sales?",
            "disabled": false,
            "selected": true,
            "value": "true"
          },
          {
            "text": "No",
            "disabled": false,
            "selected": false,
            "value": "false"
          }
        ],
        ":type": "core/wcm/components/form/options/v2/options"
      },
      "hidden": {
        "id": "asset-url",
        "name": "Asset URl",
        "value": "/assets/marketing/q3/female/hiking",
        ":type": "core/wcm/components/form/hidden/v2/hidden"
      },
      "button": {
        "id": "form-button-1390778470",
        "title": "Register",
        "name": "register",
        "value": "",
        "type": "SUBMIT",
        ":type": "core/wcm/components/form/button/v2/button"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});