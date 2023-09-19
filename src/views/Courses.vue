<template>
    <h1>Courses</h1>
    <div v-for="course in courses" :key="course.id">
        <p>{{ course.deliveryMethod }}</p>
    </div>

    <Calendar />
</template>

<script>
import Calendar from '@/components/Calendar.vue';

    export default {
        name: 'Courses',
        components: { Calendar },

        data() {
            return {
                courses: []
            }
        },

        mounted() {
            fetch('http://localhost:3000/courses')
                .then((res) => res.json())
                .then(data => this.courses = data)
                .catch(err => console.log(err.message))
        }
    }
</script>