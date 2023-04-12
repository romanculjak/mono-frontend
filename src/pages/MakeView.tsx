import React from 'react'
import MakeTable from '../components/MakeTable'

type Props = {}

function MakeView({}: Props) {
  return (
    <div className='w-full mx-auto'>
        <div className='w-full max-w-[756px] mx-auto'>
            <MakeTable/>
        </div>
    </div>
  )
}

export default MakeView