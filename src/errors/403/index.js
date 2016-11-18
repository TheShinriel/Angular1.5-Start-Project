import angular from 'angular'

let accessDeniedModule = angular.module('app.errors.403', []);

import AccessDeniedConfig from './403.config';
accessDeniedModule.config(AccessDeniedConfig);

export default accessDeniedModule;