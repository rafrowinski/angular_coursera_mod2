(function(){
  'use strict';
  angular.module('ShoppingListCheckOff', [])

  .service('ToBuyService', BaseListService)
  .service('AlreadyBoughtService', BaseListService)
  .controller('SampleDataController', SampleDataController)
  .controller('AddController', AddController)
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController);

  var sampleToBuyList = [
    {
      name : 'cookies',
      quantity : '12 boxes'
    },
    {
      name : 'juice',
      quantity : '2 bottles'
    },
    {
      name : 'cake',
      quantity : '2 pieces'
    }
  ];

  var sampleBoughtList = [
    {
      name : 'rice',
      quantity : '12 boxes'
    },
    {
      name : 'wine',
      quantity : '2 bottles'
    },
    {
      name : 'apple pie',
      quantity : '2 pieces'
    }
  ];

  SampleDataController.$inject = ['ToBuyService', 'AlreadyBoughtService'];
    function SampleDataController(ToBuyService, AlreadyBoughtService) {
    var controller = this;

    controller.loadSampleData = function() {
      ToBuyService.setItems(sampleToBuyList);
      AlreadyBoughtService.setItems(sampleBoughtList);
    }
  };

  AddController.$inject = ['ToBuyService'];
  function AddController(ToBuyService) {
    var controller = this;
    controller.itemName = ""
    controller.itemQuantity = ""
    controller.addItem = function() {
      ToBuyService.addItem(controller.itemName, controller.itemQuantity);
    };
  };

  ToBuyController.$inject = ['ToBuyService', 'AlreadyBoughtService'];
  function ToBuyController(ToBuyService, AlreadyBoughtService) {
    var controller = this;

    controller.items = ToBuyService.getItems();

    controller.buyItem = function(index) {
      var item = ToBuyService.getItem(index);
      AlreadyBoughtService.addItem(item);

      ToBuyService.removeItem(index);
    };

    controller.isEmpty = function() {
      return ToBuyService.getItems().length === 0;
    };
  };

  AlreadyBoughtController.$inject = ['$scope', 'AlreadyBoughtService'];
  function AlreadyBoughtController($scope, AlreadyBoughtService) {
    var controller = this;

    controller.items = AlreadyBoughtService.getItems();
  };

  function BaseListService() {
    var service = this;
    var itemList = [];

    service.addItem = function(item) {
      itemList.push(item);
    };

    service.addItem = function(name, quantity) {
      var item = {
        name : name,
        quantity : quantity
      };
      itemList.push(item);
    };


    service.removeItem = function(index) {
      itemList.splice(index, 1);
    };

    service.getItems = function() {
      return itemList;
    };

    service.getItem = function(index) {
      return itemList[index];
    };

    service.setItems = function(items) {
      service.itemList = items;
    };
  };

})();
