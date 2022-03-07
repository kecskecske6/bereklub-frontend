<script setup lang="ts">
  import { usePostsStore } from "../store/postsStore";

  const postsStore = usePostsStore();

  const allPosts = computed(() => postsStore.getPosts);

  onMounted(() => {
    postsStore.fetchPosts();
  });
</script>

<template>
  <v-container class="page">
    <v-table fixed-header>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">id</th>
            <th class="text-left">Author</th>
            <th class="text-left">Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in allPosts" :key="i">
            <td>{{ item._id }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </v-container>
</template>
