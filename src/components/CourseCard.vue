<template>
    <section>
        <el-row class="inline">
            <h3>{{course.subject}}</h3>&nbsp;<h3>{{course.course}}</h3>
        </el-row>
        <el-row class="inline">
            <h1>{{course.title}}</h1>
        </el-row>
        <template v-if="averageRating">
            <el-rate
                class="rate"
                v-model="averageRating"
                disabled
                show-score
                text-color="#ff9900"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                score-template="{value}">
            </el-rate>
        </template>
        <template v-if="averageGpa">
            <div class="rate inline">
                <p class="light">Averate GPA</p><p :style="{ color: colorMap1[averageGpa * 10] }">{{averageGpa}}</p>
            </div>
        </template>
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

export default {
    name: 'CourseCard',

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
            averageRating: 0,
            averageGpa: 0
        };
    },

    mounted () {
        if (this.course.averageRating) {
            this.averageRating = this.course.averageRating.toFixed(1);
        }
        if (this.course.averageGpa) {
            this.averageGpa = this.course.averageGpa.toFixed(1);
        }
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

p {
    margin: 0;
}

.light {
    font-weight: 200;
    font-size: 0.65rem;
    padding-right: .5rem;
}

.rate {
    position: absolute;
    bottom: 15px;
    right: 15px;
}
</style>
