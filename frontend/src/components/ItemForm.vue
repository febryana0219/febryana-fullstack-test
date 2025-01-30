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
                <input type="text" class="form-control" id="name" v-model="name" 
                placeholder="Item name" required :disabled="isSubmitting" />
              </div>
              <div class="mb-3">
                <label for="qty" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="qty" v-model.number="qty" required min="1" :disabled="isSubmitting" />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" id="price" v-model.number="price" required min="1" :disabled="isSubmitting" />
              </div>
              <div class="mb-3">
                <label for="unit" class="form-label">Unit</label>
                <input type="text" class="form-control" id="unit" v-model="unit" 
                placeholder="Unit" required :disabled="isSubmitting" />
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select class="form-select" id="category" v-model="category_id" required :disabled="isSubmitting">
                  <option value="" disabled>Select a category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting" @click.once="submitItem">
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
    const qty = ref(1);
    const price = ref(1);
    const unit = ref('');
    const category_id = ref<number | string>('');
    const isSubmitting = ref(false);

    onMounted(async () => {
      await categoriesStore.fetchCategories();
    });

    const categories = computed(() => categoriesStore.categories);

    const submitItem = async () => {
      if (isSubmitting.value) return;
      isSubmitting.value = true;

      // Validate if category is selected
      if (!category_id.value || typeof category_id.value !== 'number') {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please select a valid category.',
          confirmButtonText: 'OK',
        });
        isSubmitting.value = false;
        return;
      }

      try {
        // Pastikan semua nilai numerik dikirim sebagai number
        const newItem = {
          name: name.value,
          qty: Number(qty.value),
          price: Number(price.value),
          unit: unit.value,
          category_id: Number(category_id.value),
        };

        // Kirim request ke store, bukan langsung ke API
        const createdItem = await itemsStore.addItem(newItem);

        // Store the item name in a temporary variable
        const itemName = name.value;

        // Reset form setelah berhasil
        name.value = '';
        qty.value = 1;
        price.value = 1;
        unit.value = '';
        category_id.value = '';

        Swal.fire({
          icon: 'success',
          title: 'Item Created',
          text: `Item "${itemName}" has been successfully created.`,
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Failed to create item:', error);
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
      submitItem,
      isSubmitting,
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
