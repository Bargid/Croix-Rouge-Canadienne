<template>

        <div class="calendar-container">
            <span class="startdate-input-container">
                <!-- <label for="start-date">Start Date: </label> -->
                <span class="startdate-button"></span>
                <input class="startdate-input" type="date" id="start-date" 
                    v-model="startDate" 
                    v-bind:min="minStartDate" 
                    v-bind:max="maxStartDate"
                    @change="handleDateSelection">
            </span>
            <span class="enddate-input-container">
                <!-- <label for="start-date">Start Date: </label> -->
                <span class="enddate-button"></span>
                <input class="enddate-input" type="date" id="end-date" 
                    v-model="endDate" 
                    v-bind:min="minEndDate" 
                    :disabled = "!startDate"
                    @change="handleDateSelection" >
            </span>
            <span class="calendar-checkmark" v-bind:style="{backgroundColor: startDate && endDate ? 'black' : 'transparent'}">
                <font-awesome-icon :icon="['fas', 'check']" style="color: white;"/>
            </span>
        </div>

</template>

<script>

 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


 const today = new Date().toISOString().split('T')[0]; // return la date d'aujourd'hui

 export default {
    name: 'Calendar',
    components: { FontAwesomeIcon },
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
        },
        handleDateSelection() { // permet d'envoyer les valeur sélectionnés par le user a la View parent qui utilisera ce component, Calendar.vue
            this.$emit('selected-dates', {startDate: this.startDate, endDate: this.endDate})
        }
    },
 }
</script>