<template>
  <div>
    <v-icon v-for="i in 5" :key="i" color="orange" :size="size" class="mr-1"
      >mdi-star</v-icon
    >
    <span v-if="details" class="caption">(5)</span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: 15,
      required: false,
    },
    details: {
      default: true,
    },
  },
}
</script>
