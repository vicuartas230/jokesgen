const { handler } = require('./get_joke');

handler().then((json) => {
    console.log(json);
});
