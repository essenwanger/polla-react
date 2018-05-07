// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.addUser = () => functions.https.onRequest((req, res) => {
	if (req.method === "POST") {
		res.status(200).json({
			message: 'I am Happy =)'

		});
		return;
   }
   return;
});