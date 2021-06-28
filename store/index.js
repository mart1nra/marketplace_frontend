export const actions = {
    async nuxtServerInit({ commit, dispatch }) {
        const auth = this.$cookies.get('auth', { parseJSON: true });
        const accountInfo = this.$cookies.get('account', { parseJSON: true });
        var cartItems = this.$cookies.get('cart', { parseJSON: true });

        if (auth) {
            commit('auth/setSignedIn', Boolean(auth.signedIn));
        }
        if (accountInfo) {
            commit('account/setAccountInfo', accountInfo);
        }
        if (cartItems && cartItems.cartItems.length > 0) {
            commit('cart/initCart', {
                cartItems: cartItems.cartItems,
                total: cartItems.total,
                amount: cartItems.amount
            });
            cartItems = await dispatch('cart/getCartInfo');
            dispatch('product/getCartProducts', cartItems);
        }

        const preferenceId = await dispatch('payment/getMercadoPago');

        if (preferenceId) {
            commit('payment/setMercadoPago', preferenceId);
        }

        dispatch('product/getProductsOptions');
    }
};
