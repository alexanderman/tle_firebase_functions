const store = require('../database/firestore');
const twilioService = require('./twilio-service');

function registerHelper(request) {
    const { email } = request;
    
    return store.getUserByEmail(email)
    .then(user => {
        const userExists = !!user;
        let dbPromise;

        const userData = {
            name: request.name,
            email: request.email,
            phone: request.phone,
            canHelp: true
        };

        if (userExists) {
            dbPromise = store.updateUser(userId, userData);
        }
        else {
            dbPromise = store.createUser(userId, userData);
        }

        return dbPromise;

    });
}

module.exports = {
    registerHelper
}