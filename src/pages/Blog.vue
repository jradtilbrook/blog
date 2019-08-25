<template>
  <Layout>
    <div class="container mx-auto my-16 xl:w-2/5 w-1/2">
      <div v-for="post in $page.posts.edges" :key="post.id" class="bg-white shadow rounded-lg mb-12 min-h-56 p-6">
        <h2 class="text-3xl font-bold">
          <g-link class="hover:text-blue-700" :to="post.node.path">{{ post.node.title }}</g-link>
        </h2>
        <div class="text-gray-600 text-sm my-3">
          <span>{{ post.node.date }} &bull; {{ post.node.timeToRead }} min</span>
        </div>
        <div class="text-lg">{{ post.node.summary }}</div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (page: $page, sortBy: "date", order: DESC, perPage: 3) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        date (format: "MMMM D, Y")
        summary
        id
        path
        timeToRead
        title
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Blog',
  }
}
</script>
