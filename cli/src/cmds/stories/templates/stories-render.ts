import ImportConfig from './import-config';

export default (({ imports, storyRoot, componentName, cssClasses, tagName, stories, onlyAppendNewStories } : {
    imports: Array<ImportConfig>,
    storyRoot: string,
    componentName: string,
    cssClasses,
    tagName: string,
    stories,
    onlyAppendNewStories: boolean
}) => `
${ ! onlyAppendNewStories ? `
/**
 * Storybook stories for the carousel component
 */

  ${ imports.map(importConfig => importConfig.render()).join('\n') }

  export default {
      title: '${storyRoot ? storyRoot + '/' : ''}${componentName}',
      decorators: [
          aemMetadata({
              decorationTag: {
                  cssClasses: [ ${
                    cssClasses.map(cssClass => cssClass.wrap ? `'${cssClass.text}'` : cssClass.text ).join(',')
                  } ],
                  tagName: '${ tagName }'
              }
          })
      ],
  };
` : '' }

${stories.map(story => story.render()).join('\n\n')}
`);
