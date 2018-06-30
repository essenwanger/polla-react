const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.calculatePointsTest = () => functions.https.onRequest((req, res) => {
	var idMatch = '49';
	return global.init.db.ref('/matches/'+idMatch).once('value').then((snapshot)=>{
		var match = snapshot.val();
		if(!match.group || match.group === ''){
			match.group = match.round;
		}
    	if(match.scoreTeam1 && match.scoreTeam2){    		
    		actualizarFases(match,idMatch);
		}
		if((match.scoreTeam1 && match.scoreTeam2)||
			(match.teamSource1 || match.teamSource2)){
			global.init.db.ref('/typeBets').once('value').then((snapshot)=>{
				snapshot.forEach(function(childSnapshot) {
					var tipoPolla = childSnapshot.val();
					actualizarPuntos(match,idMatch,tipoPolla);
				});
				return 1;
			}).catch(error => {
	    		console.log(error.message);
	    	});
		}
		return res.status(200).send("Calculated!");
	}).catch(error => {
		return res.status(400).send(error.message);
	});
});

exports.calculatePoints = () => functions.database.ref('/matches/{idMatch}')
    .onWrite((change, context) => {
		var match = change.after.val();
    	if(!match.group || match.group === ''){
			match.group = match.round;
		}
    	if(match.scoreTeam1 && match.scoreTeam2){    		
    		actualizarFases(match,context.params.idMatch);
		}
		if((match.scoreTeam1 && match.scoreTeam2)||
			(match.teamSource1 || match.teamSource2)){
			return global.init.db.ref('/typeBets').once('value').then((snapshot)=>{
				snapshot.forEach(function(childSnapshot) {
					var tipoPolla = childSnapshot.val();
					actualizarPuntos(match,context.params.idMatch,tipoPolla);
				});
				return 1;
			});
		}
		return 1;
});

function actualizarPuntos(match,idMatch,tipoPolla){
	
	match = commons.calcularResultMatch(match);

	//para todos los usuarios registrados y aptos para jugar
	return global.init.db.ref('/ranking'+tipoPolla.suffix+'/').once('value').then((snapshot)=>{
		
		return snapshot.forEach( childSnapshot =>{
			
			var rankUser = childSnapshot.val();
	        var rankKey  = childSnapshot.key;

	        //console.log('/betsAll/'+rankKey+'/matches/'+match.group+'/'+idMatch);
	        global.init.db.ref('/bets'+tipoPolla.suffix+'/'+rankKey+'/matches/'+match.group+'/'+idMatch)
	        .once('value').then(snapshotUserMatch => {
	        	
	        	var matchUser = snapshotUserMatch.val();

	        	matchUser = commons.calcularResultMatch(matchUser);

	        	matchUser.scoreTeamReal1 = match.scoreTeam1;
	    		matchUser.scoreTeamReal2 = match.scoreTeam2;
	    		matchUser.scorePenaltyTeamReal1 = match.scorePenaltyTeam1;
	    		matchUser.scorePenaltyTeamReal2 = match.scorePenaltyTeam2;
	    		matchUser.teamReal1 = match.team1;
	    		matchUser.teamReal2 = match.team2;
	    		matchUser.teamNameReal1 = match.teamName1;
	    		matchUser.teamNameReal2 = match.teamName2;
	    		matchUser.points = 0;

	    		//LOGICA DE PUNTOS
	    		if(match.scoreTeam1 && match.scoreTeam2){
	    			if(matchUser.team1 === match.teamReal1 && matchUser.team2 === match.teamReal2){
	    				if(matchUser.result === match.result || matchUser.result === match.resultPenalty){
					    	matchUser.points = 1;//puntos por acertar al resultado (ganador / empate)
					    	if(matchUser.scoreTeam1 === match.scoreTeam1 &&
					    		matchUser.scoreTeam2 === match.scoreTeam2){
					    		matchUser.points += 2;//puntos por acertar al score exacto
					    	}
					    	if(matchUser.result === 0){
								if(matchUser.scorePenaltyTeam1 && matchUser.scorePenaltyTeam2){
				    				if(matchUser.resultPenalty === match.resultPenalty){
										matchUser.points += 0;//puntos extras por acetar al ganador en penales
						    		}
				    			}
					    	}
					    }
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
			    /*
		        if(tipoPolla.excludeCalculate === matchUser.group){
		        	matchUser.teamSource1 = null;
		        	matchUser.teamSource2 = null;
		        }*/

			    //puntos extras por atinar al equipo clasificado en llave
			    if(matchUser.group.length > 1 &&
			       (matchUser.teamSource1 || matchUser.teamSource2)){
			    	//equipos desbloqueados, no es necesario pero permite hacer pruebas con data <100%
			    	/*
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
			    	}*/
			    	/*
			    	return global.init.db.ref('/matches/').once('value').then((snapshot)=>{
			    		snapshot.forEach( childSnapshot =>{			
							var matchFase = childSnapshot.val();
        					var matchKey  = childSnapshot.key;
        					if(matchFase.group === matchUser.group ||
        					   matchFase.round === matchUser.group){
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
			    	}).then(()=> {
			    		return global.init.db.ref('/betsAll/'+rankKey+'/matches/'+match.group+'/'+idMatch)
						.update(matchUser);
			    	}).catch(error => {
			    		console.log(error.message);
			    		this.errorMessage = 'Error - ' + error.message;
			    	});
				    */

				    return global.init.db.ref('/bets'+tipoPolla.suffix+'/'+rankKey+'/matches/'+match.group)
			        .once('value').then(snapshotUserMatch => {
			        	snapshotUserMatch.forEach( childSnapshot =>{			
							var matchFase = childSnapshot.val();
        					var matchKey  = childSnapshot.key;
        					if(matchUser.group === 'Octavos'){
    							extraPoint = 1;
    						}else if(matchUser.group === 'Cuartos'){
    							extraPoint = 1;
    						}else if(matchUser.group === 'Semifinales'){
    							extraPoint = 2;
    						}else if(matchUser.group === 'Final'){
    							extraPoint = 3;
    						}
    						if(matchFase.team1 === matchUser.teamReal1 ||
    						   matchFase.team1 === matchUser.teamReal2){
    							matchUser.points += extraPoint;
    						}
    						if(matchFase.team2 === matchUser.teamReal1 ||
    						   matchFase.team2 === matchUser.teamReal2){
    							matchUser.points += extraPoint;
    						}
        				});
        				return 1;
			        }).then(()=> {
			    		return global.init.db.ref('/bets'+tipoPolla.suffix+'/'+rankKey+'/matches/'+match.group+'/'+idMatch)
						.update(matchUser);
			    	}).catch(error => {
			    		console.log(error.message);
			    	});
				}else{
					return global.init.db.ref('/bets'+tipoPolla.suffix+'/'+rankKey+'/matches/'+match.group+'/'+idMatch)
					.update(matchUser);
				}
	        }).catch(error => {
	        	console.log(error.message);
			});
		});
	}).catch(error => {
    	console.log(error.message);
	});
}

function actualizarFases(match,idMatch){
	//console.log(match.group);
	if(match.group){
		if(match.group.length === 1 ){//Fase de grupos
			return global.init.db.ref('/matches/').once('value').then((snapshot)=>{
				var positionTable = commons.calcularTablaPosiciones(snapshot,match.group);
				var positionTableGrupo = {};
				positionTableGrupo[match.group]=positionTable;
				return global.init.db.ref('/positionTable/').update(positionTableGrupo)
				.then(()=>{
					//console.log('actualizar fase octavos');
					return global.init.db.ref('/matches/').once('value').then((snapshot)=>{
						var matches = commons.calcularOctavos(positionTable,match.group,snapshot);
				    	return global.init.db.ref('/matches/').update(matches);
					});
				}).catch(error => {
		        	console.log(error.message);
				});
    		});
		}else{
			var group = {};
			//console.log('actualizar fase octavos');
			group[idMatch] = match;
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
