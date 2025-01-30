<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center fw-bold">
            Item List
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle">
                <thead class="text-center">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-end">{{ formatCurrency(item.price) }}</td>
                    <td class="text-center">{{ item.unit }}</td>
                    <td>{{ item.category_name }}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary me-2" @click="openEditModal(item)">
                        <i class="fas fa-edit"></i> Edit
                      </button>
                      <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(item.id)">
                        <i class="fas fa-trash-alt"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Item -->
    <div v-if="showEditModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Item</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="editName" class="form-label">Name</label>
              <input type="text" id="editName" class="form-control" v-model="editItemData.name" required />
            </div>
            <div class="mb-3">
              <label for="editQty" class="form-label">Quantity</label>
              <input type="number" id="editQty" class="form-control" v-model="editItemData.qty" required min="1" />
            </div>
            <div class="mb-3">
              <label for="editPrice" class="form-label">Price</label>
              <input type="number" id="editPrice" class="form-control" v-model="editItemData.price" required min="0" />
            </div>
            <div class="mb-3">
              <label for="editUnit" class="form-label">Unit</label>
              <input type="text" id="editUnit" class="form-control" v-model="editItemData.unit" required />
            </div>
            <div class="mb-3">
              <label for="editCategory" class="form-label">Category</label>
              <select class="form-select" id="editCategory" v-model="editItemData.category_id" required>
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submitEditItem">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Confirm Delete -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Item</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this item?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="submitDeleteItem">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useItemsStore } from '../store/modules/items';
import { useCategoriesStore } from '../store/modules/categories';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'ItemTable',
  setup() {
    const itemsStore = useItemsStore();
    const categoriesStore = useCategoriesStore();

    const items = computed(() => itemsStore.items);
    const categories = computed(() => categoriesStore.categories);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const editItemData = ref({ id: null, name: '', qty: 0, price: 0, unit: '', category_id: null });
    const itemToDelete = ref<number | null>(null);

    onMounted(async () => {
      await itemsStore.fetchItems();
      await categoriesStore.fetchCategories();
    });

    const formatCurrency = (value: number) =>
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

    const openEditModal = (item: any) => {
      editItemData.value = { ...item }; // Copy item data to edit
      showEditModal.value = true;
    };

    const closeModal = () => {
      showEditModal.value = false;
      showDeleteModal.value = false;
    };

    const submitEditItem = async () => {
      try {
        await itemsStore.updateItem(editItemData.value);
        Swal.fire({
          icon: 'success',
          title: 'Item Updated',
          text: 'The item has been updated successfully.',
          confirmButtonText: 'OK'
        });
        closeModal();
        await itemsStore.fetchItems(); // Refresh items after update
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the item.',
          confirmButtonText: 'OK'
        });
      }
    };

    const confirmDelete = (id: number) => {
      itemToDelete.value = id;
      showDeleteModal.value = true;
    };

    const submitDeleteItem = async () => {
      try {
        if (itemToDelete.value) {
          await itemsStore.deleteItem(itemToDelete.value);
          Swal.fire({
            icon: 'success',
            title: 'Item Deleted',
            text: 'The item has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          closeModal();
          await itemsStore.fetchItems(); // Refresh items after delete
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error deleting the item.',
          confirmButtonText: 'OK'
        });
      }
    };

    return {
      items,
      categories,
      formatCurrency,
      openEditModal,
      showEditModal,
      showDeleteModal,
      editItemData,
      itemToDelete,
      closeModal,
      submitEditItem,
      confirmDelete,
      submitDeleteItem,
    };
  },
});
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
}
</style>
