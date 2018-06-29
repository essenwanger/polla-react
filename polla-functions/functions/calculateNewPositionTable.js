// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

/*
exports.calculateNewPositionTable = () => functions.database.ref('/preBetsAll/{betId}/matches/{faseGrupoId}/{matchId}')
	.onUpdate((change,context) => {

		var match = change.after.val();

		if(context.params.faseGrupoId.length === 1 ){//Fase de grupos
			var positionTable={};
			
			//TODO validar que se haya realizado un cambio significativo para positionTable
			//scoreTeam1,scoreTeam2 diferente de nulo
			//scoreTeam1,scoreTeam2 changed?

			return global.init.db.ref('/preBetsAll/'+context.params.betId+'/matches/'+context.params.faseGrupoId).once('value').then((snapshot)=>{
    			snapshot.forEach((childSnapshot)=>{
    				var item=childSnapshot.val();

    				var draw          = 0;
					var won1          = 0;
					var won2          = 0;
					var lost1         = 0;
					var lost2         = 0;
					var points1       = 0;
					var points2       = 0;
					var played        = 0;
					var goalsAgainst1 = 0;
					var goalsFor1     = 0;
					var goalsAgainst2 = 0;
					var goalsFor2     = 0;

					if(item.scoreTeam1 && item.scoreTeam2){
						if(item.scoreTeam1 === item.scoreTeam2){
							draw = 1;
							points1 = 1;
							points2 = 1;
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
						goalsAgainst1 += parseInt(item.scoreTeam2);
						goalsFor1     += parseInt(item.scoreTeam1);
						goalsAgainst2 += parseInt(item.scoreTeam1);
		    			goalsFor2     += parseInt(item.scoreTeam2);
					}

					if(positionTable[item.team1]){
    					positionTable[item.team1]= {
							team : item.team1,
							teamName : item.teamName1,
							draw : positionTable[item.team1].draw + draw,
							goalsAgainst : positionTable[item.team1].goalsAgainst + goalsAgainst1,
							goalsFor : positionTable[item.team1].goalsFor + goalsFor1,
							lost : positionTable[item.team1].lost + lost1,
							order : 0,
							played : positionTable[item.team1].played + played,
							points : positionTable[item.team1].points + points1,
							won : positionTable[item.team1].won + won1
						}
    				}else{
						positionTable[item.team1]= {
							team : item.team1,
							teamName : item.teamName1,
							draw : draw,
							goalsAgainst : goalsAgainst1,
							goalsFor : goalsFor1,
							lost : lost1,
							order : 0,
							played : played,
							points : points1,
							won : won1
						}
    				}
    				if(positionTable[item.team2]){
    					positionTable[item.team2]= {
							team : item.team2,
							teamName : item.teamName2,
							draw : positionTable[item.team2].draw + draw,
							goalsAgainst : positionTable[item.team2].goalsAgainst + goalsAgainst2,
							goalsFor : positionTable[item.team2].goalsFor + goalsFor2,
							lost : positionTable[item.team2].lost + lost2,
							order : 0,
							played : positionTable[item.team2].played + played,
							points : positionTable[item.team2].points + points2,
							won : positionTable[item.team2].won + won2
						}
    				}else{
    					positionTable[item.team2]= {
							team : item.team2,
							teamName : item.teamName2,
							draw : draw,
							goalsAgainst : goalsAgainst2,
							goalsFor : goalsFor2,
							lost : lost2,
							order : 0,
							played : played,
							points : points2,
							won : won2
						}
    				}
	    		});

	    		var orderedGroup = [];
    			Object.keys(positionTable).forEach(function(keyTeam) {
					orderedGroup.push(positionTable[keyTeam]);
				});

				orderedGroup.sort(function(a,b){
					if(b.points === a.points){
						var difGolesA = a.goalsFor - a.goalsAgainst;
						var difGolesB = b.goalsFor - b.goalsAgainst;
						if(difGolesA>difGolesB){
							return -1;//descendente
						}else{
							if(difGolesA === difGolesB){
								if(a.goalsFor>b.goalsFor) return -1
								return 1;
							}else return 1;
						}
					}
					return b.points - a.points;//descendente
				});

				var positionTableAux = {};
				positionTableAux[context.params.faseGrupoId]=orderedGroup;
				return global.init.db.ref('/preBetsAll/'+context.params.betId+'/positionTable/')
				.update(positionTableAux);
    		});
		}else{

			if(context.params.faseGrupoId==='Octavos' ||
			   context.params.faseGrupoId==='Cuartos' ||
			   context.params.faseGrupoId==='Semifinales'){

				if(match.scoreTeam1 && match.scoreTeam2){

					var results = {};
					
					if(match.scoreTeam1 > match.scoreTeam2){
						results['[W'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
						results['[L'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
					}else if(match.scoreTeam1 < match.scoreTeam2){
						results['[W'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
						results['[L'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
					}else{
						if(match.scorePenaltyTeam1 && match.scorePenaltyTeam1){
							if(match.scorePenaltyTeam1 > match.scorePenaltyTeam2){
								results['[W'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
								results['[L'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
							}else if(match.scorePenaltyTeam1 < match.scorePenaltyTeam2){
								results['[W'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
								results['[L'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
							}
						}
					}
					var siguienteFase = 'Cuartos';
					if(context.params.faseGrupoId==='Cuartos'){
						siguienteFase = 'Semifinales';
					}else if(context.params.faseGrupoId==='Semifinales'){
						siguienteFase = 'Final';
					}

					return global.init.db.ref('/preBetsAll/'+context.params.betId+'/matches/'+siguienteFase).once('value').then((snapshot)=>{
						snapshot.forEach((childSnapshot)=>{
							var nextMatch = childSnapshot.val();
							var idMatch = childSnapshot.key;

							if(!nextMatch['teamSource1'] || !nextMatch['teamSource2']){
								nextMatch['teamSource1']=nextMatch.teamName1;
								nextMatch['teamSource2']=nextMatch.teamName2;
							}
							var updated = false;
							if(results[nextMatch.teamSource1]){
								if(nextMatch.team1 !== results[nextMatch.teamSource1].team){
									updated = true;
									nextMatch.team1     = results[nextMatch.teamSource1].team;
									nextMatch.teamName1 = results[nextMatch.teamSource1].teamName;
								}
							}
							if(results[nextMatch.teamSource2]){
								if(nextMatch.team2 !== results[nextMatch.teamSource2].team){
									updated = true;
									nextMatch.team2     = results[nextMatch.teamSource2].team;
									nextMatch.teamName2 = results[nextMatch.teamSource2].teamName;
								}
							}
							if(updated){
								if(results[nextMatch.teamSource1] || results[nextMatch.teamSource2]){
									global.init.db.ref(
										'/preBetsAll/'+context.params.betId+
										'/matches/'+siguienteFase+
										'/'+idMatch).update(nextMatch);
								}
							}
						});
						return 1;
					});
				}
			}
		}
		return 1;
	});
*/

exports.calculateNewPositionTable = () => functions.database.ref('/preBetsAll/{betId}/matches/{faseGrupoId}')
	.onUpdate((change,context) => {
		var group = change.after.val();
		calculatePreMatch(
			group,
			context.params.faseGrupoId,
			context.params.betId,
			'All');
		return 1;
	});

exports.calculateNewPositionTableOct = () => functions.database.ref('/preBetsOct/{betId}/matches/{faseGrupoId}')
	.onUpdate((change,context) => {
		var group = change.after.val();
		calculatePreMatch(
			group,
			context.params.faseGrupoId,
			context.params.betId,
			'Oct');
		return 1;
	});

function calculatePreMatch(group,faseGrupoId,betId,suffix){
	if(faseGrupoId.length === 1 ){//Fase de grupos
		return global.init.db.ref('/preBets'+suffix+'/'+betId+'/matches/'+faseGrupoId).once('value').then((snapshot)=>{
			var positionTable = commons.calcularTablaPosiciones(snapshot,faseGrupoId);
			var positionTableGrupo = {};
			positionTableGrupo[faseGrupoId]=positionTable;
			return global.init.db.ref('/preBets'+suffix+'/'+betId+'/positionTable/')
			.update(positionTableGrupo);
		});
	}else{
		var results = commons.calcularResultadosFaseActual(faseGrupoId,group);
		if(results){
			var siguienteFase = 'Cuartos';
			if(faseGrupoId==='Cuartos'){
				siguienteFase = 'Semifinales';
			}else if(faseGrupoId==='Semifinales'){
				siguienteFase = 'Final';
			}
			return global.init.db.ref('/preBets'+suffix+'/'+betId+'/matches/'+siguienteFase).once('value').then((snapshot)=>{
				var nextMatches = commons.calcularSiguienteFase(results,siguienteFase,snapshot);
				if(nextMatches){
					return global.init.db.ref(
						'/preBets'+suffix+'/'+betId+
						'/matches/'+siguienteFase+'/').update(nextMatches);
				}else{
					return 0;
				}
			});
		}
	}
}