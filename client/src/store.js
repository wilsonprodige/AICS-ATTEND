import { createStore } from 'vuex';


const store = createStore({
    state:{
        user_id:null,
        auth:false,
        User_data:[],
        User_privs:[],
    },
    mutations:{
        SET_USER_ID(state,userId){
            state.user_id=userId
        },
        SET_AUTH_STATUS(state,authStatus){
            state.auth = authStatus
        },
        SET_USER_DATA(state,user_info){
            state.User_data=user_info
        },
        SET_USER_PRIVS(state,privs){
            state.User_privs = privs
        },
        RESET_STATE(state) {
            state.user_id = null;
            state.auth = false;
            state.User_data = [];
            state.User_privs = [];
        }

    },
    actions:{
        setUId({commit},userId){
            commit('SET_USER_ID',userId)
        },
        setAuth({commit},authStatus){
            commit('SET_AUTH_STATUS',authStatus)
        },
        setUserData({commit},user_info){
            commit('SET_USER_DATA',user_info)
        },
        setUserPrivs({commit},user_privs){
            commit('SET_USER_PRIVS',user_privs)
        },
        logout({commit}){
            commit('RESET_STATE');
            
        }
    },
    getters:{
        getUId: state=>state.user_id,
        getAuthStatus: state => state.auth
    }
   
    

});

export default store