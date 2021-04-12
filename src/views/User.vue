<template>
  <div class="about">
    Welcome {{ user.firstName }} !

    <ul v-for="i in user.notifications" v-bind:key="i">
      <li>i</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>


