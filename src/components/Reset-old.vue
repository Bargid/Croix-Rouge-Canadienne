<template>

    <div class="horizontal-tags-container">
        <span class="reset-tag"
            v-on:click="resetFilters()"> Reset </span>
        <span class="pastille-tag"
            v-for="(filter, index) in selectedFilters"
            v-bind:key="index"
            v-on:click="uncheckFilterPastille(filter)">
            {{ filter }}</span>
    </div>

</template>

<script>


    export default {
        name: 'Reset',

        data() {
            return {

            }
        },

        props: {
            CategoryChecked: {},
            SubGroupChecked: {},
            SubGroupChoiceChecked: {},
            SubGroupChoiceDetailChecked: {},
            selectedFilters: Array
        },

        methods: {

            uncheckFilterPastille(filter) {

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
            }

        },
    }
</script>
