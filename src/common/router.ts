const route = ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void => {
  $urlRouterProvider
    .otherwise('/')

  $stateProvider
    .state('root', {
      url: '/',
      template: `<h1>HELLO!</h1>`
    })
}

export default route
