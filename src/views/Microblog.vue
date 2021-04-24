<template>
  <div class="container">
    <b-row>
    <b-col>
    <h1>Posts</h1>
    <b-button v-if="loggedIn" id="show-btn" @click="$bvModal.show('bv-modal-example')"
        >new post</b-button
      >
    <div v-if="!loggedIn">
      Please log in to post and reply.
    </div>
    </b-col>
    <b-col>
    
    <blog-post v-for="post in info" v-bind:key="post.id"
    v-bind:content="post.content"
    v-bind:pid="post.id"
    v-bind:created="post.date"
    v-bind:author="post.author"></blog-post>

    <div>
      
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title> New Post </template>
        <div>
          <b-form @submit.prevent="onSubmit">
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="What's on your mind..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-button type="submit" variant="primary">post</b-button>
          </b-form>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">cancel</b-button
        >
      </b-modal>
     
    </div>
    </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import BlogPost from "../components/blog-post.vue";

export default {
  data() {
    return {
      info: null,
      text: null,
      URL : 'http://localhost:3000/api/blog',
      tok : localStorage.getItem('jwt')
    };
  },

  computed : {
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/blog")
      .then((response) => (this.info = response.data));
  },
  components: {
    BlogPost,
  },
  methods: {
    onSubmit() {
      axios.defaults.headers.common['x-access-token'] = this.tok;
      axios({
        method: "post",
        url: this.URL,
        data: {
          content: this.text,
          author: JSON.parse(localStorage.getItem("user")).userName
        },
      }).then((response) => {
        if (response.status === 201) {
           axios
      .get("http://localhost:3000/api/blog")
      .then((response) => (this.info = response.data));
      this.$bvModal.hide('bv-modal-example')
          this.text=""
        }
      });
    },
   
  },
};
</script>
