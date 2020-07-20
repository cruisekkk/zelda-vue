<template>
  <div>
    <div class="description">
      <img src="/img/hm_bg3.jpg" alt="">
      <div class="desc_word">
        <p class="head_title">Zelda</p>
        <p class="h3">A marvelous visualization tool for you to check and edit daily testing data.</p>
      </div>
    </div>
  <div class="row">
      <div class="col-lg-7">
        <card class = "above">
          <div class="table-responsive">
            <div class="title">
              <p class="h4">Check your test case right now</p>
            </div>
            <home-table thead-classes="text-primary">
            </home-table>
          </div>
        </card>
      </div>


      <div class="col-lg-5">
      <card class = "above">
          <div class="table-responsive dark" >
            <p>Hot links</p>
            <div class="hotlink">
            <img src="https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark--200.png" alt="">
            </div>
            <div class="hotlink">
            <img class="jenkins" src="img/jenkins.png" alt="Jenkins Continuous integration Build automation Continuous ...">
            <p class="h1">Jenkins</p>
            </div>
          </div>
      </card>
    </div>
  </div>
  </div>
</template>

<script>
import HomeTable from "@/components/HomeTable";
export default {
  components: {
    HomeTable
  },
}
</script>
<style scoped>
  .description {
    position: relative;
    display: flex;
    justify-content: center;
    height: 300px;
    overflow: hidden;
    border-radius: 5px;
  }
  .description img {
    display: block;
    position: relative;
    height: 1200px;
  }
  .desc_word{
    position: absolute;
    top: 0px;
  }
  .desc_word .head_title{
    display: block;
    font-size: 50px;
    font-style: italic;
    font-family: Georgia;
    font-weight: bold;
  }

  p.h4{
    text-align: center;
    margin-bottom: 10px
  }
  .title{
    border-bottom: 0.7px white solid;
  }
  .hotlink{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 40px;
    border: 1px rgba(255, 255, 255, 0.918) solid;
    border-radius: 12px;
  }
  .hotlink img {
    margin: auto;
  }
  
  img.jenkins {
    height: 68px;
    margin: 15px;
  }
  .h1 {
    margin: 0px;
  }
</style>
