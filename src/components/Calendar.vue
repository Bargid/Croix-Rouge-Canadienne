<template>

        <span class="startdate-input-container">
            <!-- <label for="start-date">Start Date: </label> -->
            <span class="startdate-button"></span>
            <input class="startdate-input" type="date" id="start-date" v-model="startDate" v-bind:min="minStartDate" v-bind:max="maxStartDate">
        </span>

    <!-- <label for="end-date"> End Date: </label>
    <input class="enddate-label" type="date" id="end-date" v-bind:min="minEndDate" v-model="endDate" :disabled = "!startDate"> -->

</template>

<script>

 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


 const today = new Date().toISOString().split('T')[0]; // return la date d'aujourd'hui

 export default {
    name: 'Calendar',
    // components: { FontAwesomeIcon },
    data() {
        return {
            startDate: '',
            endDate: ''
        };
    },
    computed: {
        minEndDate() {
            return this.startDate;
        },
        minStartDate() {
            return today;
        },
        maxStartDate() { 
            if(this.endDate) {
                return this.endDate;
            } 
        }
    },
    created() { // created est un lifecycle hook. Le moment de la creation d'un objet ou une propriété
        this.startDate = today // la valeur "startDate" dans data est maintenant la journee d'aujourd'hui
    },
    methods: {
        openStartDatePicker() {
            let startDateInput = document.querySelector('#start-date');
            startDateInput.click()
            console.log("allo")
        }
    }
 }
</script>