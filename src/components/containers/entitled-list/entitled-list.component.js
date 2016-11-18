class EntitledListCtrl {
    constructor() {
        'ngInject';
    }
}

let EntitledList = {
    controller: EntitledListCtrl,
    templateUrl: 'components/containers/entitled-list/entitled-list.html',
    bindings: {
        title: '@',
        items: '=',
        itemName: '@',
        itemLink: '@'
    }
};

export default EntitledList;
