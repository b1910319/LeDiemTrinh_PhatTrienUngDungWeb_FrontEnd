<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="/" style="font-weight: bold;">Order</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/admin/" style="font-weight: bold;">Admin</a>
    </li>
    <router-link :to="{ name: 'order' }" class="nav-link">
    </router-link>
  </ul>
</template>
