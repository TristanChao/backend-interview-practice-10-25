I actually couldn't get HttpIE to work, so I used curl instead

## post command 1

curl --header "Content-Type: application/json" --request POST --data '{"title":"The Princess Bride", "summary":"As you wish", "imdbLink":"this is a link", "rating":"5"}' localhost:8080/api/movies

output: {"movieId":1,"title":"The Princess Bride","summary":"As you wish","imdbLink":"this is a link","rating":5}

## post command 2

curl --header "Content-Type: application/json" --request POST --data '{"title":"Rattytooey", "summary":"Nobody can cook", "imdbLink":"this is not a link", "rating":"1"}' localhost:8080/api/movies

output: {"movieId":2,"title":"Rattytooey","summary":"Nobody can cook","imdbLink":"this is not a link","rating":1}

## get command

curl localhost:8080/api/movies

output: [{"movieId":1,"title":"The Princess Bride","summary":"As you wish","imdbLink":"this is a link","rating":5},{"movieId":2,"title":"Rattytooey","summary":"Nobody can cook","imdbLink":"this is not a link","rating":1}]

## put command

curl --header "Content-Type: application/json" --request PUT --data '{"title":"Ratatouille", "summary":"Anyone can cook", "imdbLink":"this is a link", "rating":"5"}' localhost:8080/api/movies/2

output: {"movieId":2,"title":"Ratatouille","summary":"Anyone can cook","imdbLink":"this is a link","rating":5}

## delete command

curl --request DELETE localhost:8080/api/movies/1

output: {"movieId":1,"title":"The Princess Bride","summary":"As you wish","imdbLink":"this is a link","rating":5}