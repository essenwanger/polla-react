// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

exports.calculateLlavesOctavos = () => functions.database.ref('/preBetsAll/{betId}/positionTable/{faseGrupoId}')
	.onUpdate((change,context) => {

	var positionTable = change.after.val();
	return global.init.db.ref('/preBetsAll/'+context.params.betId+'/matches/Octavos').once('value').then((snapshot)=>{
		var matches = commons.calcularOctavos(positionTable,context.params.faseGrupoId,snapshot);
	    console.log(matches.length);
	    return global.init.db.ref(
				'/preBetsAll/'+context.params.betId+
				'/matches/Octavos/').update(matches);
	});
});