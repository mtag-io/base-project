<script>
    import Title from "../../components/Title.svelte";
</script>
<div class="main">
    <Title>MULTILINGUAL</Title>
    <Title>CREATIVE</Title>
    <Title>SOLUTIONS</Title>
    <div class='quote'>
        <p class="text-left">If...
            <br>
            You want to communicate in your clients' language...
            <br>
            You need to train your staff abroad...
            <br>
            You seek a reliable voiceover studio.
        </p>
    </div>
    <br>
    <button class="rounded-pill btn-more">Read more...</button>
</div>

<style>
    .main {
        background-image: url("https://imgur.com/ma2kDYp.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 7rem 15rem 7rem 15rem;
        color: white;
        font-weight: 700;
    }
    .quote{
       margin-top: 20px;
    }
    .btn-more{
        padding: 10px 20px 10px 20px;
        background-color: #f3ac22;
        color: black;
    }
</style>
