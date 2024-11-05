import { Link, Outlet } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className='bg-blue-300 px-4 py-3 min-w-[375px] flex justify-center'>
        <div className='basis-full max-w-[1400px]'>
          <Link to='/' className='text-[28px] font-bold'>Movie Rater</Link>
        </div>
      </div>
      <div className='min-w-[375px] flex justify-center px-4'>
        <div className='basis-full max-w-[1400px]'>
          <Outlet /> 
        </div>
      </div>
    </>
  );
}