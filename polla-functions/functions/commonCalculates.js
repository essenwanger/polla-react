exports.calcularResultMatch = (match) => {
	if(match.scoreTeam1 && match.scoreTeam2){

		match.scoreTeam1 = match.scoreTeam1.trim();
		match.scoreTeam2 = match.scoreTeam2.trim();

		if(!match.group || match.group === ''){
			match.group = match.round;
		}
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
	}
	return match;
}

exports.calcularTablaPosiciones = (snapshot,group) => {
	var positionTable={};
	snapshot.forEach((childSnapshot)=>{
		var item = childSnapshot.val();
		if(item.group && item.group === group){
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
					if(a.goalsFor>b.goalsFor) {
						return -1
					} 
					return 1;
				}else return 1;
			}
		}
		return b.points - a.points;//descendente
	});
	return orderedGroup;
}

exports.calcularOctavos = (positionTable,group,snapshot) => {
	var matches = {};
	snapshot.forEach((childSnapshot)=>{
    	var match=childSnapshot.val();
    	if(match.group === 'Octavos' ||
    		match.round === 'Octavos'){
    		if(!match['teamSource1'] || !match['teamSource2']){
				match['teamSource1']=match.teamName1;
				match['teamSource2']=match.teamName2;
			}
			var position1 = match.teamSource1.substr(1,1)-1;
			var group1    = match.teamSource1.substr(2,1);
			var position2 = match.teamSource2.substr(1,1)-1;
			var group2    = match.teamSource2.substr(2,1);
			var updated   = false;
			if(group1 === group){
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
			if(group2 === group){
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
				matches[childSnapshot.key] = match;
			}
    	}	
    });
    return matches;
}

exports.calcularResultadosFaseActual = (group,matches) => {
	var results = {};
	if(group==='Octavos' ||
	   group==='Cuartos' ||
	   group==='Semifinales'){
		for(var matchKey in matches){
			var match = matches[matchKey];
			if(match.scoreTeam1 && match.scoreTeam2){
				var scoreTeam1 = parseInt (match.scoreTeam1);
				var scoreTeam2 = parseInt (match.scoreTeam2);
				if(scoreTeam1 > scoreTeam2){
					results['[W'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
					results['[L'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
				}else if(scoreTeam1 < scoreTeam2){
					results['[W'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
					results['[L'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
				}else{
					if(match.scorePenaltyTeam1 && match.scorePenaltyTeam2){
						var scorePenaltyTeam1 = parseInt (match.scorePenaltyTeam1);
						var scorePenaltyTeam2 = parseInt (match.scorePenaltyTeam2);
						if(scorePenaltyTeam1 > scorePenaltyTeam2){
							results['[W'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
							results['[L'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
						}else if(scorePenaltyTeam1 < scorePenaltyTeam2){
							results['[W'+match.id+']'] = {teamName:match.teamName2,team:match.team2};
							results['[L'+match.id+']'] = {teamName:match.teamName1,team:match.team1};
						}
					}
				}
			}
		}
		return results;
	}
}

exports.calcularSiguienteFase = (results,group,snapshot) => {
	var nextMatches = {};
	snapshot.forEach((childSnapshot)=>{

		var nextMatch = childSnapshot.val();
		var idMatch = childSnapshot.key;

		if(nextMatch.round === group ||
			nextMatch.group === group){
			
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
					nextMatches[idMatch]= nextMatch;
				}
			}
		}
	});
	return nextMatches;
}