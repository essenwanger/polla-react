const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.listUsers = () => functions.https.onRequest((req, res) => {

    console.log('list users');
    
    var betsRef = global.init.db.ref('/preBetsAll');

    betsRef.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val().profile.email + ',' + childSnapshot.val().profile.name + ',' + childSnapshot.val().completed);
        })
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/matches'));
    
});
