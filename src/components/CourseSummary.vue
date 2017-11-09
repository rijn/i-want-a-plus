<template>
    <section>
        <el-row class="inline">
            <h2>{{course.subject}}</h2>&nbsp;<h2>{{course.course}}</h2>&nbsp;&nbsp;<h1>{{course.title}}</h1>
        </el-row>
        <el-row class="inline info">
            <div class="inline padding">
                <p class="light">Averate GPA</p><p :style="{ color: course.averageGpa && colorMap1[course.averageGpa.toFixed(1) * 10] }">{{course.averageGpa ? course.averageGpa.toFixed(2) : '---'}}</p>
                <p class="light">Student Count</p><p :style="{ color: course.totalStudentCount && colorMap2[parseInt(100 - (course.totalStudentCount > 500 ? 100 : course.totalStudentCount / 5 / 1.5 + 33))] }">{{ course.totalStudentCount || '---' }}</p>
                <p class="light">Standard Deviation</p><p :style="{ color: course.sd && colorMap1[40 - course.sd.toFixed(1) * 10] }">{{ course.sd ? course.sd.toFixed(3) : '---' }}</p>
            </div>
        </el-row>
    </section>
</template>

<script>
import { Row, Col } from 'element-ui';
import colormap from 'colormap';
const colorMap1 = colormap({
    colormap: 'warm',
    nshades: 41,
    format: 'hex'
});
const colorMap2 = colormap({
    colormap: 'greens',
    nshades: 101,
    format: 'hex'
});

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
            colorMap1,
            colorMap2
        };
    },

    methods: {
    }
};
</script>

<style lang="less" scoped>
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
