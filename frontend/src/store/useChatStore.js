import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';


export const useChatStore = create((set,get)=>(
    {
       messages:[],
       users:[],
       selectedUser: null,
       isUserLoading: false,
       isMessagesLoading: false,


       getUser: async () =>{
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get('/messages/user')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
       },
       
       getMessages : async (userId) =>{
        set({isMessagesLoading:true})
            try {
                const res = await axiosInstance.get(`/messages/${userId}`)
                set({messages:res.data})
            } catch (error) {
                toast.error(error.response.data.message)
            }finally{
                set({isMessagesLoading:false})
            }
       },

       sendMessage: async (messageData) =>{
            const {selectedUser,messages} =get()

            try {
                const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
                if (res.data) {
                    set({ messages: [...messages, res.data] })
                }
            } catch (error) {
                console.error("Send message error:", error)
                toast.error(error.response?.data?.message || "Failed to send message")
            }
       }

       ,

       setSelected:  (selectedUser) =>{
        set({selectedUser})
        
       }
    }
))