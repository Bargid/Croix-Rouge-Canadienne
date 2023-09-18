<template>
    <section class="footer-container">
        <div>
            <a v-for="link in links" :key="link" class="footer-links" v-bind:href="link.href"> {{ link.text }}</a>
        </div>
        <div class="socialmedia-container">
            <span v-for="socialMedia in socialMedias" :key="socialMedia"> 
                <a class="footer-socialmedia" v-bind:href="socialMedia.href">
                    <img v-bind:src="require(`@/assets/Images/${socialMedia.src}`)" v-bind:alt="socialMedia.alt" />
                </a>
            </span>
        </div>
        <div class="appstore-container">
            <p> Download the Canadian Red Cross First Aid app</p>
            <span>
                <a class="footer-appstore" v-for="appStore in appStores" :key="appStore" v-bind:href="appStore.href">
                    <img v-bind:src="require(`@/assets/Images/${appStore.src}`)" v-bind:alt="appStore.alt">
                </a>
            </span>
        </div>
        <div class="internallinks-container">
            <span>
                <a class="footer-internallinks" v-for="internalLink in internalLinks" :key="internalLink" v-bind:href="internalLink.href"> {{ internalLink.text }}</a>
            </span>

            <p>All content copyright © 1999 - 2022 Canadian Red Cross. All rights reserved. Charity Registration Number: 119219814RR0001</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
          links: {
            type: [],
            default: () => [] // va etre vide si il n'y a aucune valeur
          },
          socialMedias: {
            type: [],
            default: () => []
          },
          appStores: {
            type: [],
            default: () => []
          },
          internalLinks: {
            type: [],
            default: () => []
          }
        }
    }
</script>