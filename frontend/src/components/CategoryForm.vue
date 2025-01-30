<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center fw-bold">
            Create Category
          </div>
          <div class="card-body">
            <form @submit.prevent="submitCategory">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="name" 
                placeholder="Enter category" required :disabled="isSubmitting" />
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Submit' }}
              </button>
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
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'CategoryForm',
  setup() {
    const categoriesStore = useCategoriesStore();
    const name = ref('');
    const isSubmitting = ref(false);

    const submitCategory = async () => {
      if (isSubmitting.value) return;
      isSubmitting.value = true;

      try {
        // Cek apakah kategori sudah ada sebelum mengirim
        const existingCategory = categoriesStore.categories.find(category => category.name === name.value);
        if (existingCategory) {
          Swal.fire({
            icon: 'warning',
            title: 'Category Exists',
            text: `Category "${name.value}" already exists.`,
            confirmButtonText: 'OK'
          });
          return;
        }

        // Menggunakan action dari store untuk menambah kategori
        await categoriesStore.addCategory({ name: name.value });
        
        // Store the category name in a temporary variable
        const categoryName = name.value;

         // Reset form setelah sukses
        name.value = '';

        // Menampilkan SweetAlert untuk notifikasi sukses
        Swal.fire({
          icon: 'success',
          title: 'Category Created',
          text: `Category "${categoryName}" has been successfully created.`,
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
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      name,
      submitCategory,
      isSubmitting,
    };
  },
});
</script>
