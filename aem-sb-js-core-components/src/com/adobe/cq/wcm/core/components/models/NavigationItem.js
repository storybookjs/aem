import PageListItem from './PageListItem';

/**
 * Interface for a single navigation item, used by the {@link Breadcrumb} and {@link Navigation} models.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class NavigationItem extends PageListItem {

    constructor(content, active, level, children) {
        super(content);
        this._active = active;
        this._level = level;
        this._children = children;
    }

    /**
     * Returns {@code true} if the page contained by this navigation item is active.
     *
     * @return {@code true} if it is the current page, otherwise {@code false}
     * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
     */
    get active() {
        return this._active;
    }

    /**
     * Returns the children of this {@code NavigationItem}, if any.
     *
     * @return the children of this {@code NavigationItem}; if this {@code NavigationItem} doesn't have any children, the returned
     * {@link java.util.List} will be empty
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    get children() {
        return this._children;
    }

    /**
     * Returns the depth level of this {@code NavigationItem}.
     *
     * @return the depth level
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    get level() {
        return this._level;
    }

    get data() {
        // todo: implement correctly
        return {
            json: {},
        }
    }
}
