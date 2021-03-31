<script>
    import Layout from './layout/Layout.svelte'
    import {TestData} from './sections'
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
    <div>Cucubau</div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <TestData/>
</Layout>




