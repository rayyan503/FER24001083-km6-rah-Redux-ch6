import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchHero: [],
  hero: [],
  searchQuery: "",
  filterRole: "",
  heroName: "",
  detail: null,
};

const heroSlicer = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHero: (state, action) => {
      state.hero = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
      console.log("setFilterRoleredu", setFilterRole);
    },

    setHeroName: (state, action) => {
      state.heroName = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    setSearchHero: (state, action) => {
      state.searchHero = action.payload;
    },
  },
});

export const {
  setHero,
  setFilterRole,
  setSearchQuery,
  setHeroName,
  setDetail,
  setSearchHero,
} = heroSlicer.actions;

export default heroSlicer.reducer;
