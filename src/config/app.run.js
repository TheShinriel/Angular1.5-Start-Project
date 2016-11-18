function AppRun(AppConstants, $state, $rootScope, $location) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setCurrentStateName (toState);
    $rootScope.setPageTitle(toState.title);
  });

  // When an error occured
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // do something
    $state.go('app.500');
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };

  // Handle nested view navigation (set active menu when childs is loaded)
  $rootScope.setCurrentStateName = (state) => {
    $rootScope.currentStateName = state.name;
  }

}

export default AppRun;
