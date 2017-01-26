#!/bin/bash

mytoken=zncnVK0oGDrJW4KVloBzFs57PQfAiLnhTbx5Q7ErlqgT2Npr
BASE_URL=http://localhost:8008
curl --data "token=$mytoken&amount=$1&text=$2" $BASE_URL/submit/expense/
