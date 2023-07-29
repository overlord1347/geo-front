<template>
  <div class="row sideBar">
    <div v-for="room in chatRoomList" class="row sideBar-body">
      <div class="col-sm-3 col-xs-3 sideBar-avatar" @click="selectRoom({room})">
        <div class="avatar-icon">
          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
        </div>
      </div>
      <div class="col-sm-9 col-xs-9 sideBar-main" >
        <div class="row" >
          <div class="col-sm-8 col-xs-8 sideBar-name haveMaessage" @click="selectRoom({room})" v-if="haveNewMessage({room})">
            <span class="name-meta">{{room.name}}</span>
          </div>
          <div class="col-sm-8 col-xs-8 sideBar-name" @click="selectRoom({room})" v-else>
            <span class="name-meta">{{room.name}}</span>
          </div>
          <div class="col-sm-4 col-xs-4 pull-right sideBar-time" @click="leaveRoom({room})" v-if="isChatRoomJoined({room})">
            <span class="time-meta pull-right">LEAVE</span>
          </div>
          <div class="col-sm-4 col-xs-4 pull-right sideBar-time" @click="joinRoom({room})" v-else-if="isChatRoom({room})">
            <span class="time-meta pull-right" >JOIN</span>
          </div>
          <div class="col-sm-4 col-xs-4 pull-right sideBar-time" v-else>
            <span class="time-meta pull-right">18:18</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from "../user";
import { RoomType } from "../room-type";

@Component
export default class ChatRoomList extends Vue {
  get chatRoomList(): User[] {
    return this.$store.state.userList.filter((user: User) => user.show == true);
  }
  selectRoom(target: any) {
    console.log("Chat Room Clicked :" + target.room.name + " ");
    this.$store.dispatch("selectRoom", target.room);
  }
  isChatRoom(target: any): boolean {
    if (target.room.type == RoomType.ROOM) return true;
    return false;
  }
  isChatRoomJoined(target: any): boolean {
    if (target.room.type == RoomType.ROOM && target.room.joined) return true;
    return false;
  }
  joinRoom(target: any) {
    console.log("Joining Room :" + target.room.name +" ID:"+target.room.id);
    this.$store.dispatch("joinRoom", target.room.id);
  }
  leaveRoom(target: any) {
    console.log("Leaving Room :" + target.room.name +" ID:"+target.room.id);
    this.$store.dispatch("leaveRoom", target.room.id);
  }
  haveNewMessage(target: any): boolean {
    return target.room.newMessage;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.haveMaessage{
  font-weight: bold;
}
</style>
