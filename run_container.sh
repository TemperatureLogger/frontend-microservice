## TO Build docker image
docker build -t frontend-container:latest .

##TO Run docker image
sudo docker run -d -it -p 80:80/tcp --name frontend-container frontend-container:latest

##Check logs
# docker logs frontend-container