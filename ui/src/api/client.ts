import axios from 'axios';
import AddCredits from '../components/AddCredits';

const axiosClient = axios.create({
    baseURL: `http://api.igentworks.com/api/v1`,
    headers: { "Content-Type": "application/json" },
});


export const apiService = {
    async Login(data: any) {
        try {
            const res = await axiosClient.post('/login', data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    },

    async Register(data:any){
        try {
            const res = await axiosClient.post('/register', data)
            return res.data
        } catch (error) {
            console.log(error)
        }

    } ,

    async GetAllSchedules(){

        try {
            const res = await axiosClient.get('/schedules')
            return res.data
        } catch (error) {
            console.log(error)
        }
    } , 

    async AddCredits(data){

        try {
            
        } catch (error) {
            
        }
    } ,

    async AddSchedule(data){


        try {
            
        } catch (error) {
            
        }

    
    }

    

}