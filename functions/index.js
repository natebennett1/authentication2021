const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
    const {email, uid } = userRecord;

    return db
        .collection('users')
        .doc(uid)
        .set({ email })
        .catch(console.error);
};

//twilio stuff
const accountSid = "AC39fc05bedd5da9d9344efd4d2d6b8d81"
const authToken = "45f5453fbf7861e1484db5f2555d3a4e"
const client = new twilio(accountSid, authToken)

const sendSMS = (to,body) => {
    client.messages.create({
        body:body,
        to:"+1"+to,
        from:"+15108043904"
    })
}

module.exports = {
    authOnCreate: functions.auth.user().onCreate(createProfile),
   // sendReminder: functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    //    sendSMS("8016885885", "Hey, take your HT survey. https://healthtracker2021-2a269.web.app/")
     //   return null
  //  })
};
