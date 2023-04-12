import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Make } from '../types/types';
import useMakeData from '../utils/useMakeData';
import MakeStore from '../store/makeStore'
import { v4 as uuidv4 } from 'uuid';


type Props = {}

interface FormData {
  name: string;
  country: string;
}

function CreateMakePage({}: Props) {

  const location = useLocation();

  const make = location.state as Make;

  const id = uuidv4();

  const {updateMake, addMake} = useMakeData(MakeStore)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: '',
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
      if(make && make.id){

        await updateMake({...make, name:formData.name, country:formData.country});

        setIsLoading(false);

      }
      else{
        

        await addMake({id:id, name:formData.name, country:formData.country})

      }
    } catch (error) {
      console.error(error);
    } finally {
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
          Country
        </label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !formData.country ? 'border-red-500' : ''
          }`}
        />
        {!formData.country && (
          <p className="text-red-500 text-xs italic">Country is required</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!formData.name || !formData.country}
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

export default CreateMakePage