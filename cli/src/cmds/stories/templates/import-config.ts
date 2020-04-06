interface ImportArguments {
    defaultIdentifier?: string;
    identifiers?: Array<string>;
    moduleName: string;
}

export default class ImportConfig {
    defaultIdentifier: string|undefined;
    identifiers: Array<string>|undefined;
    moduleName: string;

    constructor(args: ImportArguments) {
        this.defaultIdentifier = args.defaultIdentifier;
        this.identifiers = args.identifiers;
        this.moduleName = args.moduleName;
    }

    get isDefaultOnly() {
        return this.defaultIdentifier && ! this.identifiers;
    }

    get hasDefaultAndOthers() {
        return this.defaultIdentifier && this.identifiers;
    }

    render() {
        if (this.isDefaultOnly) {
            return `import ${ this.defaultIdentifier } from '${this.moduleName}';`;
        } else if (this.hasDefaultAndOthers) {
            return `import ${ this.defaultIdentifier }, { ${ this.identifiers.join(', ') } } from '${this.moduleName}';`;
        } else {
            return `import { ${ this.identifiers.join(', ') } } from '${this.moduleName}';`;
        }
    }
}

export const IMPORT_AEM_METADATA = new ImportConfig({
    identifiers: [ 'aemMetadata' ],
    moduleName: '@storybook/aem'
});

export const IMPORT_FETCH_FROM_AEM = new ImportConfig({
    identifiers: [ 'fetchFromAEM' ],
    moduleName: 'storybook-aem-wrappers'
});

export const IMPORT_GRID = new ImportConfig({
    identifiers: [ 'Grid' ],
    moduleName: 'storybook-aem-grid'
});

export const IMPORT_AEM_STYLE_SYSTEM = new ImportConfig({
    identifiers: [ 'StyleSystem' ],
    moduleName: 'storybook-aem-style-system'
});
