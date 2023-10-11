<template>

    <div class="date-and-price-container">
        <div class="date-container">
            <span class="date-month"> {{ formatDate(courseData.date).month }}</span>
            <span class="date-day">{{ formatDate(courseData.date).day }}</span>
            <span class="date-weekday">{{ formatDate(courseData.date).weekday }}</span>
        </div>
        <span class="date-price" v-if="courseData.price > 0"> ${{ courseData.price }}.00</span>
    </div>

</template>

<script>
    export default {
        name: 'DateAndPrice',

        data() {
            return {

            }
        },

        props: {

            courseData: {
                type: Object
            }
        },

        methods: {

            formatDate(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = date.toLocaleString('en-US', { month: 'short' });
                const day = date.getDate();
                const weekday = date.toLocaleString('en-US', { weekday: 'short' });

            return { year, month, day, weekday };
            },

            marginAdd() {
                if (this.courseData.price > 0) {
                    const dateContainer = document.querySelector('.date-container');
                    dateContainer.classList.add('date-container-top-margin');
                }
            }
        }
    }
</script>