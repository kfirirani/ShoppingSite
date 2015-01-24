var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});




var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');



router.get('/products/shows', function(req, res) {

  var url ='mongodb://kfirirani:mongogambolina2@ds062807.mongolab.com:62807/kfir'// 'mongodb://localhost:27017/Kfir';
// Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to mongo");
    findProducts(db,"shows", function(docs){
      res.render('t/index', {
        products: docs,

        pageHeader: 'Shows',
        pageSubHeader: 'Ugly Shows'
      });
      db.close();
    } )

  });

});


var findProducts = function(db, type, callback) {
  // Get the documents collection
  var collection = db.collection('Products');
  // Find some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    //assert.equal(2, docs.length);
    console.log("Found the following records");
    console.dir(docs)
    callback(docs);
  });
}




var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
      clientID: 138016272911154,
      clientSecret: "62d4bba5d62b55415dd3a4642376e502",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, profile.id);
      /*
      User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
      */
    }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
      failureRedirect: '/login' }));



router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);



module.exports = router;
