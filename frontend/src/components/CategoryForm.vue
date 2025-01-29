<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Create Category</div>
          <div class="card-body">
            <form @submit.prevent="submitCategory">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="name" required />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCategoriesStore } from '../store/modules/categories';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2'; // Mengimpor SweetAlert2

export default defineComponent({
  name: 'CategoryForm',
  setup() {
    const categoriesStore = useCategoriesStore();
    const name = ref('');

    const submitCategory = async () => {
      try {
        const response = await apiService.createCategory(name.value);
        categoriesStore.addCategory(response.data.data);
        name.value = ''; // Reset form setelah sukses

        // Menampilkan SweetAlert untuk notifikasi sukses
        Swal.fire({
          icon: 'success',
          title: 'Category Created',
          text: `Category "${response.data.data.name}" has been successfully created.`,
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error('Failed to create category:', error);

        // Menampilkan SweetAlert untuk notifikasi error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error creating the category. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    };

    return {
      name,
      submitCategory,
    };
  },
});
</script>

