export const COLOR_TYPE = "1";
export const SIZE_TYPE = "2";
export const LENGTH_TYPE = "3";
export const PRODUCTS_PER_PAGE = 0;

export const state = () => ({
	STORE_NAME: "eStylo",

	// MercadoPago Credentials
	TEST_ACCESS_TOKEN: 'TEST-1549781246686494-090802-8d6d9c282d1e3a6f31eb77a514971fb5-79061214',
	PROD_ACCESS_TOKEN: 'APP_USR-1549781246686494-090802-15146fdfabca17dda088c5e410fcdcab-79061214',

	// Filter - Price
	PRICE_RANGES: [1500, 3000, 4500, 6000, 7500],
	PRICE_RANGE: 	1500,

	// Filter - Tag
	WOMEN_ID: 						"2",
	MEN_ID: 							"3" ,
	NEWEST_WOMEN: 				"moda/novedades/mujer",
	NEWEST_MEN: 					"moda/novedades/hombre",
	NEWEST_WOMEN_ID:			"5",
	NEWEST_MEN_ID: 				"6",
	NEWEST_WOMEN_MEN_ID:	"5,6",
	POPULAR_WOMEN: 				"moda/populares/mujer",
	POPULAR_MEN: 					"moda/populares/hombre"
});