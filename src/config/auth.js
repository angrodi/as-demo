// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '1349976998704562', // your App ID
        'clientSecret': 'dad55de8ebf7a8ca564bfe27f1d2b90a', // your App Secret
        'callbackURL': 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth': {
        'clientID': '806971569060-5fvb5b2rrnfe4334g83346e630vrn26p.apps.googleusercontent.com',
        'clientSecret': 'jGPjyhHljbLqgbdyhIxocgqg',
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    }   

};