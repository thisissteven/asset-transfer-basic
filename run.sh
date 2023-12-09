cd test-network

./network.sh up -ca -s couchdb

sleep 5

./network.sh createChannel

sleep 5

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go