<template>

    <section>
        <!-- <label v-on:click="toggleDropdown"> Filter Course Types </label>
        <select v-model="selectedCourseType" v-if="showDropdown">
            <option v-for="courseType in courseTypes" :key="courseType" :value="courseType">
                {{ courseType }}
            </option>
        </select> -->
        <nav class="coursesType-menu">
            <span v-on:click="toggleDropdown"> Filter Course Types <img src="../assets/Icons/arrow.svg" alt=""> </span>
            <div class="menu-categories" 
            v-for="courseType in courseTypes" 
            v-bind:key="courseType" 
            v-bind:value="courseType"
            v-if="showDropdown">
                <span>{{ courseType }}</span>
            </div>
        </nav>
    

    </section>

</template>

<script>
    export default {
        name: 'SelectFilters',

        data() {
            return {
                courses: [],
                courseTypes: [],
                selectedCourseType: null,
                showDropdown: false,
            }
                
        },

        methods: {
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            }
        },

        mounted() {
            fetch('http://localhost:3000/courses')
                .then((res) => res.json())
                .then(data => this.courses = data)
                .catch(err => console.log(err.message))
            
            fetch('http://localhost:3000/courseTypes')
                .then((res) => res.json())
                .then(data => this.courseTypes = data)
                .catch(err => console.log(err.message))
        }
    }
</script>