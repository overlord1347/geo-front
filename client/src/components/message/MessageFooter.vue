<template>
      <div class="row reply">
        <div class="col-sm-1 col-xs-1 reply-emojis">
          <i class="fa fa-smile-o fa-2x"></i>
        </div>
        <div class="col-sm-9 col-xs-9 reply-main">
          <textarea class="form-control" 
              v-model='message'
              @keydown.enter.exact.prevent
              @keydown.enter.exact='send'
              @keydown.enter.shift.exact='newLine'
             rows="1"></textarea>
        </div>
        <div class="col-sm-1 col-xs-1 reply-recording">
          <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
        </div>
        <div class="col-sm-1 col-xs-1 reply-send">
          <i class="fa fa-send fa-2x" @click="send" aria-hidden="true"></i>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MessageFooter extends Vue {
  private message: string ='';
  newLine(){
    //this.message = this.message + '{this.message}\n';
  }
  send(){
    console.log(`Sending Message :{this.message} ;`+this.message);
    if(this.message.trim().length == 0) return;
    this.$store.dispatch('sendMessage',{message: this.message, fromName: this.$store.state.user.name , fromId: this.$store.state.user.id, toId:this.$store.state.activeRoom.id});
    this.message ='';
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
