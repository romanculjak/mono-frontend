import React from 'react'
import MadeTable from '../components/MadeTable'

type Props = {}

function MadeView({}: Props) {
  return (
    <div className='w-full mx-auto'>
    <div className='w-full max-w-[756px] mx-auto'>
        <MadeTable/>
    </div>
</div>
  )
}

export default MadeView