var request = require('superagent');
var server = 'https://codeship.com/api/v1/';

module.exports = function(opts) {
  if(! opts) throw new Error('Codeship API Key required');
  var key = opts.apiKey;

  function api(endpoint) {
    return request(server + endpoint + '.json?api_key=' + key);
  }

  return {
    projects: function(cb) {
      return api('projects').end(function(err, res) {
        if(err) return cb(err);
        cb(null, res.body && res.body.projects);
      });
    },
    project: function(id, cb) {
      return api('project/' + id).cb(function(err, res) {
        if(err) return cb(err);
        cb(null, res.body);
      });
    },
    restart: function(id, cb) {
      return api('builds/' + id + '/restart').end(function(err, res) {
        if(err) return cb(err);
        cb(null, res.body);
      });
    }
  };
};