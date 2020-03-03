/* eslint-disable no-param-reassign */
import { AemMetadata } from '../types/types';

export const aemMetadata = (metadata: Partial<AemMetadata>) => (storyFn: () => any) => {
  const story = storyFn();
  const storyMetadata = story.aemMetadata || {};
  metadata = metadata || {};

  return {
    ...story,
    aemMetadata: {
      componentIncludes: [...(metadata.componentIncludes || []), ...(storyMetadata.componentIncludes || [])],
      javascriptIncludes: [...(metadata.javascriptIncludes || []), ...(storyMetadata.javascriptIncludes || [])],
      styleIncludes: [...(metadata.styleIncludes || []), ...(storyMetadata.styleIncludes || [])],
      decorationTag: metadata.decorationTag || storyMetadata.decorationTag || {},
    },
  };
};
