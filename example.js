var http = require('request-promise-json');


http.get('http://jsonplaceholder.typicode.com/posts/1').then(function(result){
   console.log('get:', result);
});

// create new post
var newPost = {
    "userId": 1,
    "title": "post title",
    "body": "post body"
};

var newPostId = http.post('http://jsonplaceholder.typicode.com/posts',newPost).then(function(result){
   console.log('post:', result);
   return result.id;
});


// update new post
newPost.body = 'foo';

newPostId.then(function(id){
    http.put('http://jsonplaceholder.typicode.com/posts/'+id,newPost).then(function(result){
       console.log('put:', result);
    });
});

// make an invalid request that results in rejected promise
http.put('http://jsonplaceholder.typicode.com/posts/foo',newPost).then(function(result){
   console.log('put foo:', result);
}, function(error){
    console.log('put foo failed with status code', error.statusCode);
});