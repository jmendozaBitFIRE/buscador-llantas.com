export const store = new Vuex.Store({
  state: {
    brands: [],
    models: [],
    years: [],
    versions: [],
    selected: {
      brand: "",
      model: "",
      year: "",
      version: "",
    },
  },
  getters:{
    getBrands( state ){
        return state.brands
    }
  },
  mutations: {
    initBrands(state, brands) {
      state.brands = brands;
    },
    initModels(state, models) {
      state.models = models;
    },
    initYears(state, years) {
      state.years = years;
    },
    initVersions(state, versions) {
      state.versions = versions;
    },
  },
});
