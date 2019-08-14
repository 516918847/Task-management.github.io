<template>
    <div class="side">
        <div class="search">
            <el-row>
                <el-col :md='24' :lg='8'>
                    <span>
                        <span :md='24' class="issue">发布时间</span>
                        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </span>
                </el-col>
                <el-col :md='24' class="overall" :lg='8'>
                    <span>一</span>
                    <el-date-picker v-model="value2" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-col>
                <el-col :md='24' style="text-align:right" :lg='8'>
                    <span>
                        类型
                        <select v-model="industry" class="dropdown" name="" id="">
                            <option value="">全部</option>
                            <option value="0">首页Banner</option>
                            <option value="1">找职位Banner</option>
                            <option value="2">找精英Banner</option>
                            <option value="3">行业大图</option>
                        </select>
                    </span>
                </el-col>
            </el-row>
            <div class="STATE">
                <div>
                    <span class="state">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                    <select v-model="onLine" class="breadth" name="" id="">
                        <option value="">全部</option>
                        <option value="2">上线</option>
                        <option value="1">草稿</option>
                    </select>
                </div>
                <div>
                    <span>
                        <span>标题</span>
                        <input class="import" v-model="title" type="text">
                    </span>
                    <span>
                        <span>创建者</span>
                        <input class="import" v-model="author" type="text">
                    </span>
                </div>
                <div>
                    <button class="color-qc" @click="clear()">清除</button>
                    <button class="color-ss" @click="colorSs()">搜索</button>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="newly">
                <span>Article列表</span>
                <button class="increased" @click="skip()">新增</button>
            </div>
            <div class="fieid">
                <table style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>照片</th>
                            <th>名称</th>
                            <th>类型</th>
                            <th>发布时间</th>
                            <th>修改时间</th>
                            <th>发布者</th>
                            <th>状态</th>
                            <th style="padding:15px">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list,index)  in array">
                            <th>{{index+1}}</th>
                            <th>
                                <img style="width:50px" :src="list.img" alt="">
                            </th>
                            <th style="width:100px;">{{list.title}}</th>
                            <th>{{typec[list.type]}}</th>
                            <th>{{list.createAt|formatDate}}</th>
                            <th>{{list.updateAt|formatDate}}</th>
                            <th>{{list.author}}</th>
                            <th>{{list.status==2?'上线':'草稿'}}</th>
                            <th>
                                <a href="#" @click="cancelPop(list)">{{list.status==1?'上线':'下线'}}</a>
                                <a @click="redact(list)" style="margin:15px" href="#">编辑</a>
                                <a href="#" @click="cancel(list.id)">删除</a>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div style="margin:10px 0;text-align: center;">
            <el-pagination @size-change="howStrip" @current-change="handleCurrentChange" :current-page="currentPage4"
                :page-sizes="[10]" :page-size="howStrip" layout="total, sizes, prev, pager, next, jumper" :total="how">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import http from '@/api/http.js'
    import {
        formatDate
    } from '@/api/time.js'
    export default {
        inject: ['reload'],
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                array: '',
                how: 0, //多少条
                howStrip: 0,
                typec: {
                    0: '首页banner',
                    1: '找职位banner',
                    2: '找精英banner',
                    3: '行业大图',
                },
                currentPage4: 1,
                industry: '', //行业大图
                onLine: '', //上线下线
                article: '',
                author: '',
                title: '',
                cc:'',
            };
        },
        methods: {
            colorSs() { //搜索
                let time = function (time) {
                    if (isNaN(new Date(time).getTime()) == true) {
                        return ''
                    } else {
                        return new Date(time).getTime()
                    }
                }
                let array = {
                    title: this.title,
                    author: this.author,
                    startAt: time(this.value1),
                    endAt: time(this.value2),
                    type: this.industry,
                    status: this.onLine,
                    page: '1',
                    size: this.howStrip,         
                }
                console.log(array)
                http.getList(array)
                    .then(res => {
                        console.log(res)
                        this.array = res.data.data.articleList
                        this.how = res.data.data.total
                        this.howStrip = res.data.data.size
                    })
            },
            clear() {
                this.reload();
                this.$router.push('article')
            },
            skip() { //新增
                this.$router.push('newly')
            },
            handleCurrentChange(val) { //分页
                let params = {
                    page: val
                }
                 let time = function (time) {
                    if (isNaN(new Date(time).getTime()) == true) {
                        return ''
                    } else {
                        return new Date(time).getTime()
                    }
                }
                let a ={
                     startAt: time(this.value1),
                    endAt: time(this.value2),
                    title: this.title,
                    author: this.author,
                     type: this.industry,
                    status:this.onLine
                }
                Object.assign(a,a,params)
                http.getList(a)
                    .then(res => {
                        this.array = res.data.data.articleList
                        console.log(this.array)
                        console.log(res)
                    })
                console.log(`当前页: ${val}`);
            },
            cancel(array) { //删除
                let r = confirm('确定删除吗？')
                if (r == true) {
                    http.id(array)
                        .then(res => {
                            if (res.data.code == 0) {
                                alert('删除成功')
                                this.reload();
                                this.$router.push('article')
                            } else(
                                alert('删除失败')
                            )
                            console.log(res)
                        })
                    return true
                }
            },
            cancelPop(app) { //上线 下线
                console.log(app.status)
                console.log(app.id)
                let f = confirm('是否执行操作？')
                if (f == true) {
                    if (app.status == 2) {
                        let statusIdc = {
                            id: app.id,
                            status: 1,
                        }
                        http.statusId(statusIdc)
                            .then(res => {
                                console.log(res)
                            })
                        this.reload();
                        this.$router.push('article')
                    } else {
                        let statusIdc = {
                            id: app.id,
                            status: 2,
                        }
                        http.statusId(statusIdc)
                            .then(res => {
                                console.log(res)
                            })
                        this.reload();
                        this.$router.push('article')
                    }
                }
            },
            redact(redactc) { //编辑
                this.$router.push({
                    path: 'newly',
                    query: {
                        id: redactc.id
                    }
                })

            }
        },
        created() { //初始状态
            http.getList()
                .then(res => {
                    console.log(res)
                    console.log(res.data.data.articleList)
                    this.array = res.data.data.articleList
                    this.how = res.data.data.total
                    this.howStrip = res.data.data.size

                })
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
            }
        },
    }
</script>
<style lang="scss">
    .searchMenu {
        background-color: #fff;
        border-color: #ddd;
        border: 1px solid transparent;
    }

    .overall {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .side {
        height: 100vh;
        background-color: #f5f5f5;

        .search {
            background-color: #fff;
            border-radius: 3px;
            border: 1px solid transparent;
            height: 160px;
            padding: 15px;
        }

        .dropdown {
            width: 218px;
            height: 38px;
            border-radius: 3px;
            margin-left: 15px;
            border: 1px solid #DCDFE6;
        }

        .STATE {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 67px;

            .color-qc {
                border: 0;
                color: #fff;
                background-color: #d9534f;
                width: 60px;
                height: 30px;
                border-radius: 5px;
            }

            .color-ss {
                width: 60px;
                height: 30px;
                border-radius: 5px;
                color: #fff;
                background-color: #5cb85c;
                border: 0;
                margin-left: 25px;
            }

            .import {
                width: 218px;
                height: 38px;
                border-radius: 3px;
                border: 1px solid #DCDFE6;
            }
        }
    }

    .breadth {
        width: 218px;
        height: 38px;
        border-radius: 3px;
        border: 1px solid #DCDFE6;
    }

    .list {
        margin-top: 20px;
        font-size: 1vw;
        background-color: #fff;
        border: 1px solid transparent;
        border-color: #ddd;
        border-radius: 5px;

        .newly {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            padding: 10px 15px;
            border-bottom: 1px solid transparent;
            background-color: #f5f5f5;
            border-color: #ddd;

            .increased {
                padding: 5px;
                border-radius: 3px;
                color: #fff;
                border: 1px solid;
                background-color: #5cb85c;
                border-color: #4cae4c;
            }
        }

        .fieid {
            margin: 15px;

            th {
                padding: 15px 10px;
                border-bottom: 1px solid #ddd;

                a {
                    text-decoration: none;
                }
            }
        }
    }
</style>