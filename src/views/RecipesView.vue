<script setup lang="ts">
  import NewRecipe from "../components/NewRecipe.vue";
  import EditRecipe from "../components/EditRecipe.vue";
  import { IRecipe, useRecipesStore } from "@/store/recipesStore";
  import VueTableLite from "vue3-table-lite/ts";
  const showNewRecipeDialog = ref(false);
  let refreshNeeding = false;
  const showEditDialog = ref(false);
  const selectedRecipe = ref<IRecipe>();
  const recipesStore = useRecipesStore();
  const allRecipes = computed(() => recipesStore.getRecipes);
  const isLoading = computed(() => recipesStore.getLoading);
  const numberofRecipes = computed(() => recipesStore.getNumberOfRecipes);
  function createNewDocument() {
    showNewRecipeDialog.value = true;
  }
  function closeDialogs() {
    refreshNeeding = true;
  }

  const doSearch = () => {
    recipesStore.fetchRecipes();
  };

  onMounted(() => {
    doSearch();
  });
  watch(isLoading, () => {
    if (refreshNeeding && !isLoading.value) {
      doSearch();
      refreshNeeding = false;
    }
  });
  const tableLoadingFinish = (elements) => {
    // table.isLoading = false;
    Array.prototype.forEach.call(elements, function (element) {
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
    });
  };
  const table = reactive({
    isLoading: isLoading,
    columns: [
      {
        label: "Name",
        field: "title",
        width: "30%",
        sortable: true,
      },
      {
        label: "Votes",
        field: "votes",
        width: "55%",
        sortable: true,
        display: function (row) {
          return row.votes;
        },
      },
      {
        label: "Vote",
        field: "quick",
        width: "5%",
        display: function (row) {
          return `<button type="button" data-id="${row._id}" class="is-rows-el quick-btn">Vote</button>`;
        },
      },
    ],
    rows: allRecipes,
    totalRecordCount: numberofRecipes,
    sortable: {
      order: "title",
      sort: "asc",
    },
    messages: {
      pagingInfo: "Documents {0}-{1} (total:{2})",
      pageSizeChangeLabel: "Rows/Page: ",
      gotoPageLabel: " Go to: ",
      noDataAvailable: "No data available",
    },
    pageSize: numberofRecipes,
    offset: 0,
    pageOptions: [
      { value: numberofRecipes, text: "all" },
      { value: 5, text: 5 },
      { value: 10, text: 10 },
      { value: 25, text: 25 },
      { value: 50, text: 50 },
    ],
  });
</script>
<template>
  <v-container class="page">
    <v-row>
      <v-col cols="12">
        <v-btn
          color="blue darken-1"
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          @click="createNewDocument"
        >
          {{ $t("newDocument") }}
        </v-btn>
      </v-col>
    </v-row>
    <VueTableLite
      :columns="table.columns"
      :is-loading="table.isLoading"
      :messages="table.messages"
      :page-options="table.pageOptions"
      :page-size="table.pageSize"
      :rows="table.rows"
      :sortable="table.sortable"
      :total="table.totalRecordCount"
      @do-search="doSearch"
      @is-finished="tableLoadingFinish"
    >
      <v-row>
        <v-col
          v-for="recipe in allRecipes"
          :key="recipe._id"
          cols="12"
          :is-loading="isLoading"
          sm="3"
        >
          <v-card class="mx-auto my-12">
            <v-img height="250" :src="recipe.imageUrl"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </VueTableLite>
    <v-row>
      <v-col
        v-for="recipe in allRecipes"
        :key="recipe._id"
        cols="12"
        :is-loading="isLoading"
        sm="3"
      >
        <v-card class="mx-auto my-12">
          <v-img height="250" :src="recipe.imageUrl"></v-img>
        </v-card>
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
