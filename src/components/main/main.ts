import * as angular from 'angular'
import * as StoreSrvMod from '../../common/store'

export const ModuleName = 'toe.component.main'

class Main {
  private isMoveX: boolean = true

  static $inject = ['$scope', '$state', StoreSrvMod.SrvName]
  constructor(
    private $scope: angular.IScope,
    private $state: angular.ui.IStateService,
    private _storeSrv: StoreSrvMod.Store
  ) {
    this.$scope.$on('change_player', (ev, player) => {
      this.isMoveX = (player === 'x') ? true : false
    })
  }

  cancel() {
    this._storeSrv.userX = ''
    this._storeSrv.userO = ''
    this._storeSrv.isPlay = false
    this.$state.go('settings')
  }

}

const componentConfig: angular.IComponentOptions = {
  bindings: {},
  templateUrl: './components/main/main.html',
  controller: Main
}

export function addComponent(angular: angular.IAngularStatic): void {
  const module = angular.module(ModuleName, [])
  module.component('main', componentConfig)
}
