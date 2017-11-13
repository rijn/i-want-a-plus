<template>
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
            <section v-if="isLogin" class="clickable">
                <a class="nav-link" @click="logout">
                    <span class="icon inactive"><i class="icon ion-ios-locked-outline"></i></span>
                    <div class="title">Logout</div>
                </a>
            </section>
            <!-- About -->
        </footer>
    </el-aside>
</template>

<script>
import Navigator from './Navigator';
import { Aside } from 'element-ui';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Aside',

    components: {
        'el-aside': Aside,
        Navigator
    },

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    methods: {
        ...mapActions('user', { logout: 'logout' })
    }
};
</script>

<style lang="less" scoped>
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
}

#aside, #aside /deep/ nav {
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

            &.disabled {
                cursor: default;
                color: #ccc;
            }

            &:not(.disabled):hover {
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
                &:not(.disabled):hover {
                    background-color: fade(#1988e0, 90%);
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
