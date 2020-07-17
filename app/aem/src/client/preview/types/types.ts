import { StoryFn } from '@storybook/addons';

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export interface DecorationTag {
  cssClasses?: string[];
  tagName?: string;
}

export interface AemMetadata {
  components?: any[];
  decorationTag?: DecorationTag;
  models: any;
  roots?: string[];
}

export interface RenderMainArgs {
  storyFn: () => StoryFn<StoryFnAemReturnType>;
  selectedKind: string;
  selectedStory: string;
  showMain: () => void;
  showError: (args: ShowErrorArgs) => void;
  forceRender: boolean;
}

export interface StoryFnAemReturnType {
  content?: any;
  resourceLoaderPath?: string;
  template?: any;
  wcmmode?: any;
  aemMetadata?: AemMetadata;
}
