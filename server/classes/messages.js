var results = [{objectId: 'n7Mq7w0uRM', username: 'john', roomname: 'Sweaty Baby Angels', text: 'hello', createdAt: '2019-08-02T17:17:14.838Z', updatedAt: '2019-08-02T17:17:14.838Z'}];


var getPost = function(post) {
  post.createdAt = new Date().toISOString();
  post.objectId = (Math.floor(Math.random() * 10000000)).toString();

  results.unshift(post);

};

exports.results = results;
exports.getPost = getPost;
