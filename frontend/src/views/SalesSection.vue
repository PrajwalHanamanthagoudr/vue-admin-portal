<template>
    <v-row>
        <v-col cols="12" md="4" v-for="(card, index) in cards" :key="index">
            <v-card hover variant="flat" class="card-style" style="height: 300px;">
                <v-card-text>
                    <div class="d-flex justify-space-between mb-2">
                        <div>
                            <h4>{{ card.title }}</h4>
                            <p class="text-subtitle-2" v-if="card.title === 'Registered users'" style="color: #97a3b6;">
                                an overview of your users</p>
                        </div>
                        <v-icon color="#97A3B6">mdi-dots-horizontal</v-icon>
                    </div>
                    <div :id="'chart-' + index" style="width:100%; height: 230px;"></div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            cards: [
                { title: 'Sales by Region' },
                { title: 'Sales by e-commerce platform' },
                { title: 'Registered users' }
            ],
            charts: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initCharts();
        });
    },
    methods: {
        initCharts() {
            // Radar Chart - Sales by Region
            const radarChart = echarts.init(document.getElementById('chart-0'));
            radarChart.setOption({
                radar: {
                    indicator: [
                        { name: 'Europe 2,728', max: 4000 },
                        { name: 'America 2,409', max: 4000 },
                        { name: 'Africa 3,028', max: 4000 },
                        { name: 'Middle East 800', max: 4000 },
                        { name: 'Pacific 1,8383', max: 4000 },
                        { name: 'Asia 2,843', max: 4000 }
                    ]
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: [2728, 2409, 3028, 800, 1838, 2843],
                        areaStyle: {
                            color: 'rgba(0, 150, 136, 0.2)'
                        },
                        lineStyle: {
                            color: '#009688'
                        }
                    }]
                }]
            });

            // Pie Chart - Sales by Platform
            const pieChart = echarts.init(document.getElementById('chart-1'));
            pieChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}%'
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                        { value: 25, name: 'Tokopedia', itemStyle: { color: '#009688' } },
                        { value: 45, name: 'Alibaba', itemStyle: { color: '#FF9800' } },
                        { value: 35, name: 'Amazon', itemStyle: { color: '#9E9E9E' } },
                    ],
                    label: {
                        formatter: '{b}\n{c}%'
                    }
                }]
            });

            // Gauge Chart - Registered Users
            const gaugeChart = echarts.init(document.getElementById('chart-2'));
            gaugeChart.setOption({
                series: [{
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    min: 0,
                    max: 2500,
                    splitNumber: 5,
                    itemStyle: {
                        color: '#009688'
                    },
                    progress: {
                        show: true,
                        roundCap: true,
                        width: 18
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        roundCap: true,
                        lineStyle: {
                            width: 18
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        offsetCenter: [0, '0%'],
                        fontSize: 24,
                        formatter: '{value}',
                        color: 'inherit'
                    },
                    data: [{
                        value: 2324,
                        name: 'Total Users',
                        title: {
                            offsetCenter: [0, '-35%']
                        },
                        detail: {
                            offsetCenter: [0, '0%']
                        }
                    }]
                }]
            });

            this.charts = [radarChart, pieChart, gaugeChart];
        }
    },
    beforeDestroy() {
        this.charts.forEach(chart => {
            chart.dispose();
        });
    }
};
</script>

<style scoped>
.card-style {
    border: 1px solid gainsboro;
    border-radius: 10px;
}
</style>