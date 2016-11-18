function NotFoundConfig($stateProvider) {
    'ngInject';

    // Define the routes
    $stateProvider

        .state('app.404', {
        url: '/404',
        template: '<h1>Not Found</h1>',
        title: 'Not Found'
    });

};

export default NotFoundConfig;
