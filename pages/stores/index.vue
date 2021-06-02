<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <v-row v-for="(vendorItem, i) in allVendors" :key="i">
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <div class="d-flex text-h5 font-weight-medium justify-space-between">
            {{ vendorItem[0] }}
          </div>

          <v-divider></v-divider>
          <!--  -->
          <v-progress-circular
            v-if="loading"
            class="w-100 text-center my-12"
            indeterminate
            color="primary"
          >
          </v-progress-circular>
          <v-row v-if="!loading && allVendors" align="center">
            <v-col v-for="(vendor, i) in vendorItem[1]" :key="i"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="3"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  :class="{ 'elevation-cs': hover }"
                  class="pa-4 mx-auto"
                  width="250"
                  height="auto"
                  flat
                  hover
                  tile
                  color="transparent"
                  :to="`/stores/${vendor.slug}`"
                >
                  <v-img height="125" width="100%" contain :src="vendor.image">
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <div
                    class="px-0 text-subtitle-1 text-center mt-2"
                    :class="{ 'primary--text': hover }"
                    v-text="vendor.title"
                  />
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    allVendors: [],
    loading: false
  }),
  async fetch() {
    this.loading = true

    const response = await fetch(`http://localhost:8000/vendors.json`)
      .then((response) => response.json())
      .finally(() => (this.loading = false))
      .catch((error) => {
        console.log(error)
      })

    if (response) {
      var vendors = {}

      response.forEach(vendor => {
        if (!vendors[vendor.title[0].toUpperCase()]) {
          vendors[vendor.title[0].toUpperCase()] = [];
        }
        vendors[vendor.title[0].toUpperCase()].push(vendor);
      });

      this.allVendors = Object.entries(vendors);
      this.allVendors.join();
      this.allVendors.sort();
    }
  }
}
</script>
