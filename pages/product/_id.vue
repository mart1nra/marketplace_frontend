<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="10" xl="10">
        <v-container class="py-12">
          <v-row :justify="$vuetify.breakpoint.smAndDown ? 'center' : ''">
            <v-col cols="12" md="12" lg="7" xl="6">
              <div
                class="d-flex flex-column-reverse flex-lg-column-reverse flex-md-row flex-xl-row"
              >
                <div
                  class="d-flex flex-lg-row flex-md-column flex-xl-column justify-center justify-md-space-around"
                >
                  <div v-for="(image, i) in 5" :key="i" class="ma-3">
                    <v-img
                      :src="require(`~/assets/img/laptop/${i}.jpg`)"
                      height="50"
                      width="50"
                      contain
                      class="rounded mx-auto cursor-pointer"
                      @mouseenter="selectedImage = i"
                    ></v-img>
                  </div>
                </div>

                <v-img
                  max-height="390px"
                  max-width="580px"
                  :src="require(`~/assets/img/laptop/${selectedImage}.jpg`)"
                  class="rounded mx-4"
                  :class="$vuetify.breakpoint.smOnly ? 'mx-auto' : ''"
                  contain
                />
              </div>
            </v-col>
            <v-col cols="12" md="12" lg="5" xl="6">
              <h2>{{ product.title }}</h2>
              <Stars :size="20" />
              <h2 class="font-weight-bold">{{ product.price }}$</h2>
              <p class="font-weight-light mt-3 mb-8">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorem deleniti maiores repudiandae possimus eos explicabo quam
                accusantium saepe magni qui enim eaque, suscipit sed quos quo
                accusamus ducimus iusto impedit alias doloremque eius
                voluptatum, nulla veritatis? In sint nemo rem!
              </p>
              <v-text-field
                v-model="quantity"
                outlined
                dense
                label="Quantity"
                :style="$vuetify.breakpoint.smAndUp ? 'max-width: 150px' : ''"
              >
                <template #prepend>
                  <v-icon
                    color="primary"
                    class="cursor-pointer"
                    @click="quantity--"
                    >mdi-minus</v-icon
                  >
                </template>

                <template #append-outer>
                  <v-icon
                    color="primary"
                    class="cursor-pointer"
                    @click="quantity++"
                    >mdi-plus</v-icon
                  >
                </template>
              </v-text-field>

              <v-row align="center">
                <v-col cols="12" sm="8" md="8" lg="6" xl="6">
                  <v-btn color="primary" block
                    >Add to Cart <v-icon right small>mdi-cart</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="6" xl="6">
                  <v-btn
                    color="grey lighten-1"
                    outlined
                    block
                    @click="wishlist = !wishlist"
                    ><span class="grey--text">Add to Wishlist</span>
                    <v-icon
                      right
                      color="red"
                      v-text="wishlist ? 'mdi-heart' : 'mdi-heart-outline'"
                    ></v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <!-- add to cart - wishlist -->
              <v-divider class="mt-4 py-1"></v-divider>
              <div
                class="d-flex flex-column flex-sm-row justify-sm-space-between"
              >
                <v-chip-group show-arrows>
                  <v-chip
                    v-for="tag in product.tags"
                    :key="tag"
                    active
                    active-class="primary--text"
                    small
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
                <div class="d-flex align-center justify-start">
                  Share:
                  <Socials />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" class="my-12">
            <v-col cols="12" class="elevation-cs-2 no-gutters">
              <v-card flat>
                <v-tabs v-model="tabs" grow show-arrows>
                  <v-tab href="#tabs-1" class="primary--text">
                    Description
                  </v-tab>

                  <v-tab href="#tabs-2" class="primary--text">
                    Specifications
                  </v-tab>

                  <v-tab href="#tabs-3" class="primary--text"> Reviews </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs">
                  <v-tab-item v-for="i in 3" :key="i" :value="'tabs-' + i">
                    <v-card flat>
                      <v-card-text v-if="i == 1">
                        <h3 class="py-2">Product Description</h3>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Enim nostrum corporis ut quasi et suscipit odit
                          eligendi beatae? Expedita perferendis distinctio
                          exercitationem magni itaque dolores consectetur minus
                          pariatur autem! Eius voluptas nisi ea facilis itaque
                          reprehenderit molestias alias molestiae, eligendi
                          nihil dignissimos aliquam quis, eos recusandae
                          corporis rerum pariatur voluptatum! Quidem veritatis
                          dolorem dolor nesciunt voluptatem tempore vero,
                          corrupti molestias dignissimos ea nostrum amet nemo
                          autem soluta necessitatibus ullam? Id, consequuntur
                          iste. Rem corporis incidunt, iusto quam pariatur,
                          debitis eos eligendi, nesciunt asperiores esse cumque
                          sapiente eius aliquam eaque! Quasi porro harum
                          suscipit animi explicabo provident? Vitae asperiores
                          tempore reiciendis?
                        </p>
                        <ul class="pb-2">
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Corrupti, at?
                        </p>
                      </v-card-text>
                      <v-card-text v-if="i == 2">
                        <h3 class="py-2">Specifications</h3>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Enim nostrum corporis ut quasi et suscipit odit
                          eligendi beatae? Expedita perferendis distinctio
                          exercitationem magni itaque dolores consectetur minus
                          pariatur autem! Eius voluptas nisi ea facilis itaque
                          reprehenderit.
                        </p>
                        <SpecsTable />
                      </v-card-text>
                      <v-card-text v-if="i == 3">
                        <ProductReviews />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" class="my-12">
            <v-col cols="12">
              <div>
                <h2 class="font-weight-regular text-center">
                  You might also like...
                </h2>
              </div>
              <NewArrivals :title="false" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabs: 'tabs-2',
      wishlist: false,
      quantity: 1,
      selectedImage: 0,
      product: {
        title: 'Apple MacBook Air (2020)',
        price: 799,
        tags: ['Laptop', 'Electronics', 'Popular'],
      },
    }
  },
  watch: {
    quantity(val) {
      if (--val <= 0) this.quantity = 1
    },
  },
}
</script>
