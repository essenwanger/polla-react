// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.calculatePositionTable = () => functions.database.ref('/users/{userId}/bets/{betId}/matches')
    .onWrite((event) => {
		var positionTable={};
		return admin.database().ref('/users/'+event.params.userId+'/bets/'+event.params.betId+'/matches').once('value').then((snapshot)=>{
    		snapshot.forEach((childSnapshot)=>{
    			var item=childSnapshot.val();
    			if(item.group && item.round && item.round === 'GR'){
    				if(!positionTable[item.group]){
    					positionTable[item.group] = {};
    				}
    				var draw = 0;
    				var won1    = 0;
    				var won2    = 0;
    				var lost1   = 0;
    				var lost2   = 0;
    				var points1 = 0;
    				var points2 = 0;
    				var played  = 0;
    				var goalsAgainst1 = 0;
    				var goalsFor1     = 0;
    				var goalsAgainst2 = 0;
    				var goalsFor2     = 0;
    				
    				if(item.scoreTeam1 && item.scoreTeam2){
    					if(item.scoreTeam1 === item.scoreTeam2){
	    					draw = 1;
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
	    				
    				if(positionTable[item.group][item.team1]){
    					positionTable[item.group][item.team1]= {
							team : item.team1,
							teamName : item.teamName1,
							draw : positionTable[item.group][item.team1].draw + draw,
							goalsAgainst : positionTable[item.group][item.team1].goalsAgainst + goalsAgainst1,
							goalsFor : positionTable[item.group][item.team1].goalsFor + goalsFor1,
							lost : positionTable[item.group][item.team1].lost + lost1,
							order : 0,
							played : positionTable[item.group][item.team1].played + played,
							points : positionTable[item.group][item.team1].points + points1,
							won : positionTable[item.group][item.team1].won + won1
						}
    				}else{
						positionTable[item.group][item.team1]= {
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
    				if(positionTable[item.group][item.team2]){
    					positionTable[item.group][item.team2]= {
							team : item.team2,
							teamName : item.teamName2,
							draw : positionTable[item.group][item.team2].draw + draw,
							goalsAgainst : positionTable[item.group][item.team2].goalsAgainst + goalsAgainst2,
							goalsFor : positionTable[item.group][item.team2].goalsFor + goalsFor2,
							lost : positionTable[item.group][item.team2].lost + lost2,
							order : 0,
							played : positionTable[item.group][item.team2].played + played,
							points : positionTable[item.group][item.team2].points + points2,
							won : positionTable[item.group][item.team2].won + won2
						}
    				}else{
    					positionTable[item.group][item.team2]= {
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
    			}
    		});

    		Object.keys(positionTable).forEach(function(keyGroup) {
    			var orderedGroup = [];
    			Object.keys(positionTable[keyGroup]).forEach(function(keyTeam) {
					orderedGroup.push(positionTable[keyGroup][keyTeam]);
				});
				orderedGroup.sort(function(a,b){
					if(b.points === a.points){
						var difGolesA = a.goalsFor - a.goalsAgainst;
						var difGolesB = b.goalsFor - b.goalsAgainst;
						if(difGolesA>difGolesB) return -1;//descendente
						return 1;
					}
					return b.points - a.points;//descendente
				});
				positionTable[keyGroup] = orderedGroup;
    		});

			return admin.database().ref('/users/'+event.params.userId+'/bets/'+event.params.betId).update({
				positionTable: positionTable
			}).then(() => {

				var results = {};

				return admin.database().ref('/users/'+event.params.userId+'/bets/'+event.params.betId+'/matches').once('value').
				then(snapshot => {
					
					snapshot.forEach( childSnapshot => {
						
						var item=childSnapshot.val();

						if(item.round && item.round === 'Octavos'){

							if(!item['teamSource1'] || !item['teamSource2']){
								item['teamSource1']=item.teamName1;
								item['teamSource2']=item.teamName2;
							}

							var position1 = item.teamSource1.substr(1,1)-1;
							var group1    = item.teamSource1.substr(2,1);
							var position2 = item.teamSource2.substr(1,1)-1;
							var group2    = item.teamSource2.substr(2,1);
							
							if(positionTable[group1][position1]){
								if(positionTable[group1][position1].played === 3){
									item.team1 = positionTable[group1][position1].team;
									item.teamName1 = positionTable[group1][position1].teamName;
								}else{
									item.team1 = item.teamSource1;
									item.teamName1 = item.teamSource1;
								}
							}
							if(positionTable[group2][position2]){
								if(positionTable[group2][position2].played === 3){
									item.team2 = positionTable[group2][position2].team;
									item.teamName2 = positionTable[group2][position2].teamName;
								}else{
									item.team2 = item.teamSource2;
									item.teamName2 = item.teamSource2;
								}
							}
							if(positionTable[group1][position1] || 
							   positionTable[group2][position2]){
								admin.database().ref(
									'/users/'+event.params.userId+
									'/bets/'+event.params.betId+
									'/matches/'+childSnapshot.key).update(item);
							}

						}else if(item.round && 
								(item.round === 'Cuartos' || 
								 item.round === 'Semifinales' || 
								 item.round === 'Final')){

							if(!item['teamSource1'] || !item['teamSource2']){
								item['teamSource1']=item.teamName1;
								item['teamSource2']=item.teamName2;
							}

							var idx1 = item.teamSource1.replace('[','').replace(']','');
							var idx2  = item.teamSource2.replace('[','').replace(']','');

							if(results[idx1]){
								item.team1     = results[idx1].team;
								item.teamName1 = results[idx1].teamName;
							}
							if(results[idx2]){
								item.team2     = results[idx2].team;
								item.teamName2 = results[idx2].teamName;
							}
							if(results[idx1] || results[idx2]){
								admin.database().ref(
									'/users/'+event.params.userId+
									'/bets/'+event.params.betId+
									'/matches/'+childSnapshot.key).update(item);
							}
						}
						if(item.scoreTeam1 && item.scoreTeam2){
	    					if(item.scoreTeam1 === item.scoreTeam2){
	    						if(item.scorePenaltyTeam1 && item.scorePenaltyTeam2){
	    							if(item.scoreTeam1<item.scoreTeam2){
	    								results['W'+item.id] = {team:item.team2,teamName:item.teamName2};
		    							results['L'+item.id] = {team:item.team1,teamName:item.teamName1};
	    							}else{
	    								results['W'+item.id] = {team:item.team1,teamName:item.teamName1};
		    							results['L'+item.id] = {team:item.team2,teamName:item.teamName2};
	    							}
	    						}
		    				}else if(item.scoreTeam1<item.scoreTeam2){
		    					results['W'+item.id] = {team:item.team2,teamName:item.teamName2};
		    					results['L'+item.id] = {team:item.team1,teamName:item.teamName1};
		    				}else{
		    					results['W'+item.id] = {team:item.team1,teamName:item.teamName1};
		    					results['L'+item.id] = {team:item.team2,teamName:item.teamName2};
		    				}
	    				}
					});
					return 1;
				}).catch(err => {
        			console.log('Error updating final phase', err);
				});
			});
    	});
});