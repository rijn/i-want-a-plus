<template>
    <section>
        <el-row class="inline">
            <h2>{{section.year}}</h2>&nbsp;<h2>{{section.term}}</h2>&nbsp;&nbsp;<h1>{{section.crn}}</h1>
            <span v-if="section.CurrentSection" class="availability">
                <i class="icon ion-close" style="color: #FA5555;" v-if="section.CurrentSection.availability === 3"></i>
                <i class="icon ion-checkmark" style="color: #67C23A;" v-else></i>
            </span>
        </el-row>
        <el-row class="inline info">
            <div class="inline padding">
                <p class="light">Averate GPA</p><template><p v-if="section.PastSection && section.PastSection.averageGpa" :style="{ color: colorMap1[section.PastSection.averageGpa.toFixed(1) * 10] }">{{section.PastSection.averageGpa.toFixed(2)}}</p><p v-else>---</p></template>
                <p class="light">Student Count</p><p>{{ section.PastSection ? section.PastSection.totalStudentCount : '---' }}</p>
                <p class="light">Instructor</p><template v-for="professor in section.Professors"><router-link :to="{ name: 'ProfessorOverviewPage', params: { id: professor.id } }"><el-tag type="info" size="mini">{{ professor.lastName + ', ' + professor.firstName }}</el-tag></router-link></template>
            </div>
        </el-row>
    </section>
</template>

<script>
import { Row, Col, Tag } from 'element-ui';
import colormap from 'colormap';
const colorMap1 = colormap({
    colormap: 'warm',
    nshades: 41,
    format: 'hex'
});

export default {
    name: 'SectionSummary',

    props: {
        section: {
            type: Object
        }
    },

    components: {
        'el-row': Row,
        'el-col': Col,
        'el-tag': Tag
    },

    data () {
        return {
            colorMap1
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
.availability {
    padding-left: .5rem;
}
</style>
