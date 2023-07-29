"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8085; // default port to listen
const user_1 = __importDefault(require("./types/user"));
const room_type_1 = require("./types/room-type");
// const app = require('express')();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const express = require('express');
const uuidV4 = require("uuid/v4");
const dateFormat = require("dateformat");
http.listen(3001, () => { console.log("Express Server with Socket.io Running!!!"); });
const SERVER_ID = 'SERVER_1'; //uuidV4();
var Channel;
(function (Channel) {
    Channel["MESSAGE"] = "message";
    Channel["USER"] = "user";
    Channel["CHATROOM"] = "chatroom";
})(Channel || (Channel = {}));
;
// const messenger  = require('./messenger.js');
/***************************************************************************************** */
/*      Redis code goes here															   */
/***************************************************************************************** */
const redis = require("redis");
const redisClient = redis.createClient(6379, 'redis');
const publisher = redis.createClient(6379, 'redis');
const subscriber = redis.createClient(6379, 'redis');
subscriber.on("message", function (channel, message) {
    console.log("[" + channel + "]  Message :" + message + "' on channel '" + channel + "' arrived!");
    if (channel == Channel.USER) {
        io.emit('new_user', JSON.parse(message));
    }
    else if (channel == Channel.MESSAGE) {
        const msg = JSON.parse(message);
        redisClient.lrange("chatRoomList", 0, -1, function (err, targetList) {
            const toList = targetList.map((usr) => JSON.parse(usr)).filter((user) => { console.log("User Id:" + user.id + " Message To ID:" + msg.toId); return user.id == msg.toId; });
            toList.forEach((user) => {
                if (user.type == room_type_1.RoomType.USER) {
                    console.log("Sending Message to User  :" + JSON.stringify(user));
                    io.to(user.socketId).emit('new_message', message);
                    const fromList = targetList.map((usr) => JSON.parse(usr)).filter((user) => { console.log("User Id:" + user.id + " Message To ID:" + msg.toId); return user.id == msg.fromId; });
                    fromList.forEach((user) => {
                        io.to(user.socketId).emit('new_message', message);
                    });
                }
                else {
                    console.log("Sending Message to Group  :" + JSON.stringify(user) + "User :" + JSON.stringify(message));
                    //io.in(message.toId).emit('new_message', message);
                    redisClient.lrange(user.name, 0, -1, function (err, userList) {
                        userList.forEach((user) => {
                            const targetUser = JSON.parse(user);
                            console.log('sending Message to :' + JSON.stringify(targetUser) + "\tName :" + targetUser.name + " MSG From ID:" + msg.fromId);
                            io.to(targetUser.SocketId).emit('new_message', message);
                        });
                    });
                }
            });
        });
        // io.to(message.toId).emit('new_message', message);
    }
    else if (channel == Channel.CHATROOM) {
        io.emit('new_chat_room', JSON.parse(message));
    }
});
// subscriber.subscribe("test1","test2");
subscriber.subscribe(Channel.MESSAGE, Channel.USER, Channel.CHATROOM);
// subscriber.subscribe(RedisMsgType.MESSAGE, "USER", "CHATROOM");
//subscriber.subscribe("MESSAGE", "USER", "CHATROOM");
/***************************************************************************************** */
/*      Socket code goes here															   */
/***************************************************************************************** */
io.on('connection', function (socket) {
    console.log("CONENCTING SOCKET :");
    socket.on('disconnect', function () {
        if (socket.user) {
            redisClient.lrem("chatRoomList", -1, socket.user);
        }
    });
    //While Joining The user gets All UsersList which Includes All Users and Chat Rooms
    socket.on('newUser', (userData) => {
        console.log("NEW USER :" + userData.name + " User Type:" + userData.type);
        const userId = userData.name; //uuidV4();
        const user = new user_1.default(socket.id, userId, userData.name, new Date(), userData.type); //userObj.Name;//uuidV4();
        console.log('New User Ready :' + JSON.stringify(user));
        //const user = { 'id': userId, 'name': '' + userObj.Name, 'time': dateFormat(new Date(), "ddd h:MM:ss"), 'type': RoomType.USER, 'newMessage': false, 'show': true };
        socket.emit('my_details', user);
        // let userObj = JSON.stringify(user);
        redisClient.lrange("chatRoomList", 0, -1, function (err, list) {
            list = list.map((user) => JSON.parse(user));
            socket.user = user;
            console.log("Sending Chat Room List :" + JSON.stringify(list));
            socket.emit('user_list', list);
            // TODO Uncomment to add the user to Redis.
            redisClient.rpush("chatRoomList", JSON.stringify(user));
        });
        //console.log("Publish user :"+JSON.stringify(userObjStr));
        publisher.publish(Channel.USER, JSON.stringify(user));
    });
    socket.on('newChatRoom', (room) => {
        const chatRoomId = room.name; //uuidV4();
        const chatRoom = new user_1.default('', chatRoomId, room.name, new Date(), room_type_1.RoomType.ROOM); //userObj.Name;//uuidV4();
        // const chatRoom = { 'id': chatRoomId, 'name': '' + roomName, 'time': dateFormat(new Date(), "ddd h:MM:ss"), 'type': RoomType.ROOM, 'newMessage': false, 'show': true };
        let chatRoomObj = JSON.stringify(chatRoom);
        redisClient.rpush("chatRoomList", chatRoomObj);
        publisher.publish(Channel.CHATROOM, chatRoomObj);
    });
    //Whenevr any message receives It publish to all, it wil be filtered in the client side.
    socket.on('message', (message) => {
        //console.log("Message : "+JSON.stringify(message))
        //message.time = dateFormat(new Date(), "ddd h:MM:ss");
        publisher.publish(Channel.MESSAGE, JSON.stringify(message));
    });
    socket.on('joinRoom', (joining) => {
        //console.log("Message : "+JSON.stringify(message))
        //room.time = dateFormat(new Date(), "ddd h:MM:ss");
        // publisher.publish(Channel.MESSAGE, JSON.stringify(room));
        console.log('Join : Socket :' + socket.id + ' room Name :' + JSON.stringify(joining));
        redisClient.rpush(joining.id, JSON.stringify({ ServerId: SERVER_ID, SocketId: socket.id }));
        // socket.join(id);
    });
    socket.on('leaveRoom', (leave) => {
        //console.log("Message : "+JSON.stringify(message))
        //room.time = dateFormat(new Date(), "ddd h:MM:ss");
        // publisher.publish(Channel.MESSAGE, JSON.stringify(room));
        console.log('Leave : Socket :' + socket.id + ' room Name :' + leave.id);
        redisClient.del(JSON.stringify({ ServerId: SERVER_ID, SocketId: socket.id }), function (err, reply) {
            console.log('Leaving :' + JSON.stringify(err) + "   " + JSON.stringify(reply));
        }); //(leave.id,socket.id);
        // socket.leave(id);
    });
});
// app.get('/', (req, res) => {
//     const user = new User("1234", "My Room", new Date(), RoomType.ROOM);
//     const usrStr = JSON.stringify(user);
//     console.log("Packed JSON:" + JSON.stringify(jsonpack.unpack(jsonpack.pack(user))));
//     console.log('Publishing :' + JSON.stringify(user));
//     // publisher.publish(Channel.MESSAGE, 'Asker Message Interface');
//     // publisher.publish(Channel.USER, 'Asker User');
//     // publisher.publish(Channel.CHATROOM, "Asker Char Toom channel");
//     publisher.publish(Channel.MESSAGE, usrStr);
//     publisher.publish(Channel.USER, usrStr);
//     publisher.publish(Channel.CHATROOM, usrStr);
//     // publisher.publish("test1", "haaaaai");
//     // publisher.publish("test2", "kthxbai");
//     res.send('Hello World!')
// });
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//# sourceMappingURL=index.js.map