// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const commons   = require('./commonCalculates');

const SENDGRID_API_KEY = "";
const SENDGRID_SENDER  = "contacto@shaman.pe";
const PLANTILLA        = "";
const PLANTILLA_EXEC   = "";
const Sendgrid         = require('sendgrid')(SENDGRID_API_KEY);

const APP_NAME = 'Shaman';

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

exports.sendMailMatchLaunch = () => functions.https.onRequest((req, response) => {
	return global.init.db.ref('/matches').once('value').then((snapshot)=>{
		var body = '<table>'+
		             '<thead>'+
		               '<tr><td>Partido</td><td>Link</td></tr>'+
		             '</thead>'+
		             '<tbody>';
		snapshot.forEach((childSnapshot)=>{
			var match = childSnapshot.val();
			var key   = childSnapshot.key;
			if(!match.group || match.group === ''){
				match.group = match.round;
			}
			body += '<tr>'+
			           '<td>'+match.group+'['+key+','+match.teamName1+','+match.teamName2+']'+'</td>'+
			           '<td>'+
			           '<a href="https://us-central1-shaman-5b899.cloudfunctions.net/sendMailMatch?matchId='+key+'">Start</a>'+
			           '<br>'+
			           '<a href="https://us-central1-shaman-5b899.cloudfunctions.net/sendMailMatch?matchId='+key+'&demo=none.carlos">StartDemo</a>'+
			           '<br><br>'+
			           '</td>'+
			        '</tr>';
		});
		body += '</tbody></table>';
		var email = 'none.carlos@gmail.com';
		sendExecMatchEmail(email,body);
		return response.status(200).send("Mailing already sent!");
	});
});

exports.sendMailMatch = () => functions.https.onRequest((req, response) => {
	const matchID = req.query.matchId;
	const demo = req.query.demo;
	var match = {};
	var template = {};
	var details = [];
	return global.init.db.ref('/matches/'+matchID).once('value').then((snapshot)=>{
		match = snapshot.val();

		match.scoreCount  = 0;
		match.scoreSum1   = 0;
		match.scoreSum2   = 0;
		match.resultCount = {
			team1 : 0,
			team2 : 0,
			empate : 0
		};
		match.detailString = '';

		if(!match.group || match.group === ''){
			match.group = match.round;
		}
	
		return global.init.db.ref('/betsAll').once('value').then((snapshot)=>{
			snapshot.forEach((childSnapshot)=>{
				var matchUser = childSnapshot.val().matches[match.group][matchID];
				var profile   = childSnapshot.val().profile;
				matchUser = commons.calcularResultMatch(matchUser);
				match.scoreCount +=1;
				match.scoreSum1  += parseInt(matchUser.scoreTeam1);
				match.scoreSum2  += parseInt(matchUser.scoreTeam2);
				if(matchUser.result === 1){
					match.resultCount.team1 +=1;
				}else if(matchUser.result === 2){
					match.resultCount.team2 +=1;
				}else{
					match.resultCount.empate +=1;
				}
				details.push({
					name:profile.givenName,
					score1:matchUser.scoreTeam1,
					score2:matchUser.scoreTeam2});
			});
			return match;
		}).then( () => {
			
			match.scoreMedia1 = Math.round(match.scoreSum1/match.scoreCount);
			match.scoreMedia2 = Math.round(match.scoreSum2/match.scoreCount);
			match.favs = [];
			match.favs.push({team:match.team1,teamname:match.teamName1,percent:Math.round(match.resultCount.team1 /match.scoreCount*100)});
			match.favs.push({team:match.team2,teamname:match.teamName2,percent:Math.round(match.resultCount.team2 /match.scoreCount*100)});
			match.favs.push({team:'='        ,teamname:'Empate'       ,percent:Math.round(match.resultCount.empate/match.scoreCount*100)});
			match.favs.sort(function(a,b){
				if(b.percent === a.percent){
					if(b.team === '='){
						return -1;
					}
					return 1;
				}
				return b.percent - a.percent;//descendente
			});
			
			details.sort(function(a,b){
				if(a.name.toUpperCase()>b.name.toUpperCase()) return 1;
				return -1;
			});

			for (var i = 0; i < details.length; i++) {
    			var style = '';
				if(i%2===0){
					style='style="background-color: white"';
				}
    			match.detailString += 
					'<tr '+style+'>'+
	                	'<td style="padding: 5px">'+details[i].name.toUpperCase()+'</td>'+
	                	'<td style="text-align:center"> '+
	                		details[i].score1+'-'+details[i].score2+' '+
	                	'</td>'+
	              	'</tr>';
			}
			
			template.teamname1 = match.teamName1.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
			template.teamname2 = match.teamName2.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
			template.team1     = match.team1;
			template.team2     = match.team2;
			template.score1    = String(match.scoreMedia1);
			template.score2    = String(match.scoreMedia2);
			template.rad11     =  '75';
			template.rad12     =  '25';
			template.rad21     =  '20';
			template.rad22     =  '80';
			template.teamfav   =  match.favs[0].team;
			template.teamnamefav1 =  match.favs[0].teamname.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
			template.teamnamefav2 =  match.favs[1].teamname.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
			template.teamnamefav3 =  match.favs[2].teamname.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
			template.percent1     =  String(match.favs[0].percent);
			template.percent2     =  String(match.favs[1].percent);
			template.percent3     =  String(match.favs[2].percent);
			template.filas        =  
			'<table>'+
			'<thead>'+
              '<tr>'+
                '<th style="padding:10px 30px 5px 30px;color:#363636;">Participante</th>'+
                '<th style="padding:10px 30px 5px 30px;color:#363636;">Score</th>'+
              '</tr>'  +
            '</thead>'+
            '<tbody>'+
              match.detailString+
            '</tbody>'+
          	'</table>';

			return template;
		}).then( () => {
			if(demo){
				var email = demo+'@gmail.com';
				sendMatchEmail(match,template,email);
				return response.status(200).send("Mailing already sent!");
			}else{
				return global.init.db.ref('/rankingAll').once('value').then((snapshot)=>{
					snapshot.forEach((childSnapshot)=>{
						var user = childSnapshot.val();
						var key  = childSnapshot.key;
						sendMatchEmail(match,template,user.profile.email);
					});
					return response.status(200).send("Mailing already sent!");
				});
			}
		}).catch(error => {
        	console.log(error.message);
        	return response.status(400).send("Something failed, check logs for details!");
		});
	});
});

function sendExecMatchEmail(email,body){
	const sgReq = Sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: {
		  personalizations: [{
			to: [{ email: email }],
			subject: 'Lista de ejecuciones para la previa'   
		  }],
		  from: { email: SENDGRID_SENDER },
		  content: [{
			type: 'text/html',
			value: body
		  }],
		  template_id: PLANTILLA_EXEC
		}
	});
	Sendgrid.API(sgReq, (err) => {
		if (err) {
		  console.log(err);
		  return;
		}
    });
    return;
}

function sendMatchEmail(match,template,email){
	const sgReq = Sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: {
		  personalizations: [{
			to: [{ email: email }],
			substitutions: {
			  "-teamname1-": template.teamname1,
			  "-teamname2-": template.teamname2,
			  "-team1-"    : template.team1,
			  "-team2-"    : template.team2,
			  "-score1-"   : (template.score1==='0'?'O':template.score1),
			  "-score2-"   : (template.score2==='0'?'O':template.score2),
			  "-rad11-"    : template.rad11,
			  "-rad12-"    : template.rad12,
			  "-rad21-"    : template.rad21,
			  "-rad22-"    : template.rad22,
			  "-teamfav-"  : template.teamfav,
			  "-porc1-"    : (template.percent1==='0'?'O':template.percent1),
			  "-porc2-"    : (template.percent2==='0'?'O':template.percent2),
			  "-porc3-"    : (template.percent3==='0'?'O':template.percent3),
			  "-teamnamefav1-": template.teamnamefav1,
			  "-teamnamefav2-": template.teamnamefav2,
			  "-teamnamefav3-": template.teamnamefav3,
			  "-filas-": template.filas
			}, 
			subject: `La previa del ${match.teamName1} vs ${match.teamName2} ✔`    
		  }],
		  from: { email: SENDGRID_SENDER },
		  content: [{
			type: 'text/html',
			value: `La previa del ${match.teamName1} vs ${match.teamName2} ✔`
		  }],
		  template_id: PLANTILLA
		}
	});
	Sendgrid.API(sgReq, (err) => {
		if (err) {
		  console.log(err);
		  return;
		}
    });
    return;
}