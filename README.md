## Install fabric binaries

```bash
./install-fabric.sh
```

## Bring up the network

```bash
./network.sh up -ca -s couchdb
```

## Create the channel

```bash
./network.sh createChannel -c mychannel
```

## Deploy the chaincode

```bash
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
```