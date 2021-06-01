<template>
  <v-window v-model="window" continuous>
    <v-window-item v-for="(url, i) in images" :key="i">
      <v-hover v-slot="{ hover }">
        <v-card class="elevation-cs-2" height="640">
          <v-img :src="url" width="100%" height="100%" cover>
            <v-fade-transition>
              <div
                v-if="hover"
                class="fill-height w-100 white--text d-grid text-center align-center"
                @mouseenter="autorun = false"
                @mouseleave="autorun = true"
              >
                <div class="align-self-center flex-column">
                  <h1 class="mb-6" v-text="`SteelSeries Headset`"></h1>
                  <span class="headline"
                    >199$ <v-icon color="white">mdi-minus</v-icon></span
                  >

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
          </v-img>
        </v-card>
      </v-hover>
    </v-window-item>
  </v-window>
</template>

<script>
export default {
  data() {
    return {
      window: 0,
      autorun: true,
      images: [
        require('~/assets/img/ss_1.jpg'),
        require('~/assets/img/ss_2.jpg'),
        require('~/assets/img/ss_3.jpg'),
      ],
    }
  },
  created() {
    setInterval(() => {
      if (!this.autorun) return
      if (++this.window >= this.length) this.window = 0
    }, 5000)
  },
}
</script>

<style></style>
