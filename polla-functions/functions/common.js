const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.listUsers = () => functions.https.onRequest((req, res) => {

    console.log('list users');
    
    var betsRef = global.init.db.ref('/preBetsAll');

    betsRef.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.key + ',' + childSnapshot.val().profile.email + ',' + childSnapshot.val().profile.name + ',' + childSnapshot.val().completed + ',' + childSnapshot.val().payable);
        })
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/matches'));
    
});

exports.payable = () => functions.https.onRequest((req, res) => {

    console.log('payable');

    const email = req.query.email;
    const payable = req.query.payable;
  
    
    var betsRef = global.init.db.ref('/preBetsAll');

    betsRef.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var preBet = childSnapshot.val();

            if(preBet.profile.email === email) {
                global.init.db.ref('/preBetsAll/' + childSnapshot.key).update({
                    "payable": 'true'
                }).catch(error => {
                    this.errorMessage = 'Error - ' + error.message
                });
                return true;
            }
        })
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/preBetsAll'));
    
});

exports.payableCompleted = () => functions.https.onRequest((req, res) => {

    console.log('payable');

    var betsRef = global.init.db.ref('/preBetsAll');

    betsRef.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var preBet = childSnapshot.val();

            if(preBet.completed === true) {
                console.log('payable true');
                global.init.db.ref('/preBetsAll/' + childSnapshot.key).update({
                    "payable": true
                }).catch(error => {
                    this.errorMessage = 'Error - ' + error.message
                });
            }
        })
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/preBetsAll'));
    
});