import { titleCase } from 'title-case';

interface StoryArguments {
  name: string;
  displayName: string;
  baseContentPath: string;
  contentPathName: string;
}

export default class StoryConfig {
  name: string;

  displayName: string;

  baseContentPath: string;

  contentPathName: string;

  constructor(args: StoryArguments) {
    this.name = args.name;
    this.displayName = args.displayName;
    this.baseContentPath = args.baseContentPath;
    this.contentPathName = args.contentPathName;
  }

  get contentPath() {
    return `${this.baseContentPath}/${this.contentPathName}`;
  }

  get contentPathIdentifier() {
    return `${this.name}ContentPath`;
  }

  get identifier() {
    return this.name;
  }

  get prettyName() {
    return `${titleCase(this.displayName)} Story`;
  }

  render() {
    return `
        const ${this.contentPathIdentifier} = "${this.contentPath}";
        export const ${this.identifier} = () => ({
            template: async () => fetchFromAEM(${this.contentPathIdentifier})
        });
        ${this.identifier}.story = {
            name: '${this.prettyName}',
            parameters: {
            }
        };
        `;
  }
}
