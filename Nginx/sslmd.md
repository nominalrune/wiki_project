# SSL.md

openssl req -new -newkey rsa:2048 -days <証明書の有効期間の日数> -nodes -x509 -keyout bump.key -out bump.crt
