<template>
    <div class="box d-flex flex-row">
      <h1 class="text-primary fw-bold"><strong>A</strong></h1><span class="title"><p class="text-underline-primary">ICS-ATTEND</p></span>

    </div>
    
    <img :src="src" class="img-fluid floating-image" alt="Login Image">
    
    <!-- Your login form code goes here -->
  
    
</template>

<script>
export default {
  name: 'LoginImg',
  props: {
    src:String
  }
}
</script>

<style scoped>

.floating-image {

  margin-top: 0;
  height: 500px;
  
  /* Adjust the values of top and left to position the image where you want it */
  /* Use the transform property to center the image vertically and horizontally */
  animation: float 5s ease-in-out infinite;
  /* Add an animation to the image that lasts 5 seconds and repeats infinitely */
}
.fw-bold{
  background: dark;
  border-radius: 50%;
}
.title {
  font-size: 1.40rem;
  font-weight: bold;
  font-style: cursive;
  text-transform: uppercase;
  color: black;
  letter-spacing: 0.1em;
}
.box {
  margin-left: 10px;
}



@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(0%, -10%) scale(1.1);
  }
  100% {
    transform: translate(0%, 0%) scale(1);
  }
}
@media (max-width: 768px) {

 
}
</style>
