const app = require('./server');
const db = require('./db');

db.connect();

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));
