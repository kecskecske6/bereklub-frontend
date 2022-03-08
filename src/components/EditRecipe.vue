<script setup lang="ts">
  import { PropType } from "vue";
  import { IRecipe, useRecipesStore } from "../store/recipesStore";
  import ConfirmDialog from "./ConfirmDialog.vue";

  const recipesStore = useRecipesStore();

  recipesStore.loading = false;

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    recipe: {
      type: Object as PropType<IRecipe>,
      required: true,
    },
  });
  const emit = defineEmits(["update:modelValue", "close"]);

  const show = computed({
    get() {
      return props.modelValue;
    },
    set(value: boolean) {
      return emit("update:modelValue", value);
    },
  });
  const recipe = computed(() => props.recipe);
  const origTitle = recipe.value.title;
  const origDescription = recipe.value.description;
  const showConfirmEdit = ref(false);
  const showConfirmDelete = ref(false);
  const showConfirmClose = ref(false);
  const resultConfirm = ref(false);

  function confirmEditRecipe() {
    if (resultConfirm.value) {
      recipesStore.editRecipeById({
        _id: recipe.value._id,
        title: recipe.value.title,
        ingredients: recipe.value.ingredients,
        description: recipe.value.description,
        category: recipe.value.category,
        imageUrl: recipe.value.imageUrl,
      });
      show.value = false;
      emit("close");
    } else {
      showConfirmEdit.value = false;
    }
  }

  function confirmDeleteRecipe() {
    if (resultConfirm.value) {
      recipesStore.deleteRecipeById({
        _id: recipe.value._id,
      });
      show.value = false;
      emit("close");
    } else {
      showConfirmDelete.value = false;
    }
  }

  function confirmCloseDialog() {
    if (resultConfirm.value) {
      recipe.value.title = origTitle;
      recipe.value.description = origDescription;
      show.value = false;
      emit("close");
    } else {
      showConfirmClose.value = false;
    }
  }

  function showConfigForClose() {
    if (isChanged.value) {
      showConfirmClose.value = true;
    } else {
      show.value = false;
      emit("close");
    }
  }

  const isChanged = computed(
    () => recipe.value.title != origTitle || recipe.value.description != origDescription
  );

  function revertChanges() {
    recipe.value.title = origTitle;
    recipe.value.description = origDescription;
  }
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card>
        <v-card-title class="text-h5">Recipe: {{ recipe._id }}</v-card-title>
        <!-- <v-card-text>Post: {{ props.post }}</v-card-text> -->
        <v-text-field v-model="recipe.title" class="mb-1" label="Title"></v-text-field>
        <v-textarea
          v-model="recipe.description"
          filled
          label="Content"
          rows="6"
          shaped
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="yellow-lighten-3"
            :disabled="!isChanged"
            elevation="5"
            @click="revertChanges"
          >
            Reset
          </v-btn>
          <v-btn
            color="red-lighten-3"
            :disabled="isChanged"
            elevation="5"
            @click="showConfirmDelete = true"
          >
            Delete
          </v-btn>
          <v-btn
            color="green-lighten-3"
            :disabled="!isChanged"
            elevation="5"
            @click="showConfirmEdit = true"
          >
            Save
          </v-btn>
          <v-btn color="blue-lighten-3" elevation="5" @click="showConfigForClose">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmDialog
      v-if="showConfirmEdit"
      v-model="showConfirmEdit"
      v-model:result="resultConfirm"
      title="Save changes"
      @close="confirmEditRecipe"
    />
    <ConfirmDialog
      v-if="showConfirmDelete"
      v-model="showConfirmDelete"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Delete document"
      @close="confirmDeleteRecipe"
    />
    <ConfirmDialog
      v-if="showConfirmClose"
      v-model="showConfirmClose"
      v-model:result="resultConfirm"
      :retain-focus="false"
      title="Close dialog"
      @close="confirmCloseDialog"
    />
  </v-row>
</template>
