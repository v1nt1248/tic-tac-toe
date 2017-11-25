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
    const currentValue = gameField.slice(y, y + 1)[0].slice(x, x + 1)[0]
    for (let rowIndex = 0; rowIndex < WINNING_OPTIONS.length; rowIndex++) {
      let coincidences = 0
      for (let pos of WINNING_OPTIONS[rowIndex]) {
        const xCoord = x + pos[0]
        const yCoord = y + pos[1]
        if (
          xCoord < 0 || 
          xCoord >= this.dimentions.x ||
          yCoord < 0 ||
          yCoord >= this.dimentions.y
        ) {
          continue
        } else {
          coincidences = (gameField[yCoord][xCoord] === currentValue) ? coincidences + 1 : coincidences
        }
      }
      if (coincidences === 5) {
        result = rowIndex
        break
      }
    }
    return result
  }
}
