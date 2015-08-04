(function(){
  var app = angular.module('f-chess', [ ]);

  app.controller('MenuController', function(){
    this.status = menuStatus;
  });

  var menuStatus = {
    message: 'Choose the character',
    price: 2.95,
    description: '. . .',
  }
})();
