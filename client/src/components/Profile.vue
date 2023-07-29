<template>
  <div class="row heading">
    <div class="col-sm-3 col-xs-3 heading-avatar">
      <div class="heading-avatar-icon">
        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
      </div>
    </div>
    <div data-v-555c5f4c class="col-sm-5 col-xs-7 heading-name">
      <a data-v-555c5f4c class="heading-name-meta" v-text="userName"></a>
      <span data-v-555c5f4c class="heading-online">Online</span>
    </div>
    <div class="col-sm-1 col-xs-1 heading-dot pull-right">
      <i class="fa fa-ellipsis-v fa-2x pull-right" aria-hidden="true" @click="showModal"></i>
    </div>
    <div class="col-sm-2 col-xs-2 heading-compose pull-right">
      <i class="fa fa-comments fa-2x pull-right" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
  get userName(): string {
    if (this.$store.state.user) return this.$store.state.user.name;
    else return "";
  }
  isModalVisible: boolean = false;
  
  showModal() {
    console.log("Showing Modal");
    let chatRoomName = prompt('Group name please..');
    if(chatRoomName){
       this.$store.dispatch('newChatRoom', chatRoomName);
    }
  }
  hideModal() {
    console.log("Hiding Modal");
    this.isModalVisible = false;
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
