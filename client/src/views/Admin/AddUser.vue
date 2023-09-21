<template>
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-chevron-left fa-2x text-primary" style="cursor: pointer;" @click="goBack"></i>
                            <div class="ms-3">
                                <h4 class="mb-2 text-primary">Add User</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
        <!--form wizard-->
        <div class="container-fluid pt-4 px-4">

            <div class="row g-4">
                <div class="col-sm-12 col-xl-12">
                        <div class="bg-light rounded h-100 p-4">
                            <!-- <h6 class="mb-4">Basic Form</h6> -->

                            
                            <form class="form" @submit.prevent="submitForm">
                                <h1 class="text-center">Add user data ....</h1>
                                <!--progress bar-->
                                <div class="progressbar">

                                    <div class="progress" id="progress" :style="{width:progressBarWidth}"></div>
                                    <div class="progress-step"  ref="one"></div>
                                    <div class="progress-step"  ref="two"></div>
                                    <div class="progress-step"  ref="three"></div>
                                  
                                </div>

                                <!--Steps-->
                                <div class="form-step form-step-active" v-if="currentStep === 1">
                                    <div class="step-info-1">
                                        <h4>Personal Data</h4>
                                    </div>
                                    <div class="input-group">
                                        <label for="name">Name</label>
                                        <input type="text" name="full_name" id="name" required v-model="formData.name">
                                    </div>
                                    <div class="input-group">
                                        <label for="user_name">Username</label>
                                        <input type="text" name="username" id="user_name" required v-model="formData.username">
                                    </div>
                                    <div class="input-group">
                                        <label for="position">Email</label>
                                        <input type="email" name="position" id="position" required v-model="formData.email">
                                    </div>
                                    <div class="">
                                        <button type="button" class="btn btn-next width-50 ml-auto btn-primary " @click="nextStep">Next</button>
                                    </div>
                                </div>

                                <div class="form-step form-step-active" v-if="currentStep === 2">
                                    <div class="step-info-2">
                                        <h4>User Auth data</h4>
                                    </div>
                                    <div class="input-group">
                                        <label for="matricule_id">matricule</label>
                                        <input type="text" name="matricule" id="matricule_id" v-model="formData.matricule" required>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" name="password" id="password" v-model="formData.password" class="form-control" placeholder="password" required>
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="viewPassword"><i class="bi bi-eye-fill" v-if="viewpwd"></i><i class="bi bi-eye-slash" v-if="!viewpwd"></i></button>
                                    </div>
                                    <div class="input-group">
                                        
                                        <input type="password" name="conpassword" id="conpassword" v-model="formData.confrimPassword" class="form-control" placeholder="confirm password" required>
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="viewConPassword"><i class="bi bi-eye-fill" v-if="viewconpwd"></i><i class="bi bi-eye-slash" v-if="!viewconpwd"></i></button>

                                    </div>
                                    <div class="btn-group">
                                        <button type="button" class="btn  btn-primary  btn-prev" @click="prevStep">Prev</button>
                                        <button type="button" class="btn btn-primary  btn-next" @click="nextStep">Next</button>
                                    </div>
                                </div>

                                <div class="form-step form-step-active" v-if="currentStep === 3">
                                    <div class="step-info-3">
                                        <h4>Account Status</h4>
                                    </div>
                                    <div class="input-group">
                                        <label for="acc-type">Account type</label>

                                        <select name="acc-type" id="acc-type" class="form-control" style="width: 100%;" v-model="formData.roleId" >
                                            <option value="1" selected>Admin</option>
                                            <option value="2">Registrar</option>
                                            <option value="3">User</option>
                                        </select>
                                    </div>
                                    <div class="input-group">
                                        <label for="ID">Account state</label>
                                        <select name="acc-type" id="acc-type" class="form-control" style="width: 100%;" v-model="formData.accountstatus">
                                            <option value="1" selected>Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                        
                                    </div>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary  btn-prev" @click="prevStep">Prev</button>
                                        <button type="button" class="btn btn-primary  btn-next" @click="nextStep">Next</button>
                                    </div>
                                </div>

                                <div class="form-step form-step-active" v-if="currentStep === 4">

                                    <div class="f-div">
                                        <h4>Please place your finger on the scanner to complete the registration process</h4>
                                        <img src="../../assets/finger.png" alt="">

                                    </div>
                                    
                                    
                                    <div class="input-group">
                                        <label for="confirmPassword">Fingerprint Template</label>
                                        <input type="password" name="confirmPassword" id="confirmPassword" disabled>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-primary btn-prev" @click="prevStep">Prev</a>
                                        <button type="submit" class="btn btn-primary btn-next">Save</button>
                                    </div>
                                </div>




                            </form>
                        </div>
                    </div>
            </div>
        </div>

        <!--End of form wizard-->
  
</template>

<script>
import { makeRequest } from '@/axios';



export default {
    name:'AddUser',
    data(){
        return {
            numactive:0,
            currentStep: 1,
            totalSteps: 4,
            viewpwd:false,
            viewconpwd:false,
            formData: {
                name: "",
                username:"",
                accountstatus:"1",
                roleId:"1",
                email: "",
                password: "",
                confrimPassword:"",
                matricule:""
             },

        }
    },
    methods:{
        viewPassword(){
            const pwd = document.getElementById('password')
            if(pwd.type==='text'){
                pwd.type ='password'
                
            }else{
                pwd.type='text'
            }
            this.viewpwd=!this.viewpwd

        },
        viewConPassword(){
            const conpwd = document.getElementById('conpassword')
            if(conpwd.type==='text'){
                conpwd.type ='password'
                
            }else{
                conpwd.type='text'
            }
            this.viewconpwd=!this.viewconpwd

        },
        goBack() {
            this.$router.go(-1);
        },
        nextStep() {
            if(this.currentStep===1){
                //verify name,username,and email
                if(!this.formData.username || !this.formData.email || !this.formData.name){
                    this.$toast.error("name,username, and email are required")

                }else{
                    if(this.isNameValid(this.formData.name)){
                        if(this.isUsernameValid(this.formData.username)){
                            if(this.isEmailValid(this.formData.email)){
                                //name,username and email are valid
                                this.currentStep += 1;
                            }else{
                                this.$toast.error("Email is invalid")
                            }


                        }else{
                            this.$toast.error("Username is invalid, it must contain atleast 5 characters")

                        }

                    }else{
                        this.$toast.error("Name is invalid, it must contain alteast 2 characters")
                    }
                }
                

            }
            else if(this.currentStep===2){
                //check password and confirm passsword
                if(!this.formData.password || !this.formData.confrimPassword){
                    this.$toast.error("matricule,password and confirm password are required")
                }else{
                    if(this.isPasswordValid(this.formData.password)){
                        if(this.formData.password === this.formData.confrimPassword){

                            this.currentStep += 1;
                        }else{
                            this.$toast.error("password and confirm password must match")
                            console.log(this.formData.password);
                            console.log(this.formData.confrimPassword);

                        }

                    }else{
                        this.$toast.error("password must be atleast 8 characters(contain special, lowercase,uppercase letters and numbers)")
                    }
                }
               

            }
            else if(this.currentStep===3){
                this.currentStep += 1;


            }
           
        },
        prevStep() {
            this.currentStep -= 1;
        },
        submitForm(event) {
                event.preventDefault();
            
                //console.log('save called')
                try{

                
                    makeRequest.post('/users/add',this.formData)
                    .then(res=>{
                        if(!res.data.Error){
                            this.$toast.success("user account created successfully!")
                            this.formData={
                                name: "",
                                username:"",
                                accountstatus:"1",
                                roleId:"1",
                                email: "",
                                password: "",
                                confrimPassword:"",
                                matricule:""
                            }
                            this.$router.push('/admin/userlist');

                        }else{
                            this.$toast.error(res.data.Error)
                        }

                    })
                    .catch(err=>{
                        console.log(err)
                        this.$toast.error("network error, please try again")
                    })
                }catch(error){
                    console.log(error)
                }



            //console.log(this.formData)
        // handle form submission
        },
        isNameValid(){
            let minsize=2
            let maxsize=60
            let hasValidcharacters = /^[a-zA-Z\s'-]+$/.test(this.name)


            return this.formData.name.length>minsize && this.formData.name.length < maxsize && hasValidcharacters

        },
        isUsernameValid(){

            let minsize=5
            let hasValidcharacters = /^[a-zA-Z0-9'-]+$/.test(this.username)

            return this.formData.username.length >= minsize && hasValidcharacters
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
            const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
            return value.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
          

         }
        
  },
computed:{
       
        progressBarWidth() {
        return `${(this.currentStep-1) * (100 / (this.totalSteps-1))}%`;
        }
  },
  watch:{
    currentStep(val){
        if(val===1){
            this.numactive=0;

        }
        if(val===2){
            this.numactive=1;
            
        }
        if(val===3){
            this.numactive=2;

        }
        if(val===4){
            this.numactive=3;

        }
    },
    numactive(val){
        if(val===0){
            this.$refs.one.classList.remove('progress-step-active')
            this.$refs.two.classList.remove('progress-step-active')
            this.$refs.three.classList.remove('progress-step-active')
        }
        if(val===1){
            this.$refs.one.classList.add('progress-step-active')
            this.$refs.two.classList.remove('progress-step-active')
            this.$refs.three.classList.remove('progress-step-active')
        }
        if(val===2){
            this.$refs.one.classList.add('progress-step-active')
            this.$refs.two.classList.add('progress-step-active')
            this.$refs.three.classList.remove('progress-step-active')
        }
        if(val===3){
            this.$refs.one.classList.add('progress-step-active')
            this.$refs.two.classList.add('progress-step-active')
            this.$refs.three.classList.add('progress-step-active')
        }
    }


  }
    


}
</script>

<style scoped>
:root {
        --primary: #009CFF;
        --light: #F3F6F9;
        --dark: #191C24;
    }
/*progressbar*/

.progressbar{
   position: relative;
    display:flex;
    justify-content: space-between;
    counter-reset: step;
    margin:1rem 0 1.1rem;
    
}
.progressbar::before{
    content:"";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
     width: 120%;     
     background-color: var(--light);

     
    

}
#progress{
    content:"";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background-color:var(--primary);
    transition: width 0.3s ease-in-out;

    
}

.progress-step{
    width: 3.1875rem;
    height: 3.1875rem;
    background-color: #cdcdcd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
      
}
.progress-step-active{
    background-color:var(--primary);
    color:white;
}


.progress-step::before{
    counter-increment: step;
    content: counter(step);
}
.progress-step::after{
    position: absolute;
    top:calc(100% + 0.45rem);
    font-size: 0.85rem;
    color: black;
}




/*global styles */
label{
    display: block;
    margin-bottom: 0.5rem;
}
input{
    border-radius: 5px;
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
}
.text-center{
    text-align: center;
}


/* form */
.form{
    width: 80%;
    margin: 0 auto;
    /* border: 1px solid var(--primary);  */
    border-radius: 0.35rem;
    padding: 1.5rem;

}
.input-group{
    margin: 2rem 0;
}
.btn{
    padding: 0.75rem;
    display: block;
    text-decoration: none;
    background-color: var(--primary);
    color: white;
    text-align: center;
    cursor: pointer;
     border-radius: .25rem;
     transition: .3s;
}
.width-50{
    width: 50%;
}
.ml-auto{
    margin-left: auto;
}
.btn:hover{
    box-shadow: 0 0 0 2px #fff,0 0 0 3px var(--primary);
}
.btn-group{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 1.5rem;
}
@keyframes animate{
    from{
        transform: scale(0,1);
        opacity: 0;

    }
    to{
        transform: scale(1,1);
        opacity: 1;

    }
}
.form-step{
    display: none;
    transform-origin: right;
    animation: animate 0.5s;
}

.form-step-active{
    display: block;
}
.step-info-1{
    display: flex;
    align-items: left;
    justify-content: left;
    color: var(--primary);

}
.step-info-2{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);

}
.step-info-3{
    display: flex;
    align-items: right;
    justify-content: right;
    color: var(--primary);

}
.f-div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    position: relative;
}
@keyframes clip {
    0% {
    clip-path: inset(100% 0 0 0);
  }
  25% {
    clip-path: inset(0 0 0 0);
  }
  50% {
    clip-path: inset(0 0 0 100%);
  }
  75% {
    clip-path: inset(0 100% 100% 0);
  }
  100% {
    clip-path: inset(100% 0 0 0);
  }
}
.f-div img{
    width:50%;
    height: 100%;
   
    animation:clip  3s ease-in-out infinite;
        
}




@media(max-width:575px) {
    .f-div{
        flex-direction: column;
    }
    
}
    

</style>