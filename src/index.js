'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),

    JiraWebHookProcessor = require('./processor/JiraWebHookProcessor'),
    config = require('./config/default.json');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/jira-webhook', (req, res) => {
  try {
    let jiraWebHookProcessor = new JiraWebHookProcessor(config);
    jiraWebHookProcessor.sendToSlack(req.body);
  } catch (e) {
    // Jira requires a 200 OK otherwise it will stop you from changing issues
    console.log(e);
  }

  res.send('OK');
});

app.listen(3000, () => {
  console.log('jira2slack-webhook-bridge listening on port 3000!');
});
