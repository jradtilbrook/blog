<template>
  <Layout className="flex justify-center">
    <div class="flex flex-row items-center">
      <div class="container mx-auto text-center">
        <h2 class="text-6xl font-bold mb-4">404</h2>
        <h2 class="text-xl mb-8">Page Not Found</h2>
        <g-link class="text-blue-700 text-xl hover:text-blue-900" to="/">Go Home</g-link>
        <g-image class="mx-auto my-16 rounded-full" width="500" src="../../static/taken_blue_600.svg" alt="Alien ufo"/>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Page Not Found'
  }
}
</script>
