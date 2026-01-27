import React from 'react'

import { Download, Plus, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

// type Props = {}

export const ListHeaderTopScolarshipsAction = () => {
  return (
    <div className='border flex flex-col rounded items-center gap-2 py-4'>
        <h3 className=' font-bold'>Scholarships</h3>
        <span className='text-sm text-gray-600/80 flex items-center gap-2'>Last updated 3 minute ago <RefreshCcw size={15}/></span>
        <div className="group-button flex gap-2">
            <Link href="/admin/scholarships/create" className='bg-blue-500 text-sm text-white rounded py-1.5 px-3 flex items-center gap-2'>
                <Plus size={18}/>
                Add Scholarship
            </Link>
            <Link href="/admin/scholarships/export" className='bg-gray-500/10 text-sm  rounded py-1.5 px-3 flex items-center gap-2'>
                <Download size={18}/>
                Export as a CSV
            </Link>
        </div>
    </div>
  )
}
