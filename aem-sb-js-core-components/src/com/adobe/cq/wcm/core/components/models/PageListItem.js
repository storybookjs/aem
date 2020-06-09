import ListItem from './ListItem';

export default class PageListItemImpl extends ListItem {
    constructor(content) {
        super(content);
        // todo:
        //   this.page = page;
        //   Page redirectTarget = getRedirectTarget(page);
        //   if (redirectTarget != null && !redirectTarget.equals(page)) {
        //       this.page = redirectTarget;
        //   }
    }

    get URL() {
        // todo:
        //   String vanityURL = page.getVanityUrl();
        //   return StringUtils.isEmpty(vanityURL) ? (request.getContextPath() + page.getPath() + ".html"): (request.getContextPath() + vanityURL);
        return `${this.path}.html`;
    }

    get title() {
        return this.content.navTitle || this.content.pageTitle || super.title;
    }

    get description() {
        // todo:
        // return page.getDescription();
        return super.description;
    }

    get lastModified() {
        // todo:
        // return page.getLastModified();
        return super.lastModified;
    }

    get path() {
        // todo:
        // return page.getPath();
        return super.path;
    }

    get name() {
        // todo:
        // return page.getName();
        return super.name;
    }
}
