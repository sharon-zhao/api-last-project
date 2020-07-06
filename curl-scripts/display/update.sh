#!/bin/bash

API="http://localhost:4741"
URL_PATH="/my-course"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "cart": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'"
    }
  }'

echo
