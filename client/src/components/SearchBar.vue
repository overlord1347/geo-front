<template>
        <div class="row searchBox">
          <div class="col-sm-12 searchBox-inner">
            <div class="form-group has-feedback">
              <input id="searchText" @keyup="searchRoom" type="text" class="form-control searchBox" name="searchText" placeholder="Search">
              <!--<span class="glyphicon glyphicon-search form-control-feedback"></span>-->
            </div>
          </div>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SearchBar extends Vue {
  @Prop() private msg!: string;
  searchRoom({type, target}){
      console.log('Searched :'+target.value);
      this.$store.dispatch('search',target.value);
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
.searchBox{
  font-size: 22px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
