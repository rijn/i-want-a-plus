<template>
    <aside>
        <header>
            <router-link :to="{ path: '/' }" class="nav-link" active-class="active">
                <div class="wrap">
                    I Want A+
                </div>
            </router-link>
        </header>
        <div>
            <section v-for="(vgroup, group) in path">
                <div class="group">
                    <div class="title">{{ group }}</div>
                </div>
                <router-link v-for="(r, link) in vgroup" :to="r.v" class="nav-link" active-class="active">
                    <span class="icon inactive"><i class="icon" :class="[r.icon]"></i></span>
                    <span class="icon active"><i class="icon" :class="[r.iconActive]"></i></span>
                    <div class="title">{{ link }}</div>
                </router-link>
            </section>
        </div>
        <footer>
            <section v-if="isLogin">
                <a class="nav-link" @click="logout">
                    <span class="icon inactive"><i class="icon ion-ios-locked-outline"></i></span>
                    <div class="title">Logout</div>
                </a>
            </section>
            <!-- About -->
        </footer>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Navigator',

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    data () {
        return {
            path: {
                Discover: {
                    Course: {
                        icon: 'ion-ios-bookmarks-outline',
                        iconActive: 'ion-ios-bookmarks',
                        v: { path: 'course' }
                    },
                    Professor: {
                        icon: 'ion-ios-people-outline',
                        iconActive: 'ion-ios-people',
                        v: { path: 'professor' }
                    }
                },
                Account: {
                    Favorite: {
                        icon: 'ion-ios-star-outline',
                        iconActive: 'ion-ios-star',
                        v: { path: 'favorite' }
                    },
                    Notification: {
                        icon: 'ion-ios-alarm-outline',
                        iconActive: 'ion-ios-alarm',
                        v: { path: 'notification' }
                    },
                    Settings: {
                        icon: 'ion-ios-cog-outline',
                        iconActive: 'ion-ios-cog',
                        v: { path: 'settings' }
                    }
                }
            }
        };
    },

    methods: {
        ...mapActions('user', { logout: 'logout' })
    },

    mounted () {
        console.log(this.$api.version);
        this.$api.version.get().then(r => {
            this.response = r.body;
        });
    }
};
</script>

<style lang="less" scoped>
aside {
    position: absolute;
    top: 0;
    bottom: 0;

    left: 0;
    width: 270px;
    background-image: linear-gradient(180deg,#f8f5f2,#f7f5f4 18%,#f1f3f5 35%,#f7f5f0 68%,#f6f6f8);
    box-shadow: inset -1px 0 0 rgba(0,0,0,.1);
    z-index: 10;
    will-change: transform;
    display: flex;
    flex-direction: column;
    transition: transform .3s ease-in-out,width .3s ease-in-out;

    box-shadow: inset -0.5px 0 0 rgba(0,0,0,.15);
    background: #f6f6f6;
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

    div {
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        overflow-y: overlay;
        -webkit-overflow-scrolling: touch;
        position: relative;
        z-index: 1;
        min-height: 40%;
    }

    footer {
        padding: .675rem 0;
        // padding-left: 20px;
        font-size: .875rem;
    }
}
</style>
