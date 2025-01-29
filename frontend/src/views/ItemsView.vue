<template>
  <div>
    <ItemForm />
    <ItemTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemForm from '../components/ItemForm.vue';
import ItemTable from '../components/ItemTable.vue';

export default defineComponent({
  name: 'ItemsView',
  components: {
    ItemForm,
    ItemTable,
  },
});
</script>
