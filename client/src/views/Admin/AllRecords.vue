<template>
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-8">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-server fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Total Records</h4>
                                <h3 class="mb-0 text-primary" id="numrecords">{{ numrecords }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-12 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-check fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Today Records</h4>
                                <h3 class="mb-0 text-primary" id="numtoday">{{ numtoday }}</h3>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    <div class="container-fluid pt-4 px-4">
                <div class="bg-light text-center rounded p-4 custom-row">
                    <div class="d-flex align-items-center justify-content-between mb-4 custom">
                        <h5 class="mb-0">Record List</h5>

                        
                        <input type="email" class="form-control search" id="search" placeholder="Search for a record..." v-model="record_search">
                                
                        <div class="button-group">
                            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAll">Delete All <i class="fa fa-trash"></i></button>
                            <!--drop down-->
                            <div class="dropdown">
                                <a class="btn btn-primary dropdown-toggle mx-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-file"></i> Export
                                </a>

                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" @click="exportPDF"><i class="fa fa-file-pdf"></i> PDF</a></li>
                                    <li><a class="dropdown-item" @click="exportTxt"><i class="fa fa-file"></i> TXT</a></li>
                                    <li><a class="dropdown-item" @click="exportDOCX"><i class="fa fa-file-word"></i> Word(docx)</a></li>
                                    <li><a class="dropdown-item" @click="exportXLSX"><i class="fa fa-file-excel"></i> Excel(xlsx)</a></li>
                                </ul>
                            </div>




                            <!--end of drop down-->

                        </div>
                        
                    </div>
                    <div class="table-responsive" v-if="paginatedRecords.length>0">
                        <table class="table text-center align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">User Profile</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Arr. Time</th>
                                    <th scope="col">Dept Time</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="record in paginatedRecords" :key="record.id">
                                    <td>
                                        <img v-if="record.User.profilepicture" class="rounded-circle mx-auto" :src="'/upload/'+record.User.profilepicture" alt="" style="width: 40px; height: 40px;">
                                        <img v-else class="rounded-circle mx-auto" src="/upload/img.png" alt="" style="width: 40px; height: 40px;">
                                    </td>
                                    <td>{{ record.User.username }}</td>
                                    <td>{{ record.date }}</td>
                                    <td>{{ record.arrivalTime }}</td>
                                    <td>{{ record.departureTime }}</td>
                                    <td><a class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#viewRecord" @click="set_view_rec(record)" >Detail</a>
                                        <a class="btn btn-sm btn-danger mx-1 my-sm-1" data-bs-toggle="modal" data-bs-target="#deleteRecord" @click="set_delete_id(record.id)">Delete</a>
                                    </td>
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
            <div class="modal fade" id="viewRecord" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Record details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clear_modal"></button>
                    </div>
                    <form >
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="username_id" class="col-form-label">Username</label>
                                    <input type="text" class="form-control" id="username_id" v-model="view_user_info.username" placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="date_id" class="col-form-label">Date</label>
                                    <input type="text" class="form-control" id="dats_id" v-model="viewed_record.date"  placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="arr_id" class="col-form-label">Arrival Time</label>
                                    <input type="text" class="form-control" id="arr_id" v-model="viewed_record.arrivalTime"  placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="dep_id" class="col-form-label">Departure Time</label>
                                    <input type="email" class="form-control" id="dep_id" v-model="viewed_record.departureTime"  placeholder="" disabled>
                                </div>
                                
                                <div class="mb-3 image-div" v-if="view_user_info.profilepicture">
                                    <img :src="view_user_info.profilepicture" alt="file preview" class="modal-img">
                                </div>


                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear_modal">Close</button>
                               
                            </div>
                    </form>
                    </div>
             </div>

        
            </div>


            <!--delete record modal-->
            <div class="modal fade" id="deleteRecord" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-exclamation-triangle text-danger fa-2x" aria-hidden="true" style="margin-right: 10px;"></i>Delete Record</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clear_modal"></button>
                    </div>
                    <div class="modal-body">
                        Do you wan't to delete this Record?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear_modal">Cancel</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteRecord">Yes,Delete</button>
                    </div>
                    </div>
                </div>
            </div>

             <!--delete all records-->
             <div class="modal fade" id="deleteAll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa  fa-ban text-danger fa-2x" aria-hidden="true" style="margin-right: 10px;"></i><span style="margin-bottom: 10px;">Delete Records</span></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div class="modal-body">
                        Do you wan't to delete <b>All</b> Records?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAll">Yes,Delete</button>
                    </div>
                    </div>
                </div>
            </div>
  
</template>

<script>
import * as xlsx from 'xlsx'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { saveAs } from 'file-saver';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { makeRequest } from '@/axios';
import { CountUp } from 'countup.js'
export default {
    name:'AllRecords',
    data(){
        return{
            count:0,
            numrecords:0,
            numtoday:0,
            records:[],
            record_search:'',
            itemsPerPage:5,
            currentPage:1,
            delete_id:null,
            viewed_record:[],
            view_user_info:[]
        }
    },
    methods:{
        async num_records_animate(){
                try{
                    const num= await makeRequest.get('/records/count');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numUserCountUp = new CountUp('numrecords',num.data, this.numrecords,options); 
                    numUserCountUp.start(); 
                    this.numrecords=num.data
                }
                catch(error){
                        console.log(error)

                }


            },
        async num_today_animate(){
                try{
                    const num= await makeRequest.get('/records/countToday');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numUserCountUp = new CountUp('numtoday',num.data, this.numtoday,options); 
                    numUserCountUp.start();
                    this.numtoday=num.data 
                }
                catch(error){
                        console.log(error)

                }


        },
        fetch_records(){
           
            makeRequest.get('/records/')
            .then(result=>{
                if(!result.data.Error){
                    this.records = result.data;
                    console.log(result.data)

                }else{
                    this.$toast.error(result.data.Error)
                }

            })
            .catch(error=>{
                console.log(error);
                this.$toast.error('Something went wrong')
            })
        },
        prevPage(){
            if(this.currentPage >1){
                this.currentPage --;
            }
        },
        nextPage(){
            if(this.currentPage < this.totalPages){
                this.currentPage++;
            }

        },
        set_delete_id(id){
            this.delete_id=id
            console.log(this.delete_id)

        },
        clear_modal(){
            this.delete_id=null
            this.viewed_record=[]
            this.view_user_info=[]
        },
        deleteRecord(){
            if(this.delete_id){
                
                    //console.log("wants to delete")
                        makeRequest.delete('/records/delete/'+this.delete_id)
                        .then(res=>{
                            if(!res.data.Error){
                                //console.log(res.data)
                                //this.records=[]
                                this.records= res.data
                                this.num_records_animate();
                                this.num_today_animate();
                                this.$toast.success("record deleted successfully")

                            }else{
                                this.$toast.error(res.data.Error)
                            }

                        })
                        .catch(error=>{
                            console.log(error);
                            this.$toast.error("Could not delete record")
                        })
             
            }else{
                console.log("record id not set")
            }
            },
        set_view_rec(record){
            const rec = {...record}
            const usr={...record.User}
            this.viewed_record = rec
            this.view_user_info=usr
        },
        reset_current(){
            this.currentPage=1
        },
        deleteAll(){
                     makeRequest.delete('/records/deleteAll/')
                        .then(res=>{
                            if(!res.data.Error){
                                //console.log(res.data)
                                this.records= res.data
                                this.num_records_animate();
                                this.num_today_animate();
                                this.$toast.success("records deleted successfully")

                            }else{
                                this.$toast.error(res.data.Error)
                            }

                        })
                        .catch(error=>{
                            console.log(error);
                            this.$toast.error("Could not delete record")
                        })

        },
        exportPDF(){
            const exportdata= this.filteredRecords
           
            if(exportdata.length === 0){
                this.$toast.error("Export empty")
            }else{
                try{

                
                    const documentDefinition={
                        content:[
                            {text:'Records'},
                            {text:'\n'},
                            {
                                table:{
                                    body:[
                                        ['ID','username','date','arrivalTime','departureTime','createdAt'],
                                        ...exportdata.map(record=>[record.id,record.User.username,record.date,record.arrivalTime,record.departureTime,record.createdAt])
                                    ]
                                }
                            }
                        ],
                        styles:{
                            header:{fontsize:18,marginBottom:10}
                        }

                        
                    }
                    pdfMake.createPdf(documentDefinition).download('records.pdf');
                    pdfMake.createPdf(documentDefinition).open()
                    
                }catch(err){
                    console.log(err)
                    this.$toast.error("An error occured try again")
                }
            }

        },
        exportTxt(){
            const exportdata = this.filteredRecords
            if(exportdata.length === 0){
                this.$toast.error("Export empty")
            }else{
                try{
                    const textData = exportdata.map(record => `${record.id}, ${record.User.username},${record.date}, ${record.arrivalTime},${record.departureTime},${record.createdAt}`).join('\n');
                    const blob = new Blob([textData], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'records.txt');
                    document.body.appendChild(link);
                    link.click();
                    this.$toast.success("Downloading....")
                    //link.open()

                }catch(error){
                    console.log(error)
                    this.$toast.error("Network error")

                }

                
            }

        },

        async exportDOCX() {
            try{
                const exportdata = this.filteredRecords
                if(exportdata.length === 0){
                    this.$toast.error("Export empty")
                }else{
                
                    // Create the table content
                    let content = 'Username\tDate\tArr.Time\tDept.Time\tcreatedAt\n';
                    exportdata.forEach(record => {
                        content += `${record.User.username}\t${record.date}\t${record.arrivalTime}\t${record.departureTime}\t${record.createdAt}\n`;
                    });

                    // Create the blob and save the document
                    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                    saveAs(blob, 'records.doc');
                    this.$toast.success("downloading...")
                }
                
                }
                catch(err){
                    console.log(err)
                }
        },
        exportXLSX(){
            const exportdata = this.filteredRecords
            if(exportdata.length === 0){
                this.$toast.error("Export empty")
            }else{
                //add username by filtering records
                //fields to export
                const fieldsToExport = ['id', 'date', 'arrivalTime','departureTime','createdAt'];
                const fRecords = exportdata.map(record => {
                     const filteredRecord = {};
                        fieldsToExport.forEach(field => {
                        if (field in record) {
                            filteredRecord[field] = record[field];
                        }
                        });
                            filteredRecord.username = record.User.username
                            return filteredRecord;
                });
                // Create a new workbook
                const workbook = xlsx.utils.book_new();

                // Create a new worksheet
                const worksheet = xlsx.utils.json_to_sheet(fRecords);

                // Add the worksheet to the workbook
                xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

                // Generate the Excel document
                const generatedExcelBuffer = xlsx.write(workbook, { type: 'array', bookType: 'xlsx' });

                // Save or serve the generated document
                const outputFileName = 'records.xlsx';
                this.saveDocument(generatedExcelBuffer, outputFileName);
                this.$toast.success("downloading...")
            }

        },
        //save xlsx document
        saveDocument(generatedExcelBuffer, outputFileName) {
            saveAs(new Blob([generatedExcelBuffer]), outputFileName);
        },


    },
    mounted(){
        this.num_records_animate();
        this.num_today_animate();
        this.fetch_records()

        



    },
    computed:{
        filteredRecords() {
            //if the entry is empty
            if (this.record_search === '') {
                return this.records;
            }else{
                this.reset_current();
                const searchTermLower = this.record_search.toLowerCase();
                return this.records.filter(record => {
                    const usernameMatch = record.User.username.toLowerCase().includes(searchTermLower);
                    const dateMatch = record.date.toLowerCase().includes(searchTermLower);
                    return usernameMatch || dateMatch;
                });
            }
        },
        totalPages(){
            return Math.ceil(this.filteredRecords.length/this.itemsPerPage)
        },
        paginatedRecords(){
            const startIndex = (this.currentPage-1)*this.itemsPerPage;
            const endIndex = startIndex+this.itemsPerPage
            return this.filteredRecords.slice(startIndex,endIndex)

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
        margin-bottom: 5px;
        width:80%;
    }
    .column div button{
    
        margin-top: 3px;

    }
    .button-group{
    margin-top: 10px;
    }

    
}
.button-group{
    display: flex;
    flex-direction: row;
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
.dropdown-menu .dropdown-item{
    cursor: pointer;

}
</style>