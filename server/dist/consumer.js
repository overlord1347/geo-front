var NRP = require('node-redis-pubsub');
const redis = require('redis');
var redisPub = redis.createClient();
var redisSub = redis.createClient();
redisSub.on('message', function (msg) {
    console.log('Received :', msg);
});
redisPub.send("Asker here");
// console.log('Created Pub/Sub');
// var config = {
//     emitter: redisPub,                      // Pass in an existing redis connection that should be used for pub
//     receiver: redisSub,                     // Pass in an existing redis connection that should be used for sub
//   }
//   var nrp = new NRP(config);
//   console.log('NRP Created');
//   nrp.on('say hello', function(data:string){
//     console.log('Hello ' + JSON.stringify(data));
//   });
// console.log('Publish Message');
//   nrp.emit('say hello', { name: 'Louis' });
//   console.log('Ready :');
//# sourceMappingURL=consumer.js.map