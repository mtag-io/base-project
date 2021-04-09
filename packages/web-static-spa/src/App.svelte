<script>
    import Layout from 'components/layout/Layout.svelte'
    import Main from 'components/layout/Main.svelte'
    // import {MaterialApp} from 'svelte-materialify/src'
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

<!--<MaterialApp>-->
<!--    <div class="d-sm-none">-->
<!--        Orice-->
<!--    </div>-->
<!--</MaterialApp>-->



