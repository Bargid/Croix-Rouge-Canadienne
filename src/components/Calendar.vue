<template>

    <label for="start-date">Start Date: </label>
    <input type="date" id="start-date" v-model="startDate" v-bind:min="minStartDate" v-bind:max="maxStartDate">

    <label for="end-date"> End Date: </label>
    <input type="date" id="end-date" v-bind:min="minEndDate" v-model="endDate" :disabled = "!startDate">

</template>

<script>

 const today = new Date().toISOString().split('T')[0]; // return la date d'aujourd'hui
//  const maxDate = new Date(86400000); // un chiffre incroyablement élevé...

 export default {
    name: 'Calendar',
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
    // watch: {
    //     startDate(newStartDate, oldStartDate) {
    //         if (newStartDate > this.endDate) {
    //             this.endDate = ''; // on reset le endDate si le user change la startDate pour une valeur plus grande
    //         }
    //     },
    //     endDate(newEndDate, oldEndDate) {
    //         if (newEndDate < this.startDate) {
    //             this.startDate = newEndDate; // remet startDate a la valeur de endDate si elle etait plus grande
    //         }
    //     }
    // },
    created() { // created est un lifecycle hook. Le moment de la creation d'un objet ou une propriété
        this.startDate = today // la valeur "startDate" dans data est maintenant la journee d'aujourd'hui
    }
    // methods: {
    //     updateEndDateMin(evt) {
    //        this.startDate = evt.target.value;
    //     }
    // }
 }
</script>


<!-- updateEndDateMin(evt) {
    let startDate = evt.target.value;
    let endDateInput = document.querySelector('#end-date');
    
    if (startDate) {
        endDateInput.removeAttribute('disabled');
        endDateInput.setAttribute('min', startDate);
    } else {
        endDateInput.setAttribute('disabled', true);
        endDateInput.value = '';
    }
} -->