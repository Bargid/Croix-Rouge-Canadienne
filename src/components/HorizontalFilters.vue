<template>

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
            <select name="Sorting" id=""
                v-model="selectedSorting" 
                v-on:change="handleEmits"> 
                <option value=""> Sorting </option>
                <option v-for="sort in sorting"
                        v-bind:key="sort.name" 
                        v-bind:value="sort.name">
                        {{ sort.name }}
                    </option>
            </select>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'HorizontalFilters',

        data() {
            return {
                deliveryMethods: [],
                selectedDeliveryMethod: '',
                languages: [],
                selectedLanguages: '',
                certifications: [],
                selectedCertification: '',
                sorting: [],
                selectedSorting: '',
            }
        },

        methods: {

            handleEmits() {
                this.$emit('selected-delivery-method', {selectedDeliveryMethod: this.selectedDeliveryMethod});
                this.$emit('selected-languages', {selectedLanguages: this.selectedLanguages});
                this.$emit('selected-certifications', {selectedCertifications: this.selectedCertification});
                this.$emit('selected-sorting', {selectedSorting: this.selectedSorting});
            }
        },

        mounted() {

            fetch('http://localhost:3000/deliveryMethods')
                .then((res) => res.json())
                .then(data => this.deliveryMethods = data)
                .catch(err=> console.log(err.message))

            fetch('http://localhost:3000/languages')
                .then((res) => res.json())
                .then(data => this.languages = data)
                .catch(err => console.log(err.message))

            fetch('http://localhost:3000/certifications')
                .then((res) => res.json())
                .then(data => this.certifications = data)
                .catch(err => console.log(err.message))

            fetch('http://localhost:3000/sorting')
                .then((res) => res.json())
                .then(data => this.sorting = data)
                .catch(err => console.log(err.message))
        }
    }
</script>