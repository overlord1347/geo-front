<template >
  <div class="row message" id="conversation">
    <div class="row message-previous">
      <div class="col-sm-12 previous">
        <a onclick="previous(this)" id="ankitjain28" name="20"></a>
      </div>
    </div>
    <div class="row message-body" v-for="message in messageList">
      <div class="col-sm-12 message-main-sender" v-if="myMessage(message)">
        <div class="sender">
          <span class="pull-left">{{message.fromName}}</span>
          <div class="message-text">{{message.message}}</div>
          <span class="message-time pull-right">Sun</span>
        </div>
      </div>
      <div class="col-sm-12 message-main-receiver" v-else-if="message">
        <div class="receiver">
          <span class="pull-left">{{message.fromName}}</span>
          <div class="message-text">{{message.message}}</div>
          <span class="message-time pull-right">Sun</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Message from "../../message";
import User from "../../user";
@Component
export default class MessageList extends Vue {
  myMessage(message: Message): boolean {
    console.log("My Message" + JSON.stringify(message));
    if (message && this.$store.state.user.id == message.fromId) return true;
    return false;
  }
  get messageList(): Message[] {
    console.log("Message Pane;l List : get the List..");
    if (this.$store.state.isRoomSelected) {
      console.log("Mesage List Name : " + this.$store.state.activeRoom.name);
      return this.$store.state.activeRoom.messageList;
    } else {
      return [];
    }
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
</style>
