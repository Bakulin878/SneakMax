import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {
      priceRange: [0, 30000],
      gender: null,
      sizes: [],
    },
    filteredProducts: [],
    allProducts: [], // Здесь будут храниться все товары
  },
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setGender: (state, action) => {
      state.filters.gender = action.payload;
    },
    toggleSize: (state, action) => {
      const size = action.payload;
      if (state.filters.sizes.includes(size)) {
        state.filters.sizes = state.filters.sizes.filter((s) => s !== size);
      } else {
        state.filters.sizes.push(size);
      }
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    applyFilters: (state) => {
      const { priceRange, gender, sizes } = state.filters;
      state.filteredProducts = state.allProducts.filter((product) => {
        const matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesGender = gender ? product.gender === gender : true;
        const matchesSize = sizes.length
          ? sizes.some((size) => product.sizes.includes(size))
          : true;
        return matchesPrice && matchesGender && matchesSize;
      });
    },
  },
});

export const {
  setPriceRange,
  setGender,
  toggleSize,
  setAllProducts,
  applyFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
