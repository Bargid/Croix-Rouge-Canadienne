<template>

    <Calendar v-on:selected-dates="handleSelectedDates"/> <!-- On ecoute le $emit de calendar -->
    <SelectFilters v-on:selected-filters="handleSelectedFilters" v-on:sub-group-exists="handleSubGroupExists"/>

    <h1>Courses</h1>
    
    <div v-if="!subGroupExists" v-for="course in CourseTypeMatching" :key="course.id">
        <p>{{ course.title }}</p>
    </div>
    <div v-for="course in subGroupMatching" v-bind:key="course.id">
        <p>{{ course.title }}</p>
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
                selectedFilters: [],
                subGroup: [],
                subGroupExists: false,

            }
        },

        methods: {
            handleSelectedDates(dates) {
                this.selectedStartDate = dates.startDate;
                this.selectedEndDate = dates.endDate;
                console.log('Received : ', dates) // on verifie, dans le consol, que le $emit de calendar est bien reçu ici
            },
            handleSelectedFilters(filters) {
                this.selectedFilters = filters.selectedFilters;
                console.log('Received :', filters)
            },
            handleSubGroupExists(value) {
                this.subGroupExists = value.subGroupExists;
                console.log('Received :', value)
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
            },
            CourseTypeMatching() {
                console.log(this.subGroupExists)
                const courseType = [];
                if (this.selectedFilters.length > 0) {
                    return this.courses.filter(course => {
                        for (const key in course) {
                            if (key != 'id' && key != 'date') {
                                if (this.selectedFilters.includes(course[key])) {
                                    courseType.push(course)
                                    // this.subGroupExists = false;
                                    // console.log(this.subGroupExists)
                                    return true;
                                }
                            }
                        }
                        return false;
                    })
                }
            },
            subGroupMatching() {
                console.log(this.subGroupExists)
                const subGroup = [];
                // console.log('subGroupMatching')
                if (this.selectedFilters.length > 0) {
                    return this.courses.filter(course => {
                        for (const key in course) {
                            if (key == 'subGroup') {
                                if (this.selectedFilters.includes(course[key])) {
                                    subGroup.push(course)
                                    // this.subGroupExists = true;
                                    // console.log(this.subGroupExists)
                                    return true;
                                }
                            }
                        }
                        return false;
                    })
                }
            }
            // tagMatching() {
            //     const matchingCourses = [];
            //     const excludedKeys = ['id', 'date']
            //     return this.courses.filter(course => {
            //         for (const key in course) { // on check si une valeur du array selecetedFilters est egale a une propriete des objet
            //             if (!excludedKeys.includes(key)) {
            //                 for (const selectedFilter of this.selectedFilters)
            //                 if (course[key] === selectedFilter) {
            //                     console.log('Match :', selectedFilter)
            //                     matchingCourses.push(course);
            //                     break;
            //                 }
            //             }
            //         }
            //         return matchingCourses;
            //     });
            // }
        },

        mounted() {
            fetch('http://localhost:3000/courses')
                .then((res) => res.json())
                .then(data => this.courses = data)
                .catch(err => console.log(err.message))
        }
    }
</script>