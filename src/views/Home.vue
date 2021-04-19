<template>
  <div class="home">
    <b-container>
      <b-button v-on:click="logOut">logout</b-button>
      <div v-if="loggedIn">
       you are logged in !
       <router-link to="/user">user page</router-link>
       </div>
      <b-row>
       
        <b-form @submit="onSubmit">
          <b-form-group
            id="fieldset-1"
            v-model="username"
            description="Enter your username."
            label="Login"
            label-for="input-1"
          >
          <b-form-input id="input-1" v-model="username"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldset-1" description="Enter your password.">
            <b-form-input id="input-2" v-model="password" type="password"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
     
    </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
//import mapState from "vuex";
export default {
  name: "Home",
  data() {
    return {
      username: null,
      password: null,
      URL: "http://localhost:3000/api/signin"
    };
  },
  computed: {
  console: () => console,
  window: () => window,
   loggedIn () {
      return this.$store.state.loggedIn;
    }
},

  methods: {
     
    logOut(){
      this.$store.commit('logOut')
    },
    onSubmit(event) {
      event.preventDefault();
           this.error = false;

      axios({
        method: "post",
        url: this.URL,
        data: {
          userName: this.username,
          password: this.password,
        },
      }).then(
        (response) => {
          if (response.status === 200) {
            this.token = response.data.token;
          
            this.username = "";
            this.password = "";
            localStorage.setItem('jwt',response.data.token)
            localStorage.setItem('user',JSON.stringify(response.data.u))
            this.$router.push('/user');
            this.$store.commit('logIn')
          } if (response.status == 401) {
            console.log("incorrect username or password");
          }
        },
        (error) => {
          this.error = true;
          console.log(error);
        }
      );  
    },
  },
};
</script>
