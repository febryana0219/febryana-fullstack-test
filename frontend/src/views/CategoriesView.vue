<template>
  <div>
    <CategoryForm />
    <CategoryTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryForm from '../components/CategoryForm.vue';
import CategoryTable from '../components/CategoryTable.vue';

export default defineComponent({
  name: 'CategoriesView',
  components: {
    CategoryForm,
    CategoryTable,
  },
});
</script>
