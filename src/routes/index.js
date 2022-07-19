const createClient = require('@supabase/supabase-js').createClient;
const supabase = createClient('https://lmihtsgzhbpparvdzjzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaWh0c2d6aGJwcGFydmR6anp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwODM2MDYsImV4cCI6MTk3MzY1OTYwNn0.HBnd7jyDoedzjcqcGkGN235bPOj1Dd0SaV7Wyf-8cNE');
const express = require('express');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    const user = supabase.auth.user();
    console.log(user);
    const { data: jokes, error } = await supabase
    .from('jokes')
    .select('value');
    console.log(jokes);
    res.render('dashboard');
});

module.exports = router;
