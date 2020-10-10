<template>
    <div class="content"> 
      <div class="all-title">
        全部应用
        <div class="fr">
          <p v-for="(item, index) in allMenuList" :key="item.id" :class="[index===activeMenu?'active':'']" @click="jump(index)">{{ item.name }}</p>
        </div>
      </div>
      <div id="scrollBox" class="applications-content">
        <div v-for="(val, index) in allMenuList" :key="index" class="all-list do-jump">
          <p class="applications-title">{{ val.name }}</p>
          <ul class="applications-list">
            <li style="height:50px" v-for="item in val.children" :key="item.id" class="applications-item" >
              <img src="">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import jQuery from 'jquery'
export default {
  data() {
    return {
      currentIndex: 0,
      allMenuList: [{
          name:"导航一",
          id:0,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
        {
          name:"导航二",
          id:1,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
        {
          name:"导航三",
          id:2,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
        {
          name:"导航四",
          id:3,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
        {
          name:"导航五",
          id:4,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
        {
          name:"导航六",
          id:5,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
        {
          name:"导航七",
          id:6,
          children:[
            {name:"导航1-1",id:0},
            {name:"导航1-2",id:1},
            {name:"导航1-3",id:2},
            {name:"导航1-4",id:3},
          ]
        },
      ],
      activeMenu:0,
    };
  },
  mounted() {
    // 获取滚动dom元素
    this.scrollBox = document.getElementById('scrollBox')
    const jump = jQuery('.do-jump')
    const topArr = []
    for (let i = 0; i < jump.length; i++) {
      topArr.push(jump.eq(i).position().top)
    }
    // 监听dom元素的scroll事件
    this.scrollBox.addEventListener('scroll', () => {
      const current_offset_top = this.scrollBox.scrollTop
      for (let i = 0; i < topArr.length; i++) {
        if (current_offset_top > topArr[i] && current_offset_top < topArr[i]+205) { // 根据滚动距离判断应该滚动到第几个导航的位置
          this.activeMenu = i
          break
        }
      }
    }, true)
  },
  methods: {
    // 跳转
    jump(index) {
      this.activeMenu = index // 当前导航
      const jump = jQuery('.do-jump').eq(index)
      const scrollTop = jump.position().top + this.scrollBox.scrollTop+1 // 获取需要滚动的距离
      // Chrome
      this.scrollBox.scrollTo({
        top: scrollTop,
        behavior: 'smooth' // 平滑滚动
      })
    },
   
  },
};
</script>
<style lang="scss" scoped>
.content{
  display: flex;
  .fr{
    p{
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
  
    }
    .active{
      background: aquamarine;
    }
  }
  .applications-content{
    padding-bottom: 80px;
    position: relative;
    background: #cee1f0;
    height: 300px;
    overflow-y: auto;
    flex: 1;
    p{
      margin: 0;
      padding: 25px;
      font-weight: bold;
    }
    ul{
      margin: 0;
    }
  }
}
</style> 
