<template>

    <Calendar v-on:selected-dates="handleSelectedDates"/> <!-- On ecoute le $emit de calendar -->
    <SelectFilters v-bind:selectedCourseType="selectedCourseType"
                   v-on:selected-delivery-method="handleDeliveryMethodFromSelectFilters"
                   v-on:selected-languages="handleLanguagesFromSelectedFilters"
                   v-on:selected-certifications="handleCertificationsFromSelectedFilters"
                   v-on:selected-filters="handleSelectedFilters"
                   v-on:sub-group-exists="handleSubGroupExists" 
                   v-on:sub-group-choice-exists="handleSubGroupChoiceExists"
                   v-on:sub-group-choice-details-exists="handleSubGroupChoiceDetailExists"/>
    <!-- <HorizontalFilters 
                   v-on:selected-delivery-method="handleDeliveryMethod"
                   v-on:selected-languages="handleLanguages"
                   v-on:selected-certifications="handleCertifications"/> -->

    <h1 v-on:click="patateCoursesTest()">Courses</h1>
    
    <div class="no-dates-container" 
        v-if="selectedEndDate !== '' && selectedFilters.length == 0"
        v-for="course in filteredCourses"
        v-bind:key="course.id">
            <strong>juste les dates</strong>
            <p> Title : {{ course.title }}</p>
            <p> Date : {{ course.date }}</p>
            <p> Language : {{ course.language }}</p>
            <p> Certification : {{ course.certification }}</p>
            <p> Delivery Method : {{ course.deliveryMethod }}</p>
    </div>
    <div v-else>
        <div v-if="!subGroupExists" v-for="course in CourseTypeMatching" v-bind:key="course.id">
            <strong>1er groupe</strong>
            <p> Title : {{ course.title }}</p>
            <p> Date : {{ course.date }}</p>
            <p> Language : {{ course.language }}</p>
            <p> Certification : {{ course.certification }}</p>
            <p> Delivery Method : {{ course.deliveryMethod }}</p>
        </div>
        <div v-if="!subGroupChoiceExists" v-for="course in subGroupMatching" v-bind:key="course.id">
            <strong>2eme groupe</strong>
            <p> Title : {{ course.title }}</p>
            <p> Date : {{ course.date }}</p>
            <p> Language : {{ course.language }}</p>
            <p> Certification : {{ course.certification }}</p>
            <p> Delivery Method : {{ course.deliveryMethod }}</p>
        </div>
        <div v-if="!subGroupChoiceDetailExists" v-for="course in subGroupChoiceMatching" v-bind:key="course.id">
            <strong>3eme groupe</strong>
            <p> Title : {{ course.title }}</p>
            <p> Date : {{ course.date }}</p>
            <p> Language : {{ course.language }}</p>
            <p> Certification : {{ course.certification }}</p>
            <p> Delivery Method : {{ course.deliveryMethod }}</p>
        </div>
        <div v-for="course in subGroupChoiceDetailMatching" v-bind:key="course.id">
            <strong>4eme groupe</strong>
            <p> Title : {{ course.title }}</p>
            <p> Date : {{ course.date }}</p>
            <p> Language : {{ course.language }}</p>
            <p> Certification : {{ course.certification }}</p>
            <p> Delivery Method : {{ course.deliveryMethod }}</p>
        </div>
    </div>

</template>

<script>
import Calendar from '@/components/Calendar.vue';
import SelectFilters from '@/components/SelectFilters.vue';
// import HorizontalFilters from '@/components/HorizontalFilters.vue';

    export default {
        name: 'Courses',
        components: { Calendar, SelectFilters },

        props: {
            selectedCourseType: String
        },

        data() {
            return {
                courses: [],
                selectedStartDate: '',
                selectedEndDate: '',
                selectedFilters: [],
                selectedDeliveryMethod: '',
                selectedLanguages: '',
                selectedCertifications: '',
                subGroup: [],
                subGroupExists: false,
                subGroupChoiceExists: false,
                subGroupChoiceDetailExists: false,

                CategoryChecked: {},
                SubGroupChecked: {},
                SubGroupChoiceChecked: {},
                SubGroupChoiceDetailChecked: {},
            }
        },

        methods: {
            handleSelectedDates(dates) {
                this.selectedStartDate = dates.startDate;
                this.selectedEndDate = dates.endDate;
                // console.log('Received : ', dates)
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

            // ========== From SelectedFilters.Vue ==========

            handleDeliveryMethodFromSelectFilters(value) {
                console.log(value.selectedDeliveryMethod);
                this.selectedDeliveryMethod = value.selectedDeliveryMethod
            },
            handleLanguagesFromSelectedFilters(value) {
                console.log(value.selectedLanguages);
                this.selectedLanguages = value.selectedLanguages
            },
            handleCertificationsFromSelectedFilters(value) {
                console.log(value.selectedCertifications);
                this.selectedCertifications = value.selectedCertifications
            },
            patateCoursesTest() {
                console.log('patateCoursesTest : ', this.selectedCourseType)
                if (this.selectedCourseType == 'First Aid') {
                }
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
                               (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language)) &&
                               (this.selectedCertifications === '' || this.selectedCertifications.includes(course.certification))
                    });
                }
                return [];
            },
            CourseTypeMatching() {
                const courseType = [];
                if (this.selectedFilters.length > 0 && this.selectedStartDate && this.selectedEndDate) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) && 
                            courseDate <= new Date(this.selectedEndDate) && 
                            (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && 
                            (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language)) &&
                            (this.selectedCertifications === '' || this.selectedCertifications.includes(course.certification))) { // On verifie si les cours associer a la selection entre dans l'intervalle de la date de depart et celle de fin
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
                        if (courseDate >= new Date(this.selectedStartDate) &&
                            courseDate <= new Date(this.selectedEndDate) && 
                            (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) &&
                            (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language)) &&
                            (this.selectedCertifications === '' || this.selectedCertifications.includes(course.certification))) {
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
                        if (courseDate >= new Date(this.selectedStartDate) && 
                            courseDate <= new Date(this.selectedEndDate) &&
                            (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) &&
                            (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language)) &&
                            (this.selectedCertifications === '' || this.selectedCertifications.includes(course.certification))) {
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
                        if (courseDate >= new Date(this.selectedStartDate) && courseDate <= new Date(this.selectedEndDate) && (this.selectedDeliveryMethod === '' || this.selectedDeliveryMethod === course.deliveryMethod) && (this.selectedLanguages.length === 0 || this.selectedLanguages.includes(course.language)) && (this.selectedCertifications === '' || this.selectedCertifications.includes(course.certification))) {
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