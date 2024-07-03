<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  //
</script>

<style>
:root{
  --bg-color: rgb(20, 20, 20);
  --card-color: rgb(23, 23, 23);
  --primary-color: #f01468;
  
  --second-color: pink;
  --teste-color: yellowgreen;

  --clr-accent-400: hsl(12, 88%, 59%);
  --clr-accent-100: hsl(13, 100%, 96%);

  --clr-primary-400: hsl(228, 39%, 23%);

  --clr-neutral-100: hsl(232, 12%, 13%);
  --clr-neutral-900: hsl(0, 0%, 0%);

  --ff-primary: 'Be Vietnam Pro', sans-serif;

  --ff-body: var(--ff-primary);
  --ff-heading: var(--ff-primary);

  --fw-regular: 400;
  --fw-semi-bold: 500;
  --fw-bold: 700;

  --fs-300: .8125rem;
  --fs-400: .875rem;
  --fs-500: 0.9375rem;
  --fs-600: 1rem;
  --fs-700: 1.875rem;
  --fs-800: 2.5rem;
  --fs-900: 3.5rem;

  --fs-body: var(--fs-400);
  --fs-primary-heading: var(--fs-800);
  --fs-secondary-heading: var(--fs-700);
  --fs-nav: var(--fs-500);
  --fs-button: var(--fs-300);
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font: inherit;
}
ul[role="list"],
ol[role="list"]{
  list-style: none;
}
html:focus-within{
  scroll-behavior: smooth;
}
html, body {
  height: 100%;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}
img, picture,svg {
  max-width: 100%;
  display: block;
}
body {
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
h1 {
  font-size: var(--fs-800);
}
h2 {
  font-size: var(--fs-700);
}
h3 {
  font-size: var(--fs-600);
}
h4 {
  font-size: var(--fs-500);
}
.spaceh2 {
  margin-bottom: 2em;
}
section{
  padding: 2rem 0;
}
section .container{
  width: min(90vw, 1000px);
  margin-inline: auto;
}
@media (max-width: 500px){
  section{
    padding: 1rem 0;
  }
}
@keyframes slideRight {
  0%{
    opacity: 0;
    transform: translateX(-50px);
  }
  100%{
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
