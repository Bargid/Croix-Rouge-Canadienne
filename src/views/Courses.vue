<template>

    <Calendar v-on:selected-dates="handleSelectedDates"/> <!-- On ecoute le $emit de calendar -->
    <SelectFilters v-on:selected-filters="handleSelectedFilters"
                   v-on:selected-delivery-method="handleDeliveryMethod"
                   v-on:selected-languages="handleLanguages"
                   v-on:sub-group-exists="handleSubGroupExists" 
                   v-on:sub-group-choice-exists="handleSubGroupChoiceExists"
                   v-on:sub-group-choice-details-exists="handleSubGroupChoiceDetailExists"
                   />

    <h1>Courses</h1>
    
    <div class="no-dates-container" 
        v-if="selectedEndDate !== '' && selectedFilters.length == 0"
        v-for="course in filteredCourses"
        v-bind:key="course.id">
            <p>juste les dates</p>
            <p>{{ course.title }}</p>
    </div>
    <div v-else>
        <div v-if="!subGroupExists" v-for="course in CourseTypeMatching" v-bind:key="course.id">
            <p>1er groupe</p>
            <p>{{ course.title }}</p>
            <p>{{ course.language }}</p>
        </div>
        <div v-if="!subGroupChoiceExists" v-for="course in subGroupMatching" v-bind:key="course.id">
            <p>2eme groupe</p>
            <p>{{ course.title }}</p>
            <p>{{ course.language }}</p>
        </div>
        <div v-if="!subGroupChoiceDetailExists" v-for="course in subGroupChoiceMatching" v-bind:key="course.id">
            <p>3eme groupe</p>
            <p>{{ course.title }}</p>
            <p>{{ course.language }}</p>
        </div>
        <div v-for="course in subGroupChoiceDetailMatching" v-bind:key="course.id">
            <p>4eme groupe</p>
            <p>{{ course.title }}</p>
            <p>{{ course.language }}</p>
        </div>
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
                selectedDeliveryMethod: '',
                selectedLanguages: '',
                subGroup: [],
                subGroupExists: false,
                subGroupChoiceExists: false,
                subGroupChoiceDetailExists: false,
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
                // console.log('Received :', filters)
            },
            handleSubGroupExists(value) {
                this.subGroupExists = value.subGroupExists;
                // console.log('Received :', value)
            },
            handleSubGroupChoiceExists(value) {
                this.subGroupChoiceExists = value.subGroupChoiceExists;
                // console.log('Received :', value)
            },
            handleSubGroupChoiceDetailExists(value) {
                this.subGroupChoiceDetailExists = value.subGroupChoiceDetailExists;
                // console.log('handleSubGroupChoiceDetailExists :', value)
            },
            handleDeliveryMethod(value) {
                this.selectedDeliveryMethod = value.selectedDeliveryMethod;
                // console.log('handleDeliveryMethod : ', value)
            },
            handleLanguages(value) {
                this.selectedLanguages = value.selectedLanguages;
                console.log(this.selectedLanguages)
            }
        },
        computed: {
            filteredCourses() {
                if (this.selectedStartDate && this.selectedEndDate) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);

                        return courseDate >= new Date(this.selectedStartDate) && 
                               courseDate <= new Date(this.selectedEndDate) && 
                               (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && // le === '' permet d'avoir tous les resultats lorsque rien n'est selectioner
                               (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language))
                    });
                }
                return [];
            },
            CourseTypeMatching() {
                const courseType = [];
                if (this.selectedFilters.length > 0 && this.selectedStartDate && this.selectedEndDate) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) && courseDate <= new Date(this.selectedEndDate) && (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language))) { // On verifie si les cours associer a la selection entre dans l'intervalle de la date de depart et celle de fin
                            for (const key in course) {
                                if (key != 'id' && key != 'date') {
                                    if (this.selectedFilters.includes(course[key])) {
                                        courseType.push(course)
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    })
                }
                return this.filteredCourses;
            },
            subGroupMatching() {
                const subGroup = [];
                if (this.selectedFilters.length > 0) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) && courseDate <= new Date(this.selectedEndDate) && (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language))) {
                            for (const key in course) {
                                if (key == 'subGroup') {
                                    if (this.selectedFilters.includes(course[key])) {
                                        subGroup.push(course)
                                        return true;
                                    }
                                }
                            }
                            return false;
                        }
                    })
                }
                return this.filteredCourses;
            },
            subGroupChoiceMatching() {
                const subGroupChoice = [];
                if (this.selectedFilters.length > 0) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) && courseDate <= new Date(this.selectedEndDate) && (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language))) {
                            for (const key in course) {
                                if (key == 'subGroupChoice') {
                                    if (this.selectedFilters.includes(course[key])) {
                                        subGroupChoice.push(course)
                                        return true;
                                    }
                                }
                            }
                            return false;
                        }
                    })
                }
                return this.filteredCourses;
            },
            subGroupChoiceDetailMatching() {
                // console.log('subGroupChoiceDetailExists : ', this.subGroupChoiceDetailExists)
                const subGroupChoiceDetail = [];
                if (this.selectedFilters.length > 0) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) && courseDate <= new Date(this.selectedEndDate) && (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language))) {
                            for (const key in course) {
                                if (key == 'subGroupChoiceDetail') {
                                    if (this.selectedFilters.includes(course[key])) {
                                        subGroupChoiceDetail.push(course)
                                        console.log ( 'ligne 155 : ', this.subGroupChoiceDetailExists)
                                        return true;
                                    }
                                }
                            }
                            return false;
                        }
                    })
                }
                return this.filteredCourses;
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