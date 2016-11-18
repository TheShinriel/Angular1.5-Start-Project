import angular from 'angular';

// Create the module where our functionality can attach to
let directivesModule = angular.module('app.directives', []);

import ElipsisDirective from './elipsis.directive';
directivesModule.directive('elipsisDirective', () => new ElipsisDirective);

export default directivesModule;
