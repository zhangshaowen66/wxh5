<template>
    <div id="app">
        <router-view/>
        <Navbar/>
    </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
export default {
    name: 'app',
    data() {
        return {
            titleName: '首页'
        }
    },
    components: {
        Navbar
    },
    watch: {
        '$route' : {
            handler (re) {
                console.log(re);
                this.titleName = re.query.pathName
            },
            immediate: true
         }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        goRouter (item,prant) {
            console.log(item, prant)
            this.titleName = prant.name + '/' + item.name
            this.$router.push({path: item.path, query: {pathName: this.titleName}})
        }
    },
    mounted() {
    },
    computed: {
        token() {
            return this.$store.state.token
        }
    }
}
</script>

<style lang="scss" scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 750px;
    background: #ffffff;
    position: absolute;
    font-size: 14px;
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.actives {
    border-right: 5px solid #5e89b5;
}

.cont-left {
    width: 230px;
    height: calc(100vh - 100px);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 3px #5e89b5;
    background: #ffffff;
    color: #333333;

}

.cont-right {
    width: calc(100% - 230px);
    padding: 20px;
    .title {
        width: 100%;
        height: 65px;
        background: #ffffff;
        border-radius: 5px;
        padding: 22px 20px;
        box-shadow: 0 0 3px #cccccc;
    }

    .cont-tables {
        width: 100%;
        background: #ffffff;
        border-radius: 5px;
        padding: 22px 20px;
        box-shadow: 0 0 3px #cccccc;
        margin-top: 20px;

        .searchs {
            position: absolute;
            top: 0px;
            right: 10px;
            display: flex;
        }
    }
}

.borl3 {
    border-left: 4px solid #5e89b5;
    padding-left: 8px;
    margin-top: 15px;
}

#main {
    flex: 1;
    overflow-y: auto;
}
</style>
