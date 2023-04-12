import { addMadeRest, deleteMadeRest, fetchMake, updateMadeRest } from '../api/restAPI';
import MadeStore from '../store/madeStore'
import { Model } from '../types/types';


export default function useMadeData (store : typeof MadeStore) {


    const allMades = store.allMades;

    const getMades =async (page:number,limit:number, filter:string, sortOrder:string) => {
        
                
        try {
            //call restApi to get mades from server using the page number

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
    
                store.initMades(data.items);
    
                //return response whith data such as totalPages and totalItems for usePagination to use
                //we do not have to return items because we set them in the MakeStore directly.
    
                return {totalPages:data.totalPages, totalItems:data.totalItems}; 
    
                //return {totalPages: 1, totalItems: 1}

        } catch (error) {
            
            console.log(error)
        }

    }

    const updateMade =async (made:Model) => {
        
        try {

            await updateMadeRest(made.id, made)
            
        } catch (error) {
            
        }
    }

    const addMade =async (made:Model) => {
        
        try {

            await addMadeRest(made);
            
        } catch (error) {
            
        }
    }

    const deleteMade =async (id: string) => {
        
        try {

            await deleteMadeRest(id);
            
        } catch (error) {
            
        }
    }
    


    return {allMades, updateMade, addMade, deleteMade, getMades}
}