<script setup lang="ts">
  import ConfirmDialog from "./ConfirmDialog.vue";
  import { useRecipesStore } from "../store/recipesStore";

  const recipesStore = useRecipesStore();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
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

  const title = ref("");
  const description = ref("");
  const category = ref("");
  const imageUrl = ref("");
  const ingredients = ref([]);

  const showConfirmSave = ref(false);
  const showConfirmClose = ref(false);
  const resultConfirm = ref(false);

  function confirmSaveRecipe() {
    if (resultConfirm.value) {
      recipesStore.createNewRecipe({
        title: title.value,
        description: description.value,
        category: category.value,
        imageUrl: imageUrl.value,
        ingredients: ingredients.value,
      });
      show.value = false;
      emit("close");
    } else {
      showConfirmSave.value = false;
    }
  }

  function confirmCloseDialog() {
    if (resultConfirm.value) {
      show.value = false;
      emit("close");
    } else {
      showConfirmClose.value = false;
    }
  }

  function closeDialog() {
    if (isChanged.value) {
      showConfirmClose.value = true;
    } else {
      show.value = false;
      emit("close");
    }
  }

  const isChanged = computed(() => title.value != "" && description.value != "");
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent :retain-focus="false" transition="scale-transition">
      <v-card>
        <v-card-title class="text-h5">{{ $t("newRecipe") }}</v-card-title>
        <!-- <v-card-text>Post: {{ props.post }}</v-card-text> -->
        <v-text-field v-model="title" class="mb-1" :label="$t('title')"></v-text-field>
        <v-textarea
          v-model="description"
          filled
          :label="$t('description')"
          rows="6"
          shaped
        ></v-textarea>
        <v-text-field v-model="category" class="mb-1" :label="$t('category')"></v-text-field>
        <v-text-field v-model="imageUrl" class="mb-1" :label="$t('image')"></v-text-field>
        <v-text-field
          v-model="ingredients[0]"
          class="mb-1"
          :label="$t('ingredient')"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-lighten-3"
            :disabled="!isChanged"
            elevation="5"
            @click="showConfirmSave = true"
          >
            {{ $t("save") }}
          </v-btn>
          <v-btn color="blue-lighten-3" elevation="5" @click="closeDialog">{{ $t("close") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmDialog
      v-if="showConfirmSave"
      v-model="showConfirmSave"
      v-model:result="resultConfirm"
      title="Save changes"
      @close="confirmSaveRecipe"
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
