const ghpages = require('gh-pages');


ghpages.publish('dist/', {
  push: true
}, function (err) {
  console.log("Publish done", err)
});