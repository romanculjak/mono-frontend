import React, { useEffect, useState } from 'react'
import useMakeData from '../utils/useMakeData'
import MadeStore from '../store/madeStore'
import { usePagination } from '../utils/usePagination'
import Pagination from './Pagination'
import { Model } from '../types/types'
import { useNavigate } from 'react-router-dom'
import useMadeData from '../utils/useMadeData'
import { observer } from 'mobx-react'


type Props = {}

function MadeTable({}: Props) {

    const navigate = useNavigate();


    const { totalPages, currentPage, totalItems, pageLimit, setData,handlePrevPage, handleNextPage, resetPages, setPageLimit} = usePagination();

    const [sortOrder, setSortOrder] = useState<string>("title");
    const [filters, setFilters] = useState<string>("");

    
    const {allMades,getMades, deleteMade:deleteMadeById} = useMadeData(MadeStore);



    /*
    We need to set that initial information for pagination to work correctly.
    Like: number of total pages and number of total items
     */
    const getData = async () => {
        

        console.log("debugging getData in MakeTable")

        const res = await getMades(currentPage, pageLimit, filters, sortOrder);
 
        if(res){
            console.log("getData in MakeTable: "  + res.totalPages)
            setData(res.totalPages, res.totalItems)
        }
    }


    /*
    This will be run onMount and every time page had been switched or filter or sortOrder has been changed
    This function is responsible for fetching the correct data and setting pagination to work corretly
    */
    useEffect(()=> {

        console.log("sortOrder is: " + sortOrder)

        getData();


    }, [currentPage, filters, sortOrder])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        resetPages();

        setFilters(e.target.value)


    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        resetPages();

        setSortOrder(e.target.value);


    }

    const handlePageChange = (newPage : number) => {
        if(currentPage - newPage < 0)
            handleNextPage();
        else
            handlePrevPage();
    }

    const createNewMade = () => {

        //go to createmakepage

        navigate(`/create-made`);

    }

    const updateMade = (made: Model) => {

        //go to createmakepage

        navigate(`/create-made`, { state:  made  });


    }

    const deleteMade = (id: string) => {
        
        
        //delete the make by calling useMakeData delete function

        deleteMadeById(id);
        
        getData();

    }


      // Sample data
      const data = [
        { id: "Made1", name:"S-Class", make: "Mercedes" },
        { id: "Made1", name:"S-Class", make: "Mercedes" },
        { id: "Made1", name:"S-Class", make: "Mercedes" },
        { id: "Made1", name:"S-Class", make: "Mercedes" },
        { id: "Made1", name:"S-Class", make: "Mercedes" },

    
      ];

  return (
    <div className='w-full'>
        <div className="w-full px-4 py-8">
        <div className="flex justify-start gap-4 my-4">
  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{createNewMade()}}>
    Add new made
  </button>
</div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <label htmlFor="sortBy" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortBy"
            className="border border-gray-300 rounded-md p-2"
            value={sortOrder}
            onChange={(e) => handleSortChange(e)}
          >
            <option value="title">Title</option>
            <option value="make">Make</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter" className="mr-2">
            Filter:
          </label>
          <input
            id="filter"
            type="text"
            value={filters}
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Title</th>
            <th className="border border-gray-400 p-2">Make</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allMades.map((item) => (
            <tr key={item.id} className="border border-gray-400">
              <td className="border border-gray-400 p-2">{item.name}</td>
              <td className="border border-gray-400 p-2">{item.make}</td>
              <td className="border border-gray-400 p-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded-md" onClick={()=>{updateMade(item)}}>
                  Edit
                </button>
                <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md" onClick={()=>{deleteMade(item.id)}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
    </div>
  )
}

export default observer(MadeTable) 