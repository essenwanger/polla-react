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
      global.init.db.ref('/matches/' + childSnapshot.key)
        .update({
          "scoreTeam1": '',
          "scoreTeam2": '',
          "scorePenaltyTeam1": '',
          "scorePenaltyTeam2": ''
        })
    });
    return res.redirect(303, global.init.db.ref('/matches'));
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message;
    console.log(this.errorMessage);
    res.status(500).send(this.errorMessage);
  });
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
      if (matchRef.teamSource1 || matchRef.teamSource2) {
        global.init.db.ref('/matches/' + childSnapshot.key).update({
          "scoreTeam1": '',
          "scoreTeam2": '',
          "scorePenaltyTeam1": '',
          "scorePenaltyTeam2": '',
          "team1": matchRef.teamSource1,
          "team2": matchRef.teamSource2,
          "teamName1": matchRef.teamSource1,
          "teamName2": matchRef.teamSource2
        })
      }
    });
    return res.redirect(303, global.init.db.ref('/matches'));
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message;
    console.log(this.errorMessage);
    res.status(500).send(this.errorMessage);
  });

});

exports.resetGame = () => functions.https.onRequest((req, res) => {
  const scoreTeam1 = '';
  const scoreTeam2 = '';
  const scorePenaltyTeam1 = '';
  const scorePenaltyTeam2 = '';

  global.init.db.ref('/').update({
    betsAll: {}
  });
  global.init.db.ref('/').update({
    bets: {}
  });
  global.init.db.ref('/').update({
    preBetsAll: {}
  });
  global.init.db.ref('/').update({
    subscribedAll: {}
  });
  global.init.db.ref('/').update({
    ranking: []
  });
  global.init.db.ref('/').update({
    rankingAll: []
  });
  global.init.db.ref('/').update({
    users: {}
  });

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
    "scoreTeam1": String(scoreTeam1),
    "scoreTeam2": String(scoreTeam2),
    "scorePenaltyTeam1": String(scorePenaltyTeam1),
    "scorePenaltyTeam2": String(scorePenaltyTeam2)
  }).then(snapshot => {
    return res.redirect(200, snapshot.ref);
  }).catch(error => {
    this.errorMessage = 'Error - ' + error.message
  });

  return res.redirect(303, matchRef);

});

exports.updateSpecificScore = () => functions.https.onRequest((req, res) => {
  const matchesResult = [
    ['5', '0'],
    ['0', '1'],
    ['3', '3'],
    ['0', '1'],
    ['2', '1'],
    ['0', '1'],
    ['1', '1'],
    ['2', '0'],
    ['1', '1'],
    ['0', '1'],
    ['0', '1'],
    ['1', '0'],
    ['3', '0'],
    ['1', '2'],
    ['1', '2'],
    ['1', '2'],
    ['3', '1'],
    ['1', '0'],
    ['1', '0'],
    ['0', '1'],
    ['1', '0'],
    ['1', '1'],
    ['0', '3'],
    ['2', '0'],
    ['2', '0'],
    ['1', '2'],
    ['2', '1'],
    ['1', '2'],
    ['5', '2'],
    ['6', '1'],
    ['0', '3'],
    ['2', '2'],
    ['4', '4'],
    ['1', '2'],
    ['1', '2'],
    ['3', '1'],
    ['1', '2'],
    ['0', '2'],
    ['1', '1'],
    ['1', '2'],
    ['1', '3'],
    ['1', '2'],
    ['1', '3'],
    ['1', '1'],
    ['1', '2'],
    ['1', '1'],
    ['1', '2'],
    ['1', '1'],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', '']
  ];

  var matches = '';

  global.init.db.ref('/matches/').once('value')
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        match = childSnapshot.val();
        sleep(200);
        global.init.db.ref('/matches/' + childSnapshot.key).update({
          "scoreTeam1": matchesResult[match.id - 1][0],
          "scoreTeam2": matchesResult[match.id - 1][1],
          "scorePenaltyTeam1": '',
          "scorePenaltyTeam2": ''
        })
        matches += match.id + ',' + match.team1 + ',' + match.scoreTeam1 + ',' + matchesResult[match.id - 1][0] + ',' + match.team2 + ',' + match.scoreTeam2 + ',' + matchesResult[match.id - 1][1] + ',' + '<br />';
      });
      return res.status(200).send(matches);
    })
    .catch(error => {
      this.errorMessage = 'Error - ' + error.message;
      console.log(this.errorMessage);
      res.status(500).send(this.errorMessage);
    });
});


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e30; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}