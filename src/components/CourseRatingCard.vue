<template>
    <section>
        <el-row class="inline">
            <h3>{{course.subject}}</h3>&nbsp;<h3>{{course.course}}</h3>
        </el-row>
        <el-row class="inline">
            <h1>{{course.title}}</h1>
        </el-row>
        <el-rate
            class="rate"
            v-model="course.averageRating && course.averageRating.toFixed(1)"
            disabled
            show-score
            text-color="#ff9900"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            score-template="{value}">
        </el-rate>
    </section>
</template>

<script>
import { Row, Col, Rate } from 'element-ui';

export default {
    name: 'CourseSummary',

    props: {
        course: {
            type: Object
        }
    },

    components: {
        'el-row': Row,
        'el-col': Col,
        'el-rate': Rate
    },

    data () {
        return {
        };
    },

    methods: {
    }
};
</script>

<style lang="less" scoped>
section {
    border: solid 1px #ddd;
    padding: 15px;
    border-radius: 15px;
    position: relative;
    background: #fff;
}

h3 {
    margin: 0;
    font-size: 1rem;
}

.info {
    padding-top: 0.3rem;
    p {
        font-size: 0.9rem;
        margin: 0;
        &.light {
            font-weight: 200;
            font-size: 0.65rem;
        }
    }
}

.rate {
    position: absolute;
    bottom: 15px;
    right: 15px;
}
</style>
