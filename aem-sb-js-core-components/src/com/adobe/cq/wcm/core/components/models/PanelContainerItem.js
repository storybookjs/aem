import ListItem from './ListItem';

export default class PanelContainerItem extends ListItem {

    static PN_PANEL_TITLE = "cq:panelTitle";

    get title() {
        return this.content[PanelContainerItem.PN_PANEL_TITLE]
          || this.content['jcr:title']
          || super.title;
    }

    /**
     * @todo: implement correctly ?
     */
    get data() {
        return {
            json: '',
        }
    }
}
