# SSL.md
openssl genrsa yasainashiniku > private.key
openssl req -new -newkey rsa:2048 -days 365 -x509 -keyout private.key -out server.crt
