
# Create Record
curl --request POST \
  --url http://localhost:3000/api/trips \
  --header 'Content-Type: application/json' \
  --data '{
	"start_address": "Plac Europejski 20, Warszawa, Polska",
	"destination_address": "Plac Defilad 1, Warszawa, Polska",
	"price": "30.90",
	"date": "2022-05-22T11:20:42.301Z"
}'

# Weekly Stats
curl --request GET \
  --url http://localhost:3000/api/stats/weekly \
  --header 'Content-Type: application/json'

# Monthly Stats
curl --request GET \
  --url http://localhost:3000/api/stats/monthly \
  --header 'Content-Type: application/json'