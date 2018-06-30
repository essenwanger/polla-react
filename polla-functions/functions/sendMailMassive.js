// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const pdf  = require('html-pdf');
const gcs  = require('@google-cloud/storage')();
const path = require('path');
const os   = require('os');
const fs   = require('fs');
const handlebars = require('handlebars');
const base64 = require('file-base64');

const SENDGRID_API_KEY = "";
const SENDGRID_SENDER  = "contacto@shaman.pe";
const PLANTILLA        = "";
const Sendgrid         = require('sendgrid')(SENDGRID_API_KEY);

//const nodemailer  = require('nodemailer');
//const sgTransport = require('nodemailer-sendgrid-transport');
//const gmailEmail    = functions.config().gmail.email;
//const gmailPassword = functions.config().gmail.password;
/*
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '-------@gmail.com',
    pass: '-------',
  },
});
*/

const APP_NAME = 'Shaman';
/*
var options = {
  auth: {
    api_user: '',
    api_key: ''
  }
}*/
//const mailTransport = nodemailer.createTransport(sgTransport(options));

/*
var mailTransport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: '',
    pass: ''
  }
});
*/

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
	handlebars.registerHelper('table', function(items) {
  		var out = 
  		'<table class="w3-table w3-bordered w3-striped w3-border">'+
  			'<tbody><tr class="w3-green"><th>Nombre</th><th>Correo</th></tr></tbody>'+
  			'<tbody>';
		for (var i = 0; i < items.length; i++ ) {
		    out += '<tr>';
		    for (var key in items[i]) {
				out += '<td>' + items[i][key] + '</td>';
		    }
			out += '</tr>';
		}
		out + '</tbody></table>';
		return new handlebars.SafeString (out);
	});
	handlebars.registerHelper('tableDetail', function(items) {
  		var out = 
  		'<table class="w3-table w3-bordered w3-striped w3-border">'+
  			'<tbody><tr class="w3-green"><th>Fase</th><th>ID</th><th>Partido</th></tr></tbody>'+
  			'<tbody>';
		for (var i = 0; i < items.length; i++ ) {
			out += '<tr class="w3-red">';
		    out += '<td colspan="3">' + items[i]['title'] + '</td>';
		    out += '</tr>';
		    for (var j = 0; j < items[i]['data'].length; j++ ) {
		    	var match = items[i]['data'][j];
		    	out += '<tr>';
		    	out += '<td>' + match.groupKey + '</td>';
		    	out += '<td>' + match.matchId  + '</td>';
		    	if(match.scorePenaltyTeam1 || match.scorePenaltyTeam2){
		    		out += '<td>' + match.teamName1 + '('+match.scoreTeam1+')'+'('+match.scorePenaltyTeam1+')'+
		    	           ' vs ' + match.teamName2 + '('+match.scoreTeam2+')'+'('+match.scorePenaltyTeam2+')'+
		    	           '</td>';
		    	}else{
		    		out += '<td>' + match.teamName1 + '('+match.scoreTeam1+')'+
		    	           ' vs ' + match.teamName2 + '('+match.scoreTeam2+')'+
		    	           '</td>';
		    	}
		    	out += '</tr>';
		    }

		    /*
			data['groupKey']   = groupKey;
			data['matchKey']   = matchKey;
			data['matchId']    = matchItem.id;
			data['teamName1']  = matchItem.teamName1;
			data['teamName2']  = matchItem.teamName2;
			data['scoreTeam1'] = matchItem.scoreTeam1;
			data['scoreTeam2'] = matchItem.scoreTeam2;
			data['scorePenaltyTeam1'] = matchItem.scorePenaltyTeam1;
			data['scorePenaltyTeam2'] = matchItem.scorePenaltyTeam2;
		    */
		}
		out + '</tbody></table>';
		return new handlebars.SafeString (out);
	});


};

exports.generateBetsPDF = () => functions.https.onRequest((req, response) => {
	
	const suffix = req.query.suffix;

	const options = {
    	"format": 'A4',
    	"orientation": "portrait"
	};
	//const bucket = gcs.bucket('shaman-5b899.appspot.com');
	const bucket = gcs.bucket('polla-react.appspot.com');
	const localTemplate = path.join(os.tmpdir(), 'localTemplate.html');
	const localPDFFile  = path.join(os.tmpdir(), 'localPDFFile.pdf');

	//return global.init.db.ref('/typeBets/').once('value').then((snapshot)=>{
		//snapshot.forEach((childSnapshot)=>{
			//var typeBet = childSnapshot.val();
			//if(typeBet.status !== 'opened'){
				//var suffix = typeBet.suffix;
				return global.init.db.ref('/bets'+suffix).once('value').then((snapshot)=>{
					var bets  = [];
					var users = [];
					snapshot.forEach((childSnapshot)=>{
						var item = childSnapshot.val();
						var key  = childSnapshot.key;
						users.push({
							givenName : item.profile.givenName,
							email     : item.profile.email
						});

						var detail = [];
						for(var groupKey in item.matches){
							var groupItem = item.matches[groupKey];
							for(var matchKey in groupItem){
								var matchItem = groupItem[matchKey];
								var data = {};
								data['groupKey']   = groupKey;
								data['matchKey']   = matchKey;
								data['matchId']    = matchItem.id;
								data['teamName1']  = matchItem.teamName1;
								data['teamName2']  = matchItem.teamName2;
								data['scoreTeam1'] = matchItem.scoreTeam1;
								data['scoreTeam2'] = matchItem.scoreTeam2;
								data['scorePenaltyTeam1'] = matchItem.scorePenaltyTeam1;
								data['scorePenaltyTeam2'] = matchItem.scorePenaltyTeam2;
								/*
								var data = {
									groupKey   = groupKey,
									matchKey   = matchKey,
									matchId    = matchItem.id,
									teamName1  = matchItem.teamName1,
									teamName2  = matchItem.teamName2,
									scoreTeam1 = matchItem.scoreTeam1,
									scoreTeam2 = matchItem.scoreTeam2,
									scorePenaltyTeam1 = matchItem.scorePenaltyTeam1,
									scorePenaltyTeam2 = matchItem.scorePenaltyTeam2	
								};*/
								detail.push(data);
							}
						}
						bets.push({
							title     : item.profile.email,
							data      : detail
						});
					});
					const context = {
				    	"date"    : new Date().toISOString(),
				    	"title"   : APP_NAME,
				    	"users"   : users,
				    	"bets"    : bets
					};
					return bucket.file('template.html').download({ destination: localTemplate }).then(() => {
					    const source = fs.readFileSync(localTemplate, 'utf8');
					    const html = handlebars.compile(source)(context);
					    return pdf.create(html, options).toFile(localPDFFile, function(err, res) {
							if (err){
								return response.status(400).send("PDF creation error");
							}
							return bucket.upload(localPDFFile, { destination: suffix + '.pdf', metadata: { contentType: 'application/pdf'}}).then(() => {
								return response.status(200).send("PDF creation done!");
							}).catch(error => {
								return response.status(400).send("PDF creation failed :(!");
							});
					    });
					}).catch(error => {
						console.log(error.message);
					});
				}).catch(error => {
					console.log(error.message);
				});
			//}
		//});
		//return 1;
	//});
});

exports.sendMailMassive = () => functions.storage.object().onFinalize((object) => {
	const fileBucket = object.bucket; // The Storage bucket that contains the file.
	const filePath = object.name; // File path in the bucket.
	const contentType = object.contentType; // File content type.
	const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
	const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
	const fileName = path.basename(filePath);
	const typeBetSuffix = path.basename(filePath,'.pdf');
	const bucket = gcs.bucket(fileBucket);
	if(contentType === 'application/pdf'){
		console.log(contentType);
		const tempFilePath = path.join(os.tmpdir(), fileName);
		return bucket.file(filePath).download({
			destination: tempFilePath,
		}).then(() => {
			console.log(typeBetSuffix);
			return base64.encode(tempFilePath, function(err, base64String) {
				if (err) {
					console.log(err);
					return;
				}
				console.log(base64String.length);
  				
  				return global.init.db.ref('/ranking'+typeBetSuffix).once('value').then((snapshot)=>{
					snapshot.forEach((childSnapshot)=>{
						var item = childSnapshot.val();
						var key  = childSnapshot.key;
						sendStartingEmail(item.profile.email,item.profile.givenName,base64String);
					});
					return 1;
				});
				
				//sendStartingEmail('none.carlos@gmail.com','Carlitos',base64String);
				//return 1;
			});
		}).catch(error => {
			this.errorMessage = 'Error - ' + error.message
		});
	}else{
		return 0;
	}
});

/*
function sendStartingEmail(email, displayName, pathFile) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
    attachments: [{
    	filename: 'apuestas.pdf',
        path: pathFile
    }]
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Es hora de jugar en ${APP_NAME} ✔`;
  //mailOptions.html = `Hola ${displayName || ''}! Se cerraron las apuestas, a partir de este momento.`;
  mailOptions.html =
  	`<p><b>Hola ${displayName || ''}!</b></p>` +
	'<p>Aqu&iacute; te dejamos un documento con el resumen de todos los participantes y sus apuestas.</p>';
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New welcome email sent to:', email);
  });
}
*/
function sendStartingEmail(email,displayName, base64String){
	var fecha = new Date();
	const sgReq = Sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: {
		  personalizations: [{
			to: [{ email: email }],
			substitutions: {
			  "-name-": displayName,
			  "-finicio-": fecha.toString()
			}, 
			subject: `Es hora de jugar en ${APP_NAME} ✔`    
		  }],
		  from: { email: SENDGRID_SENDER },
		  content: [{
			type: 'text/html',
			value: `Es hora de jugar en ${APP_NAME} ✔`
		  }],
		  attachments : [{
		  	filename : 'apuestas.pdf',
		  	type: 'application/pdf',
		  	content: base64String
		  }],
		  template_id: PLANTILLA
		}
	});
	//console.log(sgReq);
	Sendgrid.API(sgReq, (err) => {
		if (err) {
		  console.log(err);
		  return;
		}
    });
    return;
}