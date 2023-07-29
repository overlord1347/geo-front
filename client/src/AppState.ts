import User from './user';

export default class AppState {
    user?: User;
    userList: Array<User> = [];
    isLoggedIn: boolean = false;
    isConnected: boolean = false;
    activeRoom ?:User;
    isRoomSelected:boolean = false;
  }