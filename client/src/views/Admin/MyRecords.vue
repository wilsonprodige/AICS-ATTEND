<template>
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-book fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Records</h4>
                                <h3 class="mb-0 text-primary" id="numrecords">{{ numrecords }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-check fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Monthly Presence</h4>
                                <h3 class="mb-0 text-primary" id="numdays">{{ numdays }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-6 col-xl-4" v-if="today">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-check fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Today</h4>
                                <h3 class="mb-0 text-primary" id="numactive">you're present</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-6 col-xl-4" v-else>
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-times fa-3x text-danger"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Today</h4>
                                <h4 class="mb-0 text-danger" id="numactive">You're absent</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    <div class="container-fluid pt-4 px-4">
                <div class="bg-light text-center rounded p-4 custom-row">
                    <div class="d-flex align-items-center justify-content-between mb-4 custom">
                        <h5 class="mb-0">My Record List</h5>

                        
                        <!-- <input type="email" class="form-control search" id="search" placeholder="Search for a user"> -->
                                
                        <div>
                            <button class="btn btn-primary mx-1" @click="exportPDF"><i class="fa fa-file-pdf"></i> Export Data</button>
                        </div>
                        
                    </div>
                    <div class="table-responsive" v-if="paginatedRecords">
                        <table class="table text-center align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">Num</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Arrival Time</th>
                                    <th scope="col">Departure Time</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record, index) in paginatedRecords" :key="index">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ record.date }}</td>
                                    <td>{{ record.arrivalTime }}</td>
                                    <td>{{ record.departureTime }}</td>
                                    <td><a class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#viewMyRec" @click="view_record(record,index)">Detail</a></td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <!----pagination-->
                        <nav aria-label="...">
                                    <ul class="pagination">
                                        <li class="page-item">
                                        <button class="page-link btn-paginat"  @click="prevPage" :disabled="currentPage === 1" >Previous</button>
                                        </li>
                                        <li class="page-item active" aria-current="page">
                                            <a class="page-link">{{ currentPage }}</a>
                                        </li>
                                        <li class="page-item">
                                        <button class="page-link btn-paginat"  @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                    </div>
                    <div class="div-blank" v-else>
                        <div class="not-found-img mt-3" style="width: 20%; height: 150px;" >
                        </div>
                        <h6 class="mt-3">No Records...</h6>
                    </div>
                </div>
            </div>


            <!-----modal for view record details-->
            <div class="modal fade" id="viewMyRec" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">View details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clear_modal"></button>
                    </div>
                    <form >
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="rec_id" class="col-form-label">ID</label>
                                    <input type="text" class="form-control" id="rec_id" v-model="view.ID"  placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="date_id" class="col-form-label">Date</label>
                                    <input type="text" class="form-control" id="dats_id" v-model="view.date"  placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="arr_id" class="col-form-label">Arrival Time</label>
                                    <input type="text" class="form-control" id="arr_id" v-model="view.arrivalTime"  placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="dep_id" class="col-form-label">Departure Time</label>
                                    <input type="text" class="form-control" id="dep_id" v-model="view.departureTime"  placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="created" class="col-form-label">Created At</label>
                                    <input type="text" class="form-control" id="creates" v-model="view.createdAt"  placeholder="" disabled>
                                </div>
                                


                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear_modal">Close</button>
                               
                            </div>
                    </form>
                    </div>
             </div>

        
            </div>
  
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CountUp } from 'countup.js'
import { makeRequest } from '@/axios';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
    name:'MyRecords',
    data(){
        return{
            count:0,
            numrecords:0,
            numdays:0,
            today:true,
            myrecords:[],
            view:[],
            itemsPerPage:5,
            currentPage:1,
        }
    },
    methods:{
        view_record(record,index){
            const info = {...record}
            info.ID=index+1
            this.view = info

        },
        exportPDF(){
            const exportdata= this.myrecords
           
            if(exportdata.length === 0){
                this.$toast.error("Export empty")
            }else{
                try{

                
                    const documentDefinition={
                        content:[
                            {text:'My Records'},
                            {text:'\n'},
                            {
                                table:{
                                    body:[
                                        ['ID','date','arrivalTime','departureTime','createdAt'],
                                        ...exportdata.map((record,index)=>[index+1,record.date,record.arrivalTime,record.departureTime,record.createdAt])
                                    ]
                                }
                            }
                        ],
                        styles:{
                            header:{fontsize:18,marginBottom:10}
                        }

                        
                    }
                    pdfMake.createPdf(documentDefinition).download('My_records.pdf');
                    pdfMake.createPdf(documentDefinition).open()
                    
                }catch(err){
                    console.log(err)
                    this.$toast.error("An error occured try again")
                }
            }

        },
        clear_modal(){
            this.view=[]

        },
        nextPage(){
            this.currentPage++;

        },
        prevPage(){
            this.currentPage--;
        },
        async fetch_myrecords_animate(){ 
            try{
                    const num= await makeRequest.get('/records/myrecords/'+this.get_user_id);
                    //console.log(num.data)
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numRecordsCountUp = new CountUp('numrecords',num.data, this.numrecords,options); 
                    numRecordsCountUp.start(); 
                    this.numrecords=num.data
                }
                catch(error){
                        console.log(error)

                }


        },
        async check_present_today(){
            try{
                const status = await makeRequest.get('/records/presentToday/'+this.get_user_id);
                if(status.data.Error){
                    this.$toast.error("could not get presence status")
                }else{
                    this.today = status.data
                }

            }
            catch(error){
                console.log(error)
                this.$toast.error("could not check presence status")
            }
        },
        async get_month_presence(){
            try{
                const month = await makeRequest.get('/records/getMonthPresence/'+this.get_user_id)
                if(month.data.Error){
                    this.$toast.error("could not get monthly presence")
                }else{
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numdaysCountUp = new CountUp('numdays',month.data, this.numdays,options); 
                    numdaysCountUp.start(); 
                    this.numdays=month.data
                }

            }
            catch(error){
                console.log(error)
                this.$toast.error("could not get monthly prence status")

            }

        },
        fetch_my_records(){
            makeRequest.get('/records/my/'+this.get_user_id)
            .then(result=>{
                if(!result.data.Error){
                    this.myrecords = result.data;
                    console.log(result.data)

                }else{
                    this.$toast.error(result.data.Error)
                }

            })
            .catch(error=>{
                console.log(error);
                this.$toast.error('Something went wrong')
            })
        }


    },
    mounted(){
        this.fetch_myrecords_animate();
        this.check_present_today();
        this.get_month_presence()
        this.fetch_my_records();
        // this.checK_present()
        // this.count_days_present()
        // // const options = {
        // duration: 3, 
        // separator: ',',
        // };
        // const numRecordsCountUp = new CountUp('numrecords', this.numrecords,options); 
        // numRecordsCountUp.start(); 

        // const numDaysCountUp = new CountUp('numdays',this.numdays,options); 
        // numDaysCountUp.start(); 

        



    },
    computed:{
       get_user_id(){
        return this.$store.state.user_id;
       },
       totalPages(){
            return Math.ceil(this.myrecords.length/this.itemsPerPage)
        },
        paginatedRecords(){
            const startIndex = (this.currentPage-1)*this.itemsPerPage;
            const endIndex = startIndex+this.itemsPerPage
            return this.myrecords.slice(startIndex,endIndex)

        },

    }

}
</script>

<style>
#search{
    width: 45%;
    border-radius: 17px;
}

@media screen and (max-width: 610px) {
    .custom{
        display: flex;
        flex-direction: column;
    }
    .column #search{
        margin-top: 2px;
        margin-bottom: 2px;
        width:80%;
    }
    .column div button{
        margin-top: 3px;

    }

    
}
.div-blank{
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
}
.not-found-img{
    
    height: 200px;
    align-content: center;
    justify-content: center;
    background-image: url('../../assets/blank.svg');
    background-size: cover;
    background-position: center;
    margin-right: 10px;

}
.btn-paginat:disabled{
    color: black;
}
.modal-body label{
    float: left;
}

</style>