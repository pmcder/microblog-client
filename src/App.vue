<template>
  <div id="app">
    <div>
      <b-nav>
      <b-nav-item><router-link to="/">login</router-link></b-nav-item> 
      <b-nav-item><router-link to="/microblog">Posts</router-link></b-nav-item> 
      
      </b-nav>
      
    </div>
    <div class="container">
    <b-row>
      <b-col>
    <router-view/>
      </b-col>
      <b-col>
        welcome
      </b-col>
      </b-row>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

<script>



export default {
 
  
  
  data(){

      return {
      user : JSON.parse(localStorage.getItem("user"))
    }
  },
  
  methods : {
    logout(){
      this.user=null
      localStorage.setItem('jwt',null)
      localStorage.setItem('user',null)
    }
  }
}
</script>

