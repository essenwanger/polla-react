// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref);
  });
});

exports.calculateRanking = functions.database.ref('/matches')
    .onWrite(event => {
    	var matches=[];
    	var ranking=[];
    	event.data.val().forEach((element)=>{
    		if(element.scoreTeam1>element.scoreTeam2){
				element.result=1;
    		}else if(element.scoreTeam1<element.scoreTeam2){
    			element.result=2;
    		}else{
    			element.result=0;
    		}
    		matches[element.id]=element;
    	});
    	return admin.database().ref('/users').once('value').then((snapshot)=>{
    		snapshot.forEach((childSnapshot)=>{
		        var item = childSnapshot.val();
		        var key = childSnapshot.key;
		        item.bets.forEach((bet, betKey)=>{
		        	var points = 0;
		        	bet.forEach((element)=>{
		        		if(element.forecastTeam1>element.forecastTeam2){
							element.result=1;
			    		}else if(element.forecastTeam1<element.forecastTeam2){
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
		        	ranking.push(rank);
		        });
		    });
		    return admin.database().ref('/').update({
		      ranking: ranking
		    });
    	});
});

exports.calculatePositionTable = functions.database.ref('/users/{userId}/bets/{betId}/matches')
    .onWrite((event) => {
    	console.log('userId-'+event.params.userId);
		console.log('betId-'+event.params.betId);
		var positionTable={};
		return admin.database().ref('/users/'+event.params.userId+'/bets/'+event.params.betId+'/matches').once('value').then((snapshot)=>{
    		snapshot.forEach((childSnapshot)=>{
    			var item=childSnapshot.val();
    			if(item.group && item.round && item.round == 'GR'){
    				if(!positionTable[item.group]){
    					positionTable[item.group] = {};
    				}
    				var draw = 0;
    				var won1 = 0;
    				var won2 = 0;
    				var lost1 = 0;
    				var lost2 = 0;
    				var points1 = 0;
    				var points2 = 0;
    				var played = 0;

    				if(item.scoreTeam1 && item.scoreTeam2){
    					if(item.scoreTeam1 === item.scoreTeam2){
	    					draw = 1;
	    				}else if(item.scoreTeam1<item.scoreTeam2){
	    					won2 = 1;
	    					points2 = 3;
	    					lost1 = 1;
	    				}else{
	    					won1 = 1;
	    					points1 = 3;
	    					lost2 = 1;
	    				}
	    				played = 1;
    				}
	    				
    				if(positionTable[item.group][item.team1]){
    					positionTable[item.group][item.team1]= {
							draw : positionTable[item.group][item.team1].draw + draw,
							goalsAgainst : 0,
							goalsFor : 0,
							lost : positionTable[item.group][item.team1].lost + lost1,
							order : 0,
							played : positionTable[item.group][item.team1].played + played,
							points : positionTable[item.group][item.team1].points + points1,
							won : positionTable[item.group][item.team1].won + won1
						}
    				}else{
						positionTable[item.group][item.team1]= {
							draw : draw,
							goalsAgainst : 0,
							goalsFor : 0,
							lost : lost1,
							order : 0,
							played : played,
							points : points1,
							won : won1
						}
    				}
    				if(positionTable[item.group][item.team2]){
    					positionTable[item.group][item.team2]= {
							draw : positionTable[item.group][item.team2].draw + draw,
							goalsAgainst : 0,
							goalsFor : 0,
							lost : positionTable[item.group][item.team2].lost + lost2,
							order : 0,
							played : positionTable[item.group][item.team2].played + played,
							points : positionTable[item.group][item.team2].points + points2,
							won : positionTable[item.group][item.team2].won + won2
						}
    				}else{
    					positionTable[item.group][item.team2]= {
							draw : draw,
							goalsAgainst : 0,
							goalsFor : 0,
							lost : lost2,
							order : 0,
							played : played,
							points : points2,
							won : won2
						}
    				}
    			}
    		});

    		Object.keys(positionTable).forEach(function(keyGroup) {
    			var orderedGroup = [];
    			Object.keys(positionTable[keyGroup]).forEach(function(keyTeam) {
					orderedGroup.push({id:keyTeam,points:positionTable[keyGroup][keyTeam].points});
				});
				orderedGroup.sort(function(a,b){
					//TODO implementar diferencia de goles
					return b.points - a.points;
				});
				for (i = 0; i < orderedGroup.length; i++) {
					//console.log(orderedGroup[i].id);
					positionTable[keyGroup][orderedGroup[i].id].order = i+1;
				}
    		}

    		return admin.database().ref('/users/'+event.params.userId+'/bets/'+event.params.betId).update({
		    	positionTable: positionTable
			});
    	});
});