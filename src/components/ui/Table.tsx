import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from '@radix-ui/react-alert-dialog';
import { Edit, Link, Trash } from 'lucide-react';
import React from 'react';
import { AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './alert-dialog';

type Course = {
  id: string;
  title: string;
  type: string;
  price: number;
  discount: number;
};

interface TableProps {
  courses: Course[];
  deletePostMutation: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ courses, deletePostMutation }) => {
  return (
    <div>
      <div className=' p-3  sm:p-6 border shadow-lg rounded-lg mt-6 h-[533px]'>
        <div className='flex font-bold text-xs md:text-sm cursor-pointer justify-between gap-3 border-b pb-3'>
          <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>ID</div>
          <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Title</div>
          <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden xl:block'>Type</div>
          <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Price</div>
          <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Discount</div>
          <div className='flex justify-center w-20'>Action</div>
        </div>
        <div className='mt-3 gap-9 capitalize flex flex-col'>
          {/* {courses?.map((item, i) => (
            <div key={i} className='flex text-sm justify-between gap-3 items-center'>
              <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>{i + 1}</div>
              <div className='w-36'>{item.title}</div>
              <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.type}</div>
              <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>${item.price}</div>
              <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.discount}%</div>
              <div className='flex justify-center w-20 gap-1'>
                <Link to={`/dashboard/course/edit/${item.id}`}><Edit /></Link>
                <AlertDialog>
                  <AlertDialogTrigger><Trash /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deletePostMutation(item.id)} className="bg-red-600 hover:bg-red-500">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Table;
