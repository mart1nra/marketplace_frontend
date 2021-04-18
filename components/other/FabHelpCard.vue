<template>
  <v-menu
    v-model="showMenu"
    offset-x
    nudge-left="10px"
    top
    left
    :close-on-content-click="false"
    open-on-hover
    close-delay="3000"
  >
    <template #activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          id="fabHelp"
          v-model="fab"
          v-bind="attrs"
          class="mb-md-2"
          color="primary"
          fab
          fixed
          large
          right
          bottom
          style="z-index: 6"
          v-on="on"
        >
          <v-badge content="2" color="red">
            <v-icon>mdi-forum</v-icon>
          </v-badge>
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card flat width="320">
      <v-system-bar
        window
        color="primary"
        class="font-weight-medium white--text"
      >
        <div>
          <v-icon color="white">mdi-message-reply-text</v-icon>
          <span>2 unread messages</span>
        </div>
        <v-spacer></v-spacer>
        <v-icon color="white" @click="showMenu = !showMenu">mdi-close</v-icon>
      </v-system-bar>

      <v-sheet class="d-flex align-center justify-start">
        <v-avatar size="40" class="mx-4 my-2">
          <v-img :src="require(`~/assets/img/person_1.jpg`)" contain></v-img>
        </v-avatar>
        <div>
          <h4 class="font-weight-bold">John</h4>
          <div class="font-weight-light">Customer Support</div>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-sheet height="350px">
        <div class="message-wrap d-flex justify-end align-center my-4">
          <div class="message d-flex align-baseline">
            <div
              class="py-1 px-3 rounded-lg ml-5"
              :class="!$vuetify.theme.dark ? 'grey lighten-4' : 'grey'"
            >
              <div class="d-flex align-center">
                <h4 class="font-weight-bold">John</h4>
                <span class="caption mx-2">11:25 PM</span>
              </div>
              <p>Hello! We are always here to help. Feel free to message us!</p>
            </div>

            <div class="mt-auto">
              <v-avatar size="30" class="mr-2">
                <v-icon color="primary">mdi-check-all</v-icon>
              </v-avatar>
            </div>
          </div>
        </div>

        <div class="message-wrap d-flex justify-start align-center my-4">
          <div class="message d-flex flex-row-reverse align-baseline">
            <div
              class="py-1 px-3 rounded-lg mr-5"
              :class="
                !$vuetify.theme.dark
                  ? 'indigo lighten-1 white--text'
                  : 'indigo lighten-2'
              "
            >
              <div class="d-flex align-center">
                <h4 class="font-weight-bold">You</h4>
                <span class="caption mx-2">11:28 PM</span>
              </div>
              <p>This theme is awesome! 😊🙌</p>
            </div>

            <div class="mt-auto">
              <v-avatar size="30" class="ml-2">
                <v-icon left>mdi-check-all</v-icon>
              </v-avatar>
            </div>
          </div>
        </div>
      </v-sheet>

      <v-sheet class="pa-4">
        <v-text-field
          label="Regular"
          hide-details=""
          solo
          placeholder="Write here..."
          append-icon="mdi-send"
        >
        </v-text-field>
      </v-sheet>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'FabHelpCard',
  data: () => ({
    fab: true,
    showMenu: false,
  }),
  methods: {
    isNotHome() {
      var home = this.$route.path == '/'
      return home
    },
  },
}
</script>
