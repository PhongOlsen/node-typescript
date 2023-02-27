import * as os from "os";

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const hostName = os.hostname();
const app = express();
const port = process.env.PORT || 3001;

app.use('/api', (req, res, next) => res.send(`Hello NodeJs and JenkinsFile hostname:${hostName}`));


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
