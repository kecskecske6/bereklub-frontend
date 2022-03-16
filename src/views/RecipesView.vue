<script setup lang="ts">
  import NewRecipe from "../components/NewRecipe.vue";
  import EditRecipe from "../components/EditRecipe.vue";
  import { IRecipe, useRecipesStore } from "@/store/recipesStore";
  const showNewRecipeDialog = ref(false);
  let refreshNeeding = false;
  const showEditDialog = ref(false);
  const selectedRecipe = ref<IRecipe>();
  const recipesStore = useRecipesStore();
  const allRecipes = computed(() => recipesStore.getRecipes);
  function createNewDocument() {
    showNewRecipeDialog.value = true;
  }
  const tableLoadingFinish = (elements) => {
    // table.isLoading = false;
    Array.prototype.forEach.call(elements, function (element) {
      if (element.classList.contains("quick-btn")) {
        element.addEventListener("click", function () {
          const selRecipe = allRecipes.value.find((x) => x._id == element.dataset.id);
          if (selRecipe) {
            recipesStore.editRecipeById({
              _id: selRecipe._id,
              title: selRecipe.title,
              ingredients: selRecipe.ingredients,
              description: selRecipe.description,
              category: selRecipe.category,
              imageUrl: selRecipe.imageUrl,
              votes: selRecipe.votes + 1,
            });
            refreshNeeding = true;
          }
        });
      }
    });
  };
  function closeDialogs() {
    refreshNeeding = true;
  }
</script>
<template>
  <v-container class="page">
    <v-row>
      <v-col cols="12" sm="6">
        <v-btn color="blue darken-1" @click="createNewDocument">{{ $t("newDocument") }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <NewRecipe
    v-if="showNewRecipeDialog"
    v-model="showNewRecipeDialog"
    @close="closeDialogs"
  ></NewRecipe>
  <EditRecipe
    v-if="showEditDialog && selectedRecipe"
    v-model="showEditDialog"
    :recipe="selectedRecipe"
    @close="closeDialogs"
  ></EditRecipe>
</template>
<style scoped></style>
