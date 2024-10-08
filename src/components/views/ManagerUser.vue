<!-- ManagerUser.vue -->
<template>
    <div class="manager-user">
      <h1>Manager User</h1>
      <button class="btn btn-add" @click="showForm = true">Add New User</button>
  
      <!-- Form thêm hoặc chỉnh sửa người dùng -->
      <AddUserForm :showForm="showForm" :userToEdit="selectedUser" @close="closeForm" @add-user="addUser" @update-user="updateUser" />
  
      <!-- Bảng người dùng -->
      <table class="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
            <th>Email</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.dateOfBirth }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="btn btn-edit" @click="editUser(user)">Edit</button>
              <button class="btn btn-delete" @click="deleteUser(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import AddUserForm from './AddUserForm.vue';
  
  const showForm = ref(false);
  const users = reactive([]);
  const selectedUser = ref(null);
  
  // Thêm người dùng mới
  const addUser = (user) => {
    // Kiểm tra email không trùng lặp
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      alert("Email already exists!");
      return;
    }
  
    // Thêm người dùng vào danh sách
    users.push(user);
    closeForm(); // Đóng form sau khi thêm người dùng
  };
  
  // Chỉnh sửa người dùng
  const editUser = (user) => {
    selectedUser.value = user; // Lưu thông tin người dùng cần chỉnh sửa
    showForm.value = true; // Mở form chỉnh sửa
  };
  
  // Cập nhật thông tin người dùng
  const updateUser = (updatedUser) => {
    const index = users.indexOf(selectedUser.value);
    if (index !== -1) {
      users[index] = { ...updatedUser }; // Cập nhật thông tin người dùng
    }
    closeForm(); // Đóng form sau khi cập nhật
  };
  
  // Xóa người dùng
  const deleteUser = (index) => {
    users.splice(index, 1); // Xóa người dùng dựa vào index
  };
  
  // Đóng form
  const closeForm = () => {
    showForm.value = false; // Đóng form
    selectedUser.value = null; // Reset thông tin người dùng chọn
  };
  </script>
  
  <style scoped>
  .manager-user {
    padding: 20px;
  }
  .btn.btn-add {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn.btn-add:hover {
    background-color: #0056b3;
  }
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .user-table th,
  .user-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  .user-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  .user-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .user-table tr:hover {
    background-color: #f1f1f1;
  }
  .btn.btn-edit {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn.btn-edit:hover {
    background-color: #218838;
  }
  .btn.btn-delete {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn.btn-delete:hover {
    background-color: #c82333;
  }
  </style>
  