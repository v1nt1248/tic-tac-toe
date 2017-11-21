import * as angular from 'angular'
import appModuleDependencies from './common/modules'
import route from './common/router'

const app = angular.module('toe', appModuleDependencies)

app.config(['$stateProvider', '$urlRouterProvider', route])
