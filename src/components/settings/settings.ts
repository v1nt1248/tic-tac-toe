import * as angular from 'angular'
import * as StoreMod from '../../common/store'

export const ModuleName = 'toe.component.settings'

interface SetScope extends angular.IScope {
  settings: {
    userX: angular.IFormController,
    userO: angular.IFormController,
    dimX: angular.IFormController,
    dimY: angular.IFormController
  }
}

class Settings {
  private userX: string
  private userO: string
  private dim: {
    x: number,
    y: number
  }

  static $inject = ['$scope', '$state', '$timeout', StoreMod.SrvName]
  constructor(
    private $scope: SetScope,
    private $state: angular.ui.IStateService,
    private $timeout: angular.ITimeoutService,
    private _storeSrv: StoreMod.Store
  ) {
    this._storeSrv.isPlay = false
    this.userX = this._storeSrv.userX
    this.userO = this._storeSrv.userO
    this.dim = this._storeSrv.dimentions
  }

  startGame() {
    this._storeSrv.userX = this.userX
    this._storeSrv.userO = this.userO
    this._storeSrv.dimentions = angular.copy(this.dim)
    this._storeSrv.isPlay = true
    this.$state.go('game')
  }

}

const componentConfig: angular.IComponentOptions = {
  bindings: {},
  templateUrl: './components/settings/settings.html',
  controller: Settings
}

export function addComponent(angular: angular.IAngularStatic): void {
  const module = angular.module(ModuleName, [])
  module.component('settings', componentConfig)
}