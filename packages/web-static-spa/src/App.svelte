<script>
    import Layout from 'components/layout/Layout.svelte'
    import Main from 'components/layout/Main.svelte'
</script>

<style lang="scss" global>

  .min-slim {
    min-width: 400px;
    overflow: scroll;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    @extend .min-slim;
    scroll-behavior: smooth;
  }
</style>


<Layout>
    <Main/>
</Layout>




