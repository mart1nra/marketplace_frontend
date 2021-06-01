<template>
  <section
    class="bg-blue-footer"
    :class="this.$route.path != '/' ? 'mt-12' : ''"
  >
    <div class="mx-auto" style="max-width: 1400px">
      <v-container class="container container--fluid">
        <v-row>
          <v-col cols="12" md="4">
            <div>
              <div class="d-flex align-center">
                <v-img
                  alt="Vuetify Logo"
                  src="/v.png"
                  max-width="65"
                  class="mb-5"
                  contain
                />
                <span class="title white--text"
                  >Nueva
                  <span class="font-weight-light">Tienda</span></span
                >
              </div>
              <h3
                class="text-body-1 font-weight-regular mb-4 white--text text-uppercase"
              >
                Theme for Vuetify
              </h3>
              <p class="text-body-1 grey--text mt-4 mb-6 pr-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                et quos quas maxime odio provident quod illo animi nisi
                suscipit, cum soluta. Iste unde distinctio dignissimos in
                eveniet! Officiis, iste!
              </p>
              <v-btn color="primary" class="py-5">Buy now</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-container class="pa-0">
              <v-row class="justify-center">
                <v-col cols="12">
                  <h3
                    class="text-uppercase text-h6 font-weight-bold mb-1 white--text"
                  >
                    Customer Service
                  </h3>
                  <v-divider
                    class="primary mr-auto mb-6"
                    style="max-width: 50%"
                  ></v-divider>
                  <div class="text-body-1 grey--text text--lighten-1 mb-6">
                    <div class="grey--text text-body-1 d-block mb-5">
                      Payment Methods
                    </div>
                    <div class="grey--text text-body-1 d-block mb-5">
                      Returns
                    </div>
                    <div class="grey--text text-body-1 d-block mb-5">
                      Shipping
                    </div>
                    <div class="grey--text text-body-1 d-block mb-5">
                      Terms and conditions
                    </div>
                    <div class="grey--text text-body-1 d-block mb-5">
                      Privacy Policy
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" md="4">
            <v-container class="pa-0">
              <v-row class="justify-center">
                <v-col cols="12">
                  <h3
                    class="text-uppercase text-h6 font-weight-bold mb-1 white--text"
                  >
                    Contact Us
                  </h3>
                  <v-divider
                    class="primary mr-auto"
                    style="max-width: 50%"
                  ></v-divider>
                  <div>
                    <div class="pt-2 mb-0 d-flex justify-start align-center">
                      <v-avatar color="transparent" size="72">
                        <v-icon size="36" dark>mdi-map-marker-outline</v-icon>
                      </v-avatar>
                      <div class="text-body-1 grey--text text--lighten-1">
                        <div>4932 College Street, <br />PHILIPSBURG</div>
                      </div>
                    </div>
                    <v-divider class="my-2" dark></v-divider>
                    <div class="pt-2 mb-0 d-flex justify-start align-center">
                      <v-avatar color="transparent" size="72">
                        <v-icon size="36" dark>mdi-phone-forward</v-icon>
                      </v-avatar>
                      <div class="text-body-1 grey--text text--lighten-1">
                        <div>404-385-7987</div>
                      </div>
                    </div>
                    <v-divider class="my-2" dark></v-divider>
                    <div class="pt-2 mb-0 d-flex justify-start align-center">
                      <v-avatar color="transparent" size="72">
                        <v-icon size="36" dark>mdi-email</v-icon>
                      </v-avatar>
                      <div class="text-body-1 grey--text text--lighten-1">
                        <div>john@vuetifyjs.com</div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>
