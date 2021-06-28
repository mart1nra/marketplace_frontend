import TEST_ACCESS_TOKEN from '~/store/constants';

const mercadopago = require ('mercadopago');

export const state = () => ({
  preferenceId: null
});

export const mutations = {
  setMercadoPago(state, payload) {
    state.preferenceId = payload;
  }
};

export const actions = {
  async getMercadoPago({ state, commit, rootState }) {
    if (rootState.cart.cartItems.length > 0) {
      mercadopago.configure({
        access_token: 'TEST-3927063282529235-050216-a2eee5703207e87b599b09c34cf7c123-752775534'
      });

      const cartInfo = {
        total: rootState.cart.total,
        amount: rootState.cart.amount,
        cartItems: rootState.cart.cartItems
      }

      let preference = { items: [] };

      cartInfo.cartItems.forEach(cartItem => {
        const item = {};

        item.title = cartItem.name;
        item.unit_price = parseFloat(cartItem.price);
        item.quantity = cartItem.quantity;

        preference.items.push(item);
      });

      const res = await mercadopago.preferences.create(preference)
      .then(function(response) {
        return response.body.id;
      }).catch(function(error) {
        console.log(error);
      });
      return res;
    }
  }
};