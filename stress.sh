#!/bin/bash

for in in {1..100000}; do
    start_time=$(date +%s.%N)
    curl http://localhost:3000/v1/products/category/1
    end_time=$(date +%s.%N)
    response_time=$(echo "$end_time - $start_time" | bc)
    echo "Request $in took $response_time seconds"
    sleep $1
done
