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
     <b-modal id="reply-modal" hide-footer>
        <template #modal-title> New Reply to Post </template>
        <div>
          <b-form @submit.prevent="submitReply">
          <b-form-textarea
            id="textarea"
            v-model="replyText"
            placeholder="What's on your mind..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-button type="submit" variant="primary">add reply</b-button>
          </b-form>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('reply-modal')">cancel</b-button
        >
      </b-modal>
    <div class="card-footer" >
        <b-button v-if="loggedIn" id="show-btn" @click="$bvModal.show('reply-modal')">add reply</b-button>
      </div>
  </div>
  
</div>
</template>

<script>
import axios from "axios";

export default {
  props : ['created','content', 'pid', 'author'],

  data()  {
    return {
      replies : null,
      replyText : null
    }
  },

  methods : {
     submitReply() {
      
      axios.defaults.headers.common['x-access-token'] = this.tok;
      axios({
        method: "post",
        url: "http://localhost:3000/api/replies",
        data: {
          content: this.replyText,
          postId: this.pid
        },
      }).then((response) => {
        if (response.status === 201) {
      //      axios
      // .get("http://localhost:3000/api/blog")
      // .then((response) => (this.info = response.data));
       this.$bvModal.hide('reply-modal')
          this.replyText=""
        }
      });
    },
      
  },

  // mounted() {
  //   console.log("mounted hit")
  //   axios
  //     .get('http://localhost:3000/api/replies',{
  //       params : {postId : this.$props.pid}
  //     })
  //     .then((response) => (this.replies = response.data));
  // },
    computed : {
    loggedIn() {
      return this.$store.state.loggedIn
    },
    
  },
}
</script>






