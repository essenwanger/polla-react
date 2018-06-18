/*
const test = require('firebase-functions-test')({
  databaseURL: 'https://shaman-5b899.firebaseio.com/',
  storageBucket: 'shaman-5b899.appspot.com',
  projectId: 'shaman-5b899',
}, '/home/lysbon/ws/polla-react/polla-functions/functions/test/google-services-shaman.json');
*/
const test = require('firebase-functions-test')({
  databaseURL: 'https://polla-react.firebaseio.com/',
  storageBucket: 'polla-react.appspot.com',
  projectId: 'polla-react',
}, '/home/lysbon/ws/polla-react/polla-functions/functions/test/polla-react-firebase-adminsdk-7e2kx-0c4e27891e.json');

const beforeSnap = test.firestore.makeDocumentSnapshot({foo: 'bar'}, './polla-react-export.json');
const afterSnap  = test.firestore.makeDocumentSnapshot({foo: 'faz'}, './polla-react-export.json');
const change = test.makeChange(beforeSnap, afterSnap);

const myFunctions = require('../index.js');
const wrapped = test.wrap(myFunctions.calculatePoints);
/*
return wrapped(change).then(() => {
  // Read the value of the data at messages/11111/uppercase. Because `admin.initializeApp()` is
  // called in functions/index.js, there's already a Firebase app initialized. Otherwise, add
  // `admin.initializeApp()` before this line.
  return admin.database().ref('messages/11111/uppercase').once('value').then((createdSnap) => {
    // Assert that the value is the uppercased version of our input.
    assert.equal(createdSnap.val(), 'INPUT');
  });
});
*/