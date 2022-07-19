const createClient = require('@supabase/supabase-js').createClient;
const supabase = createClient('https://lmihtsgzhbpparvdzjzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaWh0c2d6aGJwcGFydmR6anp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwODM2MDYsImV4cCI6MTk3MzY1OTYwNn0.HBnd7jyDoedzjcqcGkGN235bPOj1Dd0SaV7Wyf-8cNE');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/auth');
});

router.get('/auth', (req, res) => {
    res.render('index');
});

router.post('/auth/signup', async (req, res) => {
    const {email, password} = req.body;
    const errors = [];
    if (email.length < 8) {
        errors.push({text: 'Password must be greater than 8 characters.'});
    }
    if (errors.length > 0) {
        res.render('index', {errors, email, password});
    }
    await supabase.auth
        .signUp({ email, password })
        .then((response) => {
            if (response.error) {
                errors.push({text: response.error.message});
                res.render('index', {errors, email, password});
            } else {
                res.redirect('/');
            }
            // response.error ? res.redirect('/auth') : res.redirect('/auth');
        });
        // .catch((err) => {
        //     errors.push(err);
        // });
});

router.post('/auth/login', async (req, res) => {
    const {email, password} = req.body;
    const errors = [];
    await supabase.auth
        .signIn({ email, password })
        .then((response) => {
            if (response.error) {
                errors.push({text: response.error.message});
                res.render('index', {errors, email, password});
            } else {
                res.redirect('/dashboard');
            }
        });
        // .catch((err) => {
        //     errors.push(err);
        // });
});

router.get('/logout', (req, res) => {
    const errors = []
    supabase.auth
        .signOut()
        .then((_response) => {
            res.redirect('/');
        })
        .catch((err) => {
            errors.push(err);
        });
});

module.exports = router;
