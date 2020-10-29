import { addParameters, addDecorator } from '@storybook/client-api';
import { withA11y } from '@storybook/addon-a11y';
import { aemMetadata, GenericModel } from '@storybook/aem';
import {
    components as CoreComponents,
    models as CoreModels,
    includes as CoreIncludes
} from '@storybook/aem-core-components';

addDecorator(withA11y);
addDecorator(aemMetadata({
    components: [
        require('../components/accordion/.content.xml'),
        require('../components/list/.content.xml'),
        require('../components/text/.content.xml'),
        require('../components/aemtext/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/accordion/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/breadcrumb/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/button/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/carousel/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/container/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/contentfragment/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/contentfragmentlist/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/download/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/embed/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/experiencefragment/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/form/button/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/form/container/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/form/hidden/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/form/options/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/form/text/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/image/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/languagenavigation/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/list/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/navigation/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/page/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/pdfviewer/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/progressbar/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/search/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/separator/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/sharing/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/spa/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/tabs/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/teaser/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/text/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/title/.content.xml'),
        require('../ui.apps/src/main/content/jcr_root/apps/storybook/components/xfpage/.content.xml'),
        ...CoreComponents,
        // ...require('./dependencies').components,
    ],
    models: {
        'Accordion': GenericModel,
        'Text': GenericModel,
        'List': GenericModel,
        'person': require('../models/person'),
        ...CoreModels
    },
    // todo: the includes could be automatically detected during compilation using the script resolver
    includes: {
        ...CoreIncludes,
        // 'components/accordion/item.htl': require('../components/accordion/item.htl'),
        // 'components/include/item.htl': require('../components/include/item.htl'),
    }
}));

addParameters({
    a11y: {
        config: {},
        options: {
            checks: { 'color-contrast': { options: { noScroll: true } } },
            restoreScroll: true,
        },
    },
    options: {
        showRoots: true,
    },
    docs: {
        iframeHeight: '200px',
    },
});