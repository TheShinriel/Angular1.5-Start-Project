import angular from 'angular'

let notFoundModule = angular.module('app.errors.404', []);

import NotFoundConfig from './404.config';
notFoundModule.config(NotFoundConfig);

export default notFoundModule;
