const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const request = require('request');
const stripe = require('stripe')('sk_test_SNMLSgwLCRwmG3WruMEGn9dD00g9pLYELl');
const bodyParser = require('body-parser');

// Welcome Page
router.get('/', function(req,res){
    res.render('welcome');
});

router.post('/charge', function(req,res){
    const amount = 1000;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: "Keep me afloat",
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});


router.get('/dashboard', ensureAuthenticated, function(req,res){
    res.render('dashboard', {
        name: req.user.name
    });
});

module.exports = router;