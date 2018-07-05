// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.calculateRankingCua = () => functions.database.ref('/betsCua/{betId}/matches/{faseGrupoId}/{matchId}')
    .onUpdate((change,context) => {
    	var betId = context.params.betId;
    	return calcularRankingProc(betId,'Cua');
    });

exports.calculateRankingOct = () => functions.database.ref('/betsOct/{betId}/matches/{faseGrupoId}/{matchId}')
    .onUpdate((change,context) => {
    	var betId = context.params.betId;
    	return calcularRankingProc(betId,'Oct');
    });

exports.calculateRanking = () => functions.database.ref('/betsAll/{betId}/matches/{faseGrupoId}/{matchId}')
    .onUpdate((change,context) => {
    	var betId = context.params.betId;
    	return calcularRankingProc(betId,'All');
    });

function calcularRankingProc(betId, suffix){
	return global.init.db.ref('/bets'+suffix+'/'+betId+'/matches/').once('value').then((snapshot)=>{
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
		return global.init.db.ref('/ranking'+suffix+'/'+betId).update({
			totalPoints:totalPoints});
	}).catch(error => {
		console.log('Error:'+error.message);
	});
}