import PanelContainerItem from './PanelContainerItem';
import Container from './Container';

export default class PanelContainer extends Container {
    /**
     * @protected
     */
    readItems() {
        // todo: the models should either be based on JCR content or content.json.
        // todo: eg, the accordion is using the content.json
        const items = Object.entries(this.content)
          .filter(([key, value]) => (typeof value === 'object'))
          .map(([key, value]) => {
              return new PanelContainerItem({
                  ':name': key,
                  ':type': value['sling:resourceType'],
                  ...value
              })
          });
        // hack to provide a size property of the expected java collection.
        items.size = items.length;
        return items;
    }
}
