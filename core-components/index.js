const { GenericModel } = require('@storybook/aem');
const { resolve } = require('path');

module.exports = {
  models: {
    'com.adobe.cq.wcm.core.components.models.Accordion': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Breadcrumb': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Button': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Carousel': GenericModel,
    'com.adobe.cq.wcm.core.components.models.contentfragment.ContentFragment': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Download': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Embed': GenericModel,
    'com.adobe.cq.wcm.core.components.models.ExperienceFragment': GenericModel,
    'com.adobe.cq.wcm.core.components.models.form.Button': GenericModel,
    'com.adobe.cq.wcm.core.components.models.form.Container': GenericModel,
    'com.adobe.cq.wcm.core.components.models.form.Hidden': GenericModel,
    'com.adobe.cq.wcm.core.components.models.form.Options': GenericModel,
    'com.adobe.cq.wcm.core.components.models.form.Text': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Image': GenericModel,
    'com.adobe.cq.wcm.core.components.models.LanguageNavigation': GenericModel,
    'com.adobe.cq.wcm.core.components.models.LayoutContainer': GenericModel,
    'com.adobe.cq.wcm.core.components.models.List': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Navigation': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Page': GenericModel,
    'com.adobe.cq.wcm.core.components.models.PdfViewer': GenericModel,
    'com.adobe.cq.wcm.core.components.models.ProgressBar': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Search': GenericModel,
    'com.adobe.cq.wcm.core.components.models.SocialMediaHelper': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Tabs': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Teaser': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Text': GenericModel,
    'com.adobe.cq.wcm.core.components.models.Title': GenericModel,
    'com.day.cq.wcm.foundation.AllowedComponentList': GenericModel,
    'com.day.cq.wcm.foundation.TemplatedContainer': GenericModel,
    'com.day.cq.wcm.foundation.model.responsivegrid.ResponsiveGrid': GenericModel,
    'libs.granite.sightly.templates.ClientLibUseObject': GenericModel,
  },
  components: require('./components.js'),
  includes: {
    'core/wcm/components/commons/v1/templates.html': require('./apps/core/wcm/components/commons/v1/templates.html'),
  }
};