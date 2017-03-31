<template>
    <div class="nav_menu">
        <nav>
            <div class="nav toggle">
                <a id="menu_toggle"> <i class="fa fa-bars"></i>
                </a>
            </div>
            <p class="navbar-text" v-show='subtitle'>{{subtitle}}</p>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false"> <i class="fa fa-user provider-code"></i> 欢迎您，{{nickName}}
                        <span class=" fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                        <li>
                            <a href="#">
                                <i class="fa fa-sign-out pull-right"></i> 退出登录
                            </a>
                        </li>
                    </ul>
                </li>
                <li role="presentation" class="dropdown">
                    <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                        <i class="fa fa-envelope-o"></i>
                        <span class="badge bg-green">6</span>
                    </a>
                    <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                        <li>
                            <a>
                                <span>
									<span>John Smith</span>
                                <span class="time">3 mins ago</span>
                                </span>
                                <span class="message">
									Film festivals used to be do-or-die moments for movie makers. They were where...
								</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>
									<span>John Smith</span>
                                <span class="time">3 mins ago</span>
                                </span>
                                <span class="message">
									Film festivals used to be do-or-die moments for movie makers. They were where...
								</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name: "top-bar",
    data() {
        return {
            nickName: "数据产品研发部"
                // subtitle:"大数据应用服务平台"
        }
    }
}
</script>
<style lang="less" scoped>
.navbar-text {
    font-size: 18px;
}
</style>
