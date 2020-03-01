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
  cssClasses?: string [];
  tagName?: string;
}

export interface AemMetadata {
  componentIncludes?: any [];
  javascriptIncludes?: any [];
  styleIncludes?: any [];
  decorationTag?: DecorationTag;
}

export interface RenderMainArgs {
  storyFn: () => StoryFn<StoryFnHtmlReturnType>;
  selectedKind: string;
  selectedStory: string;
  showMain: () => void;
  showError: (args: ShowErrorArgs) => void;
  forceRender: boolean;
}

export interface StoryFnHtmlReturnType {
  content?: any;
  props?: any;
  resourceLoaderPath?: string;
  template?: any;
  wcmmode?: any;
  aemMetadata?: AemMetadata;
}