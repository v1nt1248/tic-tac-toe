import * as angular from 'angular'
import * as StoreMod from '../../common/store'
import { VALUE, WINNING_OPTIONS } from '../../common/const' 

export const ModuleName = 'toe.component.game'


class Game {
  private field: number[][]
  private isMoveX: boolean = true

  static $inject = ['$scope', '$state', '$timeout', StoreMod.SrvName]
  constructor(
    private $scope: angular.IScope,
    private $state: angular.ui.IState,
    private $timeout: angular.ITimeoutService,
    private _storeSrv: StoreMod.Store
  ) {
    this.$timeout(() => {
      this.field = this._storeSrv.preparePlayingField()
    })
  }

  selectCell(y, x): void {
    if (this.field[y][x] === VALUE.empty) {
      this.$timeout(() => {
        this.field[y][x] = this.isMoveX ? VALUE.x : VALUE.o
      }).then(() => {
        const isWinningOptions = this._storeSrv.checkGameStatus(this.field, x, y)
        if (isWinningOptions !== -1) {
          alert(`Win ${this.field[y][x]}`)
        }
        this.isMoveX = !this.isMoveX
      })
    }
  }


}

const componentConfig: angular.IComponentOptions = {
  bindings: {},
  templateUrl: './components/game/game.html',
  controller: Game
}

export function addComponent(angular: angular.IAngularStatic): void {
  const module = angular.module(ModuleName, [])
  module.component('game', componentConfig)
}