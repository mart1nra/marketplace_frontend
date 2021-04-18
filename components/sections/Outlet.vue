<template>
  <div class="my-12">
    <h2 class="text-center display-1 font-weight-light">Deals & Outlet</h2>
    <v-container no-gutters class="mb-12 mt-9">
      <v-row align="center" justify="center">
        <v-hover v-slot="{ hover }">
          <v-col cols="12" sm="6" md="6" lg="6" xl="6">
            <v-img
              :src="require('~/assets/img/deal_2.jpg')"
              width="100%"
              height="365"
              class="rounded elevation-cs"
            >
              <v-fade-transition>
                <div
                  v-if="hover"
                  class="fill-height w-100 gradient-dark white--text d-grid text-center align-center"
                >
                  <div class="align-self-center flex-column">
                    <h1 class="mb-6" v-text="`Wireless Charger`"></h1>
                    <v-btn
                      color="primary"
                      class="rounded-pill"
                      style="width: max-content"
                      to="/product/1"
                      ><span>Shop Now</span>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-fade-transition>
              <v-row align="start" justify="start" class="fill-height">
                <Countdown :end-date="date2" class="ma-3" />
              </v-row>
            </v-img>
            <div
              class="d-flex align-center justify-space-between py-2"
              :class="$vuetify.breakpoint.mdAndUp ? 'px-2' : 'px-0'"
            >
              <div
                class="font-weight-bold body-1"
                :class="$vuetify.breakpoint.mdAndDown ? 'd-grid' : 'd-flex'"
              >
                Wireless Charger - iPhone
                <Stars :class="$vuetify.breakpoint.mdAndUp ? 'mx-3' : ''" />
              </div>

              <div class="font-weight-regular fs-larger primary--text">49$</div>
            </div>
          </v-col>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <v-col cols="12" sm="6" md="6" lg="6" xl="6">
            <v-img
              :src="require('~/assets/img/deal_1.jpg')"
              width="100%"
              height="365"
              class="rounded elevation-cs"
            >
              <v-fade-transition>
                <div
                  v-if="hover"
                  class="fill-height w-100 gradient-dark white--text d-grid text-center align-center"
                >
                  <div class="align-self-center flex-column">
                    <h1
                      class="mb-6"
                      v-text="`Google Home - Smart Speaker`"
                    ></h1>
                    <v-btn
                      color="primary"
                      class="rounded-pill"
                      style="width: max-content"
                      to="/product/1"
                      ><span>Shop Now</span>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-fade-transition>
              <v-row align="start" justify="end" class="fill-height">
                <Countdown :end-date="date" class="ma-3" />
              </v-row>
            </v-img>
            <div
              class="d-flex align-center justify-space-between py-2"
              :class="$vuetify.breakpoint.mdAndUp ? 'px-4' : 'px-0'"
            >
              <div
                class="font-weight-bold body-1"
                :class="$vuetify.breakpoint.mdAndDown ? 'd-grid' : 'd-flex'"
              >
                Google Home - Smart Speaker
                <Stars :class="$vuetify.breakpoint.mdAndUp ? 'mx-3' : ''" />
              </div>

              <div class="font-weight-regular fs-larger primary--text">87$</div>
            </div>
          </v-col>
        </v-hover>
        <v-btn
          outlined
          style="width: 300px !important"
          rounded
          color="primary"
          class="mt-6 mb-2"
          >More Outlet Deals
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Outlet',
  data() {
    return {
      date: null,
      date2: null,
    }
  },
  mounted() {
    var date = new Date()
    var date2 = new Date()

    date.setHours(date2.getHours() + 12)
    date2.setHours(date2.getHours() + 4)

    this.date = date
    this.date2 = date2
  },
}
</script>
