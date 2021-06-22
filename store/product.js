import repository, { serializeQuery } from '~/store/repository';
import { baseUrl, frontendUrl, apiEndpointV1 } from '~/store/repository';
import { makeClient } from '@spree/storefront-api-v2-sdk'
import * as emptyImageUrl from '~/assets/img/product-coming-soon.jpg'
import { COLOR_TYPE, SIZE_TYPE, LENGTH_TYPE, PRODUCTS_PER_PAGE } from '~/store/constants';

const client = makeClient({ host: baseUrl });

export const state = () => ({
    product: null,
    products: null,
    cartProduct: null,
    cartProducts: null,
    totalCount: 0,
    totalPages: 0,
    selfPageUrl: '',
    productImagesByColor: {},
    productsColors: [],
    productsSizes: [],
    productsLengths: [],
    currentFilters: [],
    emptyImage: emptyImageUrl,
    breadcrumbs: [],
    loading: false
    //searchResults: null,
    //wishlistItems: null,
    //compareItems: null,
    //brands: null,
    //categories: null
});

export const mutations = {
    setProduct(state, payload) {
        const data = payload.success().data;
        const included = payload.success().included;

        const product = {};
        product.title = data.attributes.name;
        product.price = data.attributes.price;
        product.description = data.attributes.description;
        product.slug = data.attributes.slug;
        product.variants = [];
        product.images = [];
        product.colors = [];
        product.sizes = [];
        product.lengths = [];
        product.vendor = {};
        product.stock = 0;
        var variantsImages = [];

        data.relationships.variants.data.forEach(v => {
            var item_variant = included.find(i => i.type === 'variant' && i.id === v.id);
            var variant = {};
            variant.attributes = item_variant.attributes;
            variant.id = item_variant.id;
            variant.images = [];
            variant.options = {};

            if (item_variant.relationships.option_values.data.length > 0) {
                item_variant.relationships.option_values.data.forEach(ov => {
                    var item_option = included.find(i => i.type === 'option_value' && i.id === ov.id);
                    var option = {};
                    option = item_option.attributes;
                    option.id = item_option.id;

                    if (item_option.relationships.option_type.data.id === COLOR_TYPE) {
                        variant.options.color = option;
                        if (!product.colors.includes(option)) product.colors.push(option);
                    } else if (item_option.relationships.option_type.data.id === SIZE_TYPE) {
                        variant.options.size = option;
                        if (!product.sizes.includes(option)) product.sizes.push(option);
                    } else if (item_option.relationships.option_type.data.id === LENGTH_TYPE) {
                        variant.options.length = option;
                        if (!product.lengths.includes(option)) product.lengths.push(option);
                    }
                });
            }
            if (item_variant.relationships.images.data.length > 0) {
                item_variant.relationships.images.data.forEach(image => {
                    var imageUrl = baseUrl + included.find(i => i.type === 'image' && i.id === image.id).attributes.styles[11].url;
                    variant.images.push(imageUrl);
                    variantsImages.push(imageUrl);
                    if (!state.productImagesByColor[variant.options.color.id]) {
                        state.productImagesByColor[variant.options.color.id] = [];
                    }
                    state.productImagesByColor[variant.options.color.id].push(imageUrl);
                    
                });
            }
            product.variants.push(variant);
        });

        if (!variantsImages.length) {
            if (data.relationships.images.data.length > 0) {
                data.relationships.images.data.forEach(image => {
                    var imageUrl = baseUrl + included.find(i => i.type === 'image' && i.id === image.id).attributes.styles[11].url;
                    product.colors.forEach(color => {
                        if (!state.productImagesByColor[color.id]) {
                            state.productImagesByColor[color.id] = [];
                        }
                        state.productImagesByColor[color.id].push(imageUrl);
                    })
                });
            }
        }

        product.sizes.sort((a, b) => a.position - b.position);
        product.lengths.sort((a, b) => a.position - b.position);

        var vendor = included.find(item => item.type ==='vendor' && item.id === data.relationships.vendor.data.id);
        product.vendor.id = vendor.id;
        product.vendor.name = vendor.attributes.name;

        product.currentVariant = data.relationships.default_variant.data.id;

        if (payload.type === 'detail') {
            state.product = product;
        } else if (payload.type === 'cart') {
            state.cartProduct = product;
        }

    },
    setProducts(state, payload) {
        const data = payload.data ? payload.data.data : payload.success().data;
        const included = payload.data ? payload.data.included : payload.success().included;
        const meta = payload.data ? payload.data.meta : payload.success().meta;
        const links = payload.data ? payload.data.links : payload.success().links;
        const products = [];

        data.forEach(p => {
            var product = {};
            product.id = p.id;
            product.slug = p.attributes.slug;
            product.title = p.attributes.name;
            product.price = p.attributes.price;
            product.colors = [];
            var imagesByColor = {};

            if (p.relationships.images.data.length > 0) {
                p.relationships.variants.data.forEach(variant => {
                    var variantData = included.find(v => v.type === 'variant' && v.id === variant.id);

                    if (variantData.relationships.images.data.length > 0) {
                        variantData.relationships.images.data.forEach(image => {
                            var imageUrl = baseUrl + included.find(i => i.type === 'image' && i.id === image.id).attributes.styles[4].url;
                            variantData.relationships.option_values.data.forEach(option => {
                                var item_option = included.find(o => o.type === 'option_value' && o.id === option.id);
                                if (item_option.relationships.option_type.data.id === COLOR_TYPE) {
                                    var color = {};
                                    color = item_option.attributes;
                                    color.id = item_option.id;

                                    if (!imagesByColor[item_option.id]) {
                                        imagesByColor[item_option.id] = imageUrl;
                                    }
                                    if (!product.colors.includes(color)) product.colors.push(color);
                                }
                            });
                        });
                    } else {
                        variantData.relationships.option_values.data.forEach(option => {
                            var item_option = included.find(o => o.type === 'option_value' && o.id === option.id);
                            if (item_option.relationships.option_type.data.id === COLOR_TYPE) {
                                var color = {};
                                color = item_option.attributes;
                                color.id = item_option.id;

                                if (!product.colors.includes(color)) product.colors.push(color);
                            }
                        });
                    }
                });
            }

            if (!imagesByColor.length) {
                if (p.relationships.images.data.length > 0) {
                    p.relationships.images.data.forEach(image => {
                        var imageUrl = baseUrl + included.find(i => i.type === 'image' && i.id === image.id).attributes.styles[4].url;
                        var variant = included.find(v => v.type === 'variant' && v.relationships.product.data.id === product.id)
                        variant.relationships.option_values.data.forEach(option => {
                            var item_option = included.find(o => o.type === 'option_value' && o.id === option.id);
                            if (item_option.relationships.option_type.data.id === COLOR_TYPE) {
                                if (!imagesByColor[item_option.id]) {
                                    imagesByColor[item_option.id] = imageUrl;
                                }
                            }
                        });
                    });
                }                
            }
            product.imagesByColor = imagesByColor;
            product.selectedColor = product.colors[0];

            products.push(product);
        });

        state.products = products;
        state.totalCount = meta.total_count;
        state.totalPages = meta.total_pages;
        state.selfPageUrl = links.self;
    },
    setProductsOptions(state, payload) {
        payload.forEach(option => {
            if (option.type === 'color') {
                state.productsColors.push(option);
            } else if (option.type === 'size') {
                state.productsSizes.push(option);
            } else if (option.type === 'length') {
                state.productsLengths.push(option);
            }
        })
    },
    setCartProducts(state, payload) {
        state.cartProducts = payload;
    },
    setSelectedColor(state, payload) {
        state.products.find(p => p.id === payload.id).selectedColor = payload.color;
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
    setProductCurrentVariant(state, payload) {
        state.product.currentVariant = payload;
    },
    setCartProductCurrentVariant(state, payload) {
        state.cartProduct.currentVariant = payload;
    },
    setStockItem(state, payload) {
        var stock = payload.data.stock_items.length > 0 ? payload.data.stock_items[0].count_on_hand : 0;

        if (payload.type === 'detail') {
            state.product.stock = stock;
        } else if (payload.type === 'cart') {
            state.cartProduct.stock = stock;
        }
    },
    setCurrentFilters(state, payload) {
        state.currentFilters = payload;
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
    setSelfPageUrl(state, payload) {
        state.selfPageUrl = payload;
    },
    setBreadcrumbs(state, payload) {
        payload.forEach(breadcrumb => {
            breadcrumb['nuxt'] = true;
            breadcrumb['activeClass'] = 'text--disabled font-weight-light';
        });

        state.breadcrumbs = payload;
    },
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
        commit('setLoading', true);

        const response = await client.products.show(payload.id, { include: 'images,variants.option_values,vendor' })
            .then(response => {
                response.type = payload.type;
                commit('setProduct', response);
                commit('setLoading', false);
                return response.success();
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    },
    async getStockItem({ commit }, payload) {
        commit('setLoading', true);

        const response = await repository.get(`${apiEndpointV1}/stock_locations/${parseInt(payload.vendor) + 1}/stock_items?token=2cb5b3b4e78b83df4fd0dfa0046cfa9de4da862103c60642&q[variant_id_eq]=${payload.item}`)
            .then(response => {
                response.type = payload.type;
                commit('setStockItem', response);
                commit('setLoading', false);
                return response.data;
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
                    item.image = image ? baseUrl + image.attributes.styles[2].url : '';
                    item.lineItemId = lineItem.id;
                    item.id = item.relationships.product.data.id;
                    item.title = lineItem.attributes.name;
                    item.price = lineItem.attributes.price;
                    item.slug = lineItem.attributes.slug;
                    item.options = {};
                    item.options.color = null;
                    item.options.size = null;
                    item.options.length = null;
                    item.vendor = {};

                    item.relationships.option_values.data.forEach(option_value => {
                        var ov_item = payload.find(ov => ov.type === 'option_value' && ov.id === option_value.id)
                        var option = ov_item.attributes;
                        option.id = ov_item.id;

                        if (ov_item.relationships.option_type.data.id === COLOR_TYPE) {
                            item.options.color = option;
                        } else if (ov_item.relationships.option_type.data.id === SIZE_TYPE) {
                            item.options.size = option;
                        } else if (ov_item.relationships.option_type.data.id === LENGTH_TYPE) {
                            item.options.length = option;
                        }
                    })

                    var vendor = payload.find(i => i.type === 'vendor' && i.id === item.relationships.vendor.data.id);
                    item.vendor.id = vendor.id;
                    item.vendor.name = vendor.attributes.name;

                    products.push(item);
                };
            });
        }
        commit('setCartProducts', products);
    },
    async getProductsOptions({ commit }) {
        const response = await repository.get(`${frontendUrl}/options.json`)
            .then(response => {
                commit('setProductsOptions', response.data);
                return response.data;
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
    async getProductsByFilters({ commit }, payload) {
        commit('setLoading', true);

        const response = await client.products.list({ filter: payload.filter, 'sort': payload.sort, 'per_page': PRODUCTS_PER_PAGE, include: 'images,variants.option_values' })
            .then(response => {
                commit('setProducts', response);
                commit('setCurrentFilters', payload.filter);
                commit('setLoading', false);
                return response.success();
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
