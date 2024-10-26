set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "movies" (
  "movieId"   serial  PRIMARY KEY,
  "title"     text    not null,
  "summary"   text    not null,
  "imdbLink"  text    not null,
  "rating"    integer not null
);