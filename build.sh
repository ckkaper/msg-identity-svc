docker build -t identity-svc .

docker run --network messaging-app --name identity-svc -p 127.0.0.1:3001:3001 identity-svc