const passport = require('passport');
const User = require('../models/user-model');
const Filament = require('../models/filament-model');
const Printer = require('../models/printer-model')
const demoData = require('./demo-data');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());

exports.register = function(req, res) {
  User.register({
    email: req.body.email
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.status(202).json(err.message);
    } else {
      passport.authenticate('local')(req, res, function() {
        res.json(req.user.id);
      });
    }
  });
}

exports.login = function(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function() {
        res.json(req.user.id);
      });
    }
  });
}

exports.demo = function(req, res) {
  User.register({
    email: req.body.email,
    demo: true
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      passport.authenticate('local')(req, res, function() {
        demoData.filaments.forEach(doc => {
          const newFilament = new Filament({
            ...doc,
            user: req.user.id,
          });
          newFilament.save();
        });

        demoData.printers.forEach(doc => {
          const newPrinter = new Printer({
            ...doc,
            user: req.user.id,
          });
          newPrinter.save();
        });
        res.json(req.user.id);
      });
    }
  });
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}
