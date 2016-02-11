'use strict';

const maxLength = 255;

let chooseFirstValidArrayPart = (previousValue, currentValue) => {
  return previousValue || currentValue;
};

let jiraFormatter = {
  setUrl: (url) => {
    jiraFormatter.url = url;
  },

  setData: (body) => {
    jiraFormatter.data = body;
  },

  /**
   * Format ticket notifications
   *
   * @param {string} verb - whats happening in this request
   * @returns {string} notification message
   */
  formatCrud: (verb, body) => {
    if (body && body.length > maxLength) {
      body = body.substr(0, maxLength) + '...';
    }

    body = (!body) ? '' : ":\n" + body;
    return `${jiraFormatter.data.user.displayName} ${verb}: <${jiraFormatter.url}/browse/${jiraFormatter.data.issue.key}|${jiraFormatter.data.issue.key}> ${jiraFormatter.data.issue.fields.summary} (${jiraFormatter.data.issue.fields.status.name})${body}`;
  },

  getCreated: () => {
    return jiraFormatter.formatCrud('created', jiraFormatter.data.issue.fields.description);
  },

  getUpdatedDesc: () => {
    if (jiraFormatter.data.hasOwnProperty('changelog') && jiraFormatter.data.changelog.hasOwnProperty('items')) {
      return jiraFormatter.data.changelog.items.map((item) => {
        if (item.field === 'description') {
          return jiraFormatter.formatCrud('updated',
            jiraFormatter.data.issue.fields.description);
        }
      }).reduce(chooseFirstValidArrayPart);
    }
  },

  getComment: () => {
    if (jiraFormatter.data.hasOwnProperty('comment')) {
      return jiraFormatter.formatCrud('commented on', jiraFormatter.data.comment.body);
    }
  },

  getStatusChange: () => {
    if (jiraFormatter.data.hasOwnProperty('changelog') && jiraFormatter.data.changelog.hasOwnProperty('items')) {
      return jiraFormatter.data.changelog.items.map((item) => {
        if (item.field === 'status') {
          return jiraFormatter.formatCrud('moved',
            `From: ${item.fromString} To: ${item.toString}`);
        }
      }).reduce(chooseFirstValidArrayPart);
    }
  },

  getStatusChangeWithComment: () => {
    if (jiraFormatter.data.hasOwnProperty('comment') && jiraFormatter.data.hasOwnProperty('changelog') && jiraFormatter.data.changelog.hasOwnProperty('items')) {
      return jiraFormatter.data.changelog.items.map((item) => {
        if (item.field === 'status') {
          return jiraFormatter.formatCrud('moved',
            `From: ${item.fromString}, with comment: ${jiraFormatter.data.comment.body}`
          );
        }
      }).reduce(chooseFirstValidArrayPart);
    }
  },

  getDeleted: () => {
    return jiraFormatter.formatCrud('deleted', jiraFormatter.data.issue.fields.description);
  },
};

module.exports = jiraFormatter;
