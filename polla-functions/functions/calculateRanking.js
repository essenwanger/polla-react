// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.calculateRanking = () => functions.database.ref('/matches')
    .onWrite(event => {
    	var matches=[];
    	var rankingOrder=[];
    	//var ranking={};
    	event.data.val().forEach((element)=>{
    		if(element.scoreTeam1 && element.scoreTeam2){
    			if(element.scoreTeam1>element.scoreTeam2){
					element.result=1;
	    		}else if(element.scoreTeam1<element.scoreTeam2){
	    			element.result=2;
	    		}else{
	    			element.result=0;
	    		}
	    		matches[element.id]=element;
    		}
    	});
    	return admin.database().ref('/users').once('value').then((snapshot)=>{
    		snapshot.forEach((childSnapshot)=>{
		        var item = childSnapshot.val();
		        var key = childSnapshot.key;
		        item.bets.forEach((bet, betKey)=>{
		        	var points = 0;
		        	bet.matches.forEach((element)=>{
		        		if(element.scoreTeam1>element.scoreTeam2){
							element.result=1;
			    		}else if(element.scoreTeam1<element.scoreTeam2){
			    			element.result=2;
			    		}else{
			    			element.result=0;
			    		}
			    		if(!(matches[element.id] === undefined || matches[element.id] === null)){
					      if(element.result === matches[element.id].result){
					        points +=3;
					      }
					    }
		        	});
		        	var rank={bet: betKey, points: points, profile: item.profile};
		        	rankingOrder.push(rank);
		        });
		    });
		    rankingOrder.sort(function(a,b){
				return b.points - a.points;//descendente
			});
			/*
			rankingOrder.forEach((item, id)=>{
	        	ranking[item.profile.userID] = item;
	        });*/
		    return admin.database().ref('/').update({
		      ranking: rankingOrder
		    });
    	});
});