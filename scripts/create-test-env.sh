#!/usr/bin/env bash

# Creates mysql and redis container
docker compose -f docker-compose.testing.yml up -d

# Keep trying until its ok (don't know how to wait for mysql to be ready...)
while true; do
    echo '🟡 - Running prisma db push...'
    npx dotenv -e .env.test -- npx prisma db push # Apply the schema on the db to create the tables
    if [ $? -eq 0 ]; then
        break  # Exit the loop if prisma db push succeeds
    else
        echo '🔴 - prisma db push failed! Retrying in 5 seconds...'
        sleep 5
    fi
done

# Create initial data
npx dotenv -e .env.test -- npx tsx prisma/init.ts