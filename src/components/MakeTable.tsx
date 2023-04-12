import React, { useEffect, useState } from 'react'
import useMakeData from '../utils/useMakeData'
import MakeStore from '../store/makeStore'
import { usePagination } from '../utils/usePagination'
import Pagination from './Pagination'
import { Make } from '../types/types'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'


type Props = {}

function MakeTable({}: Props) {

    const navigate = useNavigate();


    const { totalPages, currentPage, totalItems, pageLimit, setData,handlePrevPage, handleNextPage, resetPages, setPageLimit} = usePagination();

    const [sortOrder, setSortOrder] = useState<string>("title");
    const [filters, setFilters] = useState<string>("");

    
    const {allMakes,getMakes, deleteMake:deleteMakeById} = useMakeData(MakeStore);

    const filteredData = allMakes.filter((item) => {
        // const regex = new RegExp(searchQuery, 'i');
        // return regex.test(item.name) || regex.test(item.description);
    });



    /*
    We need to set that initial information for pagination to work correctly.
    Like: number of total pages and number of total items
     */
    const getData = async () => {
        


        const res = await getMakes(currentPage, pageLimit, filters, sortOrder);
 
        if(res){
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

    const createNewMake = () => {

        //go to createmakepage

        navigate(`/create-make/`);

    }

    const updateMake = (make: Make) => {

        //go to createmakepage

        navigate(`/create-make/`, { state:  make  });


    }

    const deleteMake = (id: string) => {
        
        
        //delete the make by calling useMakeData delete function

        deleteMakeById(id);

        getData();

    }


      // Sample data
  const data = [
    { id: "Make1", name:"Mercedes", country: "Germany" },
    { id: "Make2", name:"BMW", country: "Germany" },
    { id: "Make3", name:"Audi", country: "Germany" },
    { id: "Make4", name:"Volkswagen", country: "Germany" },

  ];


  return (
    <div className='w-full'>
        <div className="w-full px-4 py-8">
        <div className="flex justify-start gap-4 my-4">
  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{createNewMake()}}>
    Add new make
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
            <option value="country">Country</option>
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
            <th className="border border-gray-400 p-2">Country</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allMakes.map((item) => (
            <tr key={item.id} className="border border-gray-400">
              <td className="border border-gray-400 p-2">{item.name}</td>
              <td className="border border-gray-400 p-2">{item.country}</td>
              <td className="border border-gray-400 p-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded-md" onClick={()=>{updateMake(item)}}>
                  Edit
                </button>
                <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md" onClick={()=>{deleteMake(item.id)}}>
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

export default observer(MakeTable) 