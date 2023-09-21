/* eslint-disable */
<template>
    <!-- Sale & Revenue Start -->
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-6 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-chart-bar fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Present Today</h4>
                                <h3 class="mb-0 text-primary" id="numpresent">12</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-check fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">On-time Today</h4>
                                <h3 class="mb-0 text-primary" id="numontime">12</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-exclamation-triangle fa-3x text-danger"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Late Today</h4>
                                <h3 class="mb-0 text-primary" id="numlate">12</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sale & Revenue End -->


            <!-- Chart showing presence data -->
            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Bar chart (presence)</h6>
                                <!-- <a href="">Show All</a> -->
                            </div>
                            <canvas ref="BarChart" id="BarChart"></canvas>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">on-time/Late</h6>
                            </div>
                            <canvas ref="LineChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Pie chart (presence)</h6>
                            </div>
                            <canvas ref="PieChart"></canvas>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Doughnut Chart(presence)</h6>
                            </div>
                            <canvas ref="DoughnutChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!--End of charts-->



  
</template>

<script>
import { makeRequest } from '@/axios';
import Chart from 'chart.js/auto';
import { CountUp } from 'countup.js';
import { mapGetters,mapActions } from 'vuex';

import SidebarMixin from '../../SidebarMixin.js'
export default {
    
    name:'DashboardVue',
    mixins:[SidebarMixin],
    data(){
        return{
            numpresent:0,
            numontime:0,
            numlate:0

        }
    },
    computed:{
        ...mapGetters(['getUser','getAuth'])

    },
    methods:{
        ...mapActions(['setUser','setAuth']),
        async count_today_animate(){
            try{
                    const num= await makeRequest.get('/records/countToday');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numpresent = new CountUp('numpresent',num.data, this.numpresent,options); 
                    numpresent.start(); 
                    //this.numpresent=num.data
                }
                catch(error){
                        console.log(error)

                }

        },
        async on_time_animate(){
            try{
                    const num= await makeRequest.get('/records/countTodayOnTime');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numOnTimeCount = new CountUp('numontime',num.data, this.numontime,options); 
                    numOnTimeCount.start(); 
                    this.numontime=num.data
                }
                catch(error){
                        console.log(error)

                }

        },
        async late_animate(){
            try{
                    const num= await makeRequest.get('/records/countTodayLate');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numLateCount = new CountUp('numlate',num.data, this.numlate,options); 
                    numLateCount.start(); 
                    //this.numlate=num.data
                }
                catch(error){
                        console.log(error)

                }


        },
        async get_present_late(){
            let data=[]
            try{
                    const present= await makeRequest.get('/records/countToday');
                    const onTime = await makeRequest.get('/records/countTodayOnTime');
                    const late = await makeRequest.get('/records/countTodayLate');

                     data = [
                        present.data,onTime.data,late.data
                    ]
                    
                }
                catch(error){
                        console.log(error)

                }
                //console.log(data)
                return data;

        },
        async get_collection(){
            let collection =[]
            try{
                const datagroup = await makeRequest.get('/records/dataCollection');
                collection = datagroup.data

            }catch(error){
                console.log(error)
                console.log(collection)


            }
            return collection;

        },
        async get_collectionTime(){
            let collection =[]
            try{
                const datagroup = await makeRequest.get('/records/dataCollectionTime');
                collection = datagroup.data

            }catch(error){
                console.log(error)
                console.log(collection)


            }
            return collection;

        },
        async get_collectionLate(){
            let collection =[]
            try{
                const datagroup = await makeRequest.get('/records/dataCollectionLate');
                collection = datagroup.data

            }catch(error){
                console.log(error)
                console.log(collection)


            }
            return collection;

        },
        async pie_chart(){
            const present_late_ontime = await this.get_present_late()
            const ctx3 = this.$refs.PieChart.getContext('2d');
            const PieChart = new Chart(ctx3, {
                type: "pie",
                data: {
                    labels: ["Present", "Late", "On-time"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(0, 156, 255, .5)",
                            "rgba(0, 156, 255, .4)",
                            "rgba(0, 156, 255, .3)"
                        ],
                        data: [present_late_ontime[0],present_late_ontime[2],present_late_ontime[1]]
                    }]
                },
                options: {
                    responsive: true
                }
            });
            console.log(PieChart)
        },
        async dough_nut(){
            const present_late_ontime = await this.get_present_late()
            console.log(present_late_ontime)

            const ctx4 = this.$refs.DoughnutChart.getContext('2d');
            const DoughnutChart = new Chart(ctx4, {
                type: "doughnut",
                data: {
                    labels: ["present", "Late", "on-Time"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(0, 156, 255, .5)",
                            "rgba(0, 156, 255, .4)",
                            "rgba(0, 156, 255, .3)"
                        ],
                        data: [present_late_ontime[0], present_late_ontime[2], present_late_ontime[1]]
                    }]
                },
                options: {
                    responsive: true
                }
            });
            console.log(DoughnutChart)

        },
        async bar_chart(){
            const collection = await this.get_collection()
            const collectionTime = await this.get_collectionTime()
            const collectionLate = await this.get_collectionLate()
            const currentDate = new Date().getFullYear()

            //bar chart 
            const ctx = this.$refs.BarChart.getContext('2d');
            const BarChart=new Chart(ctx, {
            type: "bar",
            data: {
                labels: [currentDate, currentDate-1, currentDate-2, currentDate-3, currentDate-4],
                datasets: [{
                        label: "Present",
                        data: [collection[0], collection[1], collection[2], collection[3], collection[4]],
                        backgroundColor: "rgba(0, 156, 255, .7)"
                    },
                    {
                        label: "on-time",
                        data: [collectionTime[0], collectionTime[1], collectionTime[2], collectionTime[3], collectionTime[4]],
                        backgroundColor: "rgba(0, 156, 255, .5)"
                    },
                    {
                        label: "Late",
                        data: [collectionLate[0], collectionLate[1], collectionLate[2], collectionLate[3], collectionLate[4]],
                        backgroundColor: "rgba(0, 156, 255, .3)"
                    }
                ]
                },
            options: {
                    responsive: true
                    }
            });
            console.log(BarChart)

        },
        async line_chart(){
            const collectionTime = await this.get_collectionTime()
            const collectionLate = await this.get_collectionLate()
            const currentDate = new Date().getFullYear()

            const ctx2 = this.$refs.LineChart.getContext('2d');
            const LineChart = new Chart(ctx2, {
            type: "line",
            data: {
                labels: [currentDate, currentDate-1, currentDate-2, currentDate-3, currentDate-4],
                datasets: [{
                        label: "On-time",
                        data: [collectionTime[0], collectionTime[1], collectionTime[2], collectionTime[3], collectionTime[4]],
                        backgroundColor: "rgba(0, 156, 255, .5)",
                        fill: true
                    },
                    {
                        label: "Late",
                        data: [collectionLate[0], collectionLate[1], collectionLate[2], collectionLate[3], collectionLate[4]],
                        backgroundColor: "rgba(0, 156, 255, .3)",
                        fill: true
                    }
                ]
                },
            options: {
                    responsive: true
                 }
            });
            console.log(LineChart)

        }


   
    },
    mounted(){
            this.count_today_animate()
            this.on_time_animate()
            this.late_animate()
            //bar chart
            
            this.bar_chart()
            //Line chart

            this.line_chart()

            //pie chart
            this.pie_chart();
             //Doughnut chart
            this.dough_nut()


           

    }
    

}
</script>

<style>

</style>