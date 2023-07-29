<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  // Data property
  // myDataProperty: string;

  private created() {
    // Object Created Life Cycle.
   // $socket = io("http://localhost:3000");
    // this.$options.sockets.hello_vue = (data) => {
		// 		console.log("Got the Response from Server: "+data)
		// 	}
  }
  // Lifecycle hook
  private mounted() {
    if (!this.$store.state.isLoggedIn) {
        this.$router.push('/login');
    } else {
        this.$router.push('/');
    }
    // this.$router.push('/');
    console.log('Sending Socket Message');
    //this.$socket.emit('SEND_MESSAGE', 'I am new Client');   
  }

  // Component method
  // updateMyProperty ($event:) {
  //   this.myDataProperty = $event.target.value
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
