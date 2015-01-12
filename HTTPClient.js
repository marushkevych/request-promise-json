/*
 * Provide simple API on top of amazing 'request' module.
 * All methods return 'q' Promise.
 * 
 * * * * * *
 * Usage:  *
 * * * * * *
 * var http = require('request-promise-json');
 * http(method, url, [json]);
 * 
 * // or use shortcuts:
 * http.get(url);
 * http.post(url, json);
 * http.put(url, json);
 * 
 * // or provide options object directy to 'request' library (see docs for 'request' module https://www.npmjs.com/package/request):
 * http.request({
 *      method: 'POST',
 *      url: url,
 *      body: json
 * });
 * 
 * * * * * * * * * *
 * Error Handling: *
 * * * * * * * * * *
 * If request fails with an error, promise will be rejected with that error.
 * If response status code is >= 400, promise will be rejected with node's http.IncomingMessage
 * See http://nodejs.org/api/http.html#http_http_incomingmessage
 * 
 * // Example of error handling:
 * http.get(url).fail(function(reason){
 *      if(reason.statusCode)
 *          console.log('failed with status code', reason.statusCode);
 *      else
 *          console.log('failed with error, reason);
 * });
 * 
 */

var Q = require('q');
var request = require('request').defaults({
    json: true
});


/**
 * HTTP request
 * @param {String} method
 * @param {String} url
 * @param {Object} json - optional object to post or put
 * @returns {Promise} resolved with response json
 */
var http = module.exports = function (method, url, json){
    var options = {
        method: method,
        url: url
    };
    
    if(json){
        options.body = json;
    }
    return performRequest(options);
};

/**
 * Shortcut for http('GET',url)
 * 
 * @param {String} url
 * @returns {Promise} resolved with response json
 */
http.get = function(url){
    return http('GET', url);
};

/**
 * Shortcut for http('POST',url, json)
 * 
 * @param {String} url
 * @param {Object} json
 * @returns {Promise} resolved with response json
 */
http.post = function(url, json){
    return http('POST', url, json);
};


/**
 * Shortcut for http('PUT',url, json)
 * 
 * @param {String} url
 * @param {Object} json
 * @returns {Promise} resolved with response json
 */
http.put = function(url, json){
    return http('PUT', url, json);
};

http.request = performRequest;

/**
 * Wraps require('request') function to return promise and handle errors with reject
 * 
 * @param {Object} options
 * @returns {Promise} resolved with response json
 */
function performRequest(options) {
    return Q.Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            
            if(error){
                reject(error);
                return;
            }
            
            if(response.statusCode >= 400){
                var statusCodeError = new Error(options.method + ' ' + options.url + ' failed with status code ' + response.statusCode);
                statusCodeError.name = 'StatusCodeError';
                statusCodeError.statusCode = response.statusCode;
                statusCodeError.request = options;
                statusCodeError.response = body;
                
                reject(statusCodeError);
                return;
            }
            
            resolve(body);
        });
    });
}

