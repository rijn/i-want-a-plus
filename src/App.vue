<template>
    <el-container id="app">
        <iwap-aside></iwap-aside>
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
import { Container, Main } from 'element-ui';
import Aside from './components/Aside';

export default {
    name: 'App',

    components: {
        'el-container': Container,
        'el-main': Main,
        'iwap-aside': Aside
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
    &.restrict-width {
        max-width: 600px;
    }
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

.main-page {
    position: absolute;
    left: 230px;
    right: 0;
    top: 0;
    bottom: 0;
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

.infobox {
    padding: 1rem;
}

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
