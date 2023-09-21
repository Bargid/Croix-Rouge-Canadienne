<template>

    <Calendar v-on:selected-dates="handleSelectedDates"/> <!-- On ecoute le $emit de calendar -->
    <SelectFilters />

    <h1>Courses</h1>
    <div v-for="course in filteredCourses" :key="course.id">
        <p>{{ course.deliveryMethod }}</p>

    </div>

</template>

<script>
import Calendar from '@/components/Calendar.vue';
import SelectFilters from '@/components/SelectFilters.vue';

    export default {
        name: 'Courses',
        components: { Calendar, SelectFilters },

        data() {
            return {
                courses: [],
                selectedStartDate: '',
                selectedEndDate: '',
            }
        },
        methods: {
            handleSelectedDates(dates) {
                this.selectedStartDate = dates.startDate;
                this.selectedEndDate = dates.endDate;
                console.log('Received : ', dates) // on verifie, dans le consol, que le $emit de calendar est bien reçu ici
            }
        },
        computed: {
            filteredCourses() {
                if (this.selectedStartDate && this.selectedEndDate) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);

                        return courseDate >= new Date(this.selectedStartDate) && courseDate <= new Date(this.selectedEndDate)
                        
                    });
                }
                return [];
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