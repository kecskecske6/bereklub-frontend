import $axios from "./axios.instance";
import { defineStore } from "pinia";

export interface IPost {
  _id: string;
  author: string;
  content: string;
  title: string;
}

interface IState {
  loading: boolean;
  numberOfPosts: number;
  posts: Array<IPost>;
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
  content: string;
  title: string;
}

export interface INewPostParams {
  content: string;
  title: string;
}

export const usePostsStore = defineStore({
  id: "postsStore",
  state: (): IState => ({
    loading: false,
    numberOfPosts: 0,
    posts: [],
  }),
  getters: {
    getLoading(): boolean {
      return this.loading;
    },
    getPosts(): Array<IPost> {
      return this.posts;
    },
    getNumberOfPosts(): number {
      return this.numberOfPosts;
    },
  },
  actions: {
    async createNewPost(params: INewPostParams): Promise<void> {
      this.loading = true;
      $axios
        .post("posts", {
          title: params.title,
          content: params.content,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.post);
            this.numberOfPosts = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          // context.commit("setLoading", false);
          this.loading = false;
        });
    },
    async editPostById(params: IEditParams): Promise<void> {
      this.loading = true;
      $axios
        .patch(`posts/${params._id}`, {
          title: params.title,
          content: params.content,
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
    async deletePostById(params: IIdParams): Promise<void> {
      this.loading = true;
      $axios
        .delete(`posts/${params._id}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.status);
            this.numberOfPosts = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async fetchPosts(): Promise<void> {
      this.loading = true;
      $axios
        .get("posts")
        .then((res) => {
          if (res && res.data) {
            this.posts = res.data.posts;
            this.numberOfPosts = res.data.count;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("hiba: " + error);
          this.loading = false;
        });
    },
    async fetchPaginatedPosts(params: IPaginatedParams): Promise<void> {
      this.loading = true;
      $axios
        .get(
          `posts/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.posts = res.data.posts;
            this.numberOfPosts = res.data.count;
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
