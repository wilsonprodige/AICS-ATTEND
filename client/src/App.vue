<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->

  
  <div class="container-xxl position-relative bg-white d-flex p-0" v-if="ShouldShowSidebar">

       


        <!-- Sidebar Start -->
        <div class="sidebar pe-4 pb-3">
            <nav class="navbar bg-light navbar-light">
                <a href="#" class="navbar-brand brand-details mx-5 mb-3">
                    <!-- <h3 class="text-primary"><span class="badge bg-primary">A</span>ICS-ATTEND</h3> -->
                    <h2 class="text-primary fw-bold"><b>A</b></h2><span class="title"><p class="text-underline-primary">ICS-ATTEND</p></span>

                </a>
                <div class="d-flex align-items-center ms-4 mb-4 user-details">
                    <div class="position-relative">
                        <img class="rounded-circle" v-if="Userdata.profilepicture" :src="'/upload/'+Userdata.profilepicture" alt="" style="width: 40px; height: 40px;">
                        <img class="rounded-circle" v-else src="/upload/img.png" alt="" style="width: 40px; height: 40px;">

                        <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div class="ms-3">
                        <h6 class="mb-0">{{ this.Userdata.username }}</h6>
                        <div v-if="this.Userdata.roleId === 1"><span><b>Admin</b></span></div>
                        <div v-else-if="this.Userdata.roleId === 2"><span><b>Registrar</b></span></div>
                        <div v-else-if="this.Userdata.roleId === 3"><span><b>User</b></span></div>
                        
            
                    </div>
                </div>
                <div class="navbar-nav w-100">
                    <div  v-for="priv in privs" :key="priv.id">
                        <router-link :to="{name: priv.routeName}" class="nav-item nav-link" active-class="active"><i :class="priv.icon"></i>{{ priv.name }}</router-link>
                    </div>
                    
                   
                    <!-- <router-link to="/myrecords" class="nav-item nav-link" active-class="active"><i class="fa fa-keyboard me-2"></i>My Records</router-link>
                    <router-link to="/allrecords" class="nav-item nav-link" active-class="active"><i class="fa fa-table me-2"></i>All Records</router-link>
                    <router-link to="/attendanceview" class="nav-item nav-link" active-class="active"><i class="fa fa-plus-square me-2"></i>Daily Attendance</router-link>
                    <router-link to="/admin/userlist" class="nav-item nav-link" active-class="active"><i class="fa fa-users me-2"></i>Users</router-link>-->
                    <a class="nav-item nav-link" active-class="active"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style="cursor: pointer;" @click="set_profile"><i class="fa fa-user me-2"></i>profile</a>  
                    <!--right side canvas for profile-->
                    
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header mt-4">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel">Profile</h5>
                            <button type="button" id="dismiss_profile" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="close_profile"></button>
                        </div>
                        <div class="offcanvas-body">
                            <h3 class="text-primary">Profile settings</h3>
                            <div class="container">
                                <form class="bg-light rounded h-100 p-4" @submit.prevent="updateProfile">

                                    <!--Form  -->
                                        <div class="mb-2 mt-0">
                                            <label for="username" class="form-label">Username</label>
                                            <input type="text" class="form-control" id="username" v-model="profile_data.username">
                                        </div>
                                        <div class="mb-2">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" v-model="profile_data.email">
                                        </div>
                                        <div class="mb-2">
                                            <label for="phone" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="phone" v-model="profile_data.name">
                                        </div>
                                        <div class="mb-2">
                                            <label for="matricule" class="form-label">Matricule</label>
                                            <input type="text" class="form-control" id="matricule" v-model="profile_data.matricule" disabled>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label for="account">Account Type</label>
                                            <select class="form-select mb-3" aria-label="Default select example"  id="account" disabled v-model="profile_data.roleId">
                                                <option selected value="1">Admin</option>
                                                <option value="3">User</option>
                                                <option value="2">Registrar</option>
                                            </select>

                                        </div>
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Profile Avatar</label>
                                            <div class="" style="display: flex; flex-direction: row; width: 100%;">
                                                <input class="form-control" type="file" id="formFile" v-on:change="profileChanged">
                                                <img v-if="profile_data.profilepicture" class="rounded-circle me-lg-2" :src="'/upload/'+profile_data.profilepicture" alt="" style="width: 40px; height: 40px;">
                                            </div>
                                            
                                        </div>
                                        <div class="mb-3" style="width: 100%;">
                                            <button class="btn btn-primary" style="width: 100%;" @click="update_profile">Save</button>
                                        </div>
                                        

                                        <!--End of form-->
                                        
                                    
                                </form>
                            </div>
                            
                        </div>
                    </div>








                    <!--end of profile-->
                
                </div>
            </nav>
        </div>
        <!-- Sidebar End -->


        <!-- Content Start -->
        <div class="content">
            <!-- Navbar Start -->
            <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
                    <h2 class="text-primary mb-0"><span class="badge bg-primary">A</span></h2>
                </a>
                <a href="#" class="sidebar-toggler flex-shrink-0" @click="toggle">
                    <i class="fa fa-bars"></i>
                </a>
                <!-- <form class="d-none d-md-flex ms-4">
                    <input class="form-control border-0" type="search" placeholder="Search">
                </form> -->
                <div class="navbar-nav align-items-center ms-auto">
                    <div class="time-box">
                      <Time/>
                        
                    </div>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="fa fa-bell me-lg-2"></i>
                            <span class="d-none d-lg-inline-flex" @click="Reload">Notification</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <a href="#" class="dropdown-item">
                                <h6 class="fw-normal mb-0">Profile updated</h6>
                                <small>15 minutes ago</small>
                            </a>
                            <hr class="dropdown-divider">
                            <a href="#" class="dropdown-item">
                                <h6 class="fw-normal mb-0">New user added</h6>
                                <small>15 minutes ago</small>
                            </a>
                        </div>
                    </div>
                    <div class="nav-item dropdown" v-if="getUserData" :Userdata="getUserData" >
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img class="rounded-circle me-lg-2" v-if="Userdata.profilepicture" :src="'/upload/'+Userdata.profilepicture" alt="" style="width: 40px; height: 40px;">
                            <img class="rounded-circle me-lg-2" v-else src="/upload/img.png" alt="" style="width: 40px; height: 40px;">
                            <span class="d-none d-lg-inline-flex">{{ this.Userdata.username }}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0 drop_down_user">
                            <a href="#" class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" @click="set_profile">My Profile  <i class="fa fa-user" aria-hidden="true"></i></a>
                            <a href="#" class="dropdown-item"  @click="logout">Sign Out     <i class="fa fa-power-off"></i></a>
                        </div>
                    </div>
                </div>
            </nav>
            <!-- Navbar End -->


           <router-view/>

            <!-- Footer Start -->
            <div class="container-fluid pt-4 px-4">
                <div class="bg-light rounded-top p-4">
                    <div class="row">
                        <div class="col-12 col-sm-6 text-center text-sm-start">
                            &copy; <a href="#">AICS-ATTEND</a>, All Right Reserved. 
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer End -->
        </div>
        <!-- Content End -->


        <!-- Back to Top -->
        <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </div>
  <div v-else>
    <!-- <div v-if="!isLoaded" id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
    </div> -->

    <router-view/>
    
    </div>
</template>
<script>

import Time from '../src/components/Time.vue'
import $ from 'jquery';
import SidebarMixin from './SidebarMixin.js'
import { makeRequest } from './axios';



export default {
  mixins: [SidebarMixin],
  components:{Time},
  data(){
    return{
        viewpwd:false,
        isLoaded:true,
        isopen:false,
        profileImage:true,
        username:'John',
        email:'john@gmail.com',
        phone:'672369066',
        password:'John1234#',
        account:'Admin',
        profileAvatar:'',
        Userdata:[],
        privs:[],
        profile_data:[]
        
    }
  },
  created(){
    //reset the stored data 
         console.log('created')
        const savedState = sessionStorage.getItem('storeState');
        if (savedState) {

         this.$store.replaceState(JSON.parse(savedState));
         console.log('state has been resetted')
        }
        console.log('called created')
        console.log(this.isAuth)
        console.log(this.getUserId)
        if(this.isAuth){
            this.fetch_user_data();  
            this.set_data();

        }else{
            if(this.ShouldShowSidebar){
                this.$router.push("/");
            }

        }
    },
  mounted(){
    //make the spinner invisible
   const spinner= document.getElementById('spinner')
   spinner.classList.remove('show')
    
    this.isLoaded=false

    window.addEventListener('beforeunload', () => {
        if(this.isAuth){

        
            sessionStorage.setItem('storeState', JSON.stringify(this.$store.state));
            //this.$toast.error("called before unmount");
        }
    });
    
   
    if(SidebarMixin.ShouldShowSidebar){

    //spinner.classList.remove('show')
    // const script = document.createElement('script')
    // script.src = require('./assets/loaded.js')
    // document.head.appendChild(script)

    //profile check
    if(!this.profileAvatar){
        this.profileImage=false
    }
    
    console.log("called mounted" + this.getUserData +" "+this.getUserPrivs)
    }

  },
  beforeCreate(){
   
    
  },
  beforeMount(){
  },
  computed:{
    isAuth(){
        return this.$store.state.auth;
    },
    getUserId(){
        return this.$store.state.user_id

    },
    getUserData(){
        return this.$store.state.User_data
    },
    getUserPrivs(){
        return this.$store.state.User_privs
    }
         
         
    

  },
  watch:{
    isAuth(newval){
        if(newval==true){
            //fetch user details
            console.log("called")
            this.fetch_user_data();  
            this.set_data();

        }
    }

  },
  
  methods:{
    set_profile(){
        this.profile_data={...this.Userdata}

    },
    close_profile(){
        this.profile_data=[],
        this.profileAvatar=''

    },
    async uploadProfile(){
        try{
            const formData = new FormData();
            formData.append("file",this.profileAvatar);
            const res = await makeRequest.post("/upload",formData);
            return res.data.file_name


        }catch(err){
            console.log(err);
        }

    },
    async update_profile(){
        //check if file has been added and upload it
        try{

        
            let profile =''
                if(this.profileAvatar){
                    //check for the file size and file type
                    try{
                        profile = await this.uploadProfile();

                    }catch(error){
                        console.log(error)
                        this.$toast.error("could not upload file")
                    }
                }else{
                    profile = this.Userdata.profilepicture
                }
                //console.log(profile+"profile")
                this.profile_data.profilepicture = profile
                //console.log(this.profile_data)
                // upload the user data
                makeRequest.post('/users/updateProfile/'+this.getUserId,this.profile_data)
                .then(res=>{
                    if(!res.data.Error){
                        this.$toast.success('profile updated successfully')
                        this.fetch_user_data()
                        //location.reload(true)
                        const btn_profile= document.getElementById('dismiss_profile')
                        btn_profile.click()
                    }else{
                        this.$toast.error(res.data.Error)
                    }

                })
                .catch(error=>{
                    console.log(error);
                    this.$toast.error("Metwork error,try again")

                })
            }catch(err){
                console.log(err)
                this.$toast.error("Metwork error,try again")
            }
        
    },
    toggle(){
        $('.sidebar, .content').toggleClass("open");
        return false;
    },
    profileChanged(event) {
        this.profileImage=false
      this.profileAvatar = event.target.files[0];
    },
    viewPassword(){
    const pwd = document.getElementById('pwd')
      if(pwd.type==='password'){
        pwd.type='text'
      }
      else{
        pwd.type='password'
      }
      this.viewpwd=!this.viewpwd

    },
    logout(){
        makeRequest.get('/auth/logout')
        .then(res=>{
            if(!res.data.Error){
                //dispatch the data in the store
                this.$store.dispatch('logout');
                //this.setUId(user_id)
                //this.setAuth(authStatus)
                sessionStorage.removeItem('storeState');
                this.$router.push('/');
                console.log("logged out")
            }else{
                this.$toast.error(res.data.Error)
            }

        })
        .catch(err=>{
            console.log(err);
            this.$toast.error("Network error, please try again")
        })
        
    },
     async fetch_user_data(){
        try{
            const response= await makeRequest.get('/auth/');
            const user_info = response.data;
            this.$store.dispatch('setUserData',user_info)
            console.log(user_info)
            this.Userdata=user_info
            this.fetchprivs(user_info.roleId)
        }catch(error){
            console.log(error)
            this.$toast.error('could not laod user data')
        }

    },
    
    async fetchprivs(role_id){

        let user_role = role_id;
        try{
            const result = await  makeRequest.get("/roles/getprivs/"+user_role)
            const privs = result.data
            console.log(privs)
            this.privs= privs.Privileges;
            this.$store.dispatch('setUserPrivs',privs)


        }catch(err){
            console.log(err)
            this.$toast.error("could not fetch privs")
        }
        

    },
    set_data(){
        this.Userdata = this.getUserData;
        this.privs = this.getUserPrivs.Privileges;
        
    }
    
  }

}


</script>

<style>
body{
    background-image: url('./assets/back.svg');
    background-size: cover;
    min-height: 100vh;
}
   
   
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.alert-danger {
  animation: fadeIn 2s forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    display: inline;
  }
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
:root {
        --primary: #009CFF;
        --light: #F3F6F9;
        --dark: #191C24;
    }
    
    .back-to-top {
        position: fixed;
        display: none;
        right: 45px;
        bottom: 45px;
        z-index: 99;
    }
    
    
    /*** Spinner ***/
    #spinner {
        opacity: 0;
        visibility: hidden;
        transition: opacity .5s ease-out, visibility 0s linear .5s;
        z-index: 99999;
    }
    
    #spinner.show {
        transition: opacity .5s ease-out, visibility 0s linear 0s;
        visibility: visible;
        opacity: 1;
    }
    
    
    /*** Button ***/
    .btn {
        transition: .5s;
    }
    
    .btn.btn-primary {
        color: #FFFFFF;
    }
    
    .btn-square {
        width: 38px;
        height: 38px;
    }
    
    .btn-sm-square {
        width: 32px;
        height: 32px;
    }
    
    .btn-lg-square {
        width: 48px;
        height: 48px;
    }
    
    .btn-square,
    .btn-sm-square,
    .btn-lg-square {
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        border-radius: 50px;
    }
    
    
    /*** Layout ***/
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 250px;
        height: 100vh;
        overflow-y: auto;
        background: var(--light);
        transition: 0.5s;
        z-index: 999;
    }
    
    .content {
        margin-left: 250px;
        min-height: 100vh;
        background: #FFFFFF;
        transition: 0.5s;
    }
    
    @media (min-width: 992px) {
        .sidebar {
            margin-left: 0;
        }
    
        .sidebar.open {
            margin-left: -250px;
        }
    
        .content {
            width: calc(100% - 250px);
        }
    
        .content.open {
            width: 100%;
            margin-left: 0;
        }
    }
    
    @media (max-width: 991.98px) {
        .sidebar {
            margin-left: -250px;
        }
    
        .sidebar.open {
            margin-left: 0;
        }
    
        .content {
            width: 100%;
            margin-left: 0;
        }
    }
    
    
    /*** Navbar ***/
    .sidebar .navbar .navbar-nav .nav-link {
        padding: 7px 20px;
        color: var(--dark);
        font-weight: 500;
        border-left: 3px solid var(--light);
        border-radius: 0 30px 30px 0;
        outline: none;
    }
    
    .sidebar .navbar .navbar-nav .nav-link:hover,
    .sidebar .navbar .navbar-nav .nav-link.active {
        color: var(--primary);
        background: #FFFFFF;
        border-color: var(--primary);
    }
    
    .sidebar .navbar .navbar-nav .nav-link i {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        border-radius: 40px;
    }
    
    .sidebar .navbar .navbar-nav .nav-link:hover i,
    .sidebar .navbar .navbar-nav .nav-link.active i {
        background: var(--light);
    }
    
    .sidebar .navbar .dropdown-toggle::after {
        position: absolute;
        top: 15px;
        right: 15px;
        border: none;
        content: "\f107";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        transition: .5s;
    }
    
    .sidebar .navbar .dropdown-toggle[aria-expanded=true]::after {
        transform: rotate(-180deg);
    }
    
    .sidebar .navbar .dropdown-item {
        padding-left: 25px;
        border-radius: 0 30px 30px 0;
    }
    
    .content .navbar .navbar-nav .nav-link {
        margin-left: 25px;
        padding: 12px 0;
        color: var(--dark);
        outline: none;
    }
    
    .content .navbar .navbar-nav .nav-link:hover,
    .content .navbar .navbar-nav .nav-link.active {
        color: var(--primary);
    }
    
    .content .navbar .sidebar-toggler,
    .content .navbar .navbar-nav .nav-link i {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        border-radius: 40px;
    }
    
    .content .navbar .dropdown-toggle::after {
        margin-left: 6px;
        vertical-align: middle;
        border: none;
        content: "\f107";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        transition: .5s;
    }
    
    .content .navbar .dropdown-toggle[aria-expanded=true]::after {
        transform: rotate(-180deg);
    }
    
    @media (max-width: 575.98px) {
        .content .navbar .navbar-nav .nav-link {
            margin-left: 15px;
        }
    }
    
    
    /*** Date Picker ***/
    .bootstrap-datetimepicker-widget.bottom {
        top: auto !important;
    }
    
    .bootstrap-datetimepicker-widget .table * {
        border-bottom-width: 0px;
    }
    
    .bootstrap-datetimepicker-widget .table th {
        font-weight: 500;
    }
    
    .bootstrap-datetimepicker-widget.dropdown-menu {
        padding: 10px;
        border-radius: 2px;
        border: none;
    }
    
    .bootstrap-datetimepicker-widget table td.active,
    .bootstrap-datetimepicker-widget table td.active:hover {
        background: var(--primary);
    }
    
    .bootstrap-datetimepicker-widget table td.today::before {
        border-bottom-color: var(--primary);
    }
    
    
    /*** Testimonial ***/
    .progress .progress-bar {
        width: 0px;
        transition: 2s;
    }
    
    
    /*** Testimonial ***/
    .testimonial-carousel .owl-dots {
        margin-top: 24px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    
    .testimonial-carousel .owl-dot {
        position: relative;
        display: inline-block;
        margin: 0 5px;
        width: 15px;
        height: 15px;
        border: 5px solid var(--primary);
        border-radius: 15px;
        transition: .5s;
    }
    
    .testimonial-carousel .owl-dot.active {
        background: var(--dark);
        border-color: var(--primary);
    }

    a:hover{
        color:var(--primary);
    }

    .dropdown-menu .dropdown-item:hover{
        background: var(--primary);
        border-radius: 5px;
    }
    .navbar-nav{
        display: flex;
        justify-content: left;
        text-align: left;
    }
    .brand-details{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        margin-top: 35px;
    }
    @media (max-width: 990px) {
        .brand-details{
            margin-top: 20px;
        }
        
    }

    /*time box styling */
    .time-box{
        width: 100px;
        height: 100%;
        display: flex;
        border: 2px solid var(--primary);
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        text-align: center;

    }
    .display-none{
      display: none;
    }
    .drop_down_user{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        
    }



</style>
