<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <!--Navigation bar-->
    <!--TODO: Add href for the other pages, once they had been implemented-->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/assets/brand/logo.png" img-alt="logo" width="30" height="24">
          Spenden e.V.
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Kleiderspende</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sonstiges
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Über uns</a></li>
                <li><a class="dropdown-item" href="#">Ehrenamt</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Kontakt</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <body>
    <div class="container">
      <RouterView />
    </div>
  </body>

  <footer>
    <!--TODO: add href, once the pages had been implemented-->
    <p class="text-center"><a href="#">Impressum</a> | <a href="#">Datenschutzerklärung</a> | @2023</p>
  </footer>
</template>