const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

exports.createPollaOct = () => functions.database.ref('/preBetsOct/{betId}/profile')
	.onWrite((change,context) => {
	var user = change.after.val();
	return construirPolla(user,context.params.betId,'Oct');
});

exports.createPolla = () => functions.database.ref('/preBetsAll/{betId}/profile')
	.onWrite((change,context) => {
	var user = change.after.val();
	return construirPolla(user,context.params.betId,'All');
});
/*
exports.createPollaTest = () => functions.https.onRequest((req, res) => {
	//const suffix = req.query.suffix;
	const suffix = 'Oct';
	const betId = '-LGC94wo3MufJnllRjr4';
	return global.init.db.ref('/preBets'+suffix+'/'+betId+'/profile').once('value').then((snapshot)=>{
		var user = snapshot.val();
		construirPolla(user,betId,suffix);
		return res.status(200).send("Polla created!");
	}).catch(error => {
		return res.status(400).send(error.message);
	});
});
*/
function construirPolla(user, betID, suffix){
	return global.init.db.ref('/preBets'+suffix+'/'+betID).once('value').then((snapshot)=>{
		var preBetsIni = snapshot.val();
		var tipoPollaKey = preBetsIni.type;
		return global.init.db.ref('/typeBets/'+tipoPollaKey).once('value').then((snapshot)=>{
			var matches={};
			var groups=[];
			var tipoPolla = snapshot.val();

			var count = 0;
    		global.init.db.ref('users/'+user.userID+'/bets').once('value').then((snapshot)=>{
    			snapshot.forEach(function(childSnapshot) {
    				var tipoPollaUser = childSnapshot.val();
					var tipoPollaKey  = childSnapshot.key;
					if(Array.isArray(tipoPollaUser)){
						count += tipoPollaUser.length;
					}else{
						count += 1;
					}
    			});

    			console.log(count);

    			var subscribed = {
	      			profile: user,
	      			count: count
	    		};

	    		console.log('/subscribed'+suffix+'/'+user.userID);

	    		return global.init.db.ref('/subscribed'+suffix+'/'+user.userID)
				.update(subscribed);

    		}).catch(error => {
	    		console.log('Error:'+error.message);
	    	});

			global.init.db.ref('/matches').once('value').then((snapshot)=>{

				snapshot.forEach(function(childSnapshot) {
					var item = childSnapshot.val();
					var key  = childSnapshot.key;
					var add  = true;
					if(tipoPolla.matchBase){
						if(item.id < tipoPolla.matchBase){
							add = false;
						}
					}
					if(add){

						if(item.group!=='' && matches[item.group]===undefined){
							groups.push({group: item.group, percentage: '0'});
							matches[item.group]=[];
						}
						if(item.group==='' && matches[item.round]===undefined){
							groups.push({group: item.round, percentage: '0'});
							matches[item.round]=[];
						}
						if(item.group!==''){
							matches[item.group][key]=item;
						}
						if(item.group===''){
							matches[item.round][key]=item;
						}
					}
				});

				var preBetsUser = {
					matches: matches,
					groups: groups,
					payable: "false",
					date: new Date().toISOString()
				};

				return global.init.db.ref('/preBets'+suffix+'/'+betID)
				.update(preBetsUser);

			}).catch(error => {
	    		console.log('Error:'+error.message);
	    		this.errorMessage = 'Error - ' + error.message;
	    	});

	    	return 1;
		});
	}).catch(error => {
		console.log('Error:'+error.message);
	});
}