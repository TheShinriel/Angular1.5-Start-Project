function AccessDeniedConfig($stateProvider) {
    'ngInject';

    // Define the routes
    $stateProvider

        .state('app.403', {
        url: '/403',
        template: '<h1>Access Denied</h1>',
        title: 'Access Denied'
    });

};

export default AccessDeniedConfig;
