// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const pdf  = require('html-pdf');
const gcs  = require('@google-cloud/storage')();
const path = require('path');
const os   = require('os');
const fs   = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

//const gmailEmail    = functions.config().gmail.email;
//const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '-----------@gmail.com',
    pass: '-----------',
  },
});

const APP_NAME = 'Shaman';

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
};

exports.generateBetsPDF = () => functions.https.onRequest((req, response) => {
	
	const options = {
    	"format": 'A4',
    	"orientation": "portrait"
	};
	const bucket = gcs.bucket('shaman-5b899.appspot.com');
	const localTemplate = path.join(os.tmpdir(), 'localTemplate.html');
	const localPDFFile  = path.join(os.tmpdir(), 'localPDFFile.pdf');

	return global.init.db.ref('/typeBets/').once('value').then((snapshot)=>{
		snapshot.forEach((childSnapshot)=>{
			var typeBet = childSnapshot.val();
			//if(typeBet.status !== 'opened'){
				return global.init.db.ref('/bets'+typeBet.suffix).once('value').then((snapshot)=>{
					var bets = [];
					snapshot.forEach((childSnapshot)=>{
						var item = childSnapshot.val();
						var key  = childSnapshot.key;
						bets.push({
							givenName : item.profile.givenName,
							email     : item.profile.email
						});
					});
					const context = {
				    	"date"   : new Date().toISOString(),
				    	"title"  : APP_NAME,
				    	"bets"   : bets
					};
					bucket.file('template.html').download({ destination: localTemplate }).then(() => {
					    const source = fs.readFileSync(localTemplate, 'utf8');
					    const html = handlebars.compile(source)(context);
					    return pdf.create(html, options).toFile(localPDFFile, function(err, res) {
							if (err){
								return response.status(400).send("PDF creation error");
							}
							return bucket.upload(localPDFFile, { destination: typeBet.suffix + '.pdf', metadata: { contentType: 'application/pdf'}}).then(() => {
								return response.status(200).send("PDF creation done!");
							}).catch(error => {
								return response.status(400).send("PDF creation failed :(!");
							});
					    });
					}).catch(error => {
						this.errorMessage = 'Error - ' + error.message
					});
					return 1;
				});
			//}
		});
		return 1;
	});
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
			return global.init.db.ref('/ranking'+typeBetSuffix).once('value').then((snapshot)=>{
				snapshot.forEach((childSnapshot)=>{
					var item = childSnapshot.val();
					var key  = childSnapshot.key;
					sendStartingEmail(item.profile.email,item.profile.givenName,tempFilePath);
				});
				return 1;
			});
		}).catch(error => {
			this.errorMessage = 'Error - ' + error.message
		});
	}else{
		return 0;
	}
});

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