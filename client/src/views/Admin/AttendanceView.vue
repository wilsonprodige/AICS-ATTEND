<template>

<div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-calendar fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Today</h4>
                                <h3 class="mb-0 text-primary">{{ currentDate }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-12 col-md-6 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-check fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Check-In</h4>
                                <h3 class="mb-0 text-primary" id="numreg">{{ numreg }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-12 col-md-6 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-clock fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">On-time</h4>
                                <h3 class="mb-0 text-primary" id="numontime">{{ numontime }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
        </div>
    <div class="container-fluid pt-4 px-4">
                <div class="bg-light text-center rounded p-4 custom-row">
                    <div class="d-flex align-items-center justify-content-between mb-4 custom">
                        <h5 class="mb-0 text-primary">Fingerprint Attendance</h5>
                        <button class="btn btn-success" v-if="!start" @click="scanning">Start</button><button v-else class="btn btn-danger" @click="scanning">Stop</button>
                        
                    </div>
                    <div class="scan" v-if="start">
                        <div class="fingerprint"></div>
                        <h3>Scanning...</h3>

                    </div>

                    <div class="finger" v-else>
                        
                        <img src="../../assets/attendance.png" id="img"/>
                        <h3>Please place your finger on the scanner <i class="fa fa-arrow-right"></i></h3>
                    </div>
                    
                </div>
            </div>
  
</template>

<script>

import { defineComponent } from 'vue'
import { CountUp } from 'countup.js';
import { makeRequest } from '../../axios';
export default defineComponent({
    name:'AttendanceView',
    data(){
        return{
            count:0,
            numreg:0,
            numontime:0,
            currentDate:null,
            currentTime:null,
            start:false
        }
    },
    methods:{
        scanning(){
            if(this.start){
                this.start=false

            }else{
                this.start=true
            }
        },
        async num_present_amimate(){
            try{
                    const num= await makeRequest.get('/records/countToday');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numRegCount = new CountUp('numreg',num.data, this.numreg,options); 
                    numRegCount.start(); 
                    this.numreg=num.data
                    //this.numlate=num.data
                }
                catch(error){
                        console.log(error)

                }


        },
        async num_on_time_animate(){
            try{
                    const num= await makeRequest.get('/records/countTodayOnTime');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numTodayCount = new CountUp('numontime',num.data, this.numontime,options); 
                    numTodayCount.start(); 
                    //this.numontime=numb.data
                    //this.numlate=num.data
                }
                catch(error){
                        console.log(error)

                }

        }


    },
    mounted(){
        this.num_present_amimate()
        this.num_on_time_animate()
        // const options = {
        // duration: 3, 
        // separator: ',',
        // };
        // const numRegCountUp = new CountUp('numreg', this.numreg,options); 
        // numRegCountUp.start(); 

        // const numOnTimeCountUp = new CountUp('numontime',this.numontime,options); 
        // numOnTimeCountUp.start(); 

        //setting up the date and time

        const now = new Date()
        this.currentTime = now.toLocaleTimeString()
        this.currentDate = now.toLocaleDateString()
        //console.log(this.currentTime)



    }


})
</script>

<style>
#search{
    width: 45%;
    border-radius: 17px;
}
.finger{
    position: relative;
    width:100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    
}

@keyframes clip {
    0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.finger img{
    position: relative;
    width:40%;
    height: 100%;
    margin: 0 auto;
   
    animation:clip  3s ease-in-out infinite;
        
}

.finger h3{
    margin-top: 5px;
}
/*fingerprint animation scan */
.scan{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 600px;
}
.scan .fingerprint{
    position: relative;
    width: 45%;
    height: 71%;
    background: url('../../assets/attendance2.png') center no-repeat;
    background-size: cover;
    

}
.scan .fingerprint::before{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/attendance.png');
    background-size: cover;
    animation:animate 4s ease-in-out infinite;
}
@keyframes animate{
    0%,100%{
        height: 0%;
    }
    50%{
        height: 100%;
    }
}
.scan .fingerprint::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: var(--primary);
    filter: drop-shadow(0 0 20px var(--primary) drop-shadow(0 0 60px var(--primary)));
    animation:animate-line 4s ease-in-out infinite;
}
.scan h3{
    text-transform: uppercase;
    font-size: 2em;
    letter-spacing: 2px;
    margin-top: 20px;
    color: var(--primary);
    filter: drop-shadow(0 0 20px var(--primary) drop-shadow(0 0 60px var(--primary)));
    animation:animate-text 0.5s steps(1) infinite;

}

@keyframes animate-text{
    0%,100%{
        opacity: 0;
    }
    50%{
        opacity: 1;
    }

}
@keyframes animate-line{
    0%,100%{
        top: 0%;
    }
    50%{
        top: 100%;
    }

}


/* media and screen sizes */
@media screen and (max-width: 1189px){
    .scan .fingerprint{
        width: 70%;
        height: 70%;
    }
    .scan .fingerprint::before{
        display: none;
    }
    
}
@media screen and (max-width: 610px) {
    .custom{
        display: flex;
        flex-direction: column;
    }
    .column #search{
        margin-top: 2px;
        margin-bottom: 2px;
        width:80%;
    }
    .column div button{
        margin-top: 3px;

    }
    
}


</style>