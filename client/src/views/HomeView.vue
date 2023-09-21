<template>
  <div class="container py-5 px-5">
    

    <div class="container-fluid d-flex align-items-center rounded shadow-lg mt-10 myboxcontainer">
      <div class="box myboxes">
          <LoginImg :src="require('../assets/62.png')"/>
      </div>
      <div class="box myboxes">
        <!---alert-->
        <div>
            <div class="alert alert-danger" id="alert" role="alert"  v-show="passwordError || emailError" @transitionend="deleteError">
              {{ passwordError }}  
              {{ emailError }}
              <button type="button" class="btn-close" @click="deleteError"></button>
            </div>
        </div>

      <!--End of alert-->

        <h1 class="mt-0">Welcome Back...</h1>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" placeholder="please enter your email.." v-model="email" required/>
          </div>
          <div class="error" v-if="emailCorrect"><p class="text-success">Valid Email</p></div>
  


          <div>
            <label for="pwd">Password</label>
          </div>
          <div class="input-group mb-3">
            <input type="password" id="pwd" class="form-control" placeholder="please enter your password" v-model="password" required/>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="viewPassword"><i class="bi bi-eye-fill" v-if="viewpwd"></i><i class="bi bi-eye-slash" v-if="!viewpwd"></i></button>
          </div>
          <div class="error" v-if="passwordCorrect"><p class="text-success">Valid Password</p></div>
          

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="remember">
            <label class="la form-check-label" for="flexCheckDefault">
              Remember Me
            </label><br>
            
          </div>
          
            <p>Don't yet have an account<router-link to="/register">Create one</router-link></p>

          <div class="input-group">
            <button type="submit" class="btn btn-primary btn-md">Login</button>

          </div>
            

          
          
  
            

          
          
        </form>




      
      </div>
    </div>


    

  </div>
       
      


     
    
    
</template>

<script>
// @ is an alias to /src
import LoginImg from '../components/LoginImg.vue'
import {makeRequest} from '../axios.js'
import { mapActions } from 'vuex'


export default {
  name: 'HomeView',

  data(){
    return{
      showAlert:false,
      viewpwd:false,
      email:'',
      password:'',
      remember:false,
      passwordError:'',
      emailError:'',
      emailCorrect:false,
      passwordCorrect:false



    }
  },

  methods:{
    ...mapActions(['setUId','setAuth']),
    /* eslint-disable */ 
    isEmailValid(value){
      let  Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return Regex.test(value)


    },
    isPasswordValid(value){
      let minLength = 8;
      let hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      return value.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
          


    },
    viewPassword(){
      if(pwd.type==='password'){
        pwd.type='text'
      }
      else{
        pwd.type='password'
      }
      this.viewpwd=!this.viewpwd

    },

    login(){
      //check if password and email are valid
      if(this.isEmailValid(this.email)){
        if(this.isPasswordValid(this.password)){
          //check complete, validation at server level
          const values=[{
            email:this.email,
            password:this.password
          }]
          makeRequest.post("/auth/login",values[0])
          .then(res=>{
            if(!res.data.Error){
              this.$toast.success("logged in successfully")
              //add user data to the store 
              //console.log(res.data)
              let auth_stat = true
              //this.setUId(res.data)
              this.$store.dispatch('setUId', res.data);
              this.$store.dispatch('setAuth', auth_stat);
              //this.setAuth(auth_stat)
              this.$router.push('/myrecords');
              
            
            }else{
              this.$toast.error(res.data.Error)
            }
          })
          .catch(err=>{
            this.$toast.error('network error try again')
            console.log(err)
          })
          // console.log(this.email,this.password,this.remember)
          // this.$toast.success('inputs ok')
          //this.$router.push('/admin/dashboard');

        }
        else{
          
          this.$toast.error('Invalid password')
          
          
          

        }

      }
      else{
      this.$toast.error('Invalid email')

        
      }

    },
    deleteError(){
        this.emailError=''
        this.passwordError=''
        

    }


    
  },
  components: {
    LoginImg
    
  
  },
  watch:{
    email(value){
      if(this.isEmailValid(value)){
        this.emailCorrect=true
      }
      else{
        this.emailCorrect=false
      }
    },

    password(value){
      if(this.isPasswordValid(value)){
        this.passwordCorrect=true
      }
      else{
        this.passwordCorrect=false
      }

    }

  },
  computed(){
    
    console.log(this.email)

  },
  mounted(){


  }
}
</script>
<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

body{
  height: 100vh;
  background-image: url('../assets/back.svg');
  background-size: cover;
}


.container-fluid{

border-radius: 15px;
background: white;


}
.myboxcontainer{
  margin-top: 5%;
}
.myboxes{
  padding: 15px;
  width: 50%;
 

}
label,button,p{
    float: left;
  }
  form{
    display: flex;
    flex-direction: column;
  }
.btn-md{
  width: 100px;
}


@media (max-width: 768px) {
  .container-fluid {
    flex-direction: column;
    
  }
  .myboxes{
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
   
  }
  body{
    height: 100%;
  }
  
}





</style>
