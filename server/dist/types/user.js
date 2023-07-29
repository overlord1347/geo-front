"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(socketId, id, name, time, type) {
        this.name = '';
        this.show = true;
        this.socketId = socketId;
        this.id = id;
        this.name = name;
        this.time = time;
        this.type = type;
    }
    setShow(show) {
        this.show = show;
    }
    get Show() {
        return this.show;
    }
    get Name() {
        return this.name;
    }
    get Type() {
        return this.type;
    }
    get SocketId() {
        return this.socketId;
    }
    get Id() {
        return this.id;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map