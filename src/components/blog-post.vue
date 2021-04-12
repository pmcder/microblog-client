<template>
  <div class="card">
  <div class="card-header">
   {{created}} | by: {{author}}
  </div>
  <div class="card-body">
    <h5 class="card-title"> </h5>
    <p class="card-text">{{content}}</p>
    <div v-for="reply in replies" v-bind:key="reply">
      {{reply.date}} | {{reply.content}}
    </div>
    <!--a href="#" class="btn btn-primary">Go somewhere</a-->
    <div class="card-footer" >
        <b-button id="show-btn" @click="$bvModal.show('reply-modal')">add reply</b-button>
      </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  props : ['created','content', 'postId', 'author'],

  data()  {
    return {
      replies : null
    }
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/replies",{
        params : {postId : this.$props.postId}
      })
      .then((response) => (this.replies = response.data));
  },
}
</script>






