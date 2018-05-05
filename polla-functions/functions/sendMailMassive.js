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
    user: 'ssssssssss@gmail.com',
    pass: 'ssssssssss',
  },
});

const APP_NAME = 'Shaman';

exports.initialize = (laPollaConfig) => {
	global.init = Object.freeze(laPollaConfig);
};

exports.sendMailMassive = () => functions.https.onRequest((req, response) => {
	const user = {
    	"date": new Date().toISOString(),
    	"firstname" : "Carlos Sosa",
	};
	const options = {
    	"format": 'A4',
    	"orientation": "portrait"
	};
	const bucket = gcs.bucket('shaman-5b899.appspot.com');
	const localTemplate = path.join(os.tmpdir(), 'localTemplate.html');
	const localPDFFile  = path.join(os.tmpdir(), 'localPDFFile.pdf');
	bucket.file('template.html').download({ destination: localTemplate }).then(() => {
	    console.log("template downloaded locally");
	    const source = fs.readFileSync(localTemplate, 'utf8');
	    const html = handlebars.compile(source)(user);
	    console.log("template compiled with user data", html);
	    return pdf.create(html, options).toFile(localPDFFile, function(err, res) {
			if (err){
				console.log(err);
				return response.status(400).send("PDF creation error");
			}
			console.log("pdf created locally");
			return bucket.upload(localPDFFile, { destination: user.name + '.pdf', metadata: { contentType: 'application/pdf'}}).then(() => {
				sendStartingEmail('none.carlos@gmail.com','Carlos',localPDFFile);
				return response.status(200).send("PDF created and uploaded!");
			}).catch(error => {
				console.error(error);
				return response.status(400).send("PDF creation failed :(!");
			});
		});
	}).catch(error => {
		this.errorMessage = 'Error - ' + error.message
	});
});

function sendStartingEmail(email, displayName, pathFile) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
    attachments: [{
    	filename: 'constancia_de_apuestas.pdf',
        path: pathFile
    }]
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New welcome email sent to:', email);
  });
}