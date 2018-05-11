// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

exports.letthegamesbegin = () => functions.database.ref('/typeBets/{idType}/status')
    .onUpdate((change,context) => {
    
    if (change.after.val() !== 'opened'){

    	return global.init.db.ref('/typeBets/'+context.params.idType).once('value').then((snapshot)=>{
    		
    		var typeBet = snapshot.val();
    		
    		return global.init.db.ref('/preBets'+typeBet.suffix).once('value').then((snapshot)=>{
	    		
	    		var bets = {};
    			var ranking = {};

    			snapshot.forEach((childSnapshot)=>{
	    			var item = childSnapshot.val();
	    			var key  = childSnapshot.key;
	    			if(item.completed && item.payable){
	    				bets[key] = item;
	    				ranking[key] = {
	    					profile : item.profile,
	    					totalPoints : 0
	    				};
	    			}
	    		});
	    		
	    		var betsWrapper={};
	    		var rankWrapper={};
	    		betsWrapper['bets'   +typeBet.suffix]=bets;
	    		rankWrapper['ranking'+typeBet.suffix]=ranking;
	    		
	    		return global.init.db.ref('/').update(betsWrapper).then(() => {
	    			return global.init.db.ref('/').update(rankWrapper)
	    		});
	    		
	    	});

    	});

    }else{
    	global.init.db.ref('/').update({bets:'not yet implemented'});
    	global.init.db.ref('/').update({ranking:'not yet implemented'});
    	return 1;
    }

});