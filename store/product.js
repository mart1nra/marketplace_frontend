import repository, { serializeQuery } from '~/store/repository.js';
import { baseUrl } from '~/store/repository';
import { makeClient } from '@spree/storefront-api-v2-sdk'

const client = makeClient({ host: 'http://localhost:3000' });

const COLOR_TYPE = "1";
const SIZE_TYPE = "2";
const LENGTH_TYPE = "3";
const PRODUCTS_PER_PAGE = 9;

export const state = () => ({
    product: null,
    products: null,
    //searchResults: null,
    cartProducts: null,
    //wishlistItems: null,
    //compareItems: null,
    //brands: null,
    //categories: null,
    totalCount: 0,
    totalPages: 0,
    prevPageUrl: '',
    selfPageUrl: '',
    nextPageUrl: '',
    loading: false
});

export const mutations = {
    setProducts(state, payload) {
        const data = payload.data ? payload.data.data : payload.success().data;
        const included = payload.data ? payload.data.included : payload.success().included;
        const meta = payload.data ? payload.data.meta : payload.success().meta;
        const links = payload.data ? payload.data.links : payload.success().links;
        const products = [];

        data.forEach(p => {
            var product = {};
            product.id = p.id;
            product.title = p.attributes.name;
            product.price = p.attributes.price;
            product.images = [];

            if (p.relationships.images.data.length > 0) {
                p.relationships.images.data.forEach(image => {
                    product.images.push(baseUrl + included.find(i => i.type === 'image' && i.id === image.id).attributes.styles[4].url);
                })
            }
            products.push(product);
        });

        state.products = products;
        state.totalCount = meta.total_count;
        state.totalPages = meta.total_pages;
        state.prevPageUrl = links.prev;
        state.selfPageUrl = links.self;
        state.nextPageUrl = links.next;
    },
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
    setProductCurrentVariant(state, payload) {
        state.product.currentVariant = payload;
    },
    /*setBrands(state, payload) {
        state.brands = payload;
    },
    setCategories(state, payload) {
        state.categories = payload;
    },
    setSearchResults(state, payload) {
        state.searchResults = payload;
    },*/
    setTotalCount(state, payload) {
        state.totalCount = payload;
    },
    setTotalPages(state, payload) {
        state.totalPages = payload;
    },
    setPrevPageUrl(state, payload) {
        state.prevPageUrl = payload;
    },
    setSelfPageUrl(state, payload) {
        state.selfPageUrl = payload;
    },
    setNextPageUrl(state, payload) {
        state.nextPageUrl = payload;
    },
    /*setProductCurrentVariantColor(state, payload) {
        state.product.currentVariantColor = payload;
    },*/
    /*setProductCurrentVariantSizes(state, payload) {
        state.product.currentVariantSizes = payload;
    },*/
    /*setProductCurrentVariantLengths(state, payload) {
        state.product.currentVariantLengths = payload;
    }*/
    setLoading(state, payload) {
        state.loading = payload;
    },
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
        const response = await client.products.show(payload, { include: 'variants.images,variants.option_values' })
            .then(response => {
                const product = {};
                product.title = response.success().data.attributes.name;
                product.price = response.success().data.attributes.price;
                product.description = response.success().data.attributes.description;
                product.variants = [];
                product.colors = [];
                product.sizes = [];
                product.lengths = [];

                response.success().data.relationships.variants.data.forEach(v => {
                    var item_variant = response.success().included.find(i => i.type === 'variant' && i.id === v.id);
                    var variant = {};
                    variant.id = item_variant.id;
                    variant.attributes = item_variant.attributes;
                    variant.images = [];
                    variant.options = {};
                    
                    if (item_variant.relationships.images.data.length > 0) {
                        item_variant.relationships.images.data.forEach(image => {
                            variant.images.push(baseUrl + response.success().included.find(i => i.type === 'image' && i.id === image.id).attributes.styles[4].url);
                        });
                    }
                    if (item_variant.relationships.option_values.data.length > 0) {
                        item_variant.relationships.option_values.data.forEach(ov => {
                            var item_option = response.success().included.find(i => i.type === 'option_value' && i.id === ov.id);
                            var option = {};
                            option.id = item_option.id;
                            option = item_option.attributes;

                            if (item_option.relationships.option_type.data.id === COLOR_TYPE) {
                                variant.options.color = option;
                                if (!product.colors.includes(option)) product.colors.push(option);
                            } else if (item_option.relationships.option_type.data.id === SIZE_TYPE) {
                                variant.options.size = option;
                                if (!product.sizes.includes(option)) product.sizes.push(option);
                            } else if (item_option.relationships.option_type.data.id === LENGTH_TYPE) {
                                variant.options.length = option;
                                if (!product.sizes.includes(option)) product.lengths.push(option);
                            }
                        });
                    }
                    product.variants.push(variant);
                });

                product.currentVariant = product.variants[0].id;
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
                    item['image'] = image ? baseUrl + image.attributes.styles[2].url : '';
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
    async getProductsByVendor({ commit }, payload) {
        commit('setLoading', true);

        const response = await client.products.list({ filter: { ['vendor_ids']: payload }, 'per_page': PRODUCTS_PER_PAGE, include: 'images' })
            .then(response => {
                commit('setProducts', response);
                commit('setLoading', false);
                return response.success();
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },
    async getProductsByPage({ commit, state }, payload) {
        commit('setLoading', true);

        const response = await repository.get(`${state.selfPageUrl}&page=${payload}`)
            .then(response => {
                commit('setProducts', response);
                commit('setLoading', false);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;        
    },
    async getProductsBySort({ commit, state }, payload) {
        commit('setLoading', true);

        const response = await repository.get(`${baseUrl}/api/v2/storefront/products?filter${payload.filter}&sort=${payload.sort}&per_page=${PRODUCTS_PER_PAGE}&include=images`)
            .then(response => {
                commit('setProducts', response);
                commit('setLoading', false);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;        
    }
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
