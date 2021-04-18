<template>
  <div class="about">
    Welcome {{ user.firstName }} !

    <ul v-for="i in user.notifications" v-bind:key="i">
      <li>i</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      notifications : null
    };
  },
  mounted(){
    
    axios
    .get('http://localhost:3000/api/notifications',
    {params:{user:this.user.userName}})
    .then((response)=> (this.notifications=response.data))
  }

};
</script>


