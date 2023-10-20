<template>

    <!-- <section class="quickfilters-container">
        <QuickFilters />
    </section> -->

    <section class="filters-courses-container">
        <div class="calendar-filter-menu-container">
            <Calendar v-on:selected-dates="handleSelectedDates"/> <!-- On ecoute le $emit de calendar -->
            <SelectFilters v-bind:selectedCourseType="selectedCourseType"
                           v-on:category-checked="handleCategoryChecked"
                           v-on:subgroup-checked="handleSubGroupChecked"
                           v-on:subgroupchoice-checked="handleSubGroupChoiceChecked"
                           v-on:subgroupchoicedetail-checked="handleSubGroupChoiceDetailChecked"
                           v-on:selected-filters="handleSelectedFilters"
                           v-on:sub-group-exists="handleSubGroupExists"
                           v-on:sub-group-choice-exists="handleSubGroupChoiceExists"
                           v-on:sub-group-choice-details-exists="handleSubGroupChoiceDetailExists"
                           v-on:reset-filters="handleResetFilters"
                           ref="selectFilters"/>
        </div>
        <div class="horizontals-container">
            <HorizontalFilters
                           v-on:selected-delivery-method="handleDeliveryMethod"
                           v-on:selected-languages="handleLanguages"
                           v-on:selected-certifications="handleCertifications"
                           v-on:selected-sorting="handleSorting"/>

            <div class="horizontal-tags-container">
                <span class="pastille-tag"
                v-for="(filter, index) in selectedFilters"
                v-bind:key="index"
                v-on:click="uncheckFilterPastille(filter)">
                {{ filter }} <img src="@/assets/Icons/x.svg" alt="x"></span>
                <span class="reset-tag"
                    v-on:click="handleResetFilters()"> Reset </span>
            </div>

            
            <div class="courses-container">
                
                <div class="course-group-container" v-if="selectedEndDate !== '' && selectedFilters.length == 0">
                        <div>
                            <div class="course-container" v-for="course in filteredCourses" :key="course.id">
                                <DateAndPrice v-bind:courseData = "course"/>
                                <div class="course-banners">
                                    <TopBanner v-bind:courseData = "course"/>
                                    <MainBanner v-bind:courseData = "course"/>
                                </div>
                            </div>
                        </div>
                </div>
                
                <div class="course-group-container" v-else>

                    <div v-for="group in groupedCourses" :key="group.id">
                        <div class="course-container" v-for="course in group.courses" :key="course.id">
                            <DateAndPrice v-bind:courseData = "course"/>

                            <div class="course-banners">
                                <TopBanner v-bind:courseData = "course"/>
                                <MainBanner v-bind:courseData = "course"/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </section>
    
</template>

<script>
import Calendar from '@/components/Calendar.vue';
import SelectFilters from '@/components/SelectFilters.vue';
import HorizontalFilters from '@/components/HorizontalFilters.vue';
import QuickFilters from '@/components/QuickFilters.vue'

// Course Card
import DateAndPrice from '@/components/CardComponents/DateAndPrice.vue';
import TopBanner from '@/components/CardComponents/TopBanner.vue';
import MainBanner from '@/components/CardComponents/MainBanner.vue';
// import EventBus from '@/eventBus.js';

    export default {
        name: 'Courses',
        components: { Calendar, SelectFilters, HorizontalFilters, DateAndPrice, TopBanner, MainBanner, QuickFilters},

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
                selectedSorting: '',
                subGroup: [],
                subGroupExists: false,
                subGroupChoiceExists: false,
                subGroupChoiceDetailExists: false,

                CategoryChecked: {},
                SubGroupChecked: {},
                SubGroupChoiceChecked: {},
                SubGroupChoiceDetailChecked: {},

                isSomethingSelected: false,
            }
        },

        methods: {

            handleSelectedDates(dates) {
                this.selectedStartDate = dates.startDate;
                this.selectedEndDate = dates.endDate;
                console.log('Received : ', dates)
            },
            handleSelectedFilters(filters) {
                this.selectedFilters = filters.selectedFilters;
                // console.log('Received :', filters)
                // console.log(this.selectedFilters)
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
            handleCategoryChecked(value) {
            this.CategoryChecked = value.CategoryChecked;
            },
            handleSubGroupChecked(value) {
            this.SubGroupChecked = value.SubGroupChecked;
            },
            handleSubGroupChoiceChecked(value) {
            this.SubGroupChoiceChecked = value.SubGroupChoiceChecked;
            },
            handleSubGroupChoiceDetailChecked(value) {
            this.SubGroupChoiceDetailChecked = value.SubGroupChoiceDetailChecked;
            },

            // ========== From SelectedFilters.Vue ==========

            // handleDeliveryMethodFromSelectFilters(value) {
            //     console.log(value.selectedDeliveryMethod);
            //     this.selectedDeliveryMethod = value.selectedDeliveryMethod
            // },
            // handleLanguagesFromSelectedFilters(value) {
            //     console.log(value.selectedLanguages);
            //     this.selectedLanguages = value.selectedLanguages
            // },
            // handleCertificationsFromSelectedFilters(value) {
            //     console.log(value.selectedCertifications);
            //     this.selectedCertifications = value.selectedCertifications
            // },
            // patateCoursesTest() {
            //     console.log('patateCoursesTest : ', this.selectedCourseType)
            //     if (this.selectedCourseType == 'First Aid') {
            //     }
            // },

            // ================== Emit from children HorizontalFilters ==================

            handleDeliveryMethod(value) {
                this.selectedDeliveryMethod = value.selectedDeliveryMethod;
                this.$emit('selected-delivery-method', value);

                // console.log(this.selectedDeliveryMethod)
            },
            handleLanguages(value) {
                this.selectedLanguages = value.selectedLanguages;
                this.$emit('selected-languages', value);
                // console.log(this.selectedLanguages)
            },
            handleCertifications(value) {
                this.selectedCertifications = value.selectedCertifications;
                this.$emit('selected-certifications', value)
                console.log(this.selectedCertifications)
            },
            handleSorting(value) {
                this.selectedSorting = value.selectedSorting;
                this.$emit('selected-sorting', value)
                console.log('handleSelectedSorting : ', this.selectedSorting)
            },

            // ================== Emit from children Reset ==================

            handleResetFilters() {
                this.$refs.selectFilters.resetFilters();
            },

            toggleSubDropdown(courseTypeName) {
                this.$refs.selectFilters.toggleSubDropdown(courseTypeName)
            },

            uncheckFilterPastille(filter,) {
                console.log('Filter :', filter)
                // console.log('CategoryCheckedFilter :', this.CategoryChecked)

                if (this.CategoryChecked[filter]) {
                    // console.log('Category Filter : ', this.CategoryChecked)
                    this.CategoryChecked[filter] = false;


                } else if (this.SubGroupChecked[filter]) {
                    // console.log('SubGroup Filter : ', this.SubGroupChecked)
                    this.SubGroupChecked[filter] = false;
                    this.subGroupExists = false;


                } else if (this.SubGroupChoiceChecked[filter]) {
                    this.SubGroupChoiceChecked[filter] = false;
                    this.subGroupChoiceExists = false;


                } else if (this.SubGroupChoiceDetailChecked[filter]) {
                    this.SubGroupChoiceDetailChecked[filter] = false;
                    this.subGroupChoiceDetailExists = false;


                }

                const index = this.selectedFilters.indexOf(filter); // bien que le "check" soit removed avec uncheckFilterPastille, il faut supprimer la valeur du array selectedFilters avec splice
                if (index !== -1) {
                    this.selectedFilters.splice(index, 1);
                    // console.log('UncheckFunction :', this.selectedFilters)
                }

                this.toggleSubDropdown(filter); // va actioner "toggleSubDropdown" si le filter clique a cette fonction associe
                // this.handleEmits();
                    // Triggering filteredCourses computed property
                    // const updatedGroupedCourses = this.groupedCourses;
                    // console.log('Updated Grouped Courses:', updatedGroupedCourses);
            },
            
            filterPopularCourses(courses) {
                const popularCourses = courses.filter(course => course.popular);
                const nonPopularCourses = courses.filter(course => !course.popular);
                return { popularCourses, nonPopularCourses };
            },
        },

        

        computed: {

            groupedCourses() {
                const groups = [];

                if (this.selectedSorting === 'Date' || this.selectedSorting === '') {

                    if (!this.subGroupExists) {
                        console.log('subGroup does Exists')
                        const courses = this.CourseTypeMatching.slice().sort((a, b) => {
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);
                            return dateA - dateB;
                        });
                        groups.push({ id: 1, label: "1er groupe", courses });
                    }
    
                    if (!this.subGroupChoiceExists) {
                        console.log('subGroupChoice does Exists')
                        const courses = this.subGroupMatching.slice().sort((a, b) => {
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);
                            return dateA - dateB;
                        });
                        groups.push({ id: 2, label: "2eme groupe", courses });
                    }
    
                    if (!this.subGroupChoiceDetailExists) {
                        console.log('subGroupChoiceDetail does Exists')
                        const courses = this.subGroupChoiceMatching.slice().sort((a, b) => {
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);
                            return dateA - dateB;
                        });
                        groups.push({ id: 3, label: "3eme groupe", courses });
                    }
    
                    const coursesForLastGroup = this.subGroupChoiceDetailMatching.slice().sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateA - dateB;
                    });
                    groups.push({ id: 4, label: "4eme groupe", courses: coursesForLastGroup });
    
                    console.log('Groups : ', groups)
                    return groups;

                } else if (this.selectedSorting === 'Popular') {

                    if (!this.subGroupExists) {
                        const { popularCourses, nonPopularCourses } = this.filterPopularCourses(this.CourseTypeMatching);
                        if (popularCourses.length > 0) {
                            groups.push({ id: 1, label: "Popular Courses", courses: popularCourses });
                        }
                        if (nonPopularCourses.length > 0) {
                            groups.push({ id: 2, label: "Other Courses", courses: nonPopularCourses });
                        }
                    }

                    if (!this.subGroupChoiceExists) {
                        const { popularCourses, nonPopularCourses } = this.filterPopularCourses(this.subGroupMatching);
                        if (popularCourses.length > 0) {
                            groups.push({ id: 1, label: "Popular Courses", courses: popularCourses });
                        }
                        if (nonPopularCourses.length > 0) {
                            groups.push({ id: 2, label: "Other Courses", courses: nonPopularCourses });
                        }
                    }

                    if (!this.subGroupChoiceDetailExists) {
                        const { popularCourses, nonPopularCourses } = this.filterPopularCourses(this.subGroupChoiceMatching);
                        if (popularCourses.length > 0) {
                            groups.push({ id: 1, label: "Popular Courses", courses: popularCourses });
                        }
                        if (nonPopularCourses.length > 0) {
                            groups.push({ id: 2, label: "Other Courses", courses: nonPopularCourses });
                        }
                        console.log('popularCourses : ', popularCourses)
                        console.log('nonPopularCourses : ', nonPopularCourses)
                        console.log('groups pushed : ', groups)
                    }

                    const coursesForLastGroup = this.subGroupChoiceDetailMatching.slice().sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                        return dateA - dateB;
                    });

                    const { popularCourses: popularCoursesForLastGroup, nonPopularCourses: nonPopularCoursesForLastGroup } = this.filterPopularCourses(coursesForLastGroup);
                    
                    if (popularCoursesForLastGroup.length > 0) {
                        groups.push({ id: 3, label: "Popular Courses for Last Group", courses: popularCoursesForLastGroup });
                    }

                    if (nonPopularCoursesForLastGroup.length > 0) {
                        groups.push({ id: 4, label: "Other Courses for Last Group", courses: nonPopularCoursesForLastGroup });
                    }

                }

            return groups;
                
            },

            filteredCourses() {
                if (this.selectedStartDate && this.selectedEndDate) {
                    // console.log('Allo')
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);

                        return courseDate >= new Date(this.selectedStartDate) && 
                               courseDate <= new Date(this.selectedEndDate) && 
                               (this.selectedDeliveryMethod === '' || course.deliveryMethod.includes(this.selectedDeliveryMethod)) && // le === '' permet d'avoir tous les resultats lorsque rien n'est selectioner
                               (this.selectedLanguages.length === 0 || course.language.includes(this.selectedLanguages)) &&
                               (this.selectedCertifications === '' || course.certification.includes(this.selectedCertifications))
                    }).sort((a, b) => {
                        const dateA = new Date(a.date);
                        // console.log('dateA : ', dateA)
                        const dateB = new Date(b.date);
                        // console.log('dateB : ', dateB);
                        return dateA - dateB;
                    })
                }
                // console.log ('Les cours present : ', this.courses)
                return [];
            },
            CourseTypeMatching() {
                const courseType = [];
                if (this.selectedFilters.length > 0 && this.selectedStartDate && this.selectedEndDate) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) && 
                            courseDate <= new Date(this.selectedEndDate) && 
                            (this.selectedDeliveryMethod === '' || course.deliveryMethod.includes(this.selectedDeliveryMethod)) && 
                            (this.selectedLanguages.length === 0 || course.language.includes(this.selectedLanguages)) &&
                            (this.selectedCertifications === '' || course.certification.includes(this.selectedCertifications))) { // On verifie si les cours associer a la selection entre dans l'intervalle de la date de depart et celle de fin
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
                // console.log('subGroupMatching')
                const subGroup = [];
                if (this.selectedFilters.length > 0) {
                    return this.courses.filter(course => {
                        const courseDate = new Date(course.date);
                        if (courseDate >= new Date(this.selectedStartDate) &&
                            courseDate <= new Date(this.selectedEndDate) && 
                            (this.selectedDeliveryMethod === '' || course.deliveryMethod.includes(this.selectedDeliveryMethod)) &&
                            (this.selectedLanguages.length === 0 || course.language.includes(this.selectedLanguages)) &&
                            (this.selectedCertifications === '' || course.certification.includes(this.selectedCertifications))) {
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
                            (this.selectedDeliveryMethod === '' || course.deliveryMethod.includes(this.selectedDeliveryMethod)) &&
                            (this.selectedLanguages.length === 0 || course.language.includes(this.selectedLanguages)) &&
                            (this.selectedCertifications === '' || course.certification.includes(this.selectedCertifications))) {
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
                        if (courseDate >= new Date(this.selectedStartDate) && 
                            courseDate <= new Date(this.selectedEndDate) && 
                            (this.selectedDeliveryMethod === '' || course.deliveryMethod.includes(this.selectedDeliveryMethod)) && 
                            (this.selectedLanguages.length === 0 || course.language.includes(this.selectedLanguages)) && 
                            (this.selectedCertifications === '' || course.certification.includes(this.selectedCertifications))) {
                            for (const key in course) {
                                if (key == 'subGroupChoiceDetail') {
                                    if (this.selectedFilters.includes(course[key])) {
                                        subGroupChoiceDetail.push(course)
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