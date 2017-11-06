<template>
    <div id="app">
        <Navigator></Navigator>
        <section id="core">
            <transition name="el-fade-in-linear">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>

<script>
import Navigator from './components/Navigator';

export default {
    name: 'app',

    components: { Navigator }
};
</script>

<style lang="less">
@import './styles/index.less';

html, body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
}

#core {
    background: #fff;
    transition: left .3s ease-in-out;

    max-width: 100%;
    background: #fefefe;
    left: 270px;
    right: 0;
    display: flex;
    flex-direction: column;
    will-change: left,right;

    position: absolute;
    top: 0;
    bottom: 0;
    transition: left .3s ease-in-out,right .3s ease-in-out,max-width .3s ease-in-out,width .3s ease-in-out,box-shadow .3s ease-in-out;
}

// Override

button {
    border: 0 !important;
    transition: background .1s ease-in-out, color .1s ease-in-out, box-shadow .1s ease-in-out;
    box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 1px 0 rgba(0,0,0,.1);

    &:hover {
        background: 0;
        box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 2px 10px rgba(0,0,0,.1);
    }

    &.long {
        width: 100%;
    }
}

input:not(:focus) {
    border: solid 1px transparent;
    box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 1px 0 rgba(0,0,0,.1);
    &:hover {
        box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 1px 5px rgba(0,0,0,.1);
    }
}
input:focus {
    box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 2px 10px rgba(0,0,0,.1);
}

.el-message {
    margin-left: 135px;
}

ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
}

.full-list {
    li {
        padding: 10px;
        &:not(:first-child) {
            box-shadow: inset 0 0.5px 0 rgba(0,0,0,.15);
        }
        cursor: pointer;
        transition: background .1s ease-in-out, color .1s ease-in-out, box-shadow .1s ease-in-out;
        &.clickable:hover {
            background: rgba(0,0,0,.03);
            box-shadow: 0 0 0 0.5px rgba(0,0,0,.16), 0 2px 10px rgba(0,0,0,.1);
        }
    }
}
</style>
