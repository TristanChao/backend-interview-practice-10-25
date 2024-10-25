create schema "public";

CREATE TABLE "movies" (
  "movieId" serial PRIMARY KEY,
  "title" text not null,
  "summary" text not null,
  "imdbLink" text not null,
  "rating" integer not null,
)