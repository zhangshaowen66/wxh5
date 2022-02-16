<template>
    <div>
        <div>
            <img src="../assets/images/bg.jpg" width="100%" alt="">
        </div>
        <div>
            <ul class="numCont">
                <li class="borL">
                    <p>参与选手</p>
                    <p>50</p>
                </li>
                <li class="borL">
                    <p>累计 投票</p>
                    <p>50</p>
                </li>
                <li >
                    <p>访问量</p>
                    <p>50</p>
                </li>
            </ul>
        </div>
        <div class="times">
            <i class="el-icon-trophy-1 fs45 mr10"></i>
            <span>投票日期：2022-01-23到 2022-01-27</span>
        </div>
        <div class="times">
            <i class="el-icon-time fs45 mr10"></i>
            <span>活动剩余：2022-01-23到 2022-01-27</span>
        </div>
        <div class="bgee">
            <div>

            </div>
        </div>
    </div>
</template>

<script>
import {cloneDeep} from "lodash";

export default {
    name: "index",
    data() {
        return {
            isload: true,
            isDetail: false,
            dialogVisible: false,
            list: [
                {
                    name: '工作号订单管理',
                    icon: 'phone-volume'
                }
            ],
            activeName: sessionStorage.getItem('activeTab') || 'NEW',
            search: {
                cityCode: '',//归属地
                applicationTime: '', // 申请时间
                orderNum: '',//订单编号
                deliveryTime: '', //交付时间
                OrganizationNumber: '', //机构编码
                sceneType: '', //场景类型
                page: 1,
                rows: 10
            },
            total: 0,
            remarks: '', //备注信息
            visible: false,
            loading: false,
            tableData: [],
            UnsubscribeList: [], //退订list
            orderNum: '', //订单编号
            orderList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            },
            orderDataByStatus: {} //订单状态计数
        }
    },

    methods: {
        searchTable() {
            this.search.page = 1
            this.loadData()
        },
        pageChange(e) {
            this.search.page = e
            this.loadData()
        },
        // 查询退订详情
        queryUnsubscribed(val) {
            let data = cloneDeep(val)
            this.$axios.get('/api/order/unsubscribed', {
                params: {
                    orderNum: data.orderNum
                }
            }).then(data => {
                this.UnsubscribeList = data.list
            }).catch(() => {})
        },
        // 加载订单列表
        loadData() {
            this.$axios.get('/api/order/search', {
                params: {
                    pageNum: this.search.page,
                    pageSize: this.search.rows,
                    status: this.activeName || 'NEW',
                    orderNum: this.search.orderNum,
                    departmentCode: this.search.OrganizationNumber,
                    createDate: this.search.applicationTime,
                    takeEffectDate: this.search.deliveryTime,
                    cityCode: this.search.cityCode,
                    businessType: this.search.sceneType
                }
            }).then(data => {
                this.tableData = data.list
                this.total = data.total
            }).catch(() => {})
        },
        // 获取订单状态计数
        getOrderData() {
            this.$axios.get('/api/order/statisticsOrderStatus').then(data => {
                this.orderDataByStatus = data || {}
            }).catch(() => {})
        },
        // 重置
        resetForm(reset) {
            this.$refs[reset].resetFields()
            this.visible = false
            this.loadData()
        },
        // 消息备注弹框
        feedBack(val) {
            let data = cloneDeep(val)
            this.orderNum = data.orderNum
        },
        // 添加消息备注
        onSubmit() {
            if (this.remarks === '') {
                this.$message.error('备注描述不能为空')
                return
            }
            this.loading = true
            this.$axios.post('/api/order/feedback', {feedback: this.remarks, orderNum: this.orderNum}).then(() => {
                this.loading = false
                this.$message.success('添加成功')
                this.dialogVisible = false
            }).catch(() => {
                this.loading = false
            })
        },
        handleClose() {
            this.dialogVisible = false
            this.remarks = ''
        },
    },
    created() {

    },
    destroyed() {
        sessionStorage.removeItem('activeTab')
    },
}
</script>

<style lang="less" scoped>
.numCont{
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 10px;
    font-size: 27px;
    li{
        width: 32%;
    }
}
.borL{
    border-right: 1px solid rgba(0,0,0,0.25);
}
    .times{
        padding: 10px 25px;
        border-bottom: 1px solid rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
</style>