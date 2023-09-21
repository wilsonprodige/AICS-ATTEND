<template>
  <div class="container py-5 px-5 main-container">
    

    <div class="container-fluid d-flex align-items-center rounded shadow-lg myboxcontainer">
      <div class="box myboxes">
          <LoginImg :src="require('../assets/register.png')"/>
      </div>
      <div class="box myboxes">
        <!---alert-->
        <div>
            <div class="alert alert-danger overflow-scroll" id="alert" role="alert"  v-show="passwordError||emailError||nameError||confirmpassError||usernameError" @transitionend="deleteError">
              {{ passwordError }} {{ emailError }}{{ nameError }} {{ confirmpassError }}{{ usernameError }}
              <button type="button" class="btn-close" @click="deleteError"></button>
            </div>
        </div>

      <!--End of alert-->

        <h1 class="mt-0">Sign Up...</h1>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="fullname">Full name</label>
            <input type="text" id="fullname" class="form-control" placeholder="please enter your full namee.." v-model="name" required/>
          </div>

          <div class="mb-3">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control" placeholder="please enter your username.." v-model="username" required/>
          </div>


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

          <div>
            <label for="conpwd">Confirm Password</label>
          </div>
          <div class="input-group mb-3">
            <input type="password" id="conpwd" class="form-control" placeholder="confirm your password" v-model="confirmpassword" required/>
            <button class="btn btn-outline-secondary" type="button" id="button-addon3" @click="viewconPassword"><i class="bi bi-eye-fill" v-if="viewconpwd"></i><i class="bi bi-eye-slash" v-if="!viewconpwd"></i></button>
          </div>
          
          

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="acceptterms">
            <label class="la form-check-label" for="flexCheckDefault">
              Accept the <a href="">terms and conditions</a>
            </label><br>
            
          </div>
          
            <p>Already have an account<router-link to="/">Sign-In</router-link></p>

          <div class="input-group">
            <button id="submitbtn" type="submit" class="btn btn-primary btn-md disabled">Sign Up</button>

          </div>
            

          
          
  
            

          
          
        </form>




      
      </div>
    </div>


    

  </div>
       
      


     
</template>

<script>

import LoginImg from '../components/LoginImg.vue'
import { makeRequest } from '@/axios'

export default {
    name:'RegisterView',
    data(){
    return{
      showAlert:false,
      viewpwd:false,
      viewconpwd:false,
      name:'',
      username:'',
      email:'',
      password:'',
      confirmpassword:'',
      acceptterms:false,
      nameError:'',
      passwordError:'',
      usernameError:'',
      emailError:'',
      confirmpassError:'',
      emailCorrect:false,
      passwordCorrect:false



    }
  },

  methods:{
    /* eslint-disable */ 

    isNameValid(){
        let minsize=2
        let maxsize=60
        let hasValidcharacters = /^[a-zA-Z\s'-]+$/.test(this.name)


        return this.name.length>minsize && this.name.length < maxsize && hasValidcharacters

    },
    isUsernameValid(){

      let minsize=5
      let hasValidcharacters = /^[a-zA-Z0-9'-]+$/.test(this.username)

      return this.username.length >= minsize && hasValidcharacters
    },
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
    viewconPassword(){
      if(conpwd.type==='password'){
        conpwd.type='text'
      }
      else{
        conpwd.type='password'
      }
      this.viewconpwd=!this.viewconpwd

    },

    register(){
      //check if password and email are valid
      if(this.isEmailValid(this.email)){
        if(this.isPasswordValid(this.password)){
          //check complete, validation at server level
          //console.log(this.email,this.password,this.remember)
          if(this.isNameValid()){
            //console.log(this.isNameValid())
            //onsole.log('here name is valid')

            if(this.password===this.confirmpassword){
              //console.log('passwords are same')

              if(this.isUsernameValid()){
                //console.log('username valid')
                //all inputs check
                let values=[{
                  name:this.name,
                  username:this.username,
                  password:this.password,
                  email:this.email
                }]
                makeRequest.post("/auth/register",values[0])
                .then(res=>{
                  if(!res.data.Error){
                    this.$router.push('/')
                    this.$toast.success("account created successfully")
                  }else{
                    this.$toast.error(res.data.Error)
                    console.log(res.data.Error)
                  }
                })
                .catch(err=>{
                  this.$toast.error("network error try again")
                  console.log(err)
                })
                console.log(this.name,this.username,this.email,this.password)

              }else{
                this.$toast.error('Username must be atleast 5 characters and should not contain special characters')
              }
            }
            else{
              this.$toast.error('Confirm password does not match password')

            }

          }else{
            if(!this.nameError){
                this.$toast.error('name must be less than 60 characters,greater than 2, and should not contain special characters'); 
                console.log(this.nameError)
                
            }
          }

        }
        else{
          
          this.$toast.error('Invalid password,password must be atleast 8 characters, contain lower case,uppercase and special characters');
          
          
          

        }

      }
      else{
        this.$toast.error('Invalid email');

        
      }

    },
    deleteError(){
        this.emailError=''
        this.passwordError=''
        this.nameError=''
        this.confirmpassError=''
        this.usernameError=''
        

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

    },
    acceptterms(value){
        if(value){
            //console.log(value)
            submitbtn.classList.remove('disabled')
        }
        else{
            //console.log(value)
            submitbtn.classList.add('disabled')

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

<style scoped>

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");


body{
  height: 100vh;
  background: url('../assets/back.svg');
  background-size: cover;
}

.container-fluid{

border-radius: 15px;
background: white;


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
  .main-container{
    height: 100%;
    
    
  }
  
}






</style>