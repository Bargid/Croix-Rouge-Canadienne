<template>
  <header>
    <nav>
        <div class="header-logo">
          <img src="./assets/Images/crc_logo_simple_en.webp" alt="CRC Logo">
          <span>Training</span>
        </div>
        <div class="header-links">
          <router-link v-bind:to="{ name: 'home' }">Home</router-link> 
          <router-link v-bind:to="{ name: 'validatecertificate' }">Validate Certificate</router-link>
          <router-link v-bind:to="{ name: 'contactus' }">Contact Us</router-link>
          <router-link v-bind:to="{ name: 'shop' }">Shop</router-link>
          <router-link v-bind:to="{ name: 'signin' }">Sign In</router-link>
        </div>
    </nav>
  </header>

  <body>
    <section class="page-hero">
      <div class="important-message-container">
        <p class="important-message"><span>important: </span> Maintenance will take place on Saturday, April 17th, from 9:00 p.m. to 10:00 p.m. ET. Access to online course content will be unavailable and other functions may also be interrupted</p>
      </div>

      <CourseTypeSelector v-on:selected-course-type="handleSelectedCourseTypes"
                          v-on:scroll-to-section ="scrollToTargetSection"
                          v-on:search-clicked="searchClicked"/>

      <img src="./assets/Images/classroom-banner.webp" alt="Hero Banner">
    </section>

    <section class="courses-template"> 
      <div class="left-filters" id="targetSection">

        <Courses v-bind:selectedCourseType="selectedCourseType"/>

      </div>
    </section>

  </body>

  <footer>
    <Footer v-bind:links="[
      { text: 'Find a course', href: '#'},
      { text: 'Validate Certificate', href: '#'},
      { text: 'FAQ', href: '#'},
      { text: 'Jobs', href: '#'},
      { text: 'Volunteers', href: '#'},
      { text: 'Contact us', href: '#'},
    ]"
    v-bind:socialMedias="[
      { href: 'https://twitter.com/redcrosscanada?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor', src: 'Twitter_Logo.svg', alt: 'Twitter'},
      { href: 'https://www.facebook.com/canadianredcross/', src: 'FB_Logo.svg', alt: 'Facebook'},
      { href: 'https://www.instagram.com/redcrosscanada/', src: 'IG_Logo.svg', alt: 'Instagram'},
    ]"
    v-bind:appStores="[
      { href: 'https://apps.apple.com/app/id1312876691', src: 'App_Store.svg', alt: 'Apple Store'},
      { href: 'https://play.google.com/store/apps/details?id=com.cube.gdpc.fa&pli=1', src: 'Google_Play.svg', alt: 'Google Play'},
    ]"
    v-bind:internalLinks="[
      { href: '#', text: 'Privacy Policy'},
      { href: '#', text: 'Terms & Conditions'},
      { href: '#', text: 'Accessibility'},
      { href: '#', text: 'Français'},
      { href: '#', text: 'Deutsch'},
    ]"/>
  </footer>
</template>

<script>
  import Footer from '@/components/Footer.vue'
  import Courses from '@/views/Courses.vue'
  import CourseTypeSelector from '@/components/CourseTypeSelector.vue'

  export default {
    components: { Footer, Courses, CourseTypeSelector },

    data() {
      return {
        selectedCourseType: ''
      }
    },

    methods: {

      handleSelectedCourseTypes(value) {
          this.selectedCourseType = value.selectedCourseType;
          console.log(this.selectedCourseType);
      },

      scrollToTargetSection() {
        console.log('scrolltotarget')
        const target = document.querySelector('#targetSection');
        target.scrollIntoView({ behavior: 'smooth' })
      },
      searchClicked() {
        this.$refs.Calendar.handleDateSelection();
      }
    }
  }
</script>
