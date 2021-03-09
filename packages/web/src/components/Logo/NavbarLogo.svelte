<script>
    import LogoImg from './LogoImg.svelte'
    const appName = 'base-project'
</script>

<div class="flex">
   <LogoImg/>
    <span class="font-bold text-2xl hidden md:block">{appName}</span>
</div>