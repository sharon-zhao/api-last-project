#!/bin/bash

API="http://localhost:4741"
URL_PATH="/mycourse"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \

echo
