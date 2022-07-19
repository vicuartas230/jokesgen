const createClient = require('@supabase/supabase-js').createClient;
const supabase = createClient('https://lmihtsgzhbpparvdzjzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaWh0c2d6aGJwcGFydmR6anp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwODM2MDYsImV4cCI6MTk3MzY1OTYwNn0.HBnd7jyDoedzjcqcGkGN235bPOj1Dd0SaV7Wyf-8cNE');
const express = require('express');
const { handler } = require('../../.netlify/functions/get_joke/get_joke');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    const user = supabase.auth.user();
    // console.log(user);
    const { data: jokes, error } = await supabase
    .from('jokes')
    .select('value');
    res.render('dashboard');
});

router.get('/get-joke', async (req, res) => {
    handler().then((json) => {
        const parse = JSON.parse(json.body);
        const joke = parse.msg;
        res.render('new', { joke });
    });
});

router.get('/my-jokes', async (req, res) => {
    const { data: jokes, error } = await supabase
    .from('jokes')
    .select('*');
    res.render('jokes', { jokes });
});

module.exports = router;
