<template>

    <div class="courseType-input-container">
        <span>Find a Course</span>
        <div>
            <select class="courseType-input" name="Courses_Types" id=""
                v-model="selectedCourseType">
                <option value=""><img src="" alt=""> Select a Course Type </option>
                <option v-for="courseType in courseTypes"
                        v-bind:key="courseType.name"
                        v-bind:value="courseType.name">
                        {{ courseType.name }}
                </option>
            </select>
            <div class="search-button"
                v-on:click="handleEmits">
                Search
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'CourseTypeSelector',

        data() {
            return {
                selectedCourseType: '',
                courseTypes: [],
            }
        },

        methods: {

            handleEmits() {
                this.$emit('selected-course-type', {selectedCourseType: this.selectedCourseType});
                this.$emit('scroll-to-section');
            },
        },

        mounted() {

            fetch('http://localhost:3000/courseTypes')
                .then((res) => res.json())
                .then(data => this.courseTypes = data)
                .catch(err=> console.log(err.message))
        }
    }
</script>
