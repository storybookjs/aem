const { resolve } = require('path');
import { GenericModel } from '@storybook/aem';

module.exports = {
    models: {
        'com.adobe.cq.wcm.core.components.models.Accordion': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Breadcrumb': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Button': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Carousel': GenericModel,
        'com.adobe.cq.wcm.core.components.models.contentfragment.ContentFragment': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Download': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Embed': GenericModel,
        'com.adobe.cq.wcm.core.components.models.forms.Button': GenericModel,
        'com.adobe.cq.wcm.core.components.models.forms.Container': GenericModel,
        'com.adobe.cq.wcm.core.components.models.forms.Options': GenericModel,
        'com.adobe.cq.wcm.core.components.models.forms.Text': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Image': GenericModel,
        'com.adobe.cq.wcm.core.components.models.LanguageNavigation': GenericModel,
        'com.adobe.cq.wcm.core.components.models.LayoutContainer': GenericModel,
        'com.adobe.cq.wcm.core.components.models.List': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Navigation': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Page': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Search': GenericModel,
        'com.adobe.cq.wcm.core.components.models.SocialMediaHelper': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Teaser': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Text': GenericModel,
        'com.adobe.cq.wcm.core.components.models.Title': GenericModel,
        'com.day.cq.wcm.foundation.AllowedComponentList': GenericModel,
        'com.day.cq.wcm.foundation.TemplatedContainer': GenericModel,
        'libs.granite.sightly.templates.ClientLibUseObject': GenericModel,
    },
    components: require('./components.js')
};