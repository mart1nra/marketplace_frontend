export const COLOR_TYPE = "1";
export const SIZE_TYPE = "2";
export const LENGTH_TYPE = "3";
export const PRODUCTS_PER_PAGE = 9;

export const state = () => ({
	STORE_NAME: "Nueva Tienda",

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