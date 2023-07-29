<template>
  <div class="row heading">
    <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
      <div class="heading-avatar-icon">
        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
      </div>
    </div>
    <div class="col-sm-8 col-xs-7 heading-name">
      <a class="heading-name-meta">{{name}}</a>
      <span class="heading-online">Online</span>
    </div>
    <div class="col-sm-1 col-xs-1 heading-dot pull-right">
      <i class="fa fa-ellipsis-v fa-2x pull-right" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component
export default class MessagePanelHeader extends Vue {
  get name(): string {
    if (this.$store.state.isRoomSelected) {
      console.log("Mesage Panel Name : " + this.$store.state.activeRoom.name);
      return this.$store.state.activeRoom.name;
    } else {
      console.log(' Mesage Panel Name :  setting empty');
      return "";
    }
  }
  //  @PropSync('name', { type: String }) userName!: string
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
