'use strict';

/* Controllers */

function OrderController($scope, $rootScope, $timeout) {
	  $scope.orderItems = [];
	  $rootScope.totalCost = 0.0;
	  
	  $scope.addNewOrder = function() {
		  console.log("New order created");
		  
		  $scope.isNewOrder = true; 
		  
		  var newOrderItem = {
				  num: $scope.orderItems.length + 1, 
				  title: "New Order",
				  selectedItems: [],
				  totalPrise: 0.0,
				  amount: 0
		  }
		  
		  $scope.orderItems.push(newOrderItem);
		  
		  console.log($scope.orderItems.length);
		  console.log($scope.orderItems);
		  
		  $timeout(function() {
			angular.forEach($scope.orderItems, function(item) {
				var el = angular.element('#myCarousel' + item.num);
				
				console.log(el);
				
				$('#myCarousel'+item.num).carousel({interval: 2000});	
			})}, 400, true);
	  }
  }

function newOrderControler($scope, $rootScope) {
	$scope.foodType =  'Select Food Type';
	$scope.addAmount = function(order) {
		order.amount += 1;
		$scope.calculateTotalPrice(order);
	}
	
	$scope.addItem = function(order, itemName, itemPrice) {
		var item = {
				name: itemName,
				price: itemPrice
		};
		order.selectedItems.push(item);
		
		$scope.calculateTotalPrice(order);	
	}
	
	$scope.calculateTotalPrice = function(order) {
		var totalPrice = 0.0;
		angular.forEach(order.selectedItems, function(item) {
			totalPrice += item.price;	
		});
		
		order.totalPrise = Math.round(totalPrice * order.amount * 100)/ 100;
	}
	
	$scope.placeOrder = function(order) {
		$rootScope.totalCost += Math.round(order.totalPrise * 100)/ 100;
	}
}
