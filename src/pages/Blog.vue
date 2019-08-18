<template>
  <Layout>
    <div class="container mx-auto my-16 xl:w-2/5 w-1/2">
      <div v-for="post in $page.posts.edges" :key="post.id" class="bg-white border border-grey-400 rounded-lg mb-12 h-64">
        <h2 class="text-3xl font-bold mx-6 my-3">
          <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        </h2>
        <div class="mx-6 my-3">
          <span>{{ post.node.date }} &bull; {{ post.node.timeToRead }} mins</span>
        </div>
        <div class="text-lg mx-6">{{ post.node.description }}</div>
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
        id
        title
        description
        date(format: "Y-M-d")
        path
        timeToRead
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
