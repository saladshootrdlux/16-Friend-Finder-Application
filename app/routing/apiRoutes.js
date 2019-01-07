///req.body comes back with weird looking array name for scores

var friends = require("../data/friends.js");
var express = require("express");
var bodyParser = require("body-parser");
var apirouter = express.Router();

//json for current friends list
apirouter.get("/api/friends", function(req,res){
	res.json(friends);
})


//posting a new user and returning a match
apirouter.post("/api/friends", function(req, res){
	console.log("posting...");
	var newFriend = req.body;
	console.log(newFriend);
	//console.log(newFriend['scores[]']); //don't know why scores show up as "scores[]"
	//console.log(newFriend.scores); //returns scores as 'scores[]'
	//console.log(parseFloat(JSON.parse(newFriend.scores[0])));//does not work - undefined

	//this function coverts users's results into a simple array of numbers
	var newScore = function(array){
		var newScore = [];
		for (var i = 0; i < array.length; i++) {
			newScore.push(parseInt(array[i]));
		}
		return newScore;
	}
	//this function calculates difference of elements between two arrays and then sums up the difference
	var totalDiff = function(arrA, arrB){
		delta = 0;
		for(var i=0; i<arrA.length; i++){
			delta += Math.abs(arrA[i] - arrB[i]);
		}
		return delta;
	}
	//this function below we find the index of minimum difference
	//https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
	function indexOfMin(array) {
    	if (array.length === 0) {
        	return -1;
    	}

    	var min = array[0];
    	var minIndex = 0;

    	for (var i = 1; i < array.length; i++) {
        	if (array[i] < min) {
            	minIndex = i;
            	min = array[i];
        	}
    	}

    	return minIndex;
	}

	var newFriendScore = newScore(newFriend['scores[]']); //array of numbers
	var currentFriendScores = []; //array of arrays
	var differences = [];

	//recall friends is an array of objects
	for(var i=0; i<friends.length;i++){
		currentFriendScores.push(newScore(friends[i]['scores[]']));
	}

	//below we take each friend and find difference between that friend and new friend
	for (var i=0; i<currentFriendScores.length; i++){
		differences.push(totalDiff(newFriendScore, currentFriendScores[i]));
	}
	console.log("calculating...");
	//console.log(newFriendScore);
	//console.log(currentFriendScores);
	//console.log(differences);

	var minFriend = indexOfMin(differences);
	var matchFriend = friends[minFriend];
	console.log("matching...");
	console.log(matchFriend);
	

	//push to array so this person is not included in above calculation for shortest path	
	friends.push(newFriend);
	res.json(matchFriend);
})

//Export API routes for server.js to use.
module.exports = apirouter;

