<template>
  <div class="container">
    <header class="header">
      Header
    </header>
    <main class="main">
      <menu class="menu"></menu>
      <RouterView></RouterView>
    </main>
    <footer class="footer">
      Footer
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.header, .footer {
  height: 64px;
  flex-shrink: 0;
}
.main {
  flex: 1;
  display: flex;
}
</style>