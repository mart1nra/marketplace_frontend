import { baseUrl } from '~/store/repository';
import { makeClient } from '@spree/storefront-api-v2-sdk'

const client = makeClient({ host: baseUrl });

const calculateAmount = obj =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

export const state = () => ({
    total: 0,
    amount: 0,
    cartItems: [],
    state: '',
    loading: false,
    drawerOn: null,
    drawerAddItemOn: null,
    editOn: null
});

export const mutations = {
    initCart(state, payload) {
        state.cartItems = payload.cartItems;
        state.amount = payload.amount;
        state.total = payload.total;
    },
    setCart(state, payload) {
        const items = [];
        for (var i of payload.included) {
            if (i.type === 'line_item') {
                const item = { id: '', quantity: 0, price: 0 };
                item.id = i.id;
                item.quantity = i.attributes.quantity;
                item.price = i.attributes.price;
                item.total = i.attributes.total;
                item.variant_id = i.relationships.variant.data.id;
                items.push(item);
            }
        }
        state.cartItems = items;
        state.amount = payload.data.attributes.item_total;
        state.total = payload.data.attributes.item_count;

        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },
    setState(state, payload) {
        state.state = payload;
    },
    setDrawerOn(state, payload) {
        state.drawerOn = payload;
    },
    setDrawerAddItemOn(state, payload) {
        state.drawerAddItemOn = payload;
    },
    setEditOn(state, payload) {
        state.editOn = payload;
    }
    /*setLoading(state, payload) {
        state.loading = payload;
    },*/
};

export const actions = {
    async getCartInfo({ commit, state }) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.cart.create({ bearerToken: account.token }, { include: 'line_items,variants,variants.images,variants.option_values,vendors' })
            .then(response => {
                const cartInfo = response.success();
                commit('setCart', cartInfo);
                commit('setState', cartInfo.data.attributes.state);
                return cartInfo.included;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },
    async addProductToCart({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.cart.addItem({ bearerToken: account.token }, { variant_id: payload.variant_id, quantity: payload.quantity, include: 'line_items,variants,variants.images,variants.option_values,vendors' })
            .then(response => {
                const cartInfo = response.success();
                commit('setCart', cartInfo);
                return cartInfo.included;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;

    },
    async removeProductFromCart({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.cart.removeItem({ bearerToken: account.token }, payload, { include: 'line_items,variants,variants.images,variants.option_values,vendors' })
            .then(response => {
                const cartInfo = response.success();

                // Returned cart after remove an item includes removed item, so it needs to be removed from the cart
                var removeIndex = cartInfo.included.map(function(item) { return item.id; }).indexOf(payload);
                cartInfo.included.splice(removeIndex, 1);

                commit('setCart', cartInfo);
                return cartInfo.included;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },
    async setCartItemQuantity({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.cart.setQuantity({ bearerToken: account.token }, { line_item_id: payload.line_item_id, quantity: payload.quantity, include: 'line_items,variants,variants.images,variants.option_values' })
            .then(response => {
                const cartInfo = response.success();
                commit('setCart', cartInfo);
                return 'Ok';
            })
            .catch(error => {
                return 'Error';
            });
        return response;
    },
    async processCart({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        /*const response = await client.checkout.orderNext({ bearerToken: account.token })
            .then(response => {
                const cartState = response.success().data.attributes.state;
                commit('setState', cartState)
                return cartState;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;*/
        if (state.state === 'cart') {
            await client.checkout.orderNext({ bearerToken: account.token });
            commit('setState', 'address');
        }
    },
    async processShipping({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        //const response = await client.account.addressesList({ bearerToken: account.token })
        /*const response = await client.account.createAddress({ bearerToken: account.token }, {
          address: {
            firstname: payload.firstname,
            lastname: payload.lastname,
            address1: payload.address1,
            address2: payload.address2,
            city: payload.city,
            phone: payload.phone,
            zipcode: payload.zipcode,
            state_name: payload.state_name,
            country_iso: 'AR'
          }
        })*/
        const response = await client.checkout.orderUpdate({ bearerToken: account.token }, {
          order: {
            bill_address_attributes: {
                firstname: payload.firstname,
                lastname: payload.lastname,
                address1: payload.address1,
                address2: payload.address2,
                city: payload.city,
                phone: payload.phone,
                zipcode: payload.zipcode,
                state_name: payload.state_name,
                country_iso: 'AR'
            },
            ship_address_attributes: {
                firstname: payload.firstname,
                lastname: payload.lastname,
                address1: payload.address1,
                address2: payload.address2,
                city: payload.city,
                phone: payload.phone,
                zipcode: payload.zipcode,
                state_name: payload.state_name,
                country_iso: 'AR'
            }
          }
        });

        const shipping = (await client.checkout.shippingMethods({ bearerToken: account.token })).success();
        if (state.state === 'address') {
            await client.checkout.orderNext({ bearerToken: account.token });
            commit('setState', 'delivery');
        }
    },
    async processPayment({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        /*const response = await client.checkout.orderNext({ bearerToken: account.token })
            .then(response => {
                const cartState = response.success().data.attributes.state;
                commit('setState', cartState)
                return cartState;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;*/
        const payment = (await client.checkout.paymentMethods({ bearerToken: account.token })).success();
        await client.checkout.orderUpdate({ bearerToken: account.token }, {
          order: {
            payments_attributes: [{
              payment_method_id: payment.data[0].id
            }]
          }
        })
        if (state.state === 'delivery') {
            await client.checkout.orderNext({ bearerToken: account.token });
            commit('setState', 'payment');
        }
    },
    async processCheckout({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        /*const response = await client.checkout.orderNext({ bearerToken: account.token })
            .then(response => {
                const cartState = response.success().data.attributes.state;
                commit('setState', cartState)
                return cartState;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;*/
        if (state.state === 'payment') {
            await client.checkout.orderNext({ bearerToken: account.token });
        }
    }
};
