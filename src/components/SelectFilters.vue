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
                v-on:click="toggleSubDropdown(courseType.name), toggleCategoryCheckbox(courseType.name), updateSelectedFilters(courseType.name)">
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
                    v-on:click="toggleSubGroupCheckbox(subGroup.name), updateSelectedFilters(subGroup.name)">
                        <input type="checkbox" 
                            v-bind:value="subGroup.name"
                            v-model="SubGroupChecked[subGroup.name]">
                    {{ subGroup.name }}</span>
                </div>
            </div>
        </nav>

        <!-- Menu de filtre horizontale -->
        <div class="horizontal-filters-container">
            <span class="pastille-tag" 
                v-for="(filter, index) in selectedFilters" 
                v-bind:key="index"
                v-on:click="uncheckFilter(filter)">
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
                selectedFilters: [],
                showDropdown: false,
                showSubDropdown: false,
                CategoryChecked: {},
                SubGroupChecked: {},
            }
                
        },

        methods: {
            // Toggle pour les menus dropdown
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            toggleSubDropdown(courseTypeName) {
                const courseType = this.courseTypes.find(type => type.name === courseTypeName);
                if (courseType) {
                    courseType.showSubDropdown = !courseType.showSubDropdown;
                }
            },

            // Toggle pour les checkbox
            toggleCategoryCheckbox(categoryName) {
                this.CategoryChecked[categoryName] = !this.CategoryChecked[categoryName]
            },
            toggleSubGroupCheckbox(subGroupName) {
                this.SubGroupChecked[subGroupName] = !this.SubGroupChecked[subGroupName]
            },

            // Pour les pastilles
            updateSelectedFilters(value) {
                const index = this.selectedFilters.indexOf(value);
                if (index !== -1) {
                    this.selectedFilters.splice(index, 1);
                } else {
                    this.selectedFilters.push(value);
                }
                console.log(this.selectedFilters)
            },
            uncheckFilter(filter) {
                if (this.CategoryChecked[filter]) {
                    this.CategoryChecked[filter] = false;
                } else if (this.SubGroupChecked[filter]) {
                    this.SubGroupChecked[filter] = false;
                }

                const index = this.selectedFilters.indexOf(filter); // bien que le "check" soit removed avec uncheckFilter, il faut supprimer la valeur du array selectedFilters avec splice
                if (index !== -1) {
                    this.selectedFilters.splice(index, 1);
                }

                this.toggleSubDropdown(filter); // va actioner "toggleSubDropdown" si le filter clique a cette fonction associe
            },

            // Fonction pour le CSS de la section filtre
            handleBorders() {
                const filterContainer = document.querySelector('.filter-container');
                const wholeContainer = document.querySelector('.coursesType-menu');
                filterContainer.classList.toggle("container-border");
                wholeContainer.classList.toggle("container-border");
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