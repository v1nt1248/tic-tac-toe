import * as angular from 'angular'
import { $injector } from '@uirouter/angularjs'
import * as StoreSrvMod from './common/store'
import appModuleDependencies from './common/modules'
import route from './common/router'

const app = angular.module('toe', appModuleDependencies)

app.run(['$transitions', '$state', StoreSrvMod.SrvName, ($transitions, $state: angular.ui.IStateService, _storeSrv: StoreSrvMod.Store) => {
  $transitions.onStart({ to: 'game', from: '*'}, () => {
    if (!_storeSrv.isPlay) {
      $state.go('settings')
    }
  })
}])

app.config(['$stateProvider', '$urlRouterProvider', route])