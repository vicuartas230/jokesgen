const fetch = require('node-fetch')

// const handler = async function () {
//   try {
//     fetch('https://api.chucknorris.io/jokes/random', {headers: { Accept: 'application/json' }})
//     .then((res) => {
//       return res.json();
//     }).then((json) => {
//       console.log(json);
//     });
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: error.message })
//     }
//   }
// }

// module.exports = { handler }

const handler = async function () {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }


// const fetch = require("node-fetch");

// const API_ENDPOINT = 'https://api.chucknorris.io/jokes/random';

// exports.handler = async (event, context) => {
//   try {
//     const response = await fetch(API_ENDPOINT);
//     const data = await response.json();
//     return { statusCode: 200, body: JSON.stringify({ data }) };
//   } catch (error) {
//     console.log(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Failed fetching data' }),
//     };
//   }
// };

// {
//   "categories":[],
//   "created_at":"2020-01-05 13:42:25.352697",
//   "icon_url":"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
//   "id":"rF_49D9YRimrA-U4u0Wy9A",
//   "updated_at":"2020-01-05 13:42:25.352697",
//   "url":"https://api.chucknorris.io/jokes/rF_49D9YRimrA-U4u0Wy9A",
//   "value":"You can rearrange the letters to the word, \"Omnipotent\" to spell Chuck Norris."
// }