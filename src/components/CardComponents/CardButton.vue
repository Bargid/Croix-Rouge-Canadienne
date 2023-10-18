<template>

    <div v-if = "courseData.deliveryMethod === 'Online'" class="button-register-text-container">
        <p>register</p>
    </div>

    <div v-else class="button-text-container">
        <p>Take This Course <img src="@/assets/Icons/arrow_red.svg" alt="Arrow"></p>
    </div>

</template>

<script>
    export default {
        name: 'CardButton',

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

        },
    }

</script>