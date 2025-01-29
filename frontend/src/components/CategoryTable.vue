<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center bg-primary text-white">
            <h4>Categories</h4>
          </div>
          <div class="card-body">
            <table class="table table-hover table-bordered align-middle">
              <thead class=" text-center">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created By</th>
                  <th>Updated By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <td>{{ category.id }}</td>
                  <td>{{ category.name }}</td>
                  <td>{{ category.created_by_name }}</td>
                  <td>{{ category.updated_by_name }}</td>
                  <td>
                    <button class="btn btn-sm btn-primary me-2" @click="editCategory(category)">Edit</button>
                    <button class="btn btn-sm btn-danger" @click="confirmDelete(category.id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Category -->
    <div v-if="showEditModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="editName" class="form-label">Name</label>
              <input type="text" id="editName" class="form-control" v-model="editCategoryData.name" required />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submitEditCategory">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Confirm Delete -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this category?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="submitDeleteCategory">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useCategoriesStore } from '../store/modules/categories';
import Swal from 'sweetalert2'; 

export default defineComponent({
  name: 'CategoryTable',
  setup() {
    const categoriesStore = useCategoriesStore();
    const categories = ref([]);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const editCategoryData = ref({ id: null, name: '' });
    const categoryToDelete = ref<number | null>(null);

    onMounted(async () => {
      await categoriesStore.fetchCategories();
      categories.value = categoriesStore.categories;
    });

    // Fungsi untuk menampilkan modal edit kategori
    const editCategory = (category: any) => {
      editCategoryData.value = { ...category };  // Menyalin data kategori untuk diedit
      showEditModal.value = true;
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
      showEditModal.value = false;
      showDeleteModal.value = false;
    };

    // Fungsi untuk mengedit kategori
    const submitEditCategory = async () => {
      try {
        await categoriesStore.updateCategory(editCategoryData.value);
        Swal.fire({
          icon: 'success',
          title: 'Category Updated',
          text: 'The category has been updated successfully.',
          confirmButtonText: 'OK'
        });
        // Menutup modal dan memperbarui daftar kategori
        closeModal();
        categories.value = categoriesStore.categories;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the category.',
          confirmButtonText: 'OK'
        });
      }
    };

    // Fungsi untuk menampilkan konfirmasi delete kategori
    const confirmDelete = (id: number) => {
      categoryToDelete.value = id;
      showDeleteModal.value = true;
    };

    // Fungsi untuk menghapus kategori
    const submitDeleteCategory = async () => {
      try {
        if (categoryToDelete.value) {
          await categoriesStore.deleteCategory(categoryToDelete.value);
          Swal.fire({
            icon: 'success',
            title: 'Category Deleted',
            text: 'The category has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          categories.value = categories.value.filter((category: any) => category.id !== categoryToDelete.value);
          closeModal();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error deleting the category.',
          confirmButtonText: 'OK'
        });
      }
    };

    return {
      categories,
      editCategory,
      showEditModal,
      showDeleteModal,
      editCategoryData,
      categoryToDelete,
      closeModal,
      submitEditCategory,
      confirmDelete,
      submitDeleteCategory,
    };
  },
});
</script>
