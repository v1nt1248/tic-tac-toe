import * as angular from 'angular'

export const ModuleName = 'toe.component.main'

class Main {

  static $inject = ['$state']
  constructor() {}

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
