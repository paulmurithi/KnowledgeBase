<template>

    <div class="slider">
      
      <div class="slide" :style="{ backgroundImage: 'url(' + currentImage + ')' }">
        <!-- <div class="my1logo">
    <img src="@/assets/my1logo.png" alt="Your Logo" />
  </div> -->
        <div class="overlay" :style="{ opacity: currentOpacity }">
          <div class="text">{{ currentText }}</div>
        </div>
      </div>
      <input type="range" v-model="currentOpacity" min="0" max="1" step="0.03" />
    </div>
  </template>
  
  <script>


  export default {
    name: 'ImageSlider',
    data() {
      return {
        images: [
          { src: require('@/assets/doctor1.jpg'), text: 'The customer service was perfect, a friendly and very helpful lady. Had my appointment booked' },
          { src: require('@/assets/doctor2.jpg'), text: 'Doctor 2 Text' },
          { src: require('@/assets/doctor3.jpg'), text: 'Doctor 3 Text' }
        ],
        currentIndex: 1,
        currentImage: '',
        currentText: '',
        currentOpacity: 1,
        intervalId: null
      };
    },
    methods: {
      changeSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentImage = this.images[this.currentIndex].src;
        this.currentText = this.images[this.currentIndex].text;
      }
    },
    watch: {
      currentIndex() {
        this.currentOpacity = 1; 
        setTimeout(() => {
          this.currentOpacity = 0;
          this.changeSlide(); 
        }, 30000);
      }
    },
    mounted() {
      this.changeSlide();
      this.intervalId = setInterval(this.changeSlide, 5000);
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    }
  };
  </script>
  
  <style scoped>
  .slider {
    width: 50%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  
  .slide {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: background-image 0.5s ease;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s ease;
  }
  
  .text {
    color: white;
    font-size: 24px;
    text-align: center;
  }
  
  input[type="range"] {
    width: 100%;
    margin-top: 10px;
  }
  .my1logo img{
    height:120px;
  }
  
  </style>
  