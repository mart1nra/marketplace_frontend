<template>
  <v-container class="ml-md-16">
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <v-sheet
          width="100%"
          :color="!$vuetify.theme.dark ? 'accent lighten-4' : ''"
          class="pa-5 pa-md-12 d-flex flex-column flex-md-row align-center elevation-cs-2"
        >
          <div>
            <h1
              class="title-top primary--text display-1 font-weight-black"
              :class="!$vuetify.theme.dark ? 'text--darken-4' : ''"
            >
              Hello {{ user.name }},
            </h1>
            <div
              class="title-bottom display-1 font-weight-light primary--text text--darken-3"
            >
              here you will find all your relevant information
            </div>
          </div>
          <v-spacer></v-spacer>

          <v-icon
            :size="$vuetify.breakpoint.mobile ? 60 : 90"
            color="primary darken-4"
          >
            mdi-badge-account-horizontal-outline</v-icon
          >
        </v-sheet>
        <section class="mt-12">
          <div class="d-flex justify-space-between align-center">
            <h3>Your latest orders</h3>
            <v-spacer></v-spacer>
            <v-btn text rounded small
              >View all <v-icon small>mdi-chevron-double-right</v-icon>
            </v-btn>
          </div>

          <v-row>
            <v-col
              v-for="i in 3"
              :key="i"
              cols="12"
              sm="12"
              md="12"
              lg="4"
              xl="4"
            >
              <v-card class="elevation-cs my-5 ml-0" link>
                <v-list-item three-line>
                  <v-list-item-avatar size="80" color="grey lighten-4">
                    <v-icon x-large color="grey">mdi-package-variant</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="overline">15/11/2020</div>
                    <v-list-item-title class="title mb-1 success--text">
                      Will be delivered tomorrow
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >Lorem ipsum dolor sit.</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text
                    >View order <v-icon right>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <section class="my-6">
          <div class="d-flex justify-space-between align-center">
            <h3>Invoices</h3>
            <v-spacer></v-spacer>
            <v-btn text rounded small
              >View all <v-icon small>mdi-chevron-double-right</v-icon>
            </v-btn>
          </div>
          <v-row justify="center" align="center">
            <v-col v-for="i in 3" :key="i" cols="12" class="px-0">
              <v-hover v-slot="{ hover }">
                <v-card
                  to="product/1"
                  exact
                  class="elevation-cs ml-0 d-flex align-center pa-6 justify-center justify-md-space-between rounded-lg"
                  link
                >
                  <div
                    class="align-center align-md-center d-flex flex-column flex-md-row justify-center mx-0 mx-md-12"
                  >
                    <v-avatar size="90">
                      <v-img
                        contain
                        :src="require(`~/assets/img/laptop/2.jpg`)"
                      ></v-img>
                    </v-avatar>
                    <div class="mx-0 mx-md-12 text-center text-md-left w-100">
                      <h2 class="font-weight-bold primary--text">
                        Pay 799$ now
                      </h2>
                      <p>to avoid any additional costs.</p>
                    </div>
                  </div>
                  <v-slide-x-reverse-transition>
                    <v-avatar
                      v-if="hover && $vuetify.breakpoint.mdAndUp"
                      size="65"
                      color="grey lighten-4"
                      class="rounded-circle"
                    >
                      <v-icon x-large color="grey">mdi-arrow-right</v-icon>
                    </v-avatar>
                  </v-slide-x-reverse-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </section>

        <section class="my-6">
          <h3>Recently visited</h3>
          <NewArrivals :title="false" />
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  middleware: 'authentication',
  computed: {
      ...mapState({
          user: state => state.account.accountInfo.data
      })
  }
}
</script>

<style></style>
