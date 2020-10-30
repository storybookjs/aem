import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Form/Button',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/form/button';

export const Button = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/button.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "options",
      "button"
    ],
    ":items": {
      "options": {
        "id": "form-options-1195599839",
        "title": "How satisfied were you with our service?",
        "name": "satisfaction",
        "type": "RADIO",
        "items": [{
            "text": "Super Satisfied",
            "disabled": false,
            "selected": false,
            "value": "ss"
          },
          {
            "text": "Satisfied",
            "disabled": false,
            "selected": false,
            "value": "s"
          },
          {
            "text": "Ok",
            "disabled": false,
            "selected": false,
            "value": "o"
          },
          {
            "text": "Not Completely Satisfied",
            "disabled": false,
            "selected": false,
            "value": "ncs"
          },
          {
            "text": "Not Satisfied",
            "disabled": false,
            "selected": false,
            "value": "ns"
          }
        ],
        ":type": "core/wcm/components/form/options/v2/options"
      },
      "button": {
        "id": "form-button-1117902125",
        "title": "Send",
        "name": "button",
        "value": "",
        "type": "BUTTON",
        ":type": "core/wcm/components/form/button/v2/button"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});

export const SubmitButton = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/button.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "text",
      "text_141321348",
      "button"
    ],
    ":items": {
      "text": {
        "id": "form-text-1965530981",
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
        "id": "form-text-146487537",
        "title": "E-Mail",
        "name": "email",
        "value": "",
        "helpMessage": "E-Mail",
        "placeholder": "E-Mail",
        "type": "email",
        "readOnly": false,
        "required": true,
        "requiredMessage": "",
        "constraintMessage": "",
        "rows": 1,
        "defaultValue": "",
        ":type": "core-components-examples/components/form/text"
      },
      "button": {
        "id": "form-button-409674464",
        "title": "Submit",
        "name": "submit-demo-form-1",
        "value": "",
        "type": "SUBMIT",
        ":type": "core/wcm/components/form/button/v2/button"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});