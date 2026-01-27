import { BookText, CheckCircle, Clock, FilePenLine, List, PlayCircle, SquareCheck } from 'lucide-react'
import React from 'react'


export const OverviewScholarship = () => {
  return (
    <div className=' flex flex-col rounded   gap-2'>
        <span className='text-sm'>Scholarships overview</span>
        <div className='w-full grid grid-cols-4 gap-2'>
            <div className="box-total-scholarship rounded-xl border p-4 flex items-center gap-4">
                <div className="box-icon bg-blue-400/20 text-blue-600 rounded-full p-2 flex items-center justify-center">
                    <List size={20}/>
                </div>
                <div className="box-info">
                    <div className="box-number font-bold text-lg">120</div>
                    <div className="box-label text-sm text-gray-600/80">Total Scholarships</div>
                </div>
            </div>
            <div className="box-total-scholarship rounded-xl border p-4 flex items-center gap-4">
                <div className="box-icon bg-blue-400/20 text-blue-600 rounded-full p-2 flex items-center justify-center">
                    <SquareCheck size={20}/>
                </div>
                <div className="box-info">
                    <div className="box-number font-bold text-lg">78</div>
                    <div className="box-label text-sm text-gray-600/80">Active Scholarships</div>
                </div>
            </div>
            <div className="box-total-scholarship rounded-xl border p-4 flex items-center gap-4">
                <div className="box-icon bg-blue-400/20 text-blue-600 rounded-full p-2 flex items-center justify-center">
                    <FilePenLine size={20}/>
                </div>
                <div className="box-info">
                    <div className="box-number font-bold text-lg">23</div>
                    <div className="box-label text-sm text-gray-600/80">Draft Scholarships</div>
                </div>
            </div>
            <div className="box-total-scholarship rounded-xl border p-4 flex items-center gap-4">
                <div className="box-icon bg-orange-400/20 text-orange-600 rounded-full p-2 flex items-center justify-center">
                    <Clock size={20}/>
                </div>
                <div className="box-info">
                    <div className="box-number font-bold text-lg">20</div>
                    <div className="box-label text-sm text-gray-600/80">Expired Scholarships</div>
                </div>
            </div>
        </div>
    </div>
  )
}
