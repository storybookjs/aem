// todo: load automatically
import Text from '../components/text/text.html';

export default class ComponentLoader {
  resolve(type) {
    if (type === 'wcm/components/text') {
      return Text;
    }
    return  null;
  }
}
