<script>
  import { onDestroy } from "svelte";
  import CharityList from "../components/CharityList.svelte";
  import Header from "../components/Header.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Promo from "../components/Promo.svelte";
  import Footer from "../components/Footer.svelte";
  import Loader from "../components/Loader.svelte";

  let data = getData();

  async function getData(params) {
    const res = await fetch("http://charity-api-bwa.herokuapp.com/charities");
    const data = await res.json();

    //cek status
    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  onDestroy(function () {
    window.scrollTo(0, 0);
  });
</script>

<Header />
<Welcome />
{#await data}
  <Loader />
{:then charities}
  <CharityList {charities} />
{/await}
<Promo />
<Footer />
