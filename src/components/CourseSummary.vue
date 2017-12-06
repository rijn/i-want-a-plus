<template>
    <section>
        <el-row class="inline">
            <h2>{{course.subject}}</h2>&nbsp;<h2>{{course.course}}</h2>&nbsp;&nbsp;<h1>{{course.title}}</h1>
        </el-row>
        <el-row class="inline info">
            <div class="inline padding">
                <p v-if="course.averageRating">
                    <el-rate
                        class="small-rate"
                        v-model="course.averageRating && course.averageRating.toFixed(1)"
                        disabled
                        show-score
                        text-color="#ff9900"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                        score-template="{value}">
                    </el-rate>
                </p>
                <p class="light">Averate GPA</p><p :style="{ color: course.averageGpa && colorMap1[course.averageGpa.toFixed(1) * 10] }">{{course.averageGpa ? course.averageGpa.toFixed(2) : '---'}}</p>
                <p class="light">Student Count</p><p :style="{ color: course.totalStudentCount && colorMap2[parseInt(100 - (course.totalStudentCount > 500 ? 100 : course.totalStudentCount / 5 / 1.5 + 33))] }">{{ course.totalStudentCount || '---' }}</p>
                <p class="light">Standard Deviation</p><p :style="{ color: course.sd && colorMap1[40 - course.sd.toFixed(1) * 10] }">{{ course.sd ? course.sd.toFixed(3) : '---' }}</p>
            </div>
        </el-row>
    </section>
</template>

<script>
import { Row, Col, Rate } from 'element-ui';
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
        'el-col': Col,
        'el-rate': Rate
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
        font-size: 0.9rem;
        margin: 0;
        &.light {
            font-weight: 200;
            font-size: 0.65rem;
        }
    }
}
</style>

<style lang="less">
.small-rate {
    i {
        font-size: 12px;
    }
    .el-rate__icon {
        margin-right: 1px;
    }
    .el-rate__text {
        margin-left: 0.2rem;
        font-size: 0.9rem;
        line-height: auto;
    }
}
</style>
