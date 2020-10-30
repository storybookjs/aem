import { aemMetadata } from '@storybook/aem';
import ImageSlidesJSON from './ImageSlides.json';
import TeaserSlidesJSON from './TeaserSlides.json';
import AutomaticTransitioningJSON from './AutomaticTransitioning.json';
import AutoPauseOnHoverDisabledJSON from './AutoPauseOnHoverDisabled.json';

export default {
  title: 'Core Components/Carousel',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/carousel';

export const ImageSlides = () => ({
  content: ImageSlidesJSON,
  resourceType: resourceType,
});

export const TeaserSlides = () => ({
  content: TeaserSlidesJSON,
  resourceType: resourceType,
});

export const AutomaticTransitioning = () => ({
  content: AutomaticTransitioningJSON,
  resourceType: resourceType,
});

export const AutoPauseOnHoverDisabled = () => ({
  content: AutoPauseOnHoverDisabledJSON,
  resourceType: resourceType,
});