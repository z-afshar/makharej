angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $state) {

      $scope.$on('$ionicView.enter', function(e) { //refresh this page when expense or income added
        if (!token) {
          console.log('whyy?:'+token)
          back_to_login_page($scope, $state);
        }
        console.log('why?:'+token)
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(
          baseURL+'/q/generalstat/',
          'token='+token
        )
        .success(function(data){
          $scope.generalstat = data;
        })
        .error(function() {
          $scope.message = 'error reading from bestoon stats' // TODO: show some error to user
          console.log('error on request')
        })
  })
})

.controller('ExpenseCtrl', function($scope, $http, $state) {

  $scope.$on('$ionicView.enter', function(e) {
    if (!token) {
      back_to_login_page($scope, $state);
    }
  })

  $scope.submit = function() {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(
      baseURL+'/submit/expense/',
      'token='+token+'&text='+$scope.text+'&amount='+$scope.amount
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

.controller('ConfigCtrl', function($scope,$http,$state,$ionicHistory) {
  $scope.loggedin = false;
  token = storage.getItem('token');
  if (token) {
    $scope.loggedin = true;
  }


  $scope.login = function () { // check user and password
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(
      baseURL+'/accounts/login/',
      'username='+$scope.username+'&password='+$scope.password
    )
    .success(function(data){
      //console.log(data.status)
      if (data.status == 'ok') {
        token = data['token'];
        storage.setItem('token', token);
        $scope.loggedin = true;
        console.log('logged in with token:'+ token)
        $ionicHistory.clearCache([$state.current.name]).then(function() {
          $state.reload();
        })

      }
      else {
        // request fine , but username , pass error
        // TODO: toast message
        console.log('bad username or password')
      }
      // show a toast
    })
    .error(function() {
      $scope.message = 'خطا در ورود' // TODO: show some error to user
      console.log('error while login')
    })
  }

  $scope.logout = function () {
    console.log('logout');
    storage.removeItem('token');
    $scope.loggedin = false;
    token = null;
    $ionicHistory.clearCache([$state.current.name]).then(function() {
      $state.reload();
    })
  }
})

.controller('IncomeCtrl', function($scope,$http,$state) {

  $scope.$on('$ionicView.enter', function(e) {
    if (!token) {
      back_to_login_page($scope, $state);
    }
  })

  $scope.submit = function() {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(
      baseURL+'/submit/income/',
      'token='+token+'&text='+$scope.text+'&amount='+$scope.amount
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
