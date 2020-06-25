#!/bin/bash

API="http://localhost:4741"
URL_PATH="/add-course"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "application": {
      "name": "'"${TITLE}"'",
      "price": "'"${PRICE}"'"
    }
  }'

echo
