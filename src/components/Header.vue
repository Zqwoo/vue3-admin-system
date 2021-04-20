<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <a href="#" target="_blank">
                                <el-dropdown-item>项目仓库</el-dropdown-item>
                            </a>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    computed: {
        //
        username() {
            // 这是从localStorage中取登录的用户名，这里后面可能要改，用户名的获取从store的个人信息库中获取，若没登录则不允许登入后台系统
            let username = localStorage.getItem("ms_username");
            return username ;
        },
        // 当前页面是否要折叠，从store中映射，点击后将取反的值通过store.commit进行mutation取反，
        collapse() {
            return this.$store.state.collapse;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            // 退出登录操作，后面换成js-cookie的删除操作
            if (command == "loginout") {
                localStorage.removeItem("ms_username");
                this.$router.push("/login");
            }
        },
        // 侧边栏折叠 ->进一步了解
        collapseChage() {
            this.$store.commit("hadndleCollapse", !this.collapse);
        }
    },
    mounted() {
        // 当页面加载时，计算是否可视宽度决定是否要折叠
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
