var http  = require('http');
var async = require('async');
var fs    = require('fs');

var pathopts = {
    client  : 'chromium',
    pfilter : 0,
    xjerr   : 1,
    lang    : 'en-US'
  };
var path = '/speech-api/v1/recognize?';
var httpRequestOptions = {
    host  : 'www.google.com',
    port  : 80,
    headers : {
      'user-agent' : 'Mozilla/5.0',
      'Content-Type' : 'audio/x-flac; rate=16000'
    },
    method: 'POST'
  };

var serialize = function(obj) {
  "use strict";
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
};

var callGoogle = function(path, cb) {
  "use strict";
  var response = "";
  fs.readFile(path, function(err, data) {
    if (err) {
      console.error(err);
      cb(err);
      return;
    }
    var req = http.request(httpRequestOptions, function(res) {
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        var jsonresponse = {'status' : -1};
        try {
          jsonresponse = JSON.parse(response);
        } catch (err) {
          console.warn(err);
        }
        cb(null, jsonresponse);
      });
      res.on('error', function(err) {
        console.error(err);
        cb(err);
      });
    });
    req.write(data);
    req.end();
  });
};

exports.s2t = function(path_to_flac, filterEmpty, opts, callback) {
  "use strict";
  callback = (callback || function() {});
  for (var attrname in opts) {
    if (opts.hasOwnProperty(attrname)) {
      pathopts[attrname] = opts[attrname];
    }
  }
  httpRequestOptions.path = path + serialize(pathopts);
  if (!(path_to_flac instanceof Array)) {
    path_to_flac = [path_to_flac];
  }
  async.map(path_to_flac, callGoogle, function(err, results) {
    if (err) {
      callback(err);
      return;
    }
    results = results.filter(function(element) {
      return (element !== null && (element.status === 0 || !filterEmpty));
    });
    callback(null, results);
  });
};