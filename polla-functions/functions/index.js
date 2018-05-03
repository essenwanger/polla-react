// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const LAPOLLA_CONFIG = {
    'credential': admin.credential.applicationDefault(),
    'db': admin.database(),
    'serverValue': admin.database.ServerValue,
    'users': functions.auth.user(),
    'DB_URL': functions.config().firebase.databaseURL
};

const letthegamesbegin          = require('./letthegamesbegin');
const calculateRanking          = require('./calculateRanking');
const calculateNewPositionTable = require('./calculateNewPositionTable');
//const addUser                   = require('./addUser');
//const addMessage                = require('./addMessage');
const calculateLlaves           = require('./calculateLlaves');

//addMessage.initialize(LAPOLLA_CONFIG);
//addUser.initialize(LAPOLLA_CONFIG);
calculateNewPositionTable.initialize(LAPOLLA_CONFIG);
calculateRanking.initialize(LAPOLLA_CONFIG);
letthegamesbegin.initialize(LAPOLLA_CONFIG);
calculateLlaves.initialize(LAPOLLA_CONFIG);

//exports.addMessage = addMessage.addMessage();
//exports.addUser = addUser.addUser();
exports.calculateNewPositionTable = calculateNewPositionTable.calculateNewPositionTable();
exports.calculatePoints = calculateRanking.calculatePoints();
exports.calculateRanking = calculateRanking.calculateRanking();
exports.letthegamesbegin = letthegamesbegin.letthegamesbegin();
exports.calculateLlavesOctavos = calculateLlaves.calculateLlavesOctavos();