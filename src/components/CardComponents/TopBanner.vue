<template>

    <div class="topbanner-container">
        <div class="topbanner-text-time">
            <span class="topbanner-text">
                {{ courseData.title }}
                <img src="@/assets/Icons/arrow_blue.svg" alt="Blue Arrow" class="blue-arrow">
            </span>
            <span class="topbanner-time">
                {{ courseData.startTime }} - {{ courseData.endTime }}
            </span>
        </div>
        <div class="topbanner-infos">
            <span class="infos-lang"><img src="@/assets/Icons/lang.svg" alt="Language"> {{ langAbbreviation(courseData.language) }} </span>
            <span class="infos-delivery">
                <img v-if="courseData.deliveryMethod === 'Online'" src="@/assets/Icons/online.svg" alt="Online">
                <img v-else-if = "courseData.deliveryMethod === 'In-Class'" src="@/assets/Icons/inclass.svg" alt="In-Class">
                <img v-else-if = "courseData.deliveryMethod.includes('Online') && courseData.deliveryMethod.includes('In-Class')" src="@/assets/Icons/online-inclass.svg" alt="In-Class">
                <img v-else src="@/assets/Icons/liveevent.svg" alt="In-Class">
                {{ DeliveryMethodAbbreviation(courseData.deliveryMethod) }}
            </span>
            <span class="infos-time"><img src="@/assets/Icons/clock.svg" alt="Time"> {{ formatTime(courseData.duration) }} </span>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'TopBanner',

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

            langAbbreviation(language) {
                if (Array.isArray(language)) {
                    const langArray = language.map(lang => lang.slice(0, 2).toUpperCase());
                    return langArray.join(' - ')
                } else {
                    return language.slice(0, 2).toUpperCase(); // On prend seulement les deux premiere lettre et on les met en majuscule
                }
            },

            formatTime(time) {
                const [hours, minutes] = time.split(':').map(Number);
                return `${parseInt(hours, 10)}h ${parseInt(minutes, 10).toString().padStart(2, '0')}m`;
            },

            DeliveryMethodAbbreviation(deliveryMethod) {
                let text = '';
                if (deliveryMethod.includes('Live Event')) {
                    text = deliveryMethod.slice(0, deliveryMethod.indexOf('(instructor Led)')).trim();
                } else if (Array.isArray(deliveryMethod)) { // On verifie si c'est un array
                    text = deliveryMethod.join(' / ');
                } else {
                    text = deliveryMethod;
                }

                return text;

            }
        }
    }
</script>