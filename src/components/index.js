import angular from 'angular';

// Create the module where our functionality can attach to
let componentsModule = angular.module('app.components', []);

// Components - Containers
import EntitledList from './containers/entitled-list/entitled-list.component';
componentsModule.component('entitledList', EntitledList);

// Export
export default componentsModule;
