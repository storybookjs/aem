import { aemMetadata } from '@storybook/aem';
import HideCurrentPageJSON from './HideCurrentPage.json';
import NavigationStartLevelJSON from './NavigationStartLevel.json';
import ShowHiddenNavigationItemsJSON from './ShowHiddenNavigationItems.json';
import StandardJSON from './Standard.json';



export default {
  title: 'Core Components/Breadcrumb',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/breadcrumb';

export const Standard = () => ({
  content: StandardJSON,
  resourceType: resourceType,
});

export const NavigationStartLevel = () => ({
  content: NavigationStartLevelJSON,
  resourceType: resourceType,
});

export const ShowHiddenNavigationItems = () => ({
  content: ShowHiddenNavigationItemsJSON,
  resourceType: resourceType,
});

export const HideCurrentPage = () => ({
  content: HideCurrentPageJSON,
  resourceType: resourceType,
});