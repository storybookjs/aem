// todo: load automatically
// import Text from '../components/text/text.html';

export default class ComponentLoader {
  resolve(type) {
    if (type === 'wcm/components/text') {
      return null; // text used to be here but it would require pulling a
       // compenent into the app which I dont think we should be doing
    }
    return null;
  }
}
