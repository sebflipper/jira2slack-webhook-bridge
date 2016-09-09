const responsesConfig = require('./../config/responses-config.json');
const fuzzy = require('fuzzy');

// function getResponses(post) {
//   let goodResponses = [];
//   config.responses.forEach((response) => {
//     let rating = fuse.rate(post.title, response.keywords);
//     if (rating > 0.7) {
//       goodResponses.push(response.responseText);
//     }
//   });
//   return goodResponses;
// }

const keywordsList = ['close sprint', 'admin priveledges', 'open sprint'];
const searchTerm = 'I need help closing a sprint';

/*

  - let keyPhraseScores;
  - iterate over every key phrase. thisKeyPhrase
    - let thisKeyPhraseScore = 0;
    - iterate over every word in keyPhrase. thisKeyPhraseWord
      - iterate over each word in searchTerm. thisSearchTermWord
        - thisKeyPhraseScore += fuzzy.filter(thisKeyPhraseWord, thisSearchTermWord).score
  - get top X (3?) keyPhraseScores and their responses


*/
list.forEach((listEl) => {
  const split = listEl.split(' ');
  const numWords = split.length;
  split.forEach((word) => {
    const score = fuzzy.filter()
  });
});
var results = fuzzy.filter('I need help with closing a sprint', list);
console.log('results=', results);
var matches = results.map(function(el) { console.log(el); });

module.exports = class ResponseMatcher {

};
