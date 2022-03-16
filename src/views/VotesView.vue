<script setup lang="ts">
  import { IRecipe, useRecipesStore } from "../store/recipesStore";
  import EditRecipe from "../components/EditRecipe.vue";
  import NewRecipe from "../components/NewRecipe.vue";

  import VueTableLite from "vue3-table-lite/ts";

  const recipesStore = useRecipesStore();

  const allRecipes = computed(() => recipesStore.getRecipes);
  const numberofRecipes = computed(() => recipesStore.getNumberOfRecipes);
  const isLoading = computed(() => recipesStore.getLoading);
  let refreshNeeding = false;

  let checkedRowsIds = [];

  const searchTerm = ref(""); // Search text
  const showNewRecipeDialog = ref(false); // True if show new post
  const showEditDialog = ref(false); // True if show edit post
  const selectedRecipe = ref<IRecipe>();

  watch(searchTerm, () => {
    doSearch(0, table.pageSize.toString(), table.sortable.order, table.sortable.sort);
  });

  watch(isLoading, () => {
    if (refreshNeeding && !isLoading.value) {
      while (table.offset >= numberofRecipes.value) {
        table.offset -= table.pageSize;
      }
      doSearch(table.offset, table.pageSize.toString(), table.sortable.order, table.sortable.sort);
      refreshNeeding = false;
    }
  });

  onMounted(() => {
    doSearch(0, "5", "title", "asc");
  });

  function closeDialogs() {
    refreshNeeding = true;
  }

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
    pageSize: 5,
    offset: 0,
    pageOptions: [
      { value: 5, text: 5 },
      { value: 10, text: 10 },
      { value: 25, text: 25 },
      { value: 50, text: 50 },
    ],
  });
  const doSearch = (offset: number, limit: string, order: string, sort: string) => {
    recipesStore.fetchPaginatedRecipes({
      offset: offset,
      limit: limit,
      order: order,
      sort: sort == "asc" ? "1" : "-1",
      keyword: searchTerm.value,
    });
    table.pageSize = parseInt(limit);
    table.sortable.order = order;
    table.sortable.sort = sort;
    table.offset = offset;
  };

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

  const updateCheckedRows = (rowsKey) => {
    checkedRowsIds = rowsKey;
    const number = checkedRowsIds.length;
    console.log("Checked: " + checkedRowsIds.length + (number == 1 ? "row" : "rows"));
  };

  function createNewDocument() {
    showNewRecipeDialog.value = true;
  }
</script>

<template>
  <v-container class="page">
    <v-row>
      <v-col cols="12" sm="12">
        <h1>{{ $t("votes") }}</h1>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field v-model="searchTerm" :label="$t('search')"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn color="blue darken-1" @click="createNewDocument">{{ $t("newDocument") }}</v-btn>
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
      @return-checked-rows="updateCheckedRows"
    ></VueTableLite>
    <EditRecipe
      v-if="showEditDialog && selectedRecipe"
      v-model="showEditDialog"
      :recipe="selectedRecipe"
      @close="closeDialogs"
    ></EditRecipe>
    <NewRecipe
      v-if="showNewRecipeDialog"
      v-model="showNewRecipeDialog"
      @close="closeDialogs"
    ></NewRecipe>
  </v-container>
</template>

<style scoped>
  .card ::v-deep(.table .thead-dark th) {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }
  .card ::v-deep(.table td),
  .card ::v-deep(.table tr) {
    border: 1px solid #42b983;
  }
  .card ::v-deep(.quick-btn) {
    background-color: lightgray;
    border-style: solid;
  }

  .card ::v-deep(.table tr:nth-child(even)) {
    background-color: #f2f2f2;
  }

  .card ::v-deep(.table tr:hover) {
    background-color: #ddd;
  }
  .edit-btn {
    background-color: green;
  }
  h1 {
    text-align: center;
  }
</style>
