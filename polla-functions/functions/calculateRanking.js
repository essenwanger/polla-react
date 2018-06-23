// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.calculatePoints = () => functions.database.ref('/matches/{idMatch}')
    .onWrite((change, context) => {
		var match = change.after.val();
    	if(match.scoreTeam1 && match.scoreTeam2){
    		if(!match.group || match.group === ''){
    			match.group = match.round;
    		}
    		actualizarFases(match,context);
    		actualizarPuntos(match,context);
		}
		return 0;
});

function actualizarPuntos(match,context){
	
	match.scoreTeam1 = match.scoreTeam1.trim();
	match.scoreTeam2 = match.scoreTeam2.trim();

	if(match.scoreTeam1>match.scoreTeam2){
		match.result=1;
		match.resultFinal=1;
	}else if(match.scoreTeam1<match.scoreTeam2){
		match.result=2;
		match.resultFinal=2;
	}else{
		match.result=0;
		match.resultFinal=0;
		if(match.scorePenaltyTeam1 && match.scorePenaltyTeam2){
			if(match.scorePenaltyTeam1>match.scorePenaltyTeam2){
				match.resultPenalty=1;
    		}else if(match.scorePenaltyTeam1<match.scorePenaltyTeam2){
    			match.resultPenalty=2;
    		}else{
    			match.resultPenalty=0; //resultado parcial
    		}
    		match.resultFinal=match.resultPenalty;
		}
	}
	//para todos los usuarios registrados y aptos para jugar
	return global.init.db.ref('/rankingAll/').once('value').then((snapshot)=>{
		
		return snapshot.forEach( childSnapshot =>{
			
			var rankUser = childSnapshot.val();
	        var rankKey  = childSnapshot.key;

	        global.init.db.ref('/betsAll/'+rankKey+'/matches/'+match.group+'/'+context.params.idMatch)
	        .once('value').then(snapshotUserMatch => {
	        	var matchUser = snapshotUserMatch.val();

	        	if(matchUser.scoreTeam1>matchUser.scoreTeam2){
					matchUser.result = 1;
	    		}else if(matchUser.scoreTeam1<matchUser.scoreTeam2){
	    			matchUser.result = 2;
	    		}else{
	    			matchUser.result = 0;
	    		}

	    		matchUser.scoreTeamReal1 = match.scoreTeam1;
	    		matchUser.scoreTeamReal2 = match.scoreTeam2;
	    		matchUser.scorePenaltyTeamReal1 = match.scorePenaltyTeam1;
	    		matchUser.scorePenaltyTeamReal2 = match.scorePenaltyTeam2;
	    		matchUser.teamReal1 = match.team1;
	    		matchUser.teamReal2 = match.team2;
	    		matchUser.teamNameReal1 = match.teamName1;
	    		matchUser.teamNameReal2 = match.teamName2;
	    		matchUser.points = 0;
	    		//implementar logica de puntos
			    if(matchUser.result === match.result){
			    	matchUser.points = 1;//puntos por acertar al resultado (ganador / empate)
			    	if(matchUser.scoreTeam1 === match.scoreTeam1 &&
			    		matchUser.scoreTeam2 === match.scoreTeam2){
			    		matchUser.points += 2;//puntos por acertar al score exacto
			    	}
			    	if(matchUser.result === 0){
						if(matchUser.scorePenaltyTeam1 && matchUser.scorePenaltyTeam2){
		    				if(matchUser.scorePenaltyTeam1>matchUser.scorePenaltyTeam2){
								matchUser.resultPenalty=1;
				    		}else if(matchUser.scorePenaltyTeam1<matchUser.scorePenaltyTeam2){
				    			matchUser.resultPenalty=2;
				    		}else{
				    			matchUser.resultPenalty=0;//NO DEBERIA PASAR
				    		}
				    		if(matchUser.resultPenalty === match.resultPenalty){
								/*
								if(matchUser.scorePenaltyTeam1 === match.scorePenaltyTeam1 &&
			    					matchUser.scorePenaltyTeam2 === match.scorePenaltyTeam2){
			    					matchUser.points += 6;//puntos extras por acertar al score exacto en penales
			    				}else{*/
			    					matchUser.points += 1;//puntos extras por acetar al ganador en penales
			    				//}
				    		}
				    		matchUser.resultFinal = matchUser.resultPenalty;
		    			}else{
		    				matchUser.resultFinal = matchUser.result;
		    			}
			    	}else{
			    		matchUser.resultFinal = matchUser.result;
			    	}
			    } else {
			    	if(matchUser.result === match.resultPenalty){
			    		matchUser.points = 1; //puntos por acertar al resultado final
			    	} else {
						matchUser.points = 0;
					}
			    }
			    if(matchUser.id === '63'){//Final por 3 y 4
			    	var team3User = '';
			    	var team4User = '';
			    	var team3Real = '';
			    	var team4Real = '';
			    	if(matchUser.resultFinal === 1){
			    		team3User = matchUser.team1;
			    		team4User = matchUser.team2;
			    	}else if(matchUser.resultFinal === 2){
			    		team3User = matchUser.team2;
			    		team4User = matchUser.team1;
			    	}
			    	if(match.resultFinal === 1){
			    		team3Real = match.team1;
			    		team4Real = match.team2;
			    	}else if(match.resultFinal === 2){
			    		team3Real = match.team2;
			    		team4Real = match.team1;
			    	}
			    	if(team3User === team3Real){
			    		matchUser.points += 5;
			    	}
			    	if(team4User === team4Real){
			    		matchUser.points += 3;
			    	}
			    }else if(matchUser.id === '64'){//Final por 3 y 4
			    	var team1User = '';
			    	var team2User = '';
			    	var team1Real = '';
			    	var team2Real = '';
			    	if(matchUser.resultFinal === 1){
			    		team1User = matchUser.team1;
			    		team2User = matchUser.team2;
			    	}else if(matchUser.resultFinal === 2){
			    		team1User = matchUser.team2;
			    		team2User = matchUser.team1;
			    	}
			    	if(match.resultFinal === 1){
			    		team1Real = match.team1;
			    		team2Real = match.team2;
			    	}else if(match.resultFinal === 2){
			    		team1Real = match.team2;
			    		team2Real = match.team1;
			    	}
			    	if(team1User === team1Real){
			    		matchUser.points += 15;
			    	}
			    	if(team2User === team2Real){
			    		matchUser.points += 10;
			    	}
			    }
			    //puntos extras por atinar al equipo clasificado en llave
			    if(matchUser.group.length > 1){ //solo llaves
			    	//equipos desbloqueados, no es necesario pero permite hacer pruebas con data <100%
			    	if(matchUser.teamSource1 && matchUser.teamSource2){
				    	if(matchUser.group === 'Final'){
				    		if(matchUser.team1 === match.team1){
						    	matchUser.points += 0;
						    }
						    if(matchUser.team2 === match.team2){
						    	matchUser.points += 0;
						    }
				    	}else{
				    		if(matchUser.team1 === match.team1){
						    	matchUser.points += 0;
						    }
						    if(matchUser.team2 === match.team2){
						    	matchUser.points += 0;
						    }
				    	}
				    	global.init.db.ref('/matches/').once('value').then((snapshot)=>{
				    		snapshot.forEach( childSnapshot =>{			
								var matchFase = childSnapshot.val();
	        					var matchKey  = childSnapshot.key;
	        					if(matchFase.group === matchUser.group){
	        						var extraPoint = 0;
	        						if(matchUser.group === 'Octavos'){
	        							extraPoint = 1;
	        						}else if(matchUser.group === 'Cuartos'){
	        							extraPoint = 1;
	        						}else if(matchUser.group === 'Semifinales'){
	        							extraPoint = 2;
	        						}else if(matchUser.group === 'Final'){
	        							extraPoint = 3;
	        						}
	        						if(matchFase.team1 === matchUser.team1 ||
	        						   matchFase.team1 === matchUser.team2){
	        							matchUser.points += extraPoint;
	        						}
	        						if(matchFase.team2 === matchUser.team1 ||
	        						   matchFase.team2 === matchUser.team2){
	        							matchUser.points += extraPoint;
	        						}
	        					}
	        				});
	        				return 1;
				    	}).catch(error => {
				    		console.log(error.message);
				    		this.errorMessage = 'Error - ' + error.message;
				    	});
				    }
				}
				//console.log(rankUser.profile.email);
				//console.log('/betsAll/'+rankKey+'/matches/'+match.group+'/'+context.params.idMatch);
				//console.log(matchUser);

			    return global.init.db.ref('/betsAll/'+rankKey+'/matches/'+match.group+'/'+context.params.idMatch)
				.update(matchUser);

	        }).catch(error => {
	        	console.log(error.message);
				this.errorMessage = 'Error - ' + error.message
			});
		});
	});
}

function actualizarFases(match,context){
	
	if(match.group){
		if(match.group.length === 1 ){//Fase de grupos
			return global.init.db.ref('/matches/').once('value').then((snapshot)=>{
				var positionTable = commons.calcularTablaPosiciones(snapshot,match.group);
				var positionTableGrupo = {};
				positionTableGrupo[match.group]=positionTable;
				return global.init.db.ref('/positionTable/')
				.update(positionTableGrupo)
				.then(()=>{
					return global.init.db.ref('/matches/').once('value').then((snapshot)=>{
						var matches = commons.calcularOctavos(positionTable,match.group,snapshot);
				    	return global.init.db.ref(
							'/matches/').update(matches);
					});
				});
    		});
		}else{
			var group = {};
			group[context.params.idMatch] = match;
			var results = commons.calcularResultadosFaseActual(match.group,group);
			if(results){
				var siguienteFase = 'Cuartos';
				if(match.group==='Cuartos'){
					siguienteFase = 'Semifinales';
				}else if(match.group==='Semifinales'){
					siguienteFase = 'Final';
				}
				return global.init.db.ref('/matches/').once('value').then((snapshot)=>{
					var nextMatches = commons.calcularSiguienteFase(results,siguienteFase,snapshot);
					if(nextMatches){
						return global.init.db.ref('/matches/').update(nextMatches);
					}else{
						return 0;
					}
				});
			}
		}
	}
}

exports.calculateRanking = () => functions.database.ref('/betsAll/{betId}/matches/{faseGrupoId}/{matchId}')
    .onUpdate((change,context) => {
    	return global.init.db.ref('/betsAll/'+context.params.betId+'/matches/')
		.once('value').then((snapshot)=>{
			var totalPoints = 0;
			snapshot.forEach((childSnapshot)=>{
				var group = childSnapshot.val();
				for(var matchKey in group){
					var match = group[matchKey];
					if(match.points){
						totalPoints += parseInt(match.points);
					}
				}
			});
			return global.init.db.ref('/rankingAll/'+context.params.betId).update({
				totalPoints:totalPoints});
		});
    });