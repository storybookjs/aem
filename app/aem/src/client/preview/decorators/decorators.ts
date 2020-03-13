/* eslint-disable no-param-reassign */
import { AemMetadata } from '../types/types';

export const aemMetadata = (metadata: Partial<AemMetadata>) => (storyFn: () => any) => {
  const story = storyFn();
  const storyMetadata = story.aemMetadata || {};
  metadata = metadata || {};

  return {
    ...story,
    aemMetadata: {
      components: [...(metadata.components || []), ...(storyMetadata.components || [])],
      decorationTag: metadata.decorationTag || storyMetadata.decorationTag || {},
      models: metadata.models || storyMetadata.models || {},
    },
  };
};
