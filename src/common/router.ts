import * as StoreSrvMod from './store'

const route = ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void => {
  $urlRouterProvider
    .otherwise('/')

  $stateProvider
    .state('settings', {
      url: '/',
      template: `<settings></settings>`
    })
    .state('game', {
      url: '/game',
      template: `<game></game>`
    })
}

export default route
