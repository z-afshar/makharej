angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.$on('$ionicView.enter', function(e) { //refresh this page when expense or income added
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(
      'http://localhost:8008/q/generalstat/',
      'token=test'
    )
    .success(function(data){
      $scope.generalstat = data;
    })
    .error(function() {
      $scope.message = 'error reading from bestoon stats' // TODO: show some error to user
      console.log('error on request')
    })
  });
})

.controller('ExpenseCtrl', function($scope, $http) {

  $scope.submit = function() {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(
      'http://localhost:8008/submit/expense/',
      'token=test&text='+$scope.text+'&amount='+$scope.amount
    )
    .success(function(data){
      $scope.text = '';
      $scope.amount = '';
      // show a toast
    })
    .error(function() {
      $scope.message = 'خطا در ذخیره اطلاعات' // TODO: show some error to user
      console.log('error while submit expense')
    })
  }

})

.controller('ExpenseDetailCtrl', function($scope, $stateParams, Expense) {
  $scope.expense = Expense.get($stateParams.expenseId);
})

.controller('IncomeCtrl', function($scope,$http) {

  $scope.submit = function() {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(
      'http://localhost:8008/submit/income/',
      'token=test&text='+$scope.text+'&amount='+$scope.amount
    )
    .success(function(data){
      $scope.text = '';
      $scope.amount = '';
      // show a toast
    })
    .error(function() {
      $scope.message = 'خطا در ذخیره اطلاعات' // TODO: show some error to user
      console.log('error while submit income')
    })
  }

});
