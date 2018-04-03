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
