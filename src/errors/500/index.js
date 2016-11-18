import angular from 'angular'

let internalErrorModule = angular.module('app.errors.500', []);

import InternalErrorConfig from './500.config';
internalErrorModule.config(InternalErrorConfig);

export default internalErrorModule;