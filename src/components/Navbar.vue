<template>
    <div>
        <ul class="footers">
            <li v-for="(item,index) in navBar" :key="index">
                <div class="textc "><i class="fs52" :class="item.icon"></i></div>
                <p class="fs25">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data () {
            return {
                navBar: [
                    {
                        name: '首页',
                        icon: 'el-icon-house'
                    },
                    {
                        name: '奖品',
                        icon: 'el-icon-takeaway-box'
                    },
                    {
                        name: '报名',
                        icon: 'el-icon-edit'
                    },
                    {
                        name: '榜单',
                        icon: 'el-icon-medal-1'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">
.footers{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 18px 0;
    border-top: 1px solid rgba(0,0,0,0.2);
    li{
        color: rgba(0,0,0,0.5);
    }
}
</style>