import { useEffect, useState } from "react";
import { getRatingsList, Rating } from "../lib/data";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <>
      <div className='flex items-center mt-6'>
        <span className='text-[20px] mr-12'>All Ratings</span>
        <Link to='/review/0' className='h-full flex items-center bg-blue-600 text-white px-2 py-1 rounded-md'>
          <span>+ Create Rating</span>
        </Link>
      </div>
      <div className='flex flex-wrap'>
        {ratings.map((rating, index) => <RatingCard key={index} rating={rating} />)}
      </div>
    </>
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
    <Link to={`/review/${rating.movieId}`} className='bg-blue-100 rounded-md mt-3 mr-2 px-3 py-3 max-w-[400px] flex items-center justify-between basis-full'>
      <span className='mr-3'>{rating.title}</span>
      <div className='flex'>
        <div className={star1Class}><FaStar /></div>
        <div className={star2Class}><FaStar /></div>
        <div className={star3Class}><FaStar /></div>
        <div className={star4Class}><FaStar /></div>
        <div className={star5Class}><FaStar /></div>
      </div>
    </Link>
  );
}