function InternalErrorConfig($stateProvider) {
    'ngInject';

    // Define the routes
    $stateProvider

        .state('app.500', {
        url: '/500',
        template: '<h1>Internal error</h1>',
        title: 'Internal error'
    });

};

export default InternalErrorConfig;
