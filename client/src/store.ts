import Vue from 'vue';
import Vuex from 'vuex';
import Socket from './socket';
import router from './router';
import AppState from './AppState';
import User from './user';
import Message from './message';
import {RoomType} from './room-type';
// import RoomType from './'
Vue.use(Vuex);

export default new Vuex.Store<AppState>({
  // TODO set the State TypeScript 
  state: new AppState(),
  mutations: {
    search(state, searchKey) {
      state.userList.forEach( (user) => user.name.indexOf(searchKey) !== -1 ? user.show = true : user.show = false);
    },
    selectRoom(state, room: User) {
      console.log('Active Room in Mutation :' + room.name);
      room.newMessage = false;
      state.isRoomSelected = false;
      state.activeRoom = room;
      state.isRoomSelected = true;
    },
    joinRoom(state, roomId) {
      state.userList.forEach( (user) => user.id === roomId ? user.joined = true : user.joined = false);
    },
    leaveRoom(state, roomId) {
      state.userList.forEach( (user) => user.id === roomId ? user.joined = false : user.joined = true);
    },
    SOCKET_MY_DETAILS(state, myDetails: User) {
      state.isLoggedIn = true;
      state.user = myDetails;
      console.log('User Details in Mutation:' + JSON.stringify(myDetails));
    },
    SOCKET_USER_LIST(state, userList: User[]) {
      console.log('Got the user List:' + JSON.stringify(userList));
      userList.forEach(user=>state.userList.push(new User(user.id, user.name, user.time, user.type)));
     // state.userList.push(...userList);
    },
    SOCKET_NEW_USER(state, user: User) {
      console.log('Got new user:' + JSON.stringify(user));
      if (state.user && state.user.id !== user.id) {
        state.userList.push(new User(user.id, user.name, user.time, user.type));
      }
    },
    SOCKET_NEW_CHAT_ROOM(state, user: User) {
      console.log('Got new user:' + JSON.stringify(user));
      if (state.user && state.user.id !== user.id) {
        state.userList.push(new User(user.id, user.name, user.time, user.type));
      }
    },
    SOCKET_NEW_MESSAGE(state, message: string) {
      console.log('Got new Message:' + JSON.stringify(message));
      let msg = JSON.parse(message);
      //TODO Implement Message Obejts conversion
      state.userList.filter((user)=> user.id === msg.toId || user.id === msg.fromId).map((user) => {
        user.newMessage = true;
        user.MessageList.push(msg);
      });
    },
  },
  actions: {
    login: ({ commit }, name) => {
      // console.log('Login in Stor - Action');
      // commit('login', nickName);
      Socket.emit('newUser', { name:name, type: RoomType.USER });
    },
    search({ commit }, searchKey: string){
      commit('search', searchKey);
    },
    socket_myDetails({ commit, dispatch }, myDetails) {
      // console.log('Got user details in Action.' + JSON.stringify(myDetails));
      router.push('/');
    },
    selectRoom({ commit }, room: User) {
      commit('selectRoom', room);
    },
    sendMessage({ commit },msgObj){
     // commit('clearMessage', msgObj);
    // console.log('Message :'+ msgObj.message + 'From :' +msgObj.fromId + ' To :' + msgObj.toId);
      Socket.emit('message', {message : msgObj.message, fromName : msgObj.fromName, fromId : msgObj.fromId, toId : msgObj.toId});
    },
    newChatRoom({ commit }, name){
      Socket.emit('newChatRoom', {name});
    },
    joinRoom({ commit }, id){
      console.log('Joining Room :'+id);
      commit('joinRoom', id);
      Socket.emit('joinRoom', {id});
    },
    leaveRoom({ commit }, id){
      commit('leaveRoom', id);
      Socket.emit('leaveRoom', {id});
    },
  },
});
