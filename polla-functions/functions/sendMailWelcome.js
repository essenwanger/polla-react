const functions = require('firebase-functions');

// Configuracion Sendgrid
const SENDGRID_API_KEY = "";
const SENDGRID_SENDER = "contacto@chaman.pe";
const PLANTILLA = "";
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);

exports.initialize = (laPollaConfig) => {
    global.init = Object.freeze(laPollaConfig);
}

exports.sendMailWelcome = () => functions.database.ref('/users/{userId}').onCreate((snap, context) => {
        console.log("Trigger Correo");
        console.log(context.params.userId);
		return global.init.db.ref('/users/'+context.params.userId+'/profile').once('value').then(snapshot=>{
    		
				var item=snapshot.val();
                var nombre, correo;
                console.log(item);
				nombre = item.givenName;
				correo = item.email;

				const sgReq = Sendgrid.emptyRequest({
					method: 'POST',
					path: '/v3/mail/send',
					body: {
					  personalizations: [{
						to: [{ email: correo }],
						substitutions: {
						  "-name-": nombre
						}, 
						subject: 'Bienvenidos a la Polla del Chaman!',     
					  }],
					  from: { email: SENDGRID_SENDER },
					  content: [{
						type: 'text/html',
						value: 'Bienvenidos a la Polla del Chaman!'
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
        })
            
});		