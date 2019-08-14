<template>
    <el-aside width="300px" style="">
        <div>
            <div class="radish">萝卜多后台管理系统</div>
            <div class="menus" @click="pull" :style="pullBorder">
                <img src="../assets/logo5.png" alt="">
                <div>后台管理</div>
                <div class="point" :style="pullTransform"></div>
            </div>
            <ul class="accordion" v-if='seen'>
                <li class="distance">模块管理</li>
                <li class="distance">角色管理</li>
                <li class="distance">密码管理</li>
                <li class="distance">账户管理</li>
            </ul>
            <div class="menus" @click="pull1" :style="pullBorder1">
                <img src="../assets/logo5.png" alt="">
                <div>信息管理</div>
                <div class="point" :style="pullTransform1"></div>
            </div>
            <ul class="accordion" v-if='seen1'>
                <li class="distance">公司列表</li>
                <li class="distance">职位列表</li>
            </ul>
            <div class="menus" @click="pull2" :style="pullBorder2">
                <img src="../assets/logo5.png" alt="">
                <div>内容管理</div>
                <div class="point" :style="pullTransform2"></div>
            </div>
            <ul class="accordion" v-if='seen2'>
                <li class="distance" @click="article">Article列表</li>
            </ul>

        </div>
        </div>
    </el-aside>
</template>
<script>
    export default {
        data() {
            return {
                seen: false,
                seen1: false,
                seen2: false,
                pullBorder: '',
                pullBorder1: '',
                pullBorder2: '',
                pullTransform: '',
                pullTransform1: '',
                pullTransform2: '',
            }
        },
        methods: {
            pull: function () {
                this.seen = !this.seen
                this.seen1 = false
                this.seen2 = false
                if (this.seen == true) {
                    this.pullBorder = {
                        borderLeft: 'solid'
                    }
                    this.pullTransform = {
                        transform: 'rotate(-135deg)'
                    }
                    this.pullBorder1 = ''
                    this.pullTransform1 = {
                        transform: 'rotate(-45deg)'
                    }
                    this.pullBorder2 = ''
                      this.pullTransform2 = {
                        transform: 'rotate(-45deg)'
                    }
                } else {
                    this.pullBorder = ''
                    this.pullTransform = {
                        transform: 'rotate(-45deg)'
                    }
                }
            },
            pull1: function () {
                this.seen1 = !this.seen1
                this.seen = false
                this.seen2 = false
                if (this.seen1 == true) {
                    this.pullBorder1 = {
                        borderLeft: 'solid',

                    }
                    this.pullTransform1 = {
                        transform: 'rotate(-135deg)'
                    }
                    this.pullBorder = ''
                    this.pullTransform = {
                        transform: 'rotate(-45deg)'
                    }
                    this.pullBorder2 = ''
                      this.pullTransform2 = {
                        transform: 'rotate(-45deg)'
                    }
                } else {
                    this.pullBorder1 = ''
                    this.pullTransform1 = {
                        transform: 'rotate(-45deg)'
                    }
                }
            },
            pull2: function () {
                this.seen2 = !this.seen2
                this.seen = false
                this.seen1 = false
                if (this.seen2 == true) {
                    this.pullBorder2 = {
                        borderLeft: 'solid'
                    }
                     this.pullTransform2 = {
                        transform: 'rotate(-135deg)'
                    }
                    this.pullBorder = ''
                    this.pullTransform = {
                        transform: 'rotate(-45deg)'
                    }
                    this.pullBorder1 = ''
                    this.pullTransform1 = {
                        transform: 'rotate(-45deg)'
                    }
                } else {
                    this.pullBorder2 = ''
                      this.pullTransform2 = {
                        transform: 'rotate(-45deg)'
                    }
                }
            },
            article() {
                this.$router.push({
                    name: 'article',
                })
            },
            quit() {
                this.$router.push('/')
            },
           
        }
    }
</script>
<style lang="scss">
    .menus {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 35px;
        color: #fff;
        padding: 10px 0;

        .point {
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            height: 10px;
            width: 10px;
            transform: rotate(-45deg);
        }
    }

    .accordion {
        list-style-type: none;
        text-align: center;
        padding: 0;
        color: #fff;

        .distance {
            margin-top: 15px;
        }
    }
</style>