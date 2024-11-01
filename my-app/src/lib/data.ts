
export type Rating = {
  ratingId?: number;
  title: string;
  summary: string;
  imdbLink: string;
  rating: number;
}

export async function createRating({title, summary, imdbLink, rating}: Rating) {
  if (!title || !summary || !imdbLink || !rating) {
    throw new Error('title, summary, imdbLink, and rating are required');
  }
  const req = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title, summary, imdbLink, rating
    })
  }
  const response = await fetch('/api/movies', req);
  if (!response.ok) throw new Error('error creating rating');
  const createdRating = await response.json();
  return createdRating;
}

export async function getRatingsList() {
  const response = await fetch('/api/movies');
  if (!response.ok) throw new Error('error fetching movies');
  const ratings = await response.json();
  return ratings;
}

export async function updateRating({ratingId, title, summary, imdbLink, rating}: Rating) {
  if (ratingId === undefined || !title || !summary || !imdbLink || !rating) throw new Error('ratingId is required');
  const req = {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title, summary, imdbLink, rating
    })
  }
  const response = await fetch(`/api/movies/${ratingId}`, req);
  if (!response.ok) throw new Error('error updating rating');
  const updatedRating = await response.json();
  return updatedRating;
}

export async function deleteRating(ratingId: number) {
  if (ratingId === undefined) {
    throw new Error('ratingId is required');
  }
  const req = {
    method: 'delete',
  }
  const response = await fetch(`/api/movies/${ratingId}`, req);
  if (!response.ok) throw new Error('error deleting rating');
  const deletedRating = await response.json();
  return deletedRating;
}