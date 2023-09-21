export default{
    data(){
        return {
            allowedRoutes:['/user/dashboard','/admin/dashboard','/registrar/dashboard','/admin/userlist','/admin/adduser','/myrecords','/allrecords','/attendanceview']
        }
    },
    computed:{
        ShouldShowSidebar(){
            return this.allowedRoutes.includes(this.$route.path)
        }
    }
}