export default {
  "/apps/core/wcm/components/accordion/v1/accordion/accordion.html": {
    "filepath": "jcr_root/apps/core/wcm/components/accordion/v1/accordion/accordion.html",
    "htl": "<div data-sly-use.accordion=\"com.adobe.cq.wcm.core.components.models.Accordion\" class=\"cmp-accordion\" data-cmp-is=\"accordion\" data-cmp-single-expansion=\"${accordion.singleExpansion}\"><div data-sly-test=\"${accordion.items.size > 0}\" data-sly-repeat.item=\"${accordion.items}\" class=\"cmp-accordion__item\" data-cmp-hook-accordion=\"item\" data-cmp-expanded=\"${item.name in accordion.expandedItems}\"><h3 data-sly-element=\"${accordion.headingElement @ context='elementName'}\" class=\"cmp-accordion__header\"><button class=\"cmp-accordion__button${item.name in accordion.expandedItems ? ' cmp-accordion__button--expanded' : ''}\" data-cmp-hook-accordion=\"button\"><span class=\"cmp-accordion__title\">${item.title}</span> <span class=\"cmp-accordion__icon\"></span></button></h3><div data-sly-resource=\"${item.name @ decorationTagName='div'}\" data-cmp-hook-accordion=\"panel\" class=\"cmp-accordion__panel${item.name in accordion.expandedItems ? ' cmp-accordion__panel--expanded' : ' cmp-accordion__panel--hidden'}\" role=\"region\"></div></div><sly data-sly-resource=\"${resource.path @ resourceType='wcm/foundation/components/parsys/newpar', appendPath='/*', decorationTagName='div', cssClassName='new section aem-Grid-newComponent'}\" data-sly-test=\"${(wcmmode.edit || wcmmode.preview) && accordion.items.size < 1}\"></sly></div>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  },
  "/apps/core/wcm/components/commons/v1/templates.html": {
    "filepath": "jcr_root/apps/core/wcm/components/commons/v1/templates.html",
    "htl": "<sly data-sly-template.placeholder=\"${@ isEmpty, classAppend, emptyTextAppend}\"><div data-sly-test=\"${(wcmmode.edit || wcmmode.preview) && isEmpty}\" class=\"cq-placeholder ${classAppend}\" data-emptytext=\"${component.properties.jcr:title}${emptyTextAppend && ' - '}${emptyTextAppend}\"></div></sly>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  },
  "/apps/core/wcm/components/list/v2/list/item.html": {
    "filepath": "jcr_root/apps/core/wcm/components/list/v2/list/item.html",
    "htl": "<template data-sly-template.item=\"${@ list, item}\"><article><a class=\"cmp-list__item-link\" href=\"${item.URL}\" data-sly-unwrap=\"${!list.linkItems}\"><span class=\"cmp-list__item-title\">${item.title}</span> <span data-sly-test=\"${list.showModificationDate}\" class=\"cmp-list__item-date\">${list.dateFormatString @format=item.lastModified}</span> </a><span data-sly-test=\"${list.showDescription}\" class=\"cmp-list__item-description\">${item.description}</span></article></template>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  },
  "/apps/core/wcm/components/list/v2/list/list.html": {
    "filepath": "jcr_root/apps/core/wcm/components/list/v2/list/list.html",
    "htl": "<ul data-sly-use.list=\"com.adobe.cq.wcm.core.components.models.List\" data-sly-list.item=\"${list.listItems}\" data-sly-use.template=\"../../../../../../core/wcm/components/commons/v1/templates.html\" data-sly-use.itemtemplate=\"item.html\" class=\"cmp-list\"><li class=\"cmp-list__item\" data-sly-call=\"${itemTemplate.item @ list = list, item = item}\"></li></ul><sly data-sly-call=\"${template.placeholder @ isEmpty=list.listItems.size == 0, classAppend='cmp-list'}\"></sly>",
    "css": "",
    "js": "",
    "referencedFiles": [
      "../../../../../../core/wcm/components/commons/v1/templates.html",
      "item.html"
    ],
    "useModels": [],
    "modelSchema": {}
  },
  "/apps/core/wcm/components/text/v2/text/text.html": {
    "filepath": "jcr_root/apps/core/wcm/components/text/v2/text/text.html",
    "htl": "<div data-sly-use.textmodel=\"com.adobe.cq.wcm.core.components.models.Text\" data-sly-use.templates=\"../../../../../../core/wcm/components/commons/v1/templates.html\" data-sly-test.text=\"${textModel.text}\" class=\"cmp-text\"><p class=\"cmp-text__paragraph\" data-sly-unwrap=\"${textModel.isRichText}\">${text @ context = textModel.isRichText ? 'html' : 'text'}</p></div><sly data-sly-call=\"${templates.placeholder @ isEmpty = !text, classAppend='cmp-text'}\"></sly>",
    "css": "",
    "js": "",
    "referencedFiles": [
      "../../../../../../core/wcm/components/commons/v1/templates.html"
    ],
    "useModels": [],
    "modelSchema": {}
  }
};