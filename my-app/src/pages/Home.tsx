import { useEffect, useState } from "react";
import { getRatingsList, Rating } from "../lib/data";
import { FaStar } from "react-icons/fa";

export function Home() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  
  // gets the ratings from the db and sets to ratings state
  useEffect(() => {
    async function read() {
      try {
        const ratingsRead = await getRatingsList();
        setRatings(ratingsRead);
      } catch (err) {
        console.error(err);
      }
    }

    read();
  }, [])

  return (
    <div className='min-w-[375px] flex justify-center px-4'>
      <div className='basis-full max-w-[1400px]'>
        <h1 className='text-[20px] mt-6'>All Ratings</h1>
        <div className='flex flex-wrap'>
          {ratings.map((rating, index) => <RatingCard key={index} rating={rating} />)}
        </div>
      </div>
    </div>
  );
}


type RatingCardProps = {
  rating: Rating
}
function RatingCard({rating}: RatingCardProps) {
  const star1Class = rating.rating >= 1 ? 'text-yellow-500' : 'text-grey-100';
  const star2Class = rating.rating >= 2 ? 'text-yellow-500' : 'text-grey-100';
  const star3Class = rating.rating >= 3 ? 'text-yellow-500' : 'text-grey-100';
  const star4Class = rating.rating >= 4 ? 'text-yellow-500' : 'text-grey-100';
  const star5Class = rating.rating >= 5 ? 'text-yellow-500' : 'text-grey-100';
  
  return (
    <div className='bg-blue-100 rounded-md mt-3 mr-2 px-3 py-3 max-w-[400px] flex items-center justify-between basis-full'>
      <span className='mr-3'>{rating.title}</span>
      <div className='flex'>
        <div className={star1Class}><FaStar /></div>
        <div className={star2Class}><FaStar /></div>
        <div className={star3Class}><FaStar /></div>
        <div className={star4Class}><FaStar /></div>
        <div className={star5Class}><FaStar /></div>
      </div>
    </div>
  );
}