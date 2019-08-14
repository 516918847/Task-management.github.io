<template>
    <div>
        <div style="border:1px solid #ddd;font-weight: bold">
            <div style="padding: 11px 11px;border-bottom: 1px solid #ddd;">{{Article}}</div>
            <div class="newly">
                <div class="name">
                    <span>标题名称</span>
                    <input v-model="biaoti" class="headline" type="text">
                </div>
                <div style="margin-bottom:25px">
                    <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
                    <span>
                        <select v-model="type" style="height: 31px;margin-left: 11px;" name="" id="" @change="ab">
                            <option value="">全部</option>
                            <option value="0">首页Banner</option>
                            <option value="1">找职位Banner</option>
                            <option value="2">找精英Banner</option>
                            <option value="3">行业大图</option>
                        </select>
                    </span>
                    <span v-if="c">
                        <select v-model="industry" style="height: 31px; margin-left: 11px; width:105px" name="" id="">
                            <option value="">请选择</option>
                            <option value="0">移动互联网</option>
                            <option value="1">电子商务</option>
                            <option value="2">企业服务</option>
                            <option value="3">020</option>
                            <option value="4">教育</option>
                            <option value="5">金融</option>
                            <option value="6">游戏</option>
                        </select>
                    </span>
                </div>
                <div class="name">
                    <span>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</span>
                    <!-- <input v-model="content" class="headline" type="text"> -->
                    <div class="edit_container">
                        <quill-editor v-model="content" ref="myQuillEditor" @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)" @change="onEditorChange($event)">
                        </quill-editor>
                    </div>
                </div>
                <div class="name">
                    <span>跳转链接</span>
                    <input v-model="url" class="headline" type="text">
                </div>
                <div class="preview">
                    <span>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图</span>
                    <span>
                        <label class="paper" for="file">选择文件</label>
                        <input type="file" value="2" ref="file" @change="getFile" id="file" accept="image/*"
                            style="display:none">
                    </span>
                </div>
                <div>
                    <img v-if="gg" :src="src" style="width:50%" alt="">
                </div>
                <div class="schedule">
                    <table style="width:100%;table-layout: fixed;">
                        <thead>
                            <tr>
                                <th>图片名</th>
                                <th>文件大小</th>
                                <th>进度</th>
                                <th>操作</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th>
                                    <span>{{name}}</span>
                                </th>
                                <th>{{imgSize}}</th>
                                <th>
                                    <div v-if="bb" class="progress">
                                        <div :style="ss" class="progress-bar">
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div v-if="ee" class="furrow">
                                        <div class="furrow-a">

                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div v-if="bb">
                                        <button @click="oo"
                                            style="color: #fff;background-color: #5cb85c;border-color: #4cae4c;border:1px solid">上传</button>
                                        <button @click='rr'
                                            style="color: #fff;background-color: #d9534f; border-color: #d43f3a;border:1px solid">删除</button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="confirm">
                    <div>
                        <button @click="pop(2)" :disabled='scope' :style="hue" class="draft">立即上线</button>
                        <button @click="pop(1)" :disabled='scope' :style='hue' class="draft">存为草稿</button>
                    </div>
                    <button @click="cancel" style="background-color: #fff;border: 1px solid #ddd;">取消</button>
                </div>
                <!-- <div v-html="obj.content">{{content}}</div> -->
            </div>
        </div>
    </div>
</template>
<script>
    import http from "@/api/http.js"
    export default {
        data() {
            return {
                src: '', //图片
                content: '', //说明
                biaoti: '', //标题
                url: '', //跳转     
                type: '', //类型
                industry: '', //行业大图
                urll: '', //图片地址
                c: false,
                name: '', //图片名字
                imgSize: '', //图片大小
                bb: false,
                ss: '',
                gg: false,
                ee: false,
                file: '', //转换图片
                Article: '', //页面转换
                hue: '', //颜色
                createAt: '', //创建时间
                // obj:{
                //     biaoti:'',
                //     content:''
                // }

            }
        },
        computed: {

            editor() {
                return this.$refs.myQuillEditor.quill;
            },
            scope() {
                if (this.$route.query.id) {
                    if (this.content == '' && this.biaoti == '' && this.url == "" && this.type == '' && this.urll ==
                        '') {}
                } else {
                    if (this.content == '' || this.biaoti == '' || this.url == "" || this.type == '' || this.urll ==
                        '') {
                        this.hue = {
                            backgroundColor: '#686868'
                        }
                        return true
                    } else {
                        this.hue = {
                            backgroundColor: '#4cae4c'
                        }
                    }
                }
            }

        },
        methods: {
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur() {}, // 失去焦点事件
            onEditorFocus() {}, // 获得焦点事件
            onEditorChange() {}, // 内容改变事件
            saveHtml: function (event) {
                alert(this.content);
            },
            escapeStringHTML(str) {
                str = str.replace(/&lt;/g, '<');
                str = str.replace(/&gt;/g, '>');
                return str;
            },
            getFile(e) {
                let _this = this
                var files = e.target.files[0]
                if (!e || !window.FileReader) return // 看支持不支持FileReader
                let reader = new FileReader()
                reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.src = this.result
                }
                this.name = e.target.files[0].name
                let aaa = e.target.files[0]
                this.imgSize = ((e.target.files[0].size) / (1024 * 1024)).toFixed(2) + 'mb'
                this.file = e.target.files[0]
                console.log(this.imgSize)
                console.log(aaa)
                if (this.imgSize === '') {
                    this.bb = false
                } else {
                    this.bb = true
                }
            },
            cancel() {
                this.$router.push('article')
            },
            ab() {
                if (this.type === '3') {

                    this.c = true
                } else {
                    this.c = false

                }
                console.log(this.type)
            },
            oo() {
                this.ss = {
                    width: '100%'
                }
                this.gg = true
                this.ee = true
                let fd = new FormData();
                fd.append('file', this.file)
                http.file(fd)
                    .then(res => {
                        console.log(res)
                        console.log(res.data.data.url)
                        this.urll = res.data.data.url
                    })
            },
            rr() {
                this.src = '',
                    this.bb = false,
                    this.name = '',
                    this.imgSize = '',
                    this.urll = '',
                    this.gg = false,
                    this.ee = false,
                    this.ss = {
                        width: '0'
                    }

            },
            pop(index) {
                if (this.$route.query.id) {
                    let article = {
                        img: this.src,
                        type: this.type,
                        createAt: this.createAt,
                        title: this.biaoti,
                        status: index,
                        content: this.content,
                        url: this.url,
                        industry: this.industry

                    }
                    http.compile(this.$route.query.id, article)
                        .then(res => {
                            console.log(res)
                            if (res.data.code == 0) {
                                this.$router.push('article')
                                alert('编辑成功')
                            }
                        })
                } else {
                    let params = new FormData();
                    params.append('title', this.biaoti)
                    params.append('type', this.type)
                    params.append('status', index)
                    params.append('img', this.urll)
                    params.append('content', this.content)
                    params.append('url', this.url)
                    params.append('industry', this.industry)
                    http.newly(params)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.code === 0) {
                                this.$router.push('article')
                                alert('上传成功')
                            }

                        })
                }

            }
        },
        watch: {
            tiaozhuang: function () {
                console.log(this.tiaozhuang)
            },

        },
        created() {
            if (this.$route.query.id) {
                this.gg = true;
                this.Article = '编辑Article'
                http.article(this.$route.query.id)
                    .then(res => {
                        let article = res.data.data.article
                        if (article.type === 3) {
                            this.c = true
                        }
                        console.log(res)
                        console.log(article)
                        this.biaoti = article.title
                        this.type = article.type
                        this.src = article.img
                        this.url = article.url
                        this.content = article.content
                        this.createAt = article.createAt
                        this.industry = article.industry
                        console.log(this.industry)
                    })
            } else {
                this.Article = '新增Article'
            }
        }
    }
</script>
<style lang="scss">
    .newly {
        padding: 15px 80px;
        background-color: #fff;

        .name {
            margin-bottom: 25px;
            line-height: 43px;

            .headline {
                height: 17px;
                margin-left: 11px;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 7px;
                width: 50%;
            }
        }

        .schedule {
            margin-left: 75px;
            margin-right: 17.8rem;
        }

        .confirm {
            margin-left: 75px;
            margin-right: 17.8rem;
            display: flex;
            justify-content: space-between;
        }

        .draft {
            background-color: #5cb85c;
            border-color: #4cae4c;
            color: #fff;
            border: 1px solid;
            padding: 5px;
            border-radius: 4px;
        }

        .progress {
            height: 20px;
            background-color: #f5f5f5;
            border-radius: 4px;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);

            .progress-bar {
                height: 100%;
                background-color: #337ab7;
                border-radius: 3px;
                width: 0;
                transition: width .6s ease;
            }
        }

        .furrow {
            display: flex;
            justify-content: center;
            align-items: center;

            .furrow-a {
                width: 9px;
                height: 16px;
                border-color: #333;
                border-style: solid;
                border-width: 0 3px 3px 0;
                transform: rotate(45deg);

            }
        }

        th {
            word-break: break-all;
            word-wrap: break-word;
        }
    }

    .paper {
        margin-left: 11px;
        background-color: #337ab7;
        color: #fff;
        padding: 4px;
        border-radius: 4px;
    }

    .preview {
        height: 45px;
        line-height: 45px;
    }
</style>