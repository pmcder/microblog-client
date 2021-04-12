<template>
<div>
<b-button id="show-btn" @click="$bvModal.show('reply-modal')"
        >new post</b-button
      >

 <b-modal id="reply-modal" hide-footer>
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
          <b-button type="submit" variant="primary">add reply</b-button>
          </b-form>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('reply-modal')">cancel</b-button
        >
      </b-modal>
</div>
      </template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      text: null,
      URL : 'http://localhost:3000/api/blog',
      tok : localStorage.getItem('jwt'),
      author : JSON.parse(localStorage.getItem("user")).userName,
      info : null
    };
  },
 
   methods: {
    onSubmit() {
      
      axios.defaults.headers.common['x-access-token'] = this.tok;
      axios({
        method: 'post',
        url: this.URL,
        data: {
          content: this.text,
          author: this.author
        },
      }).then((response) => {
        if (response.status === 201) {
      this.$bvModal.hide('bv-modal-example')
          this.text=""
          
        }
      });
    },
  },
};
</script>
