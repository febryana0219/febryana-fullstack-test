<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center fw-bold">
            Create Item
          </div>
          <div class="card-body">
            <form @submit.prevent="submitItem">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  required
                  :class="{ 'is-invalid': nameError }"
                />
                <div v-if="nameError" class="invalid-feedback">{{ nameError }}</div>
              </div>
              <div class="mb-3">
                <label for="qty" class="form-label">Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  id="qty"
                  v-model="qty"
                  required
                  min="1"
                  :class="{ 'is-invalid': qtyError }"
                />
                <div v-if="qtyError" class="invalid-feedback">{{ qtyError }}</div>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  v-model="price"
                  required
                  min="0.0"
                  :class="{ 'is-invalid': priceError }"
                />
                <div v-if="priceError" class="invalid-feedback">{{ priceError }}</div>
              </div>
              <div class="mb-3">
                <label for="unit" class="form-label">Unit</label>
                <input
                  type="text"
                  class="form-control"
                  id="unit"
                  v-model="unit"
                  required
                  :class="{ 'is-invalid': unitError }"
                />
                <div v-if="unitError" class="invalid-feedback">{{ unitError }}</div>
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select
                  class="form-select"
                  id="category"
                  v-model="category_id"
                  required
                  :class="{ 'is-invalid': categoryError }"
                >
                  <option value="" disabled>Select a category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <div v-if="categoryError" class="invalid-feedback">{{ categoryError }}</div>
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Submitting...</span>
                <span v-else>Submit</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useItemsStore } from '../store/modules/items';
import { useCategoriesStore } from '../store/modules/categories';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'ItemForm',
  setup() {
    const itemsStore = useItemsStore();
    const categoriesStore = useCategoriesStore();

    const name = ref('');
    const qty = ref(0);
    const price = ref(0);
    const unit = ref('');
    const category_id = ref('');

    const nameError = ref<string | null>(null);
    const qtyError = ref<string | null>(null);
    const priceError = ref<string | null>(null);
    const unitError = ref<string | null>(null);
    const categoryError = ref<string | null>(null);
    const isSubmitting = ref(false);

    // Fetch categories saat komponen dimuat
    onMounted(async () => {
      await categoriesStore.fetchCategories();
    });

    // Menggunakan computed agar selalu mendapatkan data terbaru dari store
    const categories = computed(() => categoriesStore.categories);

    const validateForm = () => {
      nameError.value = name.value ? null : 'Name is required';
      qtyError.value = qty.value > 0 ? null : 'Quantity must be greater than 0';
      priceError.value = price.value > 0 ? null : 'Price must be greater than 0';
      unitError.value = unit.value ? null : 'Unit is required';
      categoryError.value = category_id.value ? null : 'Category is required';

      return !(nameError.value || qtyError.value || priceError.value || unitError.value || categoryError.value);
    };

    const submitItem = async () => {
      if (!validateForm()) return;

      isSubmitting.value = true;

      try {
        const response = await apiService.createItem(
          name.value,
          qty.value,
          price.value,
          unit.value,
          category_id.value
        );
        itemsStore.addItem(response.data.data);

        // Reset form
        name.value = '';
        qty.value = 0;
        price.value = 0;
        unit.value = '';
        category_id.value = '';

        // Tampilkan notifikasi sukses
        Swal.fire({
          icon: 'success',
          title: 'Item Created',
          text: 'The item has been created successfully.',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Failed to create item:', error);

        // Notifikasi error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error creating the item.',
          confirmButtonText: 'OK',
        });
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      name,
      qty,
      price,
      unit,
      category_id,
      categories,
      nameError,
      qtyError,
      priceError,
      unitError,
      categoryError,
      isSubmitting,
      submitItem,
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
