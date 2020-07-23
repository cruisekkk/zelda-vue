<template>
  <div>
    <card class="above">  
    <div class="description">
      <div class="desc_word">
        <p class="head_title">Zelda</p>
        
      </div>
      <div class="desc_word">
        <p class="h3">Where you can supervise, edit and update testing cases.</p>
        </div>
    </div>
    </card>
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
    height: 250px;
    overflow: hidden;
    border-radius: 5px;
  }
  /* .desc_word{
    position: absolute;
    top: 10px;
  } */
  .desc_word .head_title{
    text-align: center;
    display: block;
    font-size: 50px;
    font-family: Georgia;
    font-weight:550;
    margin-bottom: 20px;
  }
  p.h3 {
    color: white;
  }
  p.h4{
    text-align: center;
    margin-bottom: 10px
  }
  .title{
    border-bottom: 0.7px white solid;
  }
  
  .h1 {
    margin: 0px;
  }
</style>
