import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Model } from '../types/types';
import { ClipLoader } from 'react-spinners';
import useMadeData from '../utils/useMadeData';
import MadeStore from '../store/madeStore'
import { v4 as uuidv4 } from 'uuid';



type Props = {}

interface FormData {
    name: string;
    make: string;
  }

function CreateMadePage({}: Props) {

  const location = useLocation();

  const made = location.state as Model;

  const id = uuidv4();


  const {updateMade, addMade} = useMadeData(MadeStore)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    make: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        if(made && made.id){

            await updateMade({...made, name:formData.name, make:formData.make});
    
            setIsLoading(false);
    
          }
          else{
            
    
            await addMade({id:id, name:formData.name, make:formData.make})
    
          }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  /*
  if make is empty that means we need to create new make and if it is containg some value then we need to update existing value
  */
  
  return (
    <div>
        <div className="w-full max-w-[756px] mx-auto px-4 py-8">
        <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !formData.name ? 'border-red-500' : ''
          }`}
        />
        {!formData.name && (
          <p className="text-red-500 text-xs italic">Name is required</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
          Make
        </label>
        <input
          id="make"
          name="make"
          type="text"
          value={formData.make}
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !formData.make ? 'border-red-500' : ''
          }`}
        />
        {!formData.make && (
          <p className="text-red-500 text-xs italic">Make is required</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!formData.name || !formData.make}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? (
            <ClipLoader size={14} color={'#ffffff'} loading={true} />
          ) : (
            'Add'
          )}
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
        </div>
    </div>
  )
}

export default CreateMadePage