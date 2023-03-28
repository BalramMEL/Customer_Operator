import { useReducer } from "react"
import DropDownCheck from "./dropdownCheck"
import Success from "./success"
import { useQuery, useMutation, useQueryClient } from "react-query"
import {getUser, getUsers, updateUser} from "../lib/helper"


export default function UpdateUserForm({ formId, formData, setFormData }) { 

    const queryClient = useQueryClient()
    const {isLoading, isError, data, error} = useQuery(['users', formId], () => getUser(formId))
    
    const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess : async (data) => {
            // queryClient.setQueryData('users', (old) => [data])
           await queryClient.prefetchQuery('users', getUsers)
        }
    })

    if(isLoading) return <div>Loading...!</div>
    if (isError) return <div>Error</div>
    
    const { name, avatar, email, gender, phone, drone_shot } = data;
    const[firstname, lastname] = name ? name.split(' '):formData

    const handleSubmit = async(e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
        let updated = Object.assign({}, data, formData, { name: userName })
        await UpdateMutation.mutate(updated)        
    };
     

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit} >
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div> 
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={lastname} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div> 
            <div className="input-type">
                <input type="email" onChange={setFormData} defaultValue={email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div> 
            <div className="input-type">
                <input type="tel" onChange={setFormData} defaultValue={phone} name="phone" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Mobile No." />
            </div> 


             <div className="flex gap-10 item-center">
                <h3 className="title font-semibold">Gender :</h3>
                <div className="form-check">
                    <input type="radio" defaultChecked={gender == "Male"} onChange={setFormData} value="Male" id="radioDefault1" name="gender" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center float-left mr-2 cursor-pointer " />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        Male
                    </label>    
                </div>
                <div className="form-check">
                    <input type="radio" defaultChecked={gender !== "Male"} onChange={setFormData} value="Female" id="radioDefault2" name="gender" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center float-left mr-2 cursor-pointer " />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                        Female
                    </label>    
                </div>
                 </div>

            <DropDownCheck
                className="flex gap-10 items-center"
                defaultValue={drone_shot}
                onChange={setFormData}                
            />      

            <button className="flex justify-center shadow-neutral-800 text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:text-green-500 hover:border-green-500">
                Update 
            </button>
        </form>
   )
}



