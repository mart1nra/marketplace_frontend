<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12" xl="9">
          <v-sheet width="100%" class="my-4">
            <FeaturedCarousel />
          </v-sheet>
          <v-container no-gutters>
            <v-row>
              <v-col cols="12" sm="6" md="5" lg="5" xl="4">
                <ProductCard />
              </v-col>
              <v-col cols="12" sm="6" md="7" lg="7" xl="8">
                <ProductCard2 />
              </v-col>
            </v-row>
            <Pros />
            <v-divider class="my-6"></v-divider>
          </v-container>
          <PopularCategories />
          <ProductsRow />
          <Sponsor />
          <NewArrivals />
          <Outlet />
        </v-col>
      </v-row>
    </v-container>
    <Subscribe />
    <Footer />
  </div>
</template>
