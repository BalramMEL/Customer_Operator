import { useReducer } from "react"
import DropDownCheck from "./dropdownCheck"
import Success from "./success"
import { useQueryClient, useMutation } from "react-query"
import { addUser, getUsers } from "../lib/helper"
import Bug from "./bug"


export default function AddUserForm({formData, setFormData}) { 

    const queryClient = useQueryClient()    
    const addMutation = useMutation(addUser, {
        onSuccess : () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Object.keys(formData).length == 0) return console.log("Don't have Form Data");
        let { firstname, lastname, email, phone, gender, drone_shot } = formData;

        const model = {
            name: `${firstname} ${lastname}`,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
            email, phone, gender, drone_shot: drone_shot ?? "tracking_shot"
        }

        addMutation.mutate(model)
    };
    if(addMutation.isLoading) return <div>Loading...!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return <Success message={"Added Successfully"}></Success> 

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit} >
            <div className="input-type">
                <input type="text" onChange={setFormData} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div> 
            <div className="input-type">
                <input type="text" onChange={setFormData} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div> 
            <div className="input-type">
                <input type="email" onChange={setFormData} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div> 
            <div className="input-type">
                <input type="tel" onChange={setFormData} name="phone" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Mobile No." />
            </div> 


            <div className="flex gap-10 item-center">
                <h3 className="title font-semibold">Gender :</h3>
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Male" id="radioDefault1" name="gender" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center float-left mr-2 cursor-pointer " />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800 ">
                        Male
                    </label>    
                </div>
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Female" id="radioDefault2" name="gender" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center float-left mr-2 cursor-pointer " />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800 ">
                        Female
                    </label>    
                </div>
            </div>

            <DropDownCheck
                className="flex gap-10 items-center" 
                onChange={setFormData}                
            />      

            <button className=" flex justify-center text-md w-2/6 bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white px-4 py-3 rounded-md hover:bg-gray-50 hover:text-cyan-500 hover:border-cyan-500">
                Add 
            </button>
        </form>
   )
}