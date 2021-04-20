import { makeClient } from '@spree/storefront-api-v2-sdk'

const client = makeClient({ host: 'http://localhost:3000' });

/*const calculateAmount = obj =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);*/

export const state = () => ({
    total: 0,
    amount: 0,
    cartItems: [],
    state: '',
    loading: false,
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
    /*setLoading(state, payload) {
        state.loading = payload;
    },*/
    /*increaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem) {
            selectedItem.quantity++;
            state.total++;
            state.amount = calculateAmount(state.cartItems);
        }
    },*/
    /*decreaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem && selectedItem.quantity > 1) {
            selectedItem.quantity--;
            state.total--;
            state.amount = calculateAmount(state.cartItems);
        }
    }*/
};

export const actions = {
    async getCartInfo({ commit, state }) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.cart.create({ bearerToken: account.token }, { include: 'line_items,variants,variants.images,variants.option_values' })
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
        const response = await client.cart.addItem({ bearerToken: account.token }, { variant_id: payload.variant_id, quantity: payload.quantity, include: 'line_items,variants,variants.images,variants.option_values' })
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
        const response = await client.cart.removeItem({ bearerToken: account.token }, payload.id, { include: 'line_items,variants,variants.images,variants.option_values' })
            .then(response => {
                const cartInfo = response.success();
                commit('setCart', cartInfo);
                return cartInfo.included;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },
    /*increaseCartItemQuantity({ commit, state }, payload) {
        commit('increaseItemQuantity', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },*/
    /*decreaseCartItemQuantity({ commit, state }, payload) {
        commit('decreaseItemQuantity', payload)
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },*/
    /*async checkoutOrder({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        await client.checkout.orderUpdate({ bearerToken: account.token }, {
          order: {
            ship_address_attributes: {
                firstname: 'Sung Hil',
                lastname: 'Ra',
                address1: 'Av. Varala 165 6B',
                city: 'CABA',
                phone: '1162683203',
                zipcode: '1406',
                state_name: 'C',
                country_iso: 'AR'
            }
          }
        })
        const shipping = (await client.checkout.shippingMethods(
            { bearerToken: account.token },
            { include: 'shipping_rates,stock_location' }
        )).success();
        const payment = (await client.checkout.paymentMethods({ bearerToken: account.token })).success()
        console.log(shipping);
        console.log(payment);
    },*/
    /*async continueCheckout({ commit, state }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.checkout.orderNext({ bearerToken: account.token })
            .then(response => {
                const cartState = response.success().data.attributes.state;
                commit('setState', cartState)
                return cartState;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;       
    }*/
};
