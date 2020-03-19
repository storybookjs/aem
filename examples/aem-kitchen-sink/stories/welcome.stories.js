import './welcome.css';
import welcome from './welcome.html';

export default {
  title: 'Welcome',
};

export const Welcome = async () => {
  return {
    template: await welcome
  }
}
