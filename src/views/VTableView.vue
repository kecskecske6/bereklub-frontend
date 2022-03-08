<script setup lang="ts">
  import { useRecipesStore } from "../store/recipesStore";

  const recipesStore = useRecipesStore();

  const allRecipes = computed(() => recipesStore.getRecipes);

  onMounted(() => {
    recipesStore.fetchRecipes();
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
          <tr v-for="(item, i) in allRecipes" :key="i">
            <td>{{ item._id }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.title }}</td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </v-container>
</template>
