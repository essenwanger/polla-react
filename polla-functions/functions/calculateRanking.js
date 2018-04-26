// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.calculatePoints = () => functions.database.ref('/matches/{idMatch}')
    .onWrite(event => {
    	
    	var match = event.data.val();

    	if(match.scoreTeam1 && match.scoreTeam2){
			if(match.scoreTeam1>match.scoreTeam2){
				match.result=1;
    		}else if(match.scoreTeam1<match.scoreTeam2){
    			match.result=2;
    		}else{
    			match.result=0;
    		}

    		//para todos los usuarios registrados y aptos para jugar
			return global.init.db.ref('/rankingAll/').once('value').then((snapshot)=>{
				
				snapshot.forEach((childSnapshot)=>{
					var rankUser = childSnapshot.val();
			        var rankKey  = childSnapshot.key;

					global.init.db.ref('/betsAll/'+rankKey+'/matches/'+match.group+'/'+event.params.idMatch)
					.once('value').then((snapshot)=>{
						var matchUser = snapshot.val();
						if(matchUser.scoreTeam1>matchUser.scoreTeam2){
							matchUser.result = 1;
			    		}else if(matchUser.scoreTeam1<matchUser.scoreTeam2){
			    			matchUser.result = 2;
			    		}else{
			    			matchUser.result = 0;
			    		}
			    		//implementar logica de puntos
					    if(matchUser.result === match.result){
					    	matchUser.points = 3;
					    }else{
					    	matchUser.points = 0;
					    }
					    global.init.db.ref('/betsAll/'+rankKey+'/matches/'+match.group+'/'+event.params.idMatch)
						.update(matchUser);
					});
				});
				return 1;
			});
		}
		return 0;
});

exports.calculateRanking = () => functions.database.ref('/betsAll/{betId}/matches/{faseGrupoId}/{matchId}')
    .onWrite(event => {
    	return global.init.db.ref('/betsAll/'+event.params.betId+'/matches/'+event.params.faseGrupoId)
		.once('value').then((snapshot)=>{
			var totalPoints = 0;
			snapshot.forEach((childSnapshot)=>{
				var match = childSnapshot.val();
				var matchId = childSnapshot.key;
				if(match.points){
					totalPoints += match.points;
				}
			});
			return global.init.db.ref('/rankingAll/'+event.params.betId).update({
				totalPoints:totalPoints});
		});
    });