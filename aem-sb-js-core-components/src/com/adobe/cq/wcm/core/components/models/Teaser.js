import { GenericModel } from '@storybook/aem';
import ListItem from './ListItem';

/**
 * Defines the {@code Teaser} Sling Model for the {@code /apps/core/wcm/components/teaser} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.4.0
 */
export default class Teaser extends GenericModel {
    /**
     * Name of the resource property that defines whether or not the teaser has Call-to-Action elements
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_ACTIONS_ENABLED = "actionsEnabled";

    /**
     * Name of the child node where the Call-to-Action elements are stored
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static NN_ACTIONS = "actions";

    /**
     * Name of the resource property that stores the Call-to-Action link
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_ACTION_LINK = "link";

    /**
     * Name of the resource property that stores the Call-to-Action text
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_ACTION_TEXT = "text";

    /**
     * Name of the policy property that defines whether or not Call-to-Actions are disabled
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_ACTIONS_DISABLED = "actionsDisabled";

    /**
     * Name of the policy property that defines whether or not the image link is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_IMAGE_LINK_HIDDEN = "imageLinkHidden";

    /**
     * Name of the policy property that defines whether or not the title is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_TITLE_HIDDEN = "titleHidden";

    /**
     * Name of the policy property that defines whether or not the pretitle is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.12.0
     */
    static PN_PRETITLE_HIDDEN = "pretitleHidden";

    /**
     * Name of the policy property that defines whether or not the title link is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_TITLE_LINK_HIDDEN = "titleLinkHidden";

    /**
     * Name of the resource property that defines whether or not the title value is taken from the linked page.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_TITLE_FROM_PAGE = "titleFromPage";

    /**
     * Name of the policy property that defines whether or not the description is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_DESCRIPTION_HIDDEN = "descriptionHidden";

    /**
     * Name of the resource property that defines whether or not the description value is taken from the linked page.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_DESCRIPTION_FROM_PAGE = "descriptionFromPage";

    /**
     * Name of the policy property that stores the value for this title's HTML element type.
     *
     * @see #getTitleType()
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    static PN_TITLE_TYPE = "titleType";

    /**
     * Checks if the teaser has Call-to-Action elements
     *
     * @return {@code true} if teaser has CTAs, {@code false} otherwise
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get actionsEnabled() {
        return this.content.actionsEnabled;
    }

    /**
     * Returns the list of Call-to-Action elements
     *
     * @return the list of CTAs
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get actions() {
        return this.content.actions.map((a) => new ListItem(a));
    }

    /**
     * Returns the URL to which this teaser links, if one was defined.
     *
     * @return the URL to which teaser links or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get linkURL() {
        return this.content.linkURL;
    }

    /**
     * Returns the image resource for this teaser.
     *
     * @return the image resource for this teaser or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get imageResource() {
        return this.content.imageResource;
    }

    /**
     * Checks if the link on the image is hidden.
     *
     * @return {@code true} if link is hidden on the image, {@code false} otherwise
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get imageLinkHidden() {
        return this.content.imageLinkHidden;
    }

    /**
     * Returns this teaser's pretitle, if one was defined.
     *
     * @return the teaser's pretitle or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.12.0
     */
    get pretitle() {
        return this.content.pretitle;
    }

    /**
     * Returns this teaser's title, if one was defined.
     *
     * @return the teaser's title or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get title() {
        return this.content.title;
    }

    /**
     * Checks if the link on the title is hidden.
     *
     * @return {@code true} if link is hidden on the title, {@code false} otherwise
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get titleLinkHidden() {
        return this.content.titleLinkHidden;
    }

    /**
     * Returns this teaser's description, if one was defined.
     *
     * @return the teaser's description or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get description() {
        return this.content.description;
    }

    /**
     * Returns the HTML element type (h1-h6) used for the title.
     *
     * @return the element type
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get titleType() {
        return this.content.titleType;
    }

    /**
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    get exportedType() {
        return 'core/wcm/components/teaser/v1/teaser';
    }

    /**
     * @todo: implement correctly ?
     */
    get data() {
        return {
            json: JSON.stringify(this.content.dataLayer || {}),
        }
    }
}
