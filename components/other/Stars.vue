<template>
  <div>
    <v-icon v-for="i in 5" :key="i" color="black" :size="size"
      >mdi-star</v-icon
    >
    <span v-if="details" class="text-caption font-weight-light">(5)</span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: 14,
      required: false,
    },
    details: {
      default: true,
    },
  },
}
</script>
