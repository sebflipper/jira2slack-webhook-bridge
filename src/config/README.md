## Configuration

Add a file in the `src/config` directory called `default.json` with the following data, swapping out:

* `jiraUrl` - base URL of your Jira installation
* `PRO` - the Jira project project key of the project you want notifications for (normally the first 3 characters of the Jira ticket key)
* `slackWebHookUrl` - your Slack WebHook URL
* `channel` - Slack channel you want notifications sent to
* `username` - (optional) Slack username to display
* `icon_emoji` - (optional) Slack emoji icon to use

```
{
  "jiraUrl": "https://jira.example.com",
  "projects": {
    "PRO": {
      "slackWebHookUrl": "https://hooks.slack.com/services/EXAMPLE/KEY",
      "payload": {
        "channel": "#my-example-channel",
        "username": "Jira",
        "icon_emoji": ":ticket:"
      }
    }
  }
}
```
