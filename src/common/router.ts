const route = ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void => {
  $urlRouterProvider
    .otherwise('/')

  $stateProvider
    .state('settings', {
      url: '/',
      template: `<settings></settings>`
    })
}

export default route
