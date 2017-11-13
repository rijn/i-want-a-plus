<template>
    <nav>
        <section v-for="(vgroup, group) in path">
            <div class="group">
                <div class="title">{{ group }}</div>
            </div>
            <router-link v-for="(r, link) in vgroup" :to="r.v" class="nav-link" active-class="active" :key="link">
                <span class="icon inactive"><i class="icon" :class="[r.icon]"></i></span>
                <span class="icon active"><i class="icon" :class="[r.iconActive]"></i></span>
                <div class="title">{{ link }}</div>
            </router-link>
        </section>
    </nav>
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
                        v: { name: 'Course' }
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
    }
};
</script>

<style lang="less" scoped>
nav {
    flex: 1;

    // div {
    //     flex: 1;
    //     overflow: hidden;
    //     overflow-y: auto;
    //     overflow-y: overlay;
    //     -webkit-overflow-scrolling: touch;
    //     position: relative;
    //     z-index: 1;
    //     min-height: 40%;
    // }
}
</style>
