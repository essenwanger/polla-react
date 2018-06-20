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
        return 1;
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/matches'));
    
});

exports.payable = () => functions.https.onRequest((req, res) => {

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
        return 1;
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/preBetsAll'));
    
});

exports.payableCompleted = () => functions.https.onRequest((req, res) => {

    console.log('list bets payable and completed');

    var betsRef = global.init.db.ref('/preBetsAll');

    betsRef.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var preBet = childSnapshot.val();

            if(preBet.completed === true) {
                global.init.db.ref('/preBetsAll/' + childSnapshot.key).update({
                    "payable": true
                }).catch(error => {
                    this.errorMessage = 'Error - ' + error.message
                });
            }
        })
        return 1;
    }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
    });

    return res.redirect(303, global.init.db.ref('/preBetsAll'));
    
});

exports.allBets = () => functions.https.onRequest((req, res) => {

    console.log('export all bets');

    var betsRef = global.init.db.ref('/betsAll');

    var output  = "";

    betsRef.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var bet = childSnapshot.val();            
            var betKey = childSnapshot.key;
            
            if(bet.completed) {
                var email = bet.profile.email;
                var name = bet.profile.name;
                output += name + ',' + email + ',';
                for(var groupKey in bet.matches) {
                    var matches = bet.matches[groupKey];

                    for(var matchKey in matches) {
                        var match = matches[matchKey]; 
                        if(groupKey.length > 1) {
                            output += match.id + ',' + match.team1 + ',' + match.team2 + ',' + match.scoreTeam1 + '.' + match.scorePenaltyTeam1 + ',' + match.scoreTeam2 + '.' + match.scorePenaltyTeam2 + ',';
                        } else {
                            output += match.id + ',' + match.team1 + ',' + match.team2 + ',' + match.scoreTeam1 + ',' + match.scoreTeam2 + ',';
                        }
                    }
                output += '<br />';
                console.log(output);
            }
        })
        return res.status(200).send(output);
    }).catch(error => {
        this.errorMessage = 'Error - ' + error.message
    });

    //return res.redirect(303, global.init.db.ref('/matches'));
    
});