import * as angular from 'angular'
import { DEF_DIMENTION, VALUE, WINNING_OPTIONS } from './const'

export const ModuleName = 'toe.service.store'
export const SrvName = 'storeService'

export function addService(angular: angular.IAngularStatic): void {
  const module = angular.module(ModuleName, [])
  module.service(SrvName, Store)
}

export class Store {
  public userX: string
  public userO: string
  public dimentions: {
    x: number,
    y: number
  }
  public isPlay: boolean

  constructor() {
    this.userO = ''
    this.userX = ''
    this.dimentions = {
      x: DEF_DIMENTION.x,
      y: DEF_DIMENTION.y
    }
    this.isPlay = false
  }

  preparePlayingField() {
    const result: number[][] = []
    for (let y = 0; y < this.dimentions.y; y++) {
      const row: number[] = []
      for (let x = 0; x < this.dimentions.x; x++) {
        row.push(VALUE.empty)
      }
      result.push(row)
    }
    return result
  }

  checkGameStatus(gameField: number[][], x: number, y: number) {
    let result = -1
    // console.log(`Позиция: ${x} - ${y}`)
    const currentValue = gameField.slice(y, y + 1)[0].slice(x, x + 1)[0]
    for (let row = 0; row < WINNING_OPTIONS.length; row++) {
      // const a = WINNING_OPTIONS[row]
      // console.log(`Комбинация: [${a[0][0]}, ${a[0][1]}], [${a[1][0]}, ${a[1][1]}], [${a[2][0]}, ${a[2][1]}], [${a[3][0]}, ${a[3][1]}], [${a[4][0]}, ${a[4][1]}]`)
      let coincidences = 0
      for (let pos of WINNING_OPTIONS[row]) {
        if (
          (x + pos[0]) < 0 ||
          (x + pos[0]) >= this.dimentions.x ||
          (y + pos[1]) < 0 ||
          (y + pos[1] >= this.dimentions.y)
        ) {
          // console.log(`[${x + pos[0]} , ${y + pos[1]}] = undefined`) 
          continue 
        }
        else {
          // console.log(`[${x + pos[0]} , ${y + pos[1]}] = ${gameField[y + pos[1]][x + pos[0]]}`) 
          coincidences = (gameField[y + pos[1]][x + pos[0]] === currentValue) ? coincidences + 1 : coincidences
        }
      }
      if (coincidences === 5) {
        result = row
        break
      }
    }
    return result
  }

}
