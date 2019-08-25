<template>
  <Layout>
    <div class="container mx-auto my-16 mardkown xl:w-2/5 w-1/2">
      <h1 class="text-4xl font-bold leading-tight mb-2">{{ $page.post.title }}</h1>
      <div class="text-gray-600 mb-4">{{ $page.post.date }} &bull; {{ $page.post.timeToRead }} min</div>
      <div class="markdown-body mb-8 text-xl" v-html="$page.post.content" />
      <div class="mb-8">
        <g-link to="/blog" class="font-bold uppercase text-blue-700 hover:text-blue-800">Back to Blog</g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    content
    date (format: "MMMM D, Y")
    timeToRead
    title
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
    @apply mt-12;
  }

  h2 {
    @apply text-xl font-bold leading-tight;
  }

  h2 + p {
    @apply mt-4;
  }

  a {
    @apply text-blue-700;
    &:hover {
      @apply text-blue-800;
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

  blockquote {
    @apply opacity-65;
  }
}
</style>
