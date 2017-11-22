import * as angular from 'angular'
import router from '@uirouter/angularjs'

import * as StoreMod from './store'
StoreMod.addService(angular)

import * as MainCompMod from '../components/main/main'
MainCompMod.addComponent(angular)

import * as SettingsCompMod from '../components/settings/settings'
SettingsCompMod.addComponent(angular)

export default [
  router,
  StoreMod.ModuleName,
  MainCompMod.ModuleName,
  SettingsCompMod.ModuleName
]
