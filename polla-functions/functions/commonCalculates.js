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
					if(a.goalsFor>b.goalsFor) return -1
					return 1;
				}else return 1;
			}
		}
		return b.points - a.points;//descendente
	});
	return orderedGroup;
}