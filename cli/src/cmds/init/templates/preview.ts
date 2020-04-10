export default () => `
import { addParameters, addDecorator } from '@storybook/client-api';
import { aemMetadata } from '@storybook/aem';
addDecorator(aemMetadata({
  components: [
  ],
  models: {
  }
}));
`
