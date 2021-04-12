import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
   
    component: () =>
      import("../views/About.vue")
  },

  {
    path: "/microblog",
    name: "Microblog",
   
    component: () =>
      import("../views/Microblog.vue")
  },

  {
    // path: "user/:id",
    path: "/user",
    name: "User",
    component : () => 
      import("../views/User.vue")
    
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) =>{
    if(to.name=='User' && localStorage.token) next({ name: 'Home' });
    else next();
})

router.console = () => console

export default router;
