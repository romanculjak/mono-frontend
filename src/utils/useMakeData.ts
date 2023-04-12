import { addMakeRest, deleteMakeRest, fetchMake, updateMadeRest, updateMakeRest } from '../api/restAPI';
import MakeStore from '../store/makeStore'
import { Make } from '../types/types';


export default function useMakeData (store : typeof MakeStore) {

    const initMakes =async () => {
        
        //get makes from database

        //set makes in store

        getMakes(1, 5, "", "");

    }

    const allMakes = store.allMakes;

    const getMakes =async (page:number,limit:number, filter:string, sortOrder:string) => {
        
                
        try {
            
            //call restApi to get makes from server using the page number

            /*
                I know that I will receive a response as a object of this signature:
                {
                    items : {}[],
                    totalPages : number,
                    currentPage : number,
                    totalItems : number,
                }
            */

            const data = await fetchMake(page,limit,filter,sortOrder);

            

            //set returned items to MakeStore 

            store.initMakes(data.items);

            //return response whith data such as totalPages and totalItems for usePagination to use
            //we do not have to return items because we set them in the MakeStore directly.

            return {totalPages:data.totalPages, totalItems:data.totalItems}; 

            //return {totalPages: 1, totalItems: 1}

        } catch (error) {
            
            console.log(error)
        }

    }

    const updateMake =async (make:Make) => {
        
        try {

            //call restApi to update a make
            
            await updateMakeRest(make.id, make);

            
        } catch (error) {
            
        }
    }

    const addMake =async (make:Make) => {
        
        try {
            

            await addMakeRest(make);


        } catch (error) {
            
        }
    }

    const deleteMake =async (id: string) => {
        
        try {
            
            await deleteMakeRest(id);

        } catch (error) {
            
        }
    }
    


    return {allMakes,getMakes, updateMake, addMake, deleteMake}
}