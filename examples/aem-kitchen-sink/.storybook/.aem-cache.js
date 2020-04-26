export default {
  "components/accordion/accordion.html": {
    "filepath": "components/accordion/accordion.html",
    "htl": "<div data-sly-use.accordion=\"Accordion\" class=\"cmp-accordion\" data-cmp-is=\"accordion\" data-cmp-single-expansion=\"${accordion.singleExpansion}\"><div data-sly-test=\"${accordion.items.size > 0}\" data-sly-repeat.item=\"${accordion.items}\" class=\"cmp-accordion__item\" data-cmp-hook-accordion=\"item\" data-cmp-expanded=\"${item.name in accordion.expandedItems}\"><h3 data-sly-element=\"${accordion.headingElement @ context='elementName'}\" class=\"cmp-accordion__header\"><button class=\"cmp-accordion__button${item.name in accordion.expandedItems ? ' cmp-accordion__button--expanded' : ''}\" data-cmp-hook-accordion=\"button\"><span class=\"cmp-accordion__title\">${item.title}</span> <span class=\"cmp-accordion__icon\"></span></button></h3><div data-sly-resource=\"${item.name @ decorationTagName='div'}\" data-cmp-hook-accordion=\"panel\" class=\"cmp-accordion__panel${item.name in accordion.expandedItems ? ' cmp-accordion__panel--expanded' : ' cmp-accordion__panel--hidden'}\" role=\"region\"></div></div><sly data-sly-resource=\"${resource.path @ resourceType='wcm/foundation/components/parsys/newpar', appendPath='/*', decorationTagName='div', cssClassName='new section aem-Grid-newComponent'}\" data-sly-test=\"${(wcmmode.edit || wcmmode.preview) && accordion.items.size < 1}\"></sly></div><script>setTimeout(() => {\n        const button = document.querySelector('.cmp-accordion__button')\n        button.click();\n    }, 50);</script>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  },
  "components/list/item.html": {
    "filepath": "components/list/item.html",
    "htl": "<template data-sly-template.item=\"${@ list, item}\"><article><a class=\"cmp-list__item-link\" href=\"${item.URL}\" data-sly-unwrap=\"${!list.linkItems}\"><span class=\"cmp-list__item-title\">${item.title}</span> <span data-sly-test=\"${list.showModificationDate}\" class=\"cmp-list__item-date\">${list.dateFormatString @format=item.lastModified}</span> </a><span data-sly-test=\"${list.showDescription}\" class=\"cmp-list__item-description\">${item.description}</span></article></template>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  },
  "components/list/list.html": {
    "filepath": "components/list/list.html",
    "htl": "<ul data-sly-use.list=\"List\" data-sly-list.item=\"${list.items}\" data-sly-use.itemtemplate=\"item.html\" class=\"cmp-list\"><li class=\"cmp-list__item\" data-sly-call=\"${itemTemplate.item @ list = list, item = item}\"></li></ul>",
    "css": "",
    "js": "",
    "referencedFiles": [
      "item.html"
    ],
    "useModels": [],
    "modelSchema": {}
  },
  "components/person/person.html": {
    "filepath": "components/person/person.html",
    "htl": "<div data-sly-use.personmodel=\"person\"><dl><dt>First Name:</dt><dd>${personModel.firstName}</dd><dt>Last Name:</dt><dd>${personModel.lastName}</dd><dt>Full Name:</dt><dd>${personModel.fullName}</dd></dl></div>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  },
  "components/text/text.html": {
    "filepath": "components/text/text.html",
    "htl": "<div data-sly-use.textmodel=\"Text\" data-sly-test.text=\"${textModel.text}\" class=\"cmp-text\"><p class=\"cmp-text__paragraph\" data-sly-unwrap=\"${textModel.isRichText}\">${text @ context = textModel.isRichText ? 'html' : 'text'}</p></div>",
    "css": "",
    "js": "",
    "referencedFiles": [],
    "useModels": [],
    "modelSchema": {}
  }
};