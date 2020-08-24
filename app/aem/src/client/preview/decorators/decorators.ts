/* eslint-disable no-param-reassign */
import { AemMetadata } from '../types/types';

export const aemMetadata = (metadata: Partial<AemMetadata>) => async (storyFn: () => any) => {
  const story = await storyFn();
  const storyMetadata = story.aemMetadata || {};
  metadata = metadata || {};

  return {
    ...story,
    aemMetadata: {
      components: [...(metadata.components || []), ...(storyMetadata.components || [])],
      decorationTag: metadata.decorationTag || storyMetadata.decorationTag || {},
      models: metadata.models || storyMetadata.models || {},
      roots: metadata.roots || storyMetadata.roots || [],
      includes: metadata.includes || storyMetadata.includes || {},
    },
  };
};
