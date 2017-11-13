<template>
    <el-container id="app">
        <el-aside width="230px" id="aside">
            <header>
                <router-link :to="{ path: '/' }" class="nav-link" active-class="active">
                    <div class="wrap">
                        I Want A+
                    </div>
                </router-link>
            </header>
            <Navigator />
            <footer>
                <section v-if="isLogin">
                    <a class="nav-link" @click="logout">
                        <span class="icon inactive"><i class="icon ion-ios-locked-outline"></i></span>
                        <div class="title">Logout</div>
                    </a>
                </section>
                <!-- About -->
            </footer>
        </el-aside>
        <el-main class="core">
            <transition name="el-fade-in-linear">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
import Navigator from './components/Navigator';
import { Container, Aside, Main } from 'element-ui';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'app',

    components: {
        'el-container': Container,
        'el-aside': Aside,
        'el-main': Main,
        Navigator
    },

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    methods: {
        ...mapActions('user', { logout: 'logout' })
    },

    mounted () {
        if (window.devicePixelRatio && devicePixelRatio >= 2) {
            var testElem = document.createElement('div');
            testElem.style.border = '.5px solid transparent';
            document.body.appendChild(testElem);
            if (testElem.offsetHeight === 1) {
                document.querySelector('html').classList.add('hairlines');
            }
            document.body.removeChild(testElem);
        }

        var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (isChrome) {
            document.querySelector('html').classList.add('chrome');
        }
    }
};
</script>

<style lang="less">
#aside {
    background-image: linear-gradient(180deg,#f8f5f2,#f7f5f4 18%,#f1f3f5 35%,#f7f5f0 68%,#f6f6f8);
    z-index: 10;
    will-change: transform;
    display: flex;
    display: -webkit-box;
    flex-direction: column;
    transition: transform .3s ease-in-out,width .3s ease-in-out;

    box-shadow: 1px 0 0 rgba(0, 0, 0, .1), 15px 0 25px -10px rgba(0, 0, 0, .05);
    // background: #f6f6f6;
    transform: translateX(0)!important;

    a {
        text-decoration: none;
        color: #000;
    }

    section {
        .group {
            cursor: default;
            margin-top: .75rem;
            padding-left: 20px;
            font-size: .8125rem;
            color: #767676;
            display: flex;
            align-items: center;
            .title {
                flex: 1;
                min-width: 0;
                height: 1.5rem;
                line-height: 1.5rem;
                padding-right: 16px;
            }
        }

        .nav-link {
            display: flex;
            align-items: center;
            position: relative;
            padding: .375rem 0;
            padding-left: 20px;
            padding-right: 9px;

            &:hover {
                background-color: rgba(0,0,0,.07);
            }

            span.icon.inactive {
                display: block;
            }
            span.icon.active {
                display: none;
            }

            &.active {
                background: #1988e0;
                color: #fff;
                span.icon.inactive {
                    display: none;
                }
                span.icon.active {
                    display: block;
                }
            }

            .icon {
                // opacity: 0.8;
                font-size: 1.5rem;
                margin-right: .3rem;
            }

            .title {
                flex: 1;
                min-width: 0;
                font-size: .875rem;
            }
        }
    }

    header {
        .wrap {
            height: 3rem;
            display: flex;
            align-items: center;
            padding-left: 21px;
            padding-right: 5px;
        }
    }

    footer {
        padding: .675rem 0;
        // padding-left: 20px;
        font-size: .875rem;
    }
}

html.hairlines.chrome #aside {
    box-shadow: inset -0.5px 0 0 rgba(0,0,0,.15);
}
</style>

<style lang="less">
@import './styles/index.less';

html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
}

#app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.core {
    padding: 0;
}

// #core {
//     background: #fff;
//     transition: left .3s ease-in-out;

//     max-width: 100%;
//     background: #fefefe;
//     left: 270px;
//     right: 0;
//     display: flex;
//     flex-direction: column;
//     will-change: left,right;

//     position: absolute;
//     top: 0;
//     bottom: 0;
//     transition: left .3s ease-in-out,right .3s ease-in-out,max-width .3s ease-in-out,width .3s ease-in-out,box-shadow .3s ease-in-out;
// }

// Override

.long {
    width: 100%;
}

button:not(.el-button--text) {
    transition: background .1s ease-in-out, color .1s ease-in-out, box-shadow .1s ease-in-out;

    border: 0 !important;
    box-shadow: 0 0 0 1px rgba(0,0,0,.16), 0 1px 0 rgba(0,0,0,.1);
    &:hover {
        box-shadow: 0 0 0 1px rgba(0,0,0,.16), 0 2px 10px rgba(0,0,0,.1);
    }
}

html.hairlines.chrome button:not(.el-button--text) {
    border: 0 !important;
    box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 1px 0 rgba(0,0,0,.1);
    &:hover {
        box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 2px 10px rgba(0,0,0,.1);
    }
}

html.hairlines.chrome input {
    border-width: 0.5px;
}

html.hairlines.chrome input:not(:focus) {
    border: solid 1px transparent;
    box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 1px 0 rgba(0,0,0,.1);
    &:hover {
        box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 1px 5px rgba(0,0,0,.1);
    }
}
html.hairlines.chrome input:focus {
    box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 2px 10px rgba(0,0,0,.1);
}

.el-input {
    padding: 2px;
}

.el-message {
    margin-left: 135px;
}

ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
}

.border.bottom {
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
}
html.hairlines.chrome .border.bottom {
    box-shadow: inset 0 -0.5px 0 rgba(0,0,0,.15);
}

.border.left {
    box-shadow: inset 1px 0 0 rgba(0,0,0,.15);
}
html.hairlines.chrome .border.left {
    box-shadow: inset 0.5px 0 0 rgba(0,0,0,.15);
}

.seperation-before-list {
    padding: 20px 10px 5px 10px;
    &:extend(.border.bottom);
    .title {
        font-size: 0.875rem;
    }
}

.clickable {
    cursor: pointer;
}

.full-list {
    li {
        padding: 10px;
        box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
        transition: background .1s ease-in-out, color .1s ease-in-out, box-shadow .1s ease-in-out;
        &.clickable:hover {
            background: rgba(0,0,0,.03);
        }
    }
}

html.hairlines.chrome .full-list li {
    box-shadow: inset 0 -0.5px 0 rgba(0,0,0,.15);
}

.full-list.no-divider li {
    box-shadow: none !important;
}

h1, h2 {
    font-weight: 300 !important;
    margin: 0 !important;
}
h1 { font-size: 1.4rem !important; font-weight: 200 !important; }
h2 { font-size: 1rem !important; }

.tip {
    font-size: 0.75rem;
    color: #ccc;
}

.inline > * {
    display: inline-block;
}
.inline.padding > *:not(:last-child) {
    padding-right: 0.5rem;
}

.el-tag + .el-tag {
    margin-left: 0.3rem;
}

.el-contianer {
    height: 100%;
}

.el-tabs__header {
    margin: 0 !important;
    border: 0 !important;
    &:extend(.border.bottom);
}
html.hairlines.chrome .el-tabs__header {
    box-shadow: inset 0 -0.5px 0 rgba(0,0,0,.15);
}

.el-tabs__nav {
    margin: 10px -10px 0 10px;
}

.el-tabs__item {
    height: 30px !important;
    line-height: 30px !important;
    padding: 0 15px !important;
    font-weight: 200 !important;
    font-size: 0.75rem !important;
}

.el-card__body > *:first-child {
    margin-top: 0;
}
</style>
