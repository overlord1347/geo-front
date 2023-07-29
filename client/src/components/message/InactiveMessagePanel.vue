<template>
  <div class="col-sm-8 conversation">
    <div class="row heading">
      <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
        <div class="heading-avatar-icon"></div>
      </div>
      <div class="col-sm-8 col-xs-7 heading-name"></div>
      <div class="col-sm-1 col-xs-1 heading-dot pull-right"></div>
    </div>
    <div class="row message" id="conversation">
      <div class="row message-previous">
        <div class="col-sm-12 previous">
          <a onclick="previous(this)" id="ankitjain28" name="20">Please select a Friend/Chat room to start chatting..</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InactiveMessagePanel extends Vue {}
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
