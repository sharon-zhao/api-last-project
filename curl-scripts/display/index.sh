#!/bin/sh

API="http://localhost:4741"
URL_PATH="/mycourse"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \

echo
