import * as angular from 'angular'
import { DEF_DIMENTION } from './const'

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

  constructor() {
    this.userO = ''
    this.userX = ''
    this.dimentions = {
      x: DEF_DIMENTION.x,
      y: DEF_DIMENTION.y
    }
  }

}