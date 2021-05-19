//import Repository, { serializeQuery } from '~/repositories/Repository.js';
//import { baseUrl } from '~/repositories/Repository';
import { makeClient } from '@spree/storefront-api-v2-sdk'

const client = makeClient({ host: 'http://localhost:3000' });

export const state = () => ({
    product: null,
    //products: null,
    //searchResults: null,
    cartProducts: null
    //wishlistItems: null,
    //compareItems: null,
    //brands: null,
    //categories: null,
    //total: 0
});

export const mutations = {
    /*setProducts(state, payload) {
        state.products = payload;
    },*/
    setCartProducts(state, payload) {
        state.cartProducts = payload;
    },
    /*setWishlistItems(state, payload) {
        var products = null;
        if (payload !== null) {
            products = [];
            payload.included.forEach(item => {
                if (item.type === 'variant') {
                    item['image'] = payload.included.find(i => i.type === 'image' && i.attributes.viewable_id.toString() === item.id ).attributes.styles[2];
                    item.id = item.relationships.product.data.id;
                    item['title'] = item.attributes.name;
                    item['price'] = item.attributes.price;
                    products.push(item);
                };
            });
        }
        state.wishlistItems = products;
    },*/
    /*setCompareItems(state, payload) {
        state.compareItems = payload;
    },*/
    setProduct(state, payload) {
        state.product = payload;
    },
    /*setBrands(state, payload) {
        state.brands = payload;
    },
    setCategories(state, payload) {
        state.categories = payload;
    },
    setSearchResults(state, payload) {
        state.searchResults = payload;
    },
    setTotal(state, payload) {
        state.total = payload;
    },*/
    setProductCurrentVariant(state, payload) {
        state.product.currentVariant = payload;
    }
    /*setProductCurrentVariantColor(state, payload) {
        state.product.currentVariantColor = payload;
    },*/
    /*setProductCurrentVariantSizes(state, payload) {
        state.product.currentVariantSizes = payload;
    },*/
    /*setProductCurrentVariantLengths(state, payload) {
        state.product.currentVariantLengths = payload;
    }*/
};

export const actions = {
    /*async getProducts({ commit }, payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then(response => {
                commit('setProducts', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    /*async getTotalRecords({ commit }, payload) {
        const reponse = await Repository.get(`${baseUrl}/products/count`)
            .then(response => {
                commit('setTotal', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    async getProductsById({ commit }, payload) {
        const account = this.$cookies.get('account', { parseJSON: true });
        const response = await client.products.show(payload, { include: 'variants.images,variants.option_values' })
            .then(response => {
                const product = response.success().data;

                product.title = product.attributes.name;
                product.price = product.attributes.price;
                product.description = product.attributes.description;
                product['variants'] = [];
                response.success().included.forEach(item => {
                    if (item.type === 'variant') {
                        item['images'] = [];
                        item['options'] = {};
                        item['options']['color'] = {};
                        item['options']['size'] = {};
                        item['options']['length'] = {};
                        product.variants.push(item);
                    };
                });
                product['colors'] = [];
                product['sizes'] = [];
                product['lengths'] = [];
                response.success().included.forEach(item => {
                    if (item.type === 'image') {
                        product.variants.forEach(variant => {
                            if (item.attributes.viewable_id.toString() === variant.id) variant.images.push(item);
                        });
                    }
                });
                response.success().included.forEach(item => {
                    if (item.type === 'option_value') {
                        product.variants.forEach(variant => {
                            // Variants with no images will not display options therefore unable to be added to cart
                            if (variant.images.length) {
                                variant.relationships.option_values.data.forEach(option_value => {
                                    if (item.id === option_value.id) {
                                        var option = item.attributes;
                                        option.id = item.id;
                                        if (item.relationships.option_type.data.id === '1') {
                                            variant.options.color = option;
                                            if (!product.colors.includes(option)) product.colors.push(option);
                                        } else if (item.relationships.option_type.data.id === '2') {
                                            variant.options.length = option;
                                            if (!product.lengths.includes(option)) product.lengths.push(option);
                                        } else if (item.relationships.option_type.data.id === '3') {
                                            variant.options.size = option;
                                            if (!product.sizes.includes(option)) product.sizes.push(option);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });

                product.currentVariant = product.relationships.default_variant.data.id;
                commit('setProduct', product);
                return product;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },
    /*async getProductByKeyword({ commit }, payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then(response => {
                commit('setSearchResults', response.data);
                commit('setTotal', response.data.length);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    getCartProducts({ commit }, payload) {
        var products = null;
        if (payload !== null) {
            products = [];
            payload.forEach(item => {
                if (item.type === 'variant') {
                    const lineItem = payload.find(i => i.type === 'line_item' && i.relationships.variant.data.id === item.id);
                    const image = payload.find(i => i.type === 'image' && i.attributes.viewable_id.toString() === item.id )
                    item['image'] = image ? image.attributes.styles[2] : '';
                    item['lineItemId'] = lineItem.id;
                    item['id'] = item.relationships.product.data.id;
                    item['title'] = lineItem.attributes.name;
                    item['price'] = lineItem.attributes.price;
                    item['options'] = {};
                    item['options']['color'] = {};
                    item['options']['size'] = {};
                    item['options']['length'] = {};
                    products.push(item);
                };
            });
            payload.forEach(item => {
                if (item.type === 'option_value') {
                    products.forEach(variant => {
                        variant.relationships.option_values.data.forEach(option_value => {
                            if (item.id === option_value.id) {
                                var option = item.attributes;
                                option.id = item.id;
                                if (item.relationships.option_type.data.id === '1') {
                                    variant.options.color = option;
                                } else if (item.relationships.option_type.data.id === '2') {
                                    variant.options.length = option;
                                } else if (item.relationships.option_type.data.id === '3') {
                                    variant.options.size = option;
                                }
                            }
                        });
                    });
                }
            });
        }
        commit('setCartProducts', products);
    },
    /*async getWishlishtProducts({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `filter[ids=${item}`;
            } else {
                query = query + `,${item}`;
            }
        });
        query = query + ']';
        const reponse = await Repository.get(`${baseUrl}/api/v2/storefront/products?${query}&include=default_variant,images`)
            .then(response => {
                commit('setWishlistItems', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    /*async getCompareProducts({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `id=${item}`;
            } else {
                query = query + `&id=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/products?${query}`)
            .then(response => {
                commit('setCompareItems', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    /*async getProductBrands({ commit }) {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then(response => {
                commit('setBrands', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    /*async getProductCategories({ commit }) {
        const reponse = await Repository.get(`${baseUrl}/product-categories`)
            .then(response => {
                commit('setCategories', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    /*async getProductsByBrands({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then(response => {
                if (response.data) {
                    const brands = response.data;
                    let products = [];
                    brands.forEach(brand => {
                        brand.products.forEach(product => {
                            products.push(product);
                        });
                    });
                    commit('setProducts', products);
                    commit('setTotal', products.length);
                    return products;
                } else {
                    return null;
                }
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },*/
    /*async getProductsByPriceRange({ commit }, payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then(response => {
                commit('setProducts', response.data);
                commit('setSearchResults', response.data);
                commit('setTotal', response.data.length);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }*/
};
