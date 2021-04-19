<template>
  <div class="about">
    Welcome {{ user.firstName }} !

    <div v-for="i in notifications" v-bind:key="i">
      <notification :message="i.message"></notification>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import notification from '../components/notification.vue'

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      notifications : null
    };
  },
  mounted(){
    
    axios
    .get("http://localhost:3000/api/notifications",
    {params:{user:this.user.userName}})
    .then((response)=> (this.notifications=response.data))
    
  },
  components : {
    notification
  }

};
</script>


