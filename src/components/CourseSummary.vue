<template>
    <section>
        <el-row class="inline">
            <h2>{{course.subject}}</h2><h2>{{course.course}}</h2><h1>{{course.title}}</h1>
        </el-row>
        <el-row class="inline info">
            <div class="inline"><p class="light">Averate GPA</p><p :style="{ color: colorMap[course.averageGpa.toFixed(1) * 10] }">{{course.averageGpa.toFixed(2)}}</p></div>
        </el-row>
    </section>
</template>

<script>
import { Row, Col } from 'element-ui';
import colormap from 'colormap';

export default {
    name: 'CourseSummary',

    props: {
        course: {
            type: Object
        }
    },

    components: {
        'el-row': Row,
        'el-col': Col
    },

    data () {
        return {
            colorMap: colormap({
                colormap: 'warm',
                nshades: 41,
                format: 'hex'
            })
        };
    },

    methods: {
    }
};
</script>

<style lang="less" scoped>
h1, h2 {
    font-weight: 300;
    margin: 0;
}
h1 { font-size: 1.4rem; font-weight: 200; }
h2 { font-size: 1rem; }

.inline {
    & > * {
        display: inline-block;
        padding-right: 0.5rem;
    }
}
.info {
    padding-top: 0.3rem;
    p {
        margin: 0;
        &.light {
            font-weight: 200;
            font-size: 0.675rem;
        }
    }
}
</style>
