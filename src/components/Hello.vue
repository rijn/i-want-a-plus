<template>
    <el-container id="hello" direction="vertical">
        <vue-particles
            class="particles"
            shapeType="triangle"
            :particlesNumber="40"
            :linesWidth="1"
            :particleSize="5"
            :linesDistance="200"
            :moveSpeed="2"
            :hoverEffect="false"
            :clickEffect="false"
        ></vue-particles>
        <el-header class="header">
            <h1>Top Rating Courses</h1>
        </el-header>
        <div class="main-container">
            <ul>
                <li v-for="course in courses">
                    <div class="container">
                        <CourseCard :course="course" class="clickable" @click.native="handleClickCourseRating(course.id)"></CourseCard>
                    </div>
                </li>
            </ul>
        </div>
        <el-header class="header">
            <h1>Top GPA Courses</h1>
        </el-header>
        <div class="main-container">
            <ul>
                <li v-for="course in courses_gpa">
                    <div class="container">
                        <CourseCard :course="course" class="clickable" @click.native="handleClickCourseRating(course.id)"></CourseCard>
                    </div>
                </li>
            </ul>
        </div>
    </el-container>
</template>

<script>
import { Container, Header, Main } from 'element-ui';
import Logo from './Logo';
import CourseCard from './CourseCard';
import _ from 'lodash';

export default {
    name: 'Hello',

    components: {
        'el-container': Container,
        'el-header': Header,
        'el-main': Main,
        Logo,
        CourseCard
    },

    data () {
        return {
            response: null,
            courses: [],
            courses_gpa: []
        };
    },

    methods: {
        handleClickCourseRating (courseId) {
            this.$router.push({ path: `/course/${courseId}/overview` });
            // this.$router.push({ name: 'CourseOverviewPage', params: { courseId } });
        }
    },

    mounted () {
        this.$api.top.rating.get().then(({ body }) => {
            this.courses = _.sampleSize(body, 20);
        });
        this.$api.top.gpa.get().then(({ body }) => {
            console.log(body);
            this.courses_gpa = _.sampleSize(body, 20);
        });
    }
};
</script>

<style lang='less' scoped>
#hello {
    flex: 1;

    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-container {
    width: 100%;
    z-index: 1;
}

.header {
    padding: 3rem 0 1rem 30px;
    width: 100%;
    text-align: left;
    h1 {
        font-weight: 600 !important;
    }
    z-index: 1;
}

.particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 5px;

    z-index: 0;
}

.clickable {
    transition: box-shadow .3s;
    &:hover {
        box-shadow: 0 0 50px 0px rgba(0,0,0,.16);
    }
}

ul {
    padding: 20px;
    li {
        width: 50%;
        display: inline-block;
        float: left;
        .container {
            padding: 10px;
        }
    }
}

</style>
