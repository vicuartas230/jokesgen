const createClient = require('@supabase/supabase-js').createClient;
let SUPABASE_URL = 'https://lmihtsgzhbpparvdzjzt.supabase.co';
let SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaWh0c2d6aGJwcGFydmR6anp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwODM2MDYsImV4cCI6MTk3MzY1OTYwNn0.HBnd7jyDoedzjcqcGkGN235bPOj1Dd0SaV7Wyf-8cNE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

window.userToken = null

document.addEventListener('DOMContentLoaded', function (event) {
  let signUpForm = document.querySelector('#sign-up');
  signUpForm.onsubmit = signUpSubmitted.bind(signUpForm);

  let logInForm = document.querySelector('#log-in');
  logInForm.onsubmit = logInSubmitted.bind(logInForm);

  // let logoutButton = document.querySelector('#logout-button');
  // logoutButton.onclick = logoutSubmitted.bind(logoutButton);
})

const signUpSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signUp({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err) => {
      alert(err)
    })
}

const logInSubmitted = (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;

  supabase.auth
    .signIn({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

const logoutSubmitted = (event) => {
  event.preventDefault()

  supabase.auth
    .signOut()
    .then((_response) => {
      document.querySelector('#access-token').value = ''
      document.querySelector('#refresh-token').value = ''
      alert('Logout successful')
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

function setToken(response) {
  if (response.user.confirmation_sent_at && !response?.session?.access_token) {
    alert('Confirmation Email Sent')
  } else {
    // document.querySelector('#access-token').value = response.session.access_token
    // document.querySelector('#refresh-token').value = response.session.refresh_token
    document.open("../templates/dashboard.html");
  }
}
