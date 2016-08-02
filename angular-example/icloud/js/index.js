/*
	需要按照一定顺序存储  用数组
	数据需要名字   json
*/
// var todos = [
// 		{
// 			id:1,
// 			title:'新列表1',
// 			color:'#C970E3',
// 			list:[
// 				{
// 					content:"123123123123123",
// 					date:'12223123',
// 					done:false
// 				},
// 				{
// 					content:"111111111111111",
// 					date:'12223123',
// 					done:true
// 				},
// 				{
// 					content:"123123123123123",
// 					date:'12223123',
// 					done:true
// 				},
// 				{
// 					content:"33333333333333",
// 					date:'12223123',
// 					done:true
// 				}
// 			]
// 		},
// 		{
// 			id:2,
// 			title:'新列表2',
// 			color:"#6EDC32",
// 			list:[
// 				{
// 					content:"123123123123123",
// 					date:'12223123',
// 					done:false
// 				}
// 			]
// 		}
// 	]


var icloud = angular.module('icloud',[]);
var color = ['#C970E3',"#6EDC32","#40ABF8","#F2CC00","#9F855D","#F82469",'#F89600'];
icloud.controller('todo',function($scope){
	function getData(){
		var d = [
			{
				id:1,
				title:'新列表1',
				color:'#C970E3',
				list:[]
			}
		];
		if(localStorage.getItem('todo') ==null){
			localStorage.setItem('todo',JSON.stringify(d))
		}
		var data = JSON.parse(localStorage.getItem('todo'));
		return data;
	}
	function saveData(){
		localStorage.setItem('todo',JSON.stringify($scope.todo))
	}


	// $scope.todo = todos; 
	$scope.todo = getData(); 
	$scope.color =color;
	$scope.index = 0;
	$scope.add = function(){
		$scope.ids = $scope.todo[$scope.todo.length-1].id+1;

		$scope.todo.push({
			id:$scope.ids,
			color:color[$scope.ids%7],
			title:"新列表"+$scope.ids,
			list:[]
		})
		$scope.index =$scope.todo.length-1;
	}
	$scope.select=function(i){
		$scope.index = i;
		$scope.flag = true;
		$scope.f= false;
		
	}
	getNum();
	function getNum(){
		$scope.doneNum =0;
		angular.forEach($scope.todo[$scope.index].list,function(o,i){
			if(o.done ==true){
				$scope.doneNum++;
			}
		})
	}
	
	$scope.done=function(val,index,arr){
		return val.done ==true?true:false;
	}
	$scope.doing=function(val,index,arr){
		return val.done ==false?true:false;
	}
	//
	$scope.flag = true;

	//新增列表
	$scope.addList = function(){
		$scope.todo[$scope.index].list.push({
			content:'',
			date:new Date().getTime(),
			done:false
		}) 
	}
	$scope.changeDone = function(obj,status){
		obj.done = status;
		
	}

	/*
		$scope 上的两个方法

		$watch  监视视图更新 
		    $watch(要监视属性,function(new,old){
	
		    })
		$apply  通知视图更新
	*/

	


	$scope.getColor=function(){
		$scope.f = !$scope.f;
		$scope.fontColor = $scope.todo[$scope.index].color;
		$scope.titles = $scope.todo[$scope.index].title;
	}

	$scope.a = function(v){
		$scope.fontColor=v;
	}

	$scope.finish=function(){
		$scope.todo[$scope.index].color =$scope.fontColor;
		$scope.todo[$scope.index].title =$scope.titles;
		$scope.f = false;
	}

	$scope.del=function(){
		$scope.todo.splice($scope.index,1);
		$scope.f = false;
	}

	$scope.$watch("index",function(){
		getNum();
	})
	$scope.$watch("todo",function(){
		getNum();
		saveData();
	},true)
})