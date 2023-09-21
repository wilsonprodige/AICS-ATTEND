<template>
    <!-- Userlist -->
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-8">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-users fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Users</h4>
                                <h3 class="mb-0 text-primary" id="numuser">{{ numuser }}</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-sm-12 col-xl-4">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-check fa-3x text-primary"></i>
                            <div class="ms-3">
                                <h4 class="mb-2">Active</h4>
                                <h3 class="mb-0 text-primary" id="numactive">{{ numactive }}</h3>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    <div class="container-fluid pt-4 px-4">
                <div class="bg-light text-center rounded p-4 custom-row">
                    <div class="d-flex align-items-center justify-content-between mb-4 custom">
                        <h5 class="mb-0">User List</h5>

                        
                        <input type="email" class="form-control search" id="search" placeholder="Search for a user" v-model="user_search">
                                
                        <div>
                            <!-- <button class="btn btn-danger">Delete All</button> -->
                            <router-link to="/admin/adduser" class="btn btn-primary mx-1">Add User</router-link>

                        </div>
                        
                    </div>
                    <div class="table-responsive" v-if="paginatedUsers.length>0">
                        <table class="table text-center align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">Profile</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Account status</th>
                                    <th scope="col">Account Type</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in paginatedUsers" :key="user.id">
                                    <td>
                                        <img v-if="user.profilepicture" class="rounded-circle mx-auto" :src="'/upload/'+user.profilepicture" alt="" style="width: 40px; height: 40px;">
                                        <img v-else class="rounded-circle mx-auto" src="/upload/img.png" alt="" style="width: 40px; height: 40px;">
                                    </td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <div v-if="user.roleId==1">Admin</div>
                                        <div v-else-if="user.roleId==2">Registrar</div>
                                        <div v-else-if="user.roleId==3">User</div>
                                    </td>
                                    <td>
                                        <span v-if="user.accountstatus" class="text-success">Active</span>
                                        <span v-else class="text-danger">Inactive</span>
                                    </td>
                                    <td>{{ getFormattedTime(user.createdAt) }}</td>
                                    <td><button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#viewuser" @click="viewDetails(user)">Detail</button>
                                        <button class="btn btn-sm btn-danger mx-1 my-sm-1" data-bs-toggle="modal" data-bs-target="#deleteUser" @click="set_user_delete(user.id)">Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
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
                    <div v-else class="div-blank">
                        <div class="not-found-img mt-3" style="width: 20%; height: 150px;" >
                        </div>
                        <h6 class="mt-3">No Users...</h6>
                    </div>
                </div>
            </div>
            <!-- content end-->

            <!-----modal for view user details-->
            <div class="modal fade" id="viewuser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">User details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clear_modal"></button>
                    </div>
                    <form @submit.prevent="update_user">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="username_id" class="col-form-label">Username</label>
                                    <input type="text" class="form-control" id="username_id" v-model="viewed_user.username" placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="col-form-label">Name</label>
                                    <input type="text" class="form-control" id="recipient-name" v-model="viewed_user.name" placeholder="" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="emailid" class="col-form-label">Email</label>
                                    <input type="email" class="form-control" id="emailid" v-model="viewed_user.email"  placeholder="" disabled>
                                </div>
                                <div class="form-switch mb-3">
                                    <label for="status">Account Status</label><br>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="viewed_user.accountstatus">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">{{ viewed_user.accountstatus? 'Active':'Inactive' }}</label>
                                </div>
                                <div class="mb-3 form-control" >
                                    <label for="website" class="col-form-label">Account Type</label>
                                    <select name="check_type" id="check_type" v-model="viewed_user.roleId" style="width: 100%; border: 1px solid #ccc; border-radius: 5px;">
                                        <option value="1">Admin</option>
                                        <option value="2">Registrar</option>
                                        <option value="3">User</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="city" class="col-form-label">Matricule</label>
                                    <input type="text" class="form-control" id="city" v-model="viewed_user.matricule" placeholder="enter user matricule">
                                </div> 
                                <div class="mb-3 image-div" v-if="viewed_user.profilepicture">
                                    <img :src="viewed_user.profilepicture" alt="file preview" class="modal-img">
                                </div>


                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear_modal">Close</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">save</button>
                            </div>
                    </form>
                    </div>
             </div>

        
            </div>

            <!---End of modal-->

            <!----delete user modal-->
            <div class="modal fade" id="deleteUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-exclamation-triangle text-danger fa-2x" aria-hidden="true" style="margin-right: 10px;"></i>Delete Account</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clear_modal"></button>
                    </div>
                    <div class="modal-body">
                        Do you wan't to delete this account?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear_modal">Cancel</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteAccount">Yes,Delete</button>
                    </div>
                    </div>
                </div>
            </div>

  
</template>

<script>
import moment from 'moment';
import { CountUp } from 'countup.js'
import { makeRequest } from '@/axios';
export default {
    name:'UserList',
    data(){
        return{
            count:0,
            numuser:0,
            numactive:0,
            users:[],
            user_search:'',
            viewed_user:[],
            user_delete:null,
            currentPage:1,
            itemsPerPage:5
        }
    },
    methods:{
        fetch_users(){
            makeRequest.get('/users/')
            .then(result=>{
                if(!result.data.Error){
                    this.users = result.data;
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
        getFormattedTime(time_passed){
            return moment(time_passed).fromNow();
        },
        viewDetails(info){
            const user_info ={ ...info}
            this.viewed_user = user_info
        },
        update_user(){
            console.log(this.viewed_user);
            //makeRequest to update user info and get new user list
            makeRequest.put('/users/edit/'+this.viewed_user.id, this.viewed_user)
            .then(res=>{
                if(!res.data.Error){
                    //console.log(res.data)
                    this.users=[];
                    this.users = res.data
                    this.num_active_animate()
                    this.num_user_animate()
                    this.$toast.success("user data updated successfully");
                }

            })
            .catch(error=>{
                console.log(error)
                this.$toast.error('could not update user')
            })
        },
        set_user_delete(info_id){
            this.user_delete=info_id
            //console.log(info_id)
            //console.log(this.user_delete.id)
        },
        deleteAccount(){
            if(this.user_delete){
                if(this.getUserId === this.user_delete){
                    this.$toast.error("Cannot delete current account")
                }else{
                    //console.log("wants to delete")
                        makeRequest.delete('/users/delete/'+this.user_delete)
                        .then(res=>{
                            if(!res.data.Error){
                                //console.log(res.data)
                                this.users=[]
                                this.users= res.data
                                this.num_active_animate()
                                this.num_user_animate()
                                this.$toast.success("User deleted successfully")

                            }else{
                                this.$toast.error(res.data.Error)
                            }

                        })
                        .catch(error=>{
                            console.log(error);
                            this.$toast.error("Could not delete user")
                        })
             }
            }else{
                console.log("user id not set")
            }
            },
            clear_modal(){
                this.user_delete=null;
                this.viewed_user=[]
            },
            async num_user_animate(){
                try{
                    const num= await makeRequest.get('/users/count');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numUserCountUp = new CountUp('numuser',num.data, this.numuser,options); 
                    numUserCountUp.start(); 
                    this.numuser=num.data
                }
                catch(error){
                        console.log(error)

                }


            },
            async num_active_animate(){
                try{
                    const num= await makeRequest.get('/users/countactive');
                    const options = {
                    duration: 3, 
                    separator: ',',
                    };
                    const numUserCountUp = new CountUp('numactive',num.data, this.numactive,options); 
                    numUserCountUp.start();
                    this.numactive=num.data 
                }
                catch(error){
                        console.log(error)

                }


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
        reset_current(){
            this.currentPage=1
        }
        

    },
    computed:{
        filteredUsers() {
            //if the entry is empty
            if (this.user_search === '') {
                return this.users;
            }else{
                this.reset_current()
                const searchTermLower = this.user_search.toLowerCase();
                return this.users.filter(user => {
                    const usernameMatch = user.username.toLowerCase().includes(searchTermLower);
                    const emailMatch = user.email.toLowerCase().includes(searchTermLower);
                    return usernameMatch || emailMatch;
                });
            }
        },
        totalPages(){
            return Math.ceil(this.filteredUsers.length/this.itemsPerPage)
        },
        paginatedUsers(){
            const startIndex = (this.currentPage-1)*this.itemsPerPage;
            const endIndex = startIndex+this.itemsPerPage
            return this.filteredUsers.slice(startIndex,endIndex)

        },
        getUserId(){
            return this.$store.state.user_id;
        }

    },
    mounted(){

        this.num_user_animate();
        this.num_active_animate();
        
        

        // const numUActiveCountUp = new CountUp('numactive',this.numactive,options); 
        // numUActiveCountUp.start(); 
         //fetch users
         this.fetch_users()
        



    },
    watch:{
        
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
.modal-body{
    max-height: 450px;
    overflow: scroll;
}
.modal-body label{
    float: left;

    
}
.form-switch {
    padding-left: 0;
}
.btn-paginat:disabled{
    color: black;
}
</style>