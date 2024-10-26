import pg from 'pg';
import express from 'express';

class ClientError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const db = new pg.Pool({
  connectionString: 'postgres://postgres:superD3v842@localhost/movies'
});

const app = express();

app.use(express.json());

app.post('/api/movies', async (req, res, next) => {
  try {
    const { title, summary, imdbLink, rating } = req.body;
    const sql = `
      insert into "movies" ("title", "summary", "imdbLink", "rating")
      values ($1, $2, $3, $4)
      returning *;
    `;
    const params = [title, summary, imdbLink, rating];
    const result = await db.query(sql, params);
    const newMovie = result.rows[0];
    if (!newMovie) throw new ClientError(400, 'movie was not created');
    res.json(newMovie);
  } catch (err) {
    next(err);
  }
})

app.get('/api/movies', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "movies"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
})

app.put('/api/movies/:movieId', async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { title, summary, imdbLink, rating } = req.body;
    if (!title || !summary || !imdbLink || !rating) {
      throw new ClientError(400, 'title, summary, link, and rating are required')
    }
    const sql = `
      update "movies"
      set "title" = $1,
          "summary" = $2,
          "imdbLink" = $3,
          "rating" = $4
      where "movieId" = $5
      returning *;
    `;
    const params = [title, summary, imdbLink, rating, +movieId]
    const result = await db.query(sql, params);
    const updatedMovie = result.rows[0];
    if (!updatedMovie) throw new ClientError(404, `movie ${movieId} not found`);
    res.json(updatedMovie);
  } catch (err) {
    next(err);
  }
})

app.delete('/api/movies/:movieId', async (req, res, next) => {
  try {
    const {movieId} = req.params;
    const sql = `
      delete 
      from "movies"
      where "movieId" = $1
      returning *;
    `;
    const result = await db.query(sql, [+movieId]);
    const deletedMovie = result.rows[0];
    if (!deletedMovie) throw new ClientError(404, `movie ${movieId} not found`);
    res.json(deletedMovie);
  } catch (err) {
    next(err);
  }
})



app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred',
      message: err instanceof Error ? err.message : undefined,
    });
  }
})

app.listen(8080, () => {
  console.log('Listening on port 8080');
});