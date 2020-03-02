import MyList from './list.html';

export default {
  title: 'List'
};

export const List = () => {
  return {
    props: {
      'jcr:title': 'List (v2)'
    },
    template: MyList
  };
};
