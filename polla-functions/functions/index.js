// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

const letthegamesbegin          = require('./letthegamesbegin');
const updateMatch               = require('./updateMatch');
const calculateRanking          = require('./calculateRanking');
const calculateNewPositionTable = require('./calculateNewPositionTable');
//const addUser                   = require('./addUser');
//const addMessage                = require('./addMessage');
const calculateLlaves           = require('./calculateLlaves');
const sendMailMassive           = require('./sendMailMassive');
const sendMailWelcome           = require('./sendMailWelcome');

const common                    = require('./common');

const LAPOLLA_CONFIG = {
    'credential': admin.credential.applicationDefault(),
    'db': admin.database(),
    'serverValue': admin.database.ServerValue,
    'users': functions.auth.user()
};

//addMessage.initialize(LAPOLLA_CONFIG);
//addUser.initialize(LAPOLLA_CONFIG);
updateMatch.initialize(LAPOLLA_CONFIG);
calculateNewPositionTable.initialize(LAPOLLA_CONFIG);
calculateRanking.initialize(LAPOLLA_CONFIG);
letthegamesbegin.initialize(LAPOLLA_CONFIG);
calculateLlaves.initialize(LAPOLLA_CONFIG);
sendMailMassive.initialize(LAPOLLA_CONFIG);
sendMailWelcome.initialize(LAPOLLA_CONFIG);
common.initialize(LAPOLLA_CONFIG);

//exports.addMessage = addMessage.addMessage();
//exports.addUser = addUser.addUser();
exports.updateScore = updateMatch.updateScore();
exports.resetGame = updateMatch.resetGame();
exports.randomScoreMatches = updateMatch.randomScoreMatches();
exports.resetScoreMatches = updateMatch.resetScoreMatches();
exports.resetMatches2nd = updateMatch.resetMatches2nd();
exports.calculateNewPositionTable = calculateNewPositionTable.calculateNewPositionTable();
exports.calculatePoints = calculateRanking.calculatePoints();
//exports.calculatePointsTest = calculateRanking.calculatePointsTest();
exports.calculateRanking = calculateRanking.calculateRanking();
exports.letthegamesbegin = letthegamesbegin.letthegamesbegin();
exports.calculateLlavesOctavos = calculateLlaves.calculateLlavesOctavos();
exports.generateBetsPDF = sendMailMassive.generateBetsPDF();

exports.sendMailMassive = sendMailMassive.sendMailMassive();
exports.sendMailWelcome = sendMailWelcome.sendMailWelcome();

exports.listUsers = common.listUsers();

