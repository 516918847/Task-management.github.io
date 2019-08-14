<template>
    <div>
        <div class="menu">
            <div class="number">管理员</div>
            <div class="number  account">admin</div>
            <div class="number">
                <img @click="quit" class="off" src="../assets/logo4.png" alt="">
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            quit() {
                this.$router.push('/')
            }
        }
    }
</script>
<style lang="scss">
    .radish {
        color: #fff;
        font-size: 20px;
        padding: 10px 0;
        border-bottom: 1px solid;
        text-align: center;
    }

    .menu {
        display: flex;
        justify-content: flex-end;
        height: 47px;
        line-height: 47px;
        color: #337ab7;
        background-color: #fff;

        .number {
            width: 100px;
            text-align: center;

            &:hover {
                background-color: #eee;
            }

            .off {
                margin-top: 15px;
            }
        }

        .account {
            border-left: 2px solid #e8e8e8;
            border-right: 2px solid #e8e8e8;

        }
    }
</style>