import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRating, deleteRating, getSingleRating, Rating, updateRating } from "../lib/data";
import { FaStar } from "react-icons/fa";

export function ReviewForm() {
  const [rating, setRating] = useState<Rating>({title: '', summary: '', rating: 0, imdbLink: ''});

  const {movieId} = useParams();
  const isExistingRating = Number(movieId) > 0;

  const navigate = useNavigate();

  const [titleText, setTitleText] = useState<string>()
  const [numStars, setNumStars] = useState(0);
  const [linkText, setLinkText] = useState<string>()
  const [summaryText, setSummaryText] = useState<string>()

  const [hasPendingDelete, setHasPendingDelete] = useState(false);
  
  useEffect(() => {
    async function read() {
      try {
        if (isExistingRating) {
          const fetchRating = await getSingleRating(Number(movieId));
          setRating(fetchRating);
          setTitleText(fetchRating.title);
          setNumStars(fetchRating.rating);
          setLinkText(fetchRating.imdbLink);
          setSummaryText(fetchRating.summary);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    read();
  }, [isExistingRating, movieId])

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();
      if (!titleText || !summaryText || !linkText) {
        alert('Title, Link, and Summary are required');
        throw new Error('title, summary, and link are required');
      }
      if (numStars < 1 || numStars > 5) {
        alert('Please rate the movie between 1 and 5 stars.');
        throw new Error('invalid rating');
      }
      if (!isExistingRating) {
        await createRating({title: titleText, summary: summaryText, imdbLink: linkText, rating: numStars});
      } else {
        await updateRating({movieId: Number(movieId), title: titleText, summary: summaryText, imdbLink: linkText, rating: numStars});
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await deleteRating(Number(movieId));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  const star1Class = numStars >= 1 ? 'text-yellow-500' : 'text-grey-100';
  const star2Class = numStars >= 2 ? 'text-yellow-500' : 'text-grey-100';
  const star3Class = numStars >= 3 ? 'text-yellow-500' : 'text-grey-100';
  const star4Class = numStars >= 4 ? 'text-yellow-500' : 'text-grey-100';
  const star5Class = numStars >= 5 ? 'text-yellow-500' : 'text-grey-100';
  
  return (
    <>
      <h1 className='text-xl mt-4 mb-3'>{isExistingRating ? `${rating.title}` : 'New Rating'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <div className='mb-2'>
            <input value={titleText ? titleText : ''} onChange={(e) => {setTitleText(e.target.value)}} className='border border-black w-[300px]' />
          </div>
        </label>
        <span>Rating</span>
        <div className='mb-2 flex'>
          <button type="button" onClick={() => setNumStars(1)} className={star1Class}>
            <FaStar />
          </button>
          <button type="button" onClick={() => setNumStars(2)} className={star2Class}>
            <FaStar />
          </button>
          <button type="button" onClick={() => setNumStars(3)} className={star3Class}>
            <FaStar />
          </button>
          <button type="button" onClick={() => setNumStars(4)} className={star4Class}>
            <FaStar />
          </button>
          <button type="button" onClick={() => setNumStars(5)} className={star5Class}>
            <FaStar />
          </button>
        </div>
        <label>
          IMDB Link
          <div className='mb-2'>
            <input value={linkText ? linkText : ''} onChange={(e) => {setLinkText(e.target.value)}} className='border border-black w-[300px]' />
          </div>
        </label>
        <label>
          Summary
          <div className='mb-2'>
            <textarea value={summaryText ? summaryText : ''} onChange={(e) => {setSummaryText(e.target.value)}} className='border border-black w-[300px]' />
          </div>
        </label>
        <div>
          <button type='submit' className='bg-blue-300 px-2 py-1 rounded'>Save</button>
        </div>
        {
          isExistingRating && 
          <div className='mt-5'>
            <button className='text-red-500' type='button' onClick={() => setHasPendingDelete(true)}>Delete</button>
          </div>
        }
        {
          hasPendingDelete && 
          <div className='inline-block border mt-2 p-4'>
            Are you sure you want to delete this rating?
            <div className='flex justify-between mt-2'>
              <button onClick={() => setHasPendingDelete(false)} type='button' className='bg-gray-400 py-1 px-2 rounded'>Cancel</button>
              <button onClick={handleDelete} type='button' className='bg-red-400 py-1 px-2 rounded'>Delete</button>
            </div>
          </div>
        }
      </form>
    </>
  );
}