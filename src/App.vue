<template>
  <div>
    <nav style="background-color: #333; padding: 10px;">
      <router-link to="/admin" class="nav-link" active-class="active">Dashboard</router-link>
      <router-link to="/admin/manager-user" class="nav-link" active-class="active">Manager User</router-link>
      <router-link to="/admin/manager-product" class="nav-link" active-class="active">Manager Product</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
.nav-link {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}

.nav-link.active {
  font-weight: bold;
  background-color: #555;
  padding: 5px 10px;
}
</style>
