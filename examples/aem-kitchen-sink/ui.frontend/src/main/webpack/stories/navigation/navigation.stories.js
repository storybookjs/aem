import { aemMetadata } from '@storybook/aem';
import NavigationStructureDepthJSON from './NavigationStructureDepth.json';
import ShowNavigationRootJSON from './ShowNavigationRoot.json';
import SkipMultipleLevelsJSON from './SkipMultipleLevels.json';
import StandardJSON from './Standard.json';

export default {
  title: 'Core Components/Navigation',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/navigation';

export const Standard = () => ({
  content: StandardJSON,
  resourceType: resourceType,
});

export const ShowNavigationRoot = () => ({
  content: ShowNavigationRootJSON,
  resourceType: resourceType,
});

export const SkipMultipleLevels = () => ({
  content: SkipMultipleLevelsJSON,
  resourceType: resourceType,
});

export const NavigationStructureDepth = () => ({
  content: NavigationStructureDepthJSON,
  resourceType: resourceType,
});