<template>
  <v-snackbar
    v-model="snackbar.visible"
    top
    right
    multi-line
    :color="snackbar.color"
  >

    <v-layout align-center>
      <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
      <v-layout column>
        <div>
          <strong>{{ snackbar.title }}</strong>
        </div>
        <div>{{ snackbar.text }}</div>
      </v-layout>
      <v-btn icon class="ml-3" @click="snackbar.visible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-layout>
  </v-snackbar>
</template>

<script>

export default {
  props: {
    snackbar: {
      type: Object,
      default: null
    }
  }
}
</script>