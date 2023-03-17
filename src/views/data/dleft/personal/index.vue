<template>
  <div class="personal-box">
    <div class="personal-body">
        <div class="left">
            <div class="img">
                <!-- <img :style="{background:'url('+personalData.img+')'}"> -->
                <!-- <img :src="personalData.img" alt=""> -->
          <img :style="{ background: 'url(' + personalData.img + ')' }" />

            </div>
        </div>
        <div class="right">
            <div class="name">
                {{ personalData.username }}
            </div>
            <div class="year">
                <a href="" class="data">{{ personalData.joinDate }}</a>
                <a href="" class="time">加入GitHub</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"personal",
    props:{
        personalData:Object
    }
}
</script>

<style lang="scss">
@import url(./index.scss);
</style>