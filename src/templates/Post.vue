<template>
  <Layout>
    <div class="container mx-auto my-16 mardkown xl:w-2/5 w-1/2">
      <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
      <div class="text-xl text-gray-600 mb-4">{{ $page.post.date }}</div>
      <div class="markdown-body mb-8 text-xl" v-html="$page.post.content" />
      <div class="mb-8">
        <g-link to="/blog" class="font-bold uppercase">Back to Blog</g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    content
  }
}
</page-query>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.post.title
    }
  }
}
</script>

<style>
.markdown-body {
  @apply text-gray-700 leading-relaxed;

  > * + * {
    @apply mt-16;
  }

  h1 {
    @apply text-3xl font-bold text-gray-900 leading-tight;
  }

  a {
    @apply text-blue-700 underline;
    &:hover {
      @apply text-blue-900;
    }
  }

  ul {
    @apply list-disc pl-6;

    li + li {
      @apply mt-2;
    }
  }

  pre {
    @apply mt-16 rounded-lg;
  }
}
</style>
