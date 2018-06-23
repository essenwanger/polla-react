const functions = require('firebase-functions');

exports.initialize = (laPollaConfig) => {
  global.init = Object.freeze(laPollaConfig);
};

exports.randomScoreMatches = () => functions.https.onRequest((req, res) => {
  var scoreTeam1;
  var scoreTeam2;
  var scorePenaltyTeam1 = '';
  var scorePenaltyTeam2 = '';
  var matchRef = global.init.db.ref('/matches');

  matchRef.once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.key < 48) {
      //if (childSnapshot.key >= 0) {
        scoreTeam1 = Math.floor(Math.random() * 4) + '';
        scoreTeam2 = Math.floor(Math.random() * 4) + '';
        scorePenaltyTeam1 = '';
        scorePenaltyTeam2 = '';

        if (childSnapshot.key >= 48) {
          if (scoreTeam1 === scoreTeam2) {
            scorePenaltyTeam1 = (Math.floor(Math.random() * 2) + 4) + '';
            scorePenaltyTeam2 = (parseInt(scorePenaltyTeam1) + (Math.random() < 0.5 ? -1 : 1)) + '';
          }
          sleep(1000);
        }

        global.init.db.ref('/matches/' + childSnapshot.key).update({
          "scoreTeam1": scoreTeam1,
          "scoreTeam2": scoreTeam2,
          "scorePenaltyTeam1": scorePenaltyTeam1,
          "scorePenaltyTeam2": scorePenaltyTeam2
        }).catch(error => {
          this.errorMessage = 'Error - ' + error.message
        });
      }
    });
    return 1;
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
  });
  return res.redirect(303, global.init.db.ref('/matches'));
});


exports.resetScoreMatches = () => functions.https.onRequest((req, res) => {
  const scoreTeam1 = '';
  const scoreTeam2 = '';
  const scorePenaltyTeam1 = '';
  const scorePenaltyTeam2 = '';
  var matchRef = global.init.db.ref('/matches');

  matchRef.once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      global.init.db.ref('/matches/' + childSnapshot.key).update({
        "scoreTeam1": '',
        "scoreTeam2": '',
        "scorePenaltyTeam1": '',
        "scorePenaltyTeam2": ''
      }).catch(error => {
        this.errorMessage = 'Error - ' + error.message
      });
    });
    return 1;
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
  });
  return res.redirect(303, global.init.db.ref('/matches'));
});

exports.resetMatches2nd = () => functions.https.onRequest((req, res) => {
  const scoreTeam1 = '';
  const scoreTeam2 = '';
  const scorePenaltyTeam1 = '';
  const scorePenaltyTeam2 = '';
  var matchesRef = global.init.db.ref('/matches');

  matchesRef.once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var matchRef = childSnapshot.val();
      if(matchRef.teamSource1 || matchRef.teamSource2) {
          global.init.db.ref('/matches/' + childSnapshot.key).update({
            "scoreTeam1": '',
            "scoreTeam2": '',
            "scorePenaltyTeam1": '',
            "scorePenaltyTeam2": '',
            "team1": matchRef.teamSource1,
            "team2": matchRef.teamSource2,
            "teamName1": matchRef.teamSource1,
            "teamName2": matchRef.teamSource2
          }).catch(error => {
            this.errorMessage = 'Error - ' + error.message
          });
      }

      
    });
    return 1;
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
  });
  return res.redirect(303, global.init.db.ref('/matches'));
});

exports.resetGame = () => functions.https.onRequest((req, res) => {
  const scoreTeam1 = '';
  const scoreTeam2 = '';
  const scorePenaltyTeam1 = '';
  const scorePenaltyTeam2 = '';

  global.init.db.ref('/').update({betsAll:{}});
  global.init.db.ref('/').update({bets:{}});
  global.init.db.ref('/').update({preBetsAll:{}});
  global.init.db.ref('/').update({subscribedAll:{}});
  global.init.db.ref('/').update({ranking:[]});
  global.init.db.ref('/').update({rankingAll:[]});
  global.init.db.ref('/').update({users:{}});
  
  var matchRef = global.init.db.ref('/matches');
  matchRef.once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      global.init.db.ref('/matches/' + childSnapshot.key).update({
        "scoreTeam1": '',
        "scoreTeam2": '',
        "scorePenaltyTeam1": '',
        "scorePenaltyTeam2": ''
      }).catch(error => {
        this.errorMessage = 'Error - ' + error.message
      });
    });
    return 1;
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
  });
  return res.redirect(303, global.init.db.ref('/matches'));
});

exports.updateScore = () => functions.https.onRequest((req, res) => {
  const matchId = req.query.id;
  const scoreTeam1 = req.query.st1;
  const scoreTeam2 = req.query.st2;
  const scorePenaltyTeam1 = req.query.spt1;
  const scorePenaltyTeam2 = req.query.spt2;

  var matchRef = global.init.db.ref('/matches/' + matchId);

  matchRef.update({
    "scoreTeam1": scoreTeam1 + '',
    "scoreTeam2": scoreTeam2 + '',
    "scorePenaltyTeam1": scorePenaltyTeam1 + '',
    "scorePenaltyTeam2": scorePenaltyTeam2 + ''
  }).then(snapshot => {
    return res.redirect(303, snapshot.ref);
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
  });

  return res.redirect(303, matchRef);

});



function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e30; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}