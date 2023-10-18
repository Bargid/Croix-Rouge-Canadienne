<template>

    <div class="bottombanner-container">
        <div class="infosadress-tp-container">
            <div class="infosadress-container" v-if = "courseData.adress !== '' && courseData.phoneNumber !== '' && courseData.email !== ''">
                <img src="@/assets/Icons/pinpoint.svg" alt="Pinpoint">
                <div>
                    <span v-if = "courseData.adress" class="adress"> {{ courseData.adress }} </span>
                    <div>
                        <span v-if = "courseData.phoneNumber"> {{ courseData.phoneNumber }} </span>
                        <span v-if = "courseData.phoneNumber !== '' || courseData.email !== '' "> | </span>
                        <span v-if = "courseData.email"> {{ courseData.email }} </span>
                    </div>
                </div>
            </div>
            <div class="tp-container">
                <img src="@/assets/Icons/dummy.svg" alt="Dummy">
                <div>
                    {{ courseData.trainingPartner }}
                </div>
            </div>
        </div>
        <div class="button-container">
            <CardButton v-bind:courseData = "courseData"/>
            <div v-if = "courseData.popular === true">
                <PopularTag />
            </div>
        </div>
    </div>

</template>

<script>

import CardButton from '@/components/CardComponents/CardButton.vue';
import PopularTag from '@/components/CardComponents/PopularTag.vue';

    export default {

        name: 'MainBanner',
        components: { CardButton, PopularTag },

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