<!-- <template>

    <VueDatePicker v-model="startDate" v-bind:min="minStartDate" v-bind:max="maxStartDate"></VueDatePicker>
    <VueDatePicker v-model="endDate" v-bind:min="minEndDate"></VueDatePicker>

</template>

<script>

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const today = new Date().toISOString().split('T')[0]; // return la date d'aujourd'hui
let oneWeek = new Date(today);
// oneWeek.setDate(today.getDate() + 7);
// const oneWeekFromToday = oneWeek.toISOString().split('T')[0];


 export default {
    name: 'Calendar',
    components: { VueDatePicker },
    data() {
        return {
            // date: null,
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
        // this.endDate = oneWeekFromToday
    }
 }
</script> -->

<template>
    <el-radio-group v-model="size" label="size control" size="small">
      <el-radio-button label="large">large</el-radio-button>
      <el-radio-button label="default">default</el-radio-button>
      <el-radio-button label="small">small</el-radio-button>
    </el-radio-group>
    <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :size="size"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref } from 'vue'
    
    const size = ref<'default' | 'large' | 'small'>('default')
    
    const value1 = ref('')
    const value2 = ref('')
  </script>
  
  <style scoped>
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  
  .demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  
  .demo-date-picker .block:last-child {
    border-right: none;
  }
  
  .demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>
  
  