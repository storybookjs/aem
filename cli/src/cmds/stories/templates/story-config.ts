import { titleCase } from 'title-case';

interface StoryArguments {
    name: string;
    contentPath: string;
}

export default class StoryConfig {
    name: string;
    contentPath: string;

    constructor(args: StoryArguments) {
        this.name = args.name;
        this.contentPath = args.contentPath;
    }

    get contentPathIdentifier() {
        return `${this.name}ContentPath`;
    }

    get identifier() {
        return this.name;
    }

    get prettyName() {
        return titleCase(this.name) + ' Story';
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
