<template>
  <div class="horizontal-tags-container">
    <span class="reset-tag" @click="resetFilters"> Reset </span>
    <span
      class="pastille-tag"
      v-for="(filter, index) in selectedFilters"
      :key="index"
      @click="uncheckFilterPastille(filter)"
    >
      {{ filter }}
    </span>
  </div>
</template>

<script>
    export default {
    props: {
        selectedFilters: Array,
    },
    methods: {
        resetFilters() {
            this.$emit('reset-filters');
        },
        uncheckFilterPastille(filter) {
            this.$emit('uncheck-filter-pastille', filter);
        },
    },
    };
</script>