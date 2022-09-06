<script>
  import { onDestroy } from "svelte";
  import CharityList from "../components/CharityList.svelte";
  import Header from "../components/Header.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Promo from "../components/Promo.svelte";
  import Footer from "../components/Footer.svelte";

  import { charities } from "../data/charities.js";

  onDestroy(function () {
    window.scrollTo(0, 0);
  });
</script>

<Header />
<Welcome />
<CharityList {charities} />
<Promo />
<Footer />
