// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

exports.calculateLlavesOctavos = () => functions.database.ref('/preBetsAll/{betId}/positionTable/{faseGrupoId}')
	.onUpdate((event) => {

	var positionTable = event.data.val();

	return global.init.db.ref('/preBetsAll/'+event.params.betId+'/matches/Octavos').once('value').then((snapshot)=>{

		snapshot.forEach((childSnapshot)=>{
	    	
	    	var match=childSnapshot.val();

	    	if(!match['teamSource1'] || !match['teamSource2']){
				match['teamSource1']=match.teamName1;
				match['teamSource2']=match.teamName2;

			}

			var position1 = match.teamSource1.substr(1,1)-1;
			var group1    = match.teamSource1.substr(2,1);
			var position2 = match.teamSource2.substr(1,1)-1;
			var group2    = match.teamSource2.substr(2,1);
			var updated   = false;

			if(group1 === event.params.faseGrupoId){
				if(positionTable[position1]){
					if(positionTable[position1].played === 3){
						if(match.team1 !== positionTable[position1].team){
							match.team1 = positionTable[position1].team;
							match.teamName1 = positionTable[position1].teamName;
							updated = true;
						}
					}else{
						match.team1 = match.teamSource1;
						match.teamName1 = match.teamSource1;
						updated = true;
					}
				}
			}

			if(group2 === event.params.faseGrupoId){
				if(positionTable[position2]){
					if(positionTable[position2].played === 3){
						if(match.team2 !== positionTable[position2].team){
							match.team2 = positionTable[position2].team;
							match.teamName2 = positionTable[position2].teamName;
							updated = true;
						}
					}else{
						match.team2 = match.teamSource2;
						match.teamName2 = match.teamSource2;
						updated = true;
					}
				}
			}

			if(updated){
				/*
				console.log('actualizar /preBetsAll/'+event.params.betId+
					'/matches/Octavos/'+childSnapshot.key);
				*/
				global.init.db.ref(
					'/preBetsAll/'+event.params.betId+
					'/matches/Octavos/'+childSnapshot.key).update(match);
			}
	    });
	    return 1;
	});
});