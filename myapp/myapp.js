
import angular from 'angular';
import ngRoute from 'angular-route';

const app = angular.module('foodApp', ['ngRoute']);

app.config(function config($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
    template: ''
  })
  .when('/recipes', {
    template: '<recipe-list></recipe-list>'
  })
  .when('/recipes/:recipeId', {
    template: '<recipe-detail></recipe-detail>'
  });
  $locationProvider.html5Mode(true);
});

app.component('recipeDetail', {
  templateUrl: '/includes/recipe-detail.template.html',
  controller: function RecipeDetailController($http, $routeParams) {
      $http.get('/api/recipes/' + $routeParams.recipeId).then(response => (this.recipe = response.data));

      this.back = () => window.history.back();

      this.editorEnabled = false;
      this.toggleEditor = () => (this.editorEnabled = !this.editorEnabled);

      this.saveRecipe = (recipe, recipeid) => {
          $http.put('/api/recipes/' + recipeid, recipe).then(res => (this.editorEnabled = false));
      };
  }
});

app.controller('NavController', function($scope, $location) {
  $scope.isActive = function(viewLocation) {
    // var active = (viewLocation === $location.path())
    // console.log('vl ' + viewLocation)
    // console.log('wl ' + window.location.href)
    var active = window.location.href.includes(viewLocation);
    return active;
  };
});

app.component('recipeList', {
  templateUrl: '/includes/recipe-list.template.html',
  controller: function RecipeAppController($http, $scope) {
      $http.get('/api/recipes').then(res => {
          $scope.recipes = res.data;
      });

      $scope.deleteRecipe = (index, recipeid) =>
          $http.delete('/api/recipes/' + recipeid).then(() => $scope.recipes.splice(index, 1));

      $scope.addRecipe = function(data) {
          $http.post('/api/recipes/', data).then(() => {
              $scope.recipes.push(data);
          });
      };
  }
});  
  