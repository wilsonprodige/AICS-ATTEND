import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router'
import {useToast} from 'vue-toast-notification';
const toast = useToast();
// import HomeView from '../views/HomeView.vue'
// import RegisterView from '../views/Register.vue'
// import AdminDashboard from '../views/Admin/Dashboard.vue'
// import UserList from '../views/Admin/UserList.vue'
// import AddUser from '../views/Admin/AddUser.vue'
// import MyRecords from '../views/Admin/MyRecords.vue'
// import AllRecords from '../views/Admin/AllRecords.vue'
// import AttendanceView from '../views/Admin/AttendanceView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=>import('../views/Register.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: ()=>import('../views/Admin/Dashboard.vue'),
    beforeEnter(to, from, next) {
      // Perform middleware-like tasks specific to this route
      if (!store.state.auth) {
        toast.error('login to continue')
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin/userlist',
    name: 'UserList',
    component: ()=>import('../views/Admin/UserList.vue'),
    beforeEnter(to, from, next) {
      // Perform middleware-like tasks specific to this route
      if (!store.state.auth) {
        toast.error('login to continue')
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin/adduser',
    name: 'AddUser',
    component: ()=>import('../views/Admin/AddUser.vue'),
    beforeEnter(to, from, next) {
      // Perform middleware-like tasks specific to this route
      if (!store.state.auth) {
        toast.error('login to continue')
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/myrecords',
    name: 'MyRecords',
    component: ()=>import('../views/Admin/MyRecords.vue'),
    beforeEnter(to, from, next) {
      // Perform middleware-like tasks specific to this route
      if (!store.state.auth) {
        toast.error('login to continue')
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/allrecords',
    name: 'AllRecords',
    component: ()=>import('../views/Admin/AllRecords.vue'),
    beforeEnter(to, from, next) {
      // Perform middleware-like tasks specific to this route
      if (!store.state.auth) {
        toast.error('login to continue')
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/attendanceview',
    name: 'AttendanceView',
    component: ()=>import('../views/Admin/AttendanceView.vue'),
    beforeEnter(to, from, next) {
      // Perform middleware-like tasks specific to this route
      if (!store.state.auth) {
        toast.error('login to continue')
        next('/');
      } else {
        next();
      }
    }
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
