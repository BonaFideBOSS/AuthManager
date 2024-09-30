<template>
  <div class="d-flex flex-column align-center ga-5">
    <h1 class="text-h3 font-weight-bold mb-0">Page Not Found</h1>
    <img src="/src/assets/img/error.png" width="350" />
    <p class="text-body-1 mb-0">
      Oops! The page you're looking for no longer exists or never existed.
    </p>

    <div class="d-flex flex-wrap ga-2">
      <v-btn
        :to="{ name: 'dashboard' }"
        prepend-icon="$home"
        color="teal"
        rounded="pill"
        size="large"
        text="Go to dashboard"
      />
      <v-btn
        :to="-1"
        color="secondary"
        prepend-icon="$back"
        variant="tonal"
        rounded="pill"
        size="large"
        text="Go back"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
