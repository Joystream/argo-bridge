docker compose -f ../indexer/docker-compose.yml down -v db
docker rm -f argo-tests-joystream-node

lsof -ti:4350 | xargs kill -9
lsof -ti:8545 | xargs kill -9
