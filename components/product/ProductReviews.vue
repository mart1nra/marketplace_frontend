<template>
  <v-container>
    <v-row
      v-for="(review, i) in reviews"
      :key="i"
      align="start"
      justify-md="center"
      justify-sm="start"
      class="mb-4 mb-sm-0"
    >
      <v-col cols="12" lg="3" xl="2">
        <div class="d-flex align-center">
          <v-avatar color="primary" size="60">
            <v-img v-if="reviews && review.image" :src="review.image"></v-img>
          </v-avatar>
          <div class="px-3 font-weight-medium primary--text">
            {{ review.name }}
            <div class="caption grey--text">{{ review.date }}</div>
            <Stars :details="false" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="9" xl="10">
        <div>
          <h3>{{ review.title }}</h3>
          <p class="mb-1">
            {{ review.text }}
          </p>
          <v-btn text>
            <v-icon
              left
              :color="review.has_upvoted ? 'success' : 'grey'"
              v-text="
                review.has_upvoted ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
              "
            ></v-icon>
            <span
              :class="
                review.has_upvoted
                  ? 'font-weight-bold success--text'
                  : 'grey--text'
              "
              >{{ review.upvotes }}</span
            >
          </v-btn>
          <v-btn text>
            <v-icon left color="grey">mdi-thumb-down-outline</v-icon
            ><span class="grey--text">{{ review.downvotes }}</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      reviews: [
        {
          name: 'Alex',
          title: 'Very fast and clean look',
          text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            dignissimos adipisci officiis exercitationem quam error reiciendis
            repellendus suscipit. Blanditiis enim qui atque corporis labore
            illum, maiores quos consequuntur sint nostrum?`,
          upvotes: 3,
          downvotes: 0,
          has_upvoted: true,
          date: '11/7/2020',
          email: 'alex@vuetifyjs.com',
          verified: true,
          image: require('~/assets/img/person_1.jpg'),
        },
        {
          name: 'Matt',
          title: 'Very good',
          text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            dignissimos adipisci officiis exercitationem quam error.`,
          upvotes: 1,
          downvotes: 0,
          has_upvoted: false,
          date: '13/05/2020',
          email: 'Matt@vuetifyjs.com',
          verified: true,
          image: require('~/assets/img/person_2.jpg'),
        },
      ],
    }
  },
}
</script>
