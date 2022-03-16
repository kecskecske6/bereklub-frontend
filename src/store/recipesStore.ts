import $axios from "./axios.instance";
import { defineStore } from "pinia";

export interface IRecipe {
  _id: string;
  author: string;
  title: string;
  ingredients: string[];
  description: string;
  category: string;
  imageUrl: string;
  votes: number;
}

interface IState {
  loading: boolean;
  numberOfRecipes: number;
  recipes: Array<IRecipe>;
}

interface IPaginatedParams {
  offset: number;
  limit: string;
  order: string;
  sort: string;
  keyword: string;
}

interface IIdParams {
  _id: string;
}

export interface IEditParams {
  _id: string;
  title: string;
  ingredients: string[];
  description: string;
  category: string;
  imageUrl: string;
  votes: number;
}

export interface INewRecipeParams {
  description: string;
  title: string;
  category: string;
  imageUrl: string;
  ingredients: string[];
}

export const useRecipesStore = defineStore({
  id: "recipesStore",
  state: (): IState => ({
    loading: false,
    numberOfRecipes: 0,
    recipes: [],
  }),
  getters: {
    getLoading(): boolean {
      return this.loading;
    },
    getRecipes(): Array<IRecipe> {
      return this.recipes;
    },
    getNumberOfRecipes(): number {
      return this.numberOfRecipes;
    },
  },
  actions: {
    async createNewRecipe(params: INewRecipeParams): Promise<void> {
      this.loading = true;
      $axios
        .post("recipes", {
          title: params.title,
          description: params.description,
          category: params.category,
          imageUrl: params.imageUrl,
          ingredients: params.ingredients,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.post);
            this.numberOfRecipes = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          // context.commit("setLoading", false);
          this.loading = false;
        });
    },
    async editRecipeById(params: IEditParams): Promise<void> {
      this.loading = true;
      $axios
        .patch(`recipes/${params._id}`, {
          title: params.title,
          description: params.description,
          ingredients: params.ingredients,
          category: params.category,
          imageUrl: params.imageUrl,
          votes: params.votes,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async deleteRecipeById(params: IIdParams): Promise<void> {
      this.loading = true;
      $axios
        .delete(`recipes/${params._id}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.status);
            this.numberOfRecipes = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async fetchRecipes(): Promise<void> {
      this.loading = true;
      $axios
        .get("recipes")
        .then((res) => {
          if (res && res.data) {
            this.recipes = res.data.recipes;
            this.numberOfRecipes = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async fetchPaginatedRecipes(params: IPaginatedParams): Promise<void> {
      this.loading = true;
      $axios
        .get(
          `recipes/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.recipes = res.data.recipes;
            this.numberOfRecipes = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
  },
});
