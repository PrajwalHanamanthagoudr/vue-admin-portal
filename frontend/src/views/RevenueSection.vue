<template>
    <v-row>
        <!-- Revenue Over Time Section -->
        <v-col cols="12" md="8">
            <v-card hover variant="flat" class="card-style" style="height: 265px;">
                <v-card-text>
                    <div class="d-flex justify-space-between">
                        <div>
                            <h4>Revenue Over Time</h4>
                            <div class="d-flex align-center ga-10">
                                <div v-for="(item, index) in revenueData" :key="index">
                                    <div class="d-flex">
                                        <div>
                                            <span :style="{ color: item.color }">◆</span>
                                        </div>
                                        <div>
                                            <span class="ml-2" style="color: #97a3b6;">{{ item.label }}</span>
                                            <p class="ml-2 font-weight-bold" style="color: black;">
                                                {{ item.value }} <span style="color: #97a3b6;">{{ item.percent }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex ga-2">
                            <v-icon color="#97A3B6">mdi-tray-arrow-down</v-icon>
                            <v-icon color="#97A3B6">mdi-dots-horizontal</v-icon>
                        </div>
                    </div>
                    <div ref="revenueChart" style="width: 100%; height: 220px;"></div>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- Session by Country Section -->
        <v-col cols="12" md="4">
            <v-card hover variant="flat" class="card-style">
                <v-card-text>
                    <div class="d-flex justify-space-between mb-2">
                        <div>
                            <h4>Session by Country</h4>
                            <p class="text-subtitle-2" style="color: #97a3b6;">Showing Data for Top Session</p>
                        </div>
                        <v-icon color="#97A3B6">mdi-dots-horizontal</v-icon>
                    </div>
                    <div v-for="(session, index) in sessionData" :key="index" class="d-flex ga-3 mb-3">
                        <v-avatar size="small" :image="session.flag"></v-avatar>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-space-between">
                                <span style="color: #97a3b6;">{{ session.country }}</span>
                                <span class="font-weight-bold">{{ session.value }}</span>
                            </div>
                            <v-progress-linear :model-value="session.percent" color="#287F71" height="6"
                                rounded></v-progress-linear>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import * as echarts from "echarts";

export default {
    props: {
        data: {
            type: Array,
            required: true,
            default: () => []
        },
    },
    data() {
        return {
            revenueData: [
                { label: "Total Revenue", value: "$32,839.99", percent: "55%", color: "#278F71" },
                { label: "Total Target", value: "$30,932.12", percent: "45%", color: "#EB862A" },
            ],
            sessionData: [
                { country: "Australia", flag: "https://flagcdn.com/au.svg", value: "634 ' 8%", percent: 90 },
                { country: "Indonesia", flag: "https://flagcdn.com/id.svg", value: "589 ' 7.2%", percent: 80 },
                { country: "Thailand", flag: "https://flagcdn.com/th.svg", value: "562 ' 6.2%", percent: 70 },
                { country: "Germany", flag: "https://flagcdn.com/de.svg", value: "453 ' 5.4%", percent: 60 },
            ],
        };
    },
    mounted() {
        this.initRevenueChart();
    },
    methods: {
        initRevenueChart() {
            const chart = echarts.init(this.$refs.revenueChart);
            chart.setOption({
                tooltip: { trigger: "axis" },
                xAxis: {
                    type: "category",
                    data: [
                        "Mar 2023", "Jun 2023", "Sep 2023", "Dec 2023",
                        "Mar 2024", "Jun 2024", "Sep 2024", "Dec 2024"
                    ],
                },
                yAxis: {
                    type: "value",

                    min: 0,
                    max: 20000,
                    interval: 10000,
                    axisLabel: {
                        formatter: (value) => `$${value / 1000}`,
                    },
                },
                series: [
                    {
                        name: "Revenue",
                        type: "line",
                        data: [
                            16000.10, 12823.98, 11000.22, 10500.45,
                            14300.45, 7009.78, 12700.67, 17000.95
                        ],
                        smooth: true,
                        color: "#278F71",
                    },
                    {
                        name: "Target",
                        type: "line",
                        data: [
                            12000.03, 10110.00, 9000.23, 11000.57,
                            7500.36, 9300.87, 13600.68, 13400.56
                        ],
                        smooth: true,
                        color: "#EB862A",
                    },
                ],
            });
        },
    },

};
</script>

<style scoped>
.card-style {
    border: 1px solid gainsboro;
    border-radius: 10px;
}
</style>