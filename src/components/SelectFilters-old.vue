<template>

    <section class="filters-menu">

        <!-- Menu de filtres a gauche -->
        <nav class="coursesType-menu">
            <div class="filter-container container-border" v-on:click="toggleDropdown(), handleBorders()"> 
                Filter Course Types <img src="../assets/Icons/arrow.svg" alt=""> 
            </div>
            <div class="menu-categories" 
            v-for="courseType in courseTypes" 
            v-bind:key="courseType" 
            v-bind:value="courseType"
            v-if="showDropdown">
                <div class="categories" 
                    v-on:click="toggleCategoryCheckbox(courseType.name), toggleSubDropdown(courseType.name)">
                    <input type="checkbox" 
                    v-bind:value="courseType.name"
                    v-model="CategoryChecked[courseType.name]">
                    <span>{{ courseType.name }} <img src="../assets/Icons/arrow.svg" alt=""></span></div>

                <div class="subGroups-container">
                    <span class="subGroups"
                    v-for="subGroup in courseType.subGroups"
                    v-bind:key="subGroup.name"
                    v-bind:value="subGroup"
                    v-if="courseType.showSubDropdown"
                    v-on:click="toggleSubGroupCheckbox(subGroup.name)">
                        <input type="checkbox" 
                            v-bind:value="subGroup.name"
                            v-model="SubGroupChecked[subGroup.name]">
                    {{ subGroup.name }}</span>
                </div>

                <div class="subGroups-appendum">

                </div>

                <!-- <div class="subrgoup-appendum"
                    v-if="">

                </div> -->
            </div>
        </nav>

        <!-- Menu de filtre horizontale -->
        <div class="horizontal-filters-container">
            <span class="reset-tag"
                v-on:click="resetFilters()"> Reset </span>
            <span class="pastille-tag" 
                v-for="(filter, index) in selectedFilters" 
                v-bind:key="index"
                v-on:click="uncheckFilterPastille(filter)">
                {{ filter }}</span>
        </div>

    </section>

</template>

<script>
    export default {
        name: 'SelectFilters',

        data() {
            return {
                courses: [],
                courseTypes: [],
                subGroups: [],
                // selectedFilters: [],
                showDropdown: false,
                showSubDropdown: false,
                currentOpenDropdown: null,
                CategoryChecked: {},
                SubGroupChecked: {},
                subGroupExists: false,
            }
                
        },

        computed: { // Beaucoup plus simple que de faire une fonction updateSelectedFilters...
            selectedFilters() {
                const selectedFilters = [];
                
                for (const key in this.CategoryChecked) {
                    if (this.CategoryChecked[key]) {
                        selectedFilters.push(key);
                    }
                }
                
                for (const key in this.SubGroupChecked) {
                    if (this.SubGroupChecked[key]) {
                        selectedFilters.push(key);
                    }
                }
                
                return selectedFilters;
            }
        },

        methods: {
            // Toggle pour les menus dropdown
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            // toggleSubDropdown(courseTypeName) {
            //     const courseType = this.courseTypes.find(type => type.name === courseTypeName);
            //     if (courseType) {
            //         courseType.showSubDropdown = !courseType.showSubDropdown;
            //     }
            // },
            toggleSubDropdown(courseTypeName) {
                if (this.currentOpenDropdown === courseTypeName) {
                    this.currentOpenDropdown = null; // Clicked the already open dropdown, so close it
                } else {
                    this.currentOpenDropdown = courseTypeName;
                }

                const courseType = this.courseTypes.find(type => type.name === courseTypeName);
                if (courseType) {
                    courseType.showSubDropdown = !courseType.showSubDropdown;
                }
            },

            // Toggle pour les checkbox
            toggleCategoryCheckbox(categoryName) {
                for (const key in this.CategoryChecked) {
                    if (key !== categoryName) {
                        this.CategoryChecked[key] = false;


                        const index = this.selectedFilters.indexOf(key);
                        if (index !== -1) {
                            this.selectedFilters.splice(index, 1);
                        }
                    }
                }
                // Toggle de la checkbox
                this.CategoryChecked[categoryName] = !this.CategoryChecked[categoryName]
                // On update le SelectedFilters array
                // this.updateSelectedFilters(categoryName);


                this.courseTypes.forEach(courseType => {
                    if (courseType.name !== categoryName) {
                        courseType.showSubDropdown = false;
                    }
                });
                this.resetSubGroups()
                this.handleEmits();
            },
            toggleSubGroupCheckbox(subGroupName) {
                console.log('clicked')
                // this.SubGroupChecked[subGroupName] = !this.SubGroupChecked[subGroupName]
                for (const key in this.SubGroupChecked) {
                    if (key !== subGroupName) {
                        this.SubGroupChecked[key] = false;

                        const index = this.selectedFilters.indexOf(key);
                        if (index !== -1) {
                            this.selectedFilters.splice(index, 1);
                        }
                    }
                }
                // Toggle de la checkbox
                this.SubGroupChecked[subGroupName] = !this.SubGroupChecked[subGroupName];
                this.subGroupExists = Object.values(this.SubGroupChecked).some(val => val);
                this.handleEmits();
            },

            uncheckFilterPastille(filter) {
                if (this.CategoryChecked[filter]) {
                    this.CategoryChecked[filter] = false;
                } else if (this.SubGroupChecked[filter]) {
                    this.SubGroupChecked[filter] = false;
                    this.subGroupExists = false;
                }

                const index = this.selectedFilters.indexOf(filter); // bien que le "check" soit removed avec uncheckFilterPastille, il faut supprimer la valeur du array selectedFilters avec splice
                if (index !== -1) {
                    this.selectedFilters.splice(index, 1);
                }

                this.toggleSubDropdown(filter); // va actioner "toggleSubDropdown" si le filter clique a cette fonction associe
                this.handleEmits();
            },
            resetSubGroups() {
                for (const key in this.SubGroupChecked) {
                    this.SubGroupChecked[key] = false;
                }
                this.subGroupExists = false;
                // this.handleEmits();
            },
            resetFilters() {
                // on uncheck tous les filtres
                for (const key in this.CategoryChecked) {
                    this.CategoryChecked[key] = false;
                }
                for (const key in this.SubGroupChecked) {
                    this.SubGroupChecked[key] = false;
                }

                // on vide le array selectedFilters
                this.selectedFilters = [];

                // on ferme les dropdowns
                this.courseTypes.forEach(courseType => {
                    courseType.showSubDropdown = false;
                })

                this.subGroupExists = false;
                this.handleEmits();
            },

            // Fonction pour le CSS de la section filtre
            handleBorders() {
                const filterContainer = document.querySelector('.filter-container');
                const wholeContainer = document.querySelector('.coursesType-menu');
                filterContainer.classList.toggle("container-border");
                wholeContainer.classList.toggle("container-border");
            },

            // On emit les selections
            handleEmits() {
                this.$emit('selected-filters', {selectedFilters: this.selectedFilters});
                this.$emit('sub-group-exists', {subGroupExists: this.subGroupExists});
            }
        },

        mounted() {
            this.courseTypes.forEach(courseType => {
                this.$set(this.categoryChecked, courseType.name, false);
                courseType.showSubDropdown = false; // Initialize showSubDropdown for each courseType
            })

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