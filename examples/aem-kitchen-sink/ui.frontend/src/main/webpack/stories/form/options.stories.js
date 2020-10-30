import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Form/Options',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/form/options';

export const Checkbox = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/options.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "options"
    ],
    ":items": {
      "options": {
        "id": "form-options-1298895943",
        "title": "Venue Planning",
        "name": "venue-planning",
        "helpMessage": "We like to plan our events and prepare the meals in advance, please help us by choosing your preferences",
        "type": "CHECKBOX",
        "items": [{
            "text": "I attend alone",
            "disabled": false,
            "selected": false,
            "value": "alone"
          },
          {
            "text": "I attend with spouse",
            "disabled": false,
            "selected": false,
            "value": "spouse"
          },
          {
            "text": "I eat meat",
            "disabled": false,
            "selected": false,
            "value": "meat"
          },
          {
            "text": "I am vegetarian",
            "disabled": false,
            "selected": false,
            "value": "vet"
          },
          {
            "text": "Spouse is vegetarian",
            "disabled": false,
            "selected": false,
            "value": "spouse-veg"
          },
          {
            "text": "Spouse eats meat",
            "disabled": false,
            "selected": false,
            "value": "spouse-meat"
          }
        ],
        ":type": "core/wcm/components/form/options/v2/options"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});

export const RadioButton = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/options.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "options_1984141068"
    ],
    ":items": {
      "options_1984141068": {
        "id": "form-options-1927227506",
        "title": "Gender",
        "name": "gender",
        "type": "RADIO",
        "items": [{
            "text": "Female",
            "disabled": false,
            "selected": true,
            "value": "f"
          },
          {
            "text": "Male",
            "disabled": false,
            "selected": false,
            "value": "m"
          },
          {
            "text": "Other",
            "disabled": false,
            "selected": false,
            "value": "o"
          }
        ],
        ":type": "core/wcm/components/form/options/v2/options"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});

export const DropDown = () => ({
  content: {
    "method": "POST",
    "enctype": "multipart/form-data",
    "id": "new_form",
    "name": "new_form",
    "action": "/content/core-components-examples/library/form/options.html",
    "resourceTypeForDropArea": "wcm/foundation/components/responsivegrid/new",
    ":itemsOrder": [
      "options_1382774097"
    ],
    ":items": {
      "options_1382774097": {
        "id": "form-options-2043955932",
        "title": "Nationality",
        "name": "nationality",
        "type": "DROP_DOWN",
        "items": [{
            "text": "Swiss",
            "disabled": false,
            "selected": false,
            "value": "ch"
          },
          {
            "text": "American",
            "disabled": false,
            "selected": false,
            "value": "us"
          },
          {
            "text": "French",
            "disabled": false,
            "selected": false,
            "value": "fr"
          },
          {
            "text": "English",
            "disabled": false,
            "selected": false,
            "value": "gb"
          },
          {
            "text": "German",
            "disabled": false,
            "selected": false,
            "value": "ge"
          }
        ],
        ":type": "core/wcm/components/form/options/v2/options"
      }
    },
    ":type": "core-components-examples/components/form/container"
  },
  resourceType: resourceType,
});

export const MultiSelectDropDown = () => ({
  content: {
    "id": "form-options-464897793",
    "title": "Countries you've lived in",
    "name": "countries",
    "type": "MULTI_DROP_DOWN",
    "items": [{
        "text": "Switzerland",
        "disabled": false,
        "selected": false,
        "value": "ch"
      },
      {
        "text": "Germany",
        "disabled": false,
        "selected": false,
        "value": "ge"
      },
      {
        "text": "France",
        "disabled": false,
        "selected": false,
        "value": "fr"
      },
      {
        "text": "England",
        "disabled": false,
        "selected": false,
        "value": "en"
      }
    ],
    ":type": "core/wcm/components/form/options/v2/options"
  },
  resourceType: resourceType,
});