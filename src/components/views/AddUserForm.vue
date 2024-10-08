<!-- AddUserForm.vue -->
<template>
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h2>{{ isEdit ? 'Edit User' : 'Add New User' }}</h2>
        <form @submit.prevent="handleUserAction">
          <!-- Tên -->
          <div>
            <label for="name">Name</label>
            <input id="name" type="text" v-model="currentUser.name" required />
          </div>
  
          <!-- Giới tính (Radio Buttons) -->
          <div class="radio-group">
            <label>
              <input type="radio" value="Male" v-model="currentUser.gender" /> Male
            </label>
            <label>
              <input type="radio" value="Female" v-model="currentUser.gender" /> Female
            </label>
            <label>
              <input type="radio" value="Other" v-model="currentUser.gender" /> Other
            </label>
          </div>
  
          <!-- Ngày sinh -->
          <div>
            <label for="dateOfBirth">Date Of Birth</label>
            <input id="dateOfBirth" type="date" v-model="currentUser.dateOfBirth" required />
          </div>
  
          <!-- Email -->
          <div>
            <label for="email">Email</label>
            <input id="email" type="email" v-model="currentUser.email" required />
          </div>
  
          <!-- Các nút hành động -->
          <div class="actions">
            <button type="button" @click="closeForm">Close</button>
            <button type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, toRefs, watch } from 'vue';
  
  const props = defineProps(['showForm', 'userToEdit']);
  const emit = defineEmits(['close', 'add-user', 'update-user']);
  const isEdit = computed(() => !!userToEdit);
  
  const currentUser = reactive({
    name: '',
    gender: 'Male',
    dateOfBirth: '',
    email: '',
  });
  
  // Watch để cập nhật currentUser khi có userToEdit mới
  watch(
    () => userToEdit,
    (newValue) => {
      if (newValue) {
        Object.assign(currentUser, newValue);
      } else {
        Object.assign(currentUser, {
          name: '',
          gender: 'Male',
          dateOfBirth: '',
          email: '',
        });
      }
    },
    { immediate: true }
  );
  
  const handleUserAction = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!currentUser.name || !currentUser.email) {
      alert("Name and Email cannot be empty!");
      return;
    }
  
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentUser.email)) {
      alert("Invalid email format!");
      return;
    }
  
    // Kiểm tra ngày sinh không được lớn hơn ngày hiện tại
    if (new Date(currentUser.dateOfBirth) > new Date()) {
      alert("Date of Birth cannot be in the future!");
      return;
    }
  
    // Phát sự kiện thêm hoặc cập nhật người dùng mới lên component cha
    if (isEdit.value) {
      emit("update-user", { ...currentUser });
    } else {
      emit("add-user", { ...currentUser });
    }
  
    closeForm();
  };
  
  const closeForm = () => {
    emit("close");
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .radio-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .actions button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .actions button[type="button"] {
    background-color: #6c757d;
    color: white;
  }
  .actions button[type="button"]:hover {
    background-color: #5a6268;
  }
  .actions button[type="submit"] {
    background-color: #007bff;
    color: white;
  }
  .actions button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  