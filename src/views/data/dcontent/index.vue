<template>
  <div class="content-cont">
    <div class="top-box">
      <div class="left">
        <dnumber
          :dheight="110"
          :title="$t('data.myevent.pubRepos')"
          :size="'4rem'"
          :dnumber="numberData.pubRepos"
          :icon="'kucunguanli'"
          :color="'#ffff43'"
        >
        </dnumber>
      </div>
      <div class="right">
        <div class="content">
          <dnumber
            :dheight="110"
            :title="$t('data.myevent.followers')"
            :size="'3rem'"
            :dnumber="numberData.followers"
            :icon="'jindu1'"
            :color="'#25f3e6'"
          >
          </dnumber>
          <dnumber
            :dheight="110"
            :title="$t('data.myevent.following')"
            :size="'3rem'"
            :dnumber="numberData.following"
            :icon="'success'"
            :color="'#f84a4a'"
          >
          </dnumber>
        </div>
      </div>
    </div>

    <div class="content-box">
      <databox
        :title="$t('data.myevent.accountData')"
        :dheight="350"
        :icon="'account'"
        :boxb="false"
      >
        <div class="content-wapper">
          <ve-bar :data="repoData" :extend="extend" :height="'350px'"></ve-bar>
          <nodata
            :nodata="$t('data.myevent.noRepoSize')"
            v-if="noRepoSize"
          ></nodata>
        </div>
      </databox>
      <databox
        :title="$t('data.myevent.myevent')"
        :dheight="220"
        :icon="'account'"
      >
        <myevent :data="myevent"></myevent>
        <nodata
          :nodata="$t('data.myevent.noMyevent')"
          v-if="noMyevent"
        ></nodata>
      </databox>
    </div>
  </div>
</template>
  
  <script>
import dnumber from "./dnumber";
import myevent from "./myevent";
export default {
  components: {
    dnumber,
    myevent,
  },
  props: {
    numberData: Object,
    username: String,
  },
  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true,
          },
        },
      },
      legend: {
        textStyle: { color: "#fff" },
        right: "6%",
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
      },
    };
    return{
      myevent:[],
      noMyevent:false,
      repoData:{
        columns:["reposName","size","forks"],
        rows:[]
      },
      noRepoSize:false
    }
  },
  methods:{
    getData(username){
      let comUrl="/api/users/";
      let url1=comUrl+username+"/events";
      let url2=comUrl+username+"/repos";
      this.$axios
        .all([this.$axios.get(url1),this.$axios.get(url2)])
        .then(
          this.$axios.spread((res1,res2)=>{
            console.log(res1);
            console.log(res2);

            //我最近操作
            let data1=JSON.parse(JSON.stringify(res1.data));
            if(data1.length<1){
              this.noMyevent=true;
            }else{
              this.myevent=data1
            }
            // 每个仓库的大小
            let data2 = JSON.parse(JSON.stringify(res2.data));
            if(data2.length<1){
              this.noRepoSize=true;
            }else{
              let dataR=[];
              for(var i=0;i<data2.length;i++){
                let reposName=data2[i].name;
                let size=data2[i].size;
                let forks=data2[i].forks;
                let objR={
                  reposName: reposName,
                  size: size,
                  forks: forks
                };
                dataR.push(objR);
              }
              this.repoData.rows = dataR;

            }
          })
        )
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  watch: {
    username(username) {
      if (username) {
        this.getData(username);
      }
    }
  },
  created() {
    if (this.username) {
      this.getData(this.username);
    }
  },
};
</script>
  
  <style lang="scss">
.content-cont {
  width: 100%;
  height: 100%;
  .top-box {
    display: flex;
    width: 100%;
    height: 110px;
    overflow: hidden;
    .left {
      width: 1/3 * 100%;
      background: rgba(35, 72, 135, 0.4);
    }
    .right {
      flex: 1;
      padding-left: 15px;
      .content {
        width: 100%;
        height: 100%;
        background: rgba(35, 72, 135, 0.4);

        .number-box {
          width: 50%;
          float: left;
        }
      }
    }
  }
  .content-box {
    padding-top: 30px;
  }
}
</style>