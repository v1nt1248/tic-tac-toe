import * as angular from 'angular'
import { DEF_DIMENTION, VALUE } from './const'

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

}