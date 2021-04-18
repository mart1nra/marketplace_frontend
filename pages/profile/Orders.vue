<template>
  <v-container class="ml-md-16">
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text">My Orders</h2>
        <v-divider class="my-3"></v-divider>
        <v-text-field
          solo
          class="mt-6 elevation-cs"
          flat
          label="Search order"
          append-icon="mdi-magnify"
          hide-details
        >
        </v-text-field>
        <v-container>
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

                    <div class="mx-0 mx-md-12">
                      <div
                        class="align-baseline align-center d-flex flex-column flex-column-reverse flex-md-row"
                      >
                        <h3 class="font-weight-bold primary--text">
                          Apple MacBook Air (2020)
                        </h3>
                        <v-chip
                          class="text-uppercase mx-0 mx-md-4 mb-2 mb-md-0 font-weight-bold white--text"
                          :color="i % 2 ? 'success' : 'red'"
                          small
                          v-text="i % 2 ? 'Delivered' : 'Canceled'"
                        ></v-chip>
                      </div>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Recusandae, deleniti..
                      </p>
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
            <div class="text-center">
              <v-btn text color="primary" class="my-4"
                >Show more <v-icon right>mdi-chevron-double-down</v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authentication'
}
</script>
