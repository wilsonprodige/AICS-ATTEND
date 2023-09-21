<template>
  <div>
    {{ currentTime }}
  </div>
</template>

<script>
export default {
    name:'TimeComponent',
    data(){
        return{
            currentTime:''
        }
    },
    methods:{
        updateTime(){
            
        }
    },
    mounted(){
        setInterval(()=>{
            const now = new Date();
            this.currentTime = now.toLocaleTimeString();

        },1000)
    }

}
</script>

<style>

</style>