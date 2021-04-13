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
    scroll-padding-top: 74px;
  }
  .s-app-bar__wrapper {
    --s-app-bar-height: 74px;
  }
  .s-app-bar{
    height: 74px;
  }


</style>


<Layout>
    <Main/>
</Layout>




