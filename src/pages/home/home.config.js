function HomeConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.home', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'pages/home/home.html',
                }
            },
            title: 'Home'
        })
};

export default HomeConfig;
