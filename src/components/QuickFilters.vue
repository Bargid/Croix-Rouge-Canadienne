<template>

        <p class="quickfilters-name">Quick Filters</p>
        <div class="quickfilter">
            <img src="@/assets/Icons/quickfilters/certified.svg" alt="Certified">
            <p class="quickfilter-name"> Certified </p>
            <p class="quickfilter-course"> Courses</p>
        </div>

</template>

<script>
    export default {

        name: 'QuickFilters',

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

        }

    }
</script>