<template>
  <q-page class="q-pa-md">
    <q-header bordered class="bg-grey-1">
      <q-toolbar class="bg-white">
        <q-space />
        <q-btn flat color="primary" label="Entrar" id="login" @click="$router.push('/login')" />
      </q-toolbar>
    </q-header>

    <main class="q-ma-lg">
      <div id="content">
        <div class="text-h3 q-mb-md">Lorem ipsum dolor sit amet.</div>
        <div class="text-body1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur quo numquam optio.
          Culpa sequi quod
          consectetur qui totam, animi ipsum.</div>
      </div>
    </main>
  </q-page>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.text-h3 {
  animation: fadeInBottomTop 1s;
}

.text-body1 {
  animation: fadeInBottomTop 1.5s;
}

#login {
  animation: fadeInLeftRight 1.5s;
}

@keyframes fadeInBottomTop {
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform: translateY(0rem);
  }
}

@keyframes fadeInLeftRight {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }

  to {
    opacity: 1;
    transform: translateX(0rem);
  }
}
</style>
