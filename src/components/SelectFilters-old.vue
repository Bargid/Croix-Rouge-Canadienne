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
                    <input class="categories-checkbox" type="checkbox" 
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

                <!-- ========== Sous-menu de PERSONAL ========== -->
                <div class="subGroupsMenu-container" v-if="SubGroupChecked['Personal'] && courseType.name === 'First Aid'">
                    <span class="subGroupsMenu"
                        v-for="subGroupMenu in getSubGroupMenu('Personal')"
                        v-bind:key="subGroupMenu.name"
                        v-bind:value="subGroupMenu">
                        {{ subGroupMenu.name }}
                    </span>
                    <div class="subGroupChoices-container">
                        <div class="subGroupChoices"
                        v-for="subGroupChoice in getSubGroupChoice('Personal')"
                        v-bind:key="subGroupChoice.name"
                        v-on:click="toggleSubGroupChoiceCheckbox(subGroupChoice.name)">
                            <input type="checkbox"
                                v-bind:value="subGroupChoice.name"
                                v-model="SubGroupChoiceChecked[subGroupChoice.name]">
                            <div>{{ subGroupChoice.name }}
                                <div v-if="SubGroupChoiceChecked[subGroupChoice.name]">
                                    <span class="subGroupChoicesDetails"
                                        v-for="subGroupChoiceDetail in getSubGroupChoiceDetails('Personal', subGroupChoice.name)"
                                        v-bind:key="subGroupChoiceDetail.name"
                                        v-on:click="toggleSubGroupChoiceDetailCheckbox(subGroupChoiceDetail.name)"
                                        v-on:click.stop> <!-- tres important pour ne pas bubble up au parent, et trigger le v-on:click du parent -->
                                        <input type="checkbox"
                                            v-bind:value="subGroupChoiceDetail.name"
                                            v-model="SubGroupChoiceDetailChecked[subGroupChoiceDetail.name]">
                                            {{ subGroupChoiceDetail.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ========== Sous-menu de WORK / SCHOOL ========== -->
                <div class="subGroupsMenu-container" v-else-if="SubGroupChecked['Work / School'] && courseType.name === 'First Aid'">
                    <span class="subGroupsMenu"
                        v-for="subGroupMenu in getSubGroupMenu('Work / School')"
                        v-bind:key="subGroupMenu.name"
                        v-bind:value="subGroupMenu">
                        {{ subGroupMenu.name }}
                    </span>
                    <div class="subGroupChoices-container">
                        <span class="subGroupChoices"
                        v-for="subGroupChoice in getSubGroupChoice('Work / School')"
                        v-bind:key="subGroupChoice.name"
                        v-bind:value="subGroupChoice"
                        v-on:click="toggleSubGroupChoiceCheckbox(subGroupChoice.name)">
                            <input type="checkbox"
                                v-bind:value="subGroupChoice.name"
                                v-model="SubGroupChoiceChecked[subGroupChoice.name]">
                            <span>{{ subGroupChoice.name }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    </section>

        <!-- ========== Menu de filtre horizontale ========== -->
        <div class="horizontal-menus-container">
            <div class="horizontal-filters-container">
                <span><img src="../assets/Icons/filters.svg" alt="Filters">Filters</span>
                <select name="Delivery Methods" id=""
                    v-model="selectedDeliveryMethod" 
                    v-on:change="handleEmits"> 
                    <option value=""> All Delivery Methods </option>
                    <option v-for="method in deliveryMethods"
                            v-bind:key="method.name" 
                            v-bind:value="method.name">
                            {{ method.name }}
                        </option>
                </select>
                <select name="Languages" id=""
                    v-model="selectedLanguages" 
                    v-on:change="handleEmits"> 
                    <option value=""> Both Languages </option>
                    <option v-for="language in languages"
                            v-bind:key="language.name" 
                            v-bind:value="language.name">
                            {{ language.name }}
                        </option>
                </select>
                <select name="Certification" id=""
                    v-model="selectedCertification" 
                    v-on:change="handleEmits"> 
                    <option value=""> Certified & Quick Learning </option>
                    <option v-for="certification in certifications"
                            v-bind:key="certification.name" 
                            v-bind:value="certification.name">
                            {{ certification.name }}
                        </option>
                </select>
            </div>
            <div class="horizontal-tags-container">
                <span class="reset-tag"
                    v-on:click="resetFilters()"> Reset </span>
                <span class="pastille-tag"
                    v-for="(filter, index) in selectedFilters"
                    v-bind:key="index"
                    v-on:click="uncheckFilterPastille(filter)">
                    {{ filter }}</span>
            </div>
        </div>

</template>

<script>
    export default {
        name: 'SelectFilters',

        data() {
            return {
                courses: [],
                courseTypes: [],
                subGroups: [],

                deliveryMethods: [],
                selectedDeliveryMethod: '',
                languages: [],
                selectedLanguages: '',
                certifications: [],
                selectedCertification: '',

                showDropdown: false,
                showSubDropdown: false,
                currentOpenDropdown: null,
                CategoryChecked: {},
                SubGroupChecked: {},
                SubGroupChoiceChecked: {},
                SubGroupChoiceDetailChecked: {},
                subGroupExists: false,
                subGroupChoiceExists: false,
                subGroupChoiceDetailExists: false,
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

                for (const key in this.SubGroupChoiceChecked) {
                    if (this.SubGroupChoiceChecked[key]) {
                        selectedFilters.push(key);
                    }
                }

                for (const key in this.SubGroupChoiceDetailChecked) {
                    if (this.SubGroupChoiceDetailChecked[key]) {
                        selectedFilters.push(key);
                    }
                }
                
                // if (this.selectedDeliveryMethod) {
                //     selectedFilters.push(this.selectedDeliveryMethod)
                // }
                
                return selectedFilters;
            }
        },

        methods: {

// ================== Toggle de Menus secondaires functions ==================

            getSubGroupMenu(subGroupName) {
                // console.log(this.SubGroupChecked)
                let resultat = '';
                const courseType = this.courseTypes.find(type => type.name === 'First Aid');
                if (courseType) {
                    const subGroup = courseType.subGroups.find(group => group.name === subGroupName);
                    if (subGroup) {
                        resultat = subGroup.subGroupMenu;
                    }
                }
                return resultat;
            },
            getSubGroupChoice(subGroupChoiceName) {
                // console.log(this.SubGroupChoiceChecked)
                let subGroupChoices = [];
                const courseType = this.courseTypes.find(type => type.name === 'First Aid');
                if (courseType) {
                    const subGroup = courseType.subGroups.find(group => group.name === subGroupChoiceName);
                    if (subGroup && subGroup.subGroupMenu) {
                        subGroupChoices = subGroup.subGroupMenu.flatMap(menu => menu.subGroupChoices || []);
                    }
                }
                return subGroupChoices;
            },
            getSubGroupChoiceDetails(subGroupName, subGroupChoiceName) {
                let subGroupChoiceDetails = [];
                const courseType = this.courseTypes.find(type => type.name === 'First Aid');
                if (courseType) {
                    const subGroup = courseType.subGroups.find(group => group.name === subGroupName);
                    if (subGroup && subGroup.subGroupMenu) {
                        const subGroupMenu = subGroup.subGroupMenu.find(menu => menu.name === 'Courses to Help');
                        if (subGroupMenu && subGroupMenu.subGroupChoices) {
                            const subGroupChoice = subGroupMenu.subGroupChoices.find(choice => choice.name === subGroupChoiceName);
                            if (subGroupChoice && subGroupChoice.subGroupChoiceDetails) {
                                subGroupChoiceDetails = subGroupChoice.subGroupChoiceDetails;
                            }
                        }
                    }
                }
                return subGroupChoiceDetails;
            },


// ================== Toggle pour les menu dropdown functions ==================

            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },

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

// ================== Toggle de Checkbox functions ==================

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
                this.courseTypes.forEach(courseType => {
                    if (courseType.name !== categoryName) {
                        courseType.showSubDropdown = false;
                    }
                });
                this.resetSubGroups()
                this.handleEmits();
            },

            toggleSubGroupCheckbox(subGroupName) {
                for (const key in this.SubGroupChoiceChecked) { // VA DEVOIR FAIRE SIMILAIRE POUR L'AUTRE GROUPE DE MENU PLUS BAS... CEST CE QUI RESET SI TU CHOISIS UN AUTRE CHOIX PLUS HAUT
                    this.SubGroupChoiceChecked[key] = false;
                }

                for (const key in this.SubGroupChoiceDetailChecked) {
                    this.SubGroupChoiceDetailChecked[key] = false;
                }

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

            toggleSubGroupChoiceCheckbox(subGroupChoiceName) {
                // console.log( 'Choice est Toggle')
                for (const key in this.SubGroupChoiceChecked) {
                    if (key !== subGroupChoiceName) {
                        this.SubGroupChoiceChecked[key] = false;

                        const index = this.selectedFilters.indexOf(key);
                        if (index !== -1) {
                            this.selectedFilters.splice(index, 1);
                            // console.log(this.selectedFilters)
                        }
                    }
                }

                for (const key in this.SubGroupChoiceDetailChecked) {
                    this.SubGroupChoiceDetailChecked[key] = false;
                }

                // Toggle de la checbox
                this.SubGroupChoiceChecked[subGroupChoiceName] = !this.SubGroupChoiceChecked[subGroupChoiceName];
                this.subGroupChoiceExists = Object.values(this.SubGroupChoiceChecked).some(val => val);
                // console.log(this.subGroupChoiceExists)
                this.handleEmits();
            },

            toggleSubGroupChoiceDetailCheckbox(subGroupChoiceDetailName) {
                for (const key in this.SubGroupChoiceDetailChecked) {
                    if (key !== subGroupChoiceDetailName) {
                        this.SubGroupChoiceDetailChecked[key] = false;

                        const index = this.selectedFilters.indexOf(key);
                        if (index !== -1) {
                            this.selectedFilters.splice(index, 1);
                        }
                    }
                }

                // Toggle the checkbox
                this.SubGroupChoiceDetailChecked[subGroupChoiceDetailName] = !this.SubGroupChoiceDetailChecked[subGroupChoiceDetailName];
                this.subGroupChoiceDetailExists = Object.values(this.SubGroupChoiceDetailChecked).some(val => val);
                // console.log('DetailValue on ToggleDetailCheckbox : ', this.subGroupChoiceDetailExists)
                this.handleEmits();
            },

// ================== Uncheck filters on close Functions ==================

            uncheckFilterPastille(filter) {

                // const filterObjects = [this.CategoryChecked, this.SubGroupChecked, this.SubGroupChoiceChecked, this.SubGroupChoiceDetailChecked];

                // for (const filterObject of filterObjects) { // On passe au travers de chaque objet du array et turn false ou vide selon les conditions
                //     if (filterObject[filter]) {
                //         filterObject[filter] = false;

                //         if (filterObject == this.CategoryChecked) {
                //             this.SubGroupChecked = {};
                //             this.SubGroupChoiceChecked = {};
                //             this.SubGroupChoiceDetailChecked = {};
                //         }

                //         if (filterObject === this.SubGroupChecked) {
                //             this.SubGroupChoiceChecked = {};
                //             this.SubGroupChoiceDetailChecked = {};
                //         }

                //         if (filterObject === this.SubGroupChoiceChecked) {
                //             this.SubGroupChoiceDetailChecked = {};
                //         }
                //     }
                // }

                if (this.CategoryChecked[filter]) {
                    this.CategoryChecked[filter] = false;

                } else if (this.SubGroupChecked[filter]) {
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
                }

                this.toggleSubDropdown(filter); // va actioner "toggleSubDropdown" si le filter clique a cette fonction associe
                this.handleEmits();
            },

            resetSubGroups() {
                for (const key in this.SubGroupChecked) {
                    this.SubGroupChecked[key] = false;
                }
                this.subGroupExists = false;
                this.subGroupChoiceExists = false;
                this.subGroupChoiceDetailExists = false;
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
                for (const key in this.SubGroupChoiceChecked) {
                    this.SubGroupChoiceChecked[key] = false;
                }
                for (const key in this.SubGroupChoiceDetailChecked) {
                    this.SubGroupChoiceDetailChecked[key] = false;
                }

                // on vide le array selectedFilters
                this.selectedFilters = [];

                // on ferme les dropdowns
                this.courseTypes.forEach(courseType => {
                    courseType.showSubDropdown = false;
                })

                this.subGroupExists = false;
                this.subGroupChoiceExists = false;
                this.subGroupChoiceDetailExists = false;
                this.handleEmits();
            },

            // clearSubGroupChoiceSelections() {
            //     for (const key in this.SubGroupChoiceChecked) {
            //         this.SubGroupChoiceChecked[key] = false;
            //     }
            //     this.subGroupChoiceExists = false;
            //     this.handleEmits();
            // },

// ================== handling of CSS Functions ==================

            handleBorders() {
                const filterContainer = document.querySelector('.filter-container');
                const wholeContainer = document.querySelector('.coursesType-menu');
                filterContainer.classList.toggle("container-border");
                wholeContainer.classList.toggle("container-border");
            },

// ================== Emit Functions ==================

            handleEmits() {
                this.$emit('selected-filters', {selectedFilters: this.selectedFilters});
                this.$emit('selected-delivery-method', {selectedDeliveryMethod: this.selectedDeliveryMethod});
                this.$emit('selected-languages', {selectedLanguages: this.selectedLanguages});
                this.$emit('selected-certifications', {selectedCertifications: this.selectedCertification});
                this.$emit('sub-group-exists', {subGroupExists: this.subGroupExists});
                this.$emit('sub-group-choice-exists', {subGroupChoiceExists: this.subGroupChoiceExists});
                this.$emit('sub-group-choice-details-exists', {subGroupChoiceDetailExists: this.subGroupChoiceDetailExists});
            }
        },

// ================== MOUNTED ==================

        mounted() {
            this.courseTypes.forEach(courseType => {
                this.$set(this.categoryChecked, courseType.name, false);
                courseType.showSubDropdown = false; // Initialize showSubDropdown for each courseType
            })

            fetch('http://localhost:8080/courses')
                .then((res) => res.json())
                .then(data => this.courses = data)
                .catch(err => console.log(err.message))
            
            fetch('http://localhost:8080/courseTypes')
                .then((res) => res.json())
                .then(data => this.courseTypes = data)
                .catch(err => console.log(err.message))

            fetch('http://localhost:8080/deliveryMethods')
                .then((res) => res.json())
                .then(data => this.deliveryMethods = data)
                .catch(err=> console.log(err.message))

            fetch('http://localhost:8080/languages')
                .then((res) => res.json())
                .then(data => this.languages = data)
                .catch(err => console.log(err.message))

            fetch('http://localhost:8080/certifications')
                .then((res) => res.json())
                .then(data => this.certifications = data)
                .catch(err => console.log(err.message))
        }
    }
</script>