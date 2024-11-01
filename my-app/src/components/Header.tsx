import { Outlet } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className='bg-blue-300 px-4 py-3 min-w-[375px] flex justify-center'>
        <div className='basis-full max-w-[1400px]'>
          <h1 className='text-[28px] font-bold'>Movie Rater</h1>
        </div>
      </div>
      <Outlet />
    </>
  );
}