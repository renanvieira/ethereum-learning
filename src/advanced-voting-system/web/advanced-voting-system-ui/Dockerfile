FROM debian:bookworm


RUN apt-get update -y
RUN apt-get install -y wget

WORKDIR /tmp/ipfs

RUN wget https://dist.ipfs.io/go-ipfs/v0.11.0/go-ipfs_v0.11.0_linux-amd64.tar.gz
RUN tar -xvzf go-ipfs_v0.11.0_linux-amd64.tar.gz

RUN apt-get remove -y wget

WORKDIR /tmp/ipfs/go-ipfs
RUN bash install.sh


WORKDIR /usr/ipfs

RUN ipfs init

COPY .docker-data/ipfs-config.json /root/.ipfs/config

# Swarm TCP; should be exposed to the public
EXPOSE 4001
# Swarm UDP; should be exposed to the public
EXPOSE 4001/udp
# Daemon API; must not be exposed publicly but to client services under you control
EXPOSE 5001
# Web Gateway; can be exposed publicly with a proxy, e.g. as https://ipfs.example.org
EXPOSE 8080
# Swarm Websockets; must be exposed publicly when the node is listening using the websocket transport (/ipX/.../tcp/8081/ws).
EXPOSE 8081

CMD [ "ipfs", "daemon", "--offline" ]
