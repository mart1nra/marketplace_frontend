<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      bottom
      class="transition-swing"
      :style="{
        marginBottom: `10px`,
      }"
      color="primary"
      fab
      fixed
      large
      right
      style="z-index: 6"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
