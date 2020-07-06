#!/bin/bash

API="https://warm-harbor-91920.herokuapp.com"
URL_PATH="/addcourse"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "cart": {
      "title": "'"${TITLE}"'",
      "url": "'"${URL}"'",
      "discreption": "'"${DISCREPTION}"'",
      "link": "'"${LINK}"'"
    }
  }'

echo
