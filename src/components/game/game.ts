import * as angular from 'angular'
import * as StoreMod from '../../common/store'
import { VALUE, WINNING_OPTIONS } from '../../common/const' 

export const ModuleName = 'toe.component.game'

class Game {
  private field: number[][]
  private isMoveX: boolean = true
  private isGameOver: boolean = false
  private winner: string = ''
  private notifStyle: object = {'display': 'none'}

  static $inject = ['$scope', '$state', '$timeout', StoreMod.SrvName]
  constructor(
    private $scope: angular.IScope,
    private $state: angular.ui.IStateService,
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
        const winningOptionsIndex = this._storeSrv.checkGameStatus(this.field, x, y)
        // console.log(`Comb: ${isWinningOptions}`)
        if (winningOptionsIndex !== -1) {
          this.gameOver(x, y, winningOptionsIndex)
        } else {
          this.isMoveX = !this.isMoveX
          const player = this.isMoveX ? 'x' : '0'
          this.$scope.$emit('change_player', player)
        }
      })
    }
  }

  gameOver(x: number, y: number, winningOptionsIndex: number) {
    console.log(`Win ${this.isMoveX ? 'X' : '0'}`)
    this.isGameOver = true
    const winningOptions = WINNING_OPTIONS[winningOptionsIndex]
    this.$timeout(() => {
      winningOptions.forEach(comb => {
        const xCoord = x + comb[0]
        const yCoord = y + comb[1]
        this.field[yCoord][xCoord] = this.isMoveX ? 3 : 4
      })
    })
    this.winner = this.isMoveX ? this._storeSrv.userX : this._storeSrv.userO
    this.$timeout(() => {
      this.notifStyle = {'display': 'flex'}
    }, 1000)
  }

  goStart() {
    this._storeSrv.userX = ''
    this._storeSrv.userO = ''
    this._storeSrv.isPlay = false
    this.$state.go('settings')
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