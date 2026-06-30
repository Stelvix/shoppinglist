# =====================================================================
# CONFIGURATION - REMPLACE PAR TON USERNAME DOCKER HUB
$DOCKER_IMAGE_NAME = "stelvix/shoppinglistapi"
# =====================================================================

# 1. Re-compiler le projet
Write-Host "=== Compilation du projet... ===" -ForegroundColor Cyan
mvn clean package -DskipTests

# 2. Recréer l'image Docker locale et l'enregistrer pour le dépôt
Write-Host "=== Création de l'image Docker... ===" -ForegroundColor Cyan
docker build -t shoppinglist-app .
docker tag shoppinglist-app "${DOCKER_IMAGE_NAME}:latest"

# 3. Pousser la nouvelle image sur le dépôt Docker Hub
Write-Host "=== Push de l'image sur Docker Hub... ===" -ForegroundColor Cyan
docker push "${DOCKER_IMAGE_NAME}:latest"

# 4. Supprimer l'ancien conteneur local
Write-Host "=== Nettoyage de l'ancien conteneur local... ===" -ForegroundColor Cyan
docker rm -f shoppinglist-container

# 5. Lancer le conteneur local AVEC fix réseau JVM
Write-Host "=== Lancement du nouveau conteneur en local... ===" -ForegroundColor Cyan
docker run -d `
  -p 8080:8080 `
  --network bridge `
  --dns 8.8.8.8 `
  --dns 1.1.1.1 `
  --name shoppinglist-container `
  -e JAVA_TOOL_OPTIONS="-Djava.net.preferIPv4Stack=true -Djava.net.preferIPv4Addresses=true" `
  shoppinglist-app

Write-Host "=== Application déployée en local sur http://localhost:8080 ===" -ForegroundColor Green
Write-Host "=== Image synchronisée sur Docker Hub, Render va pouvoir se mettre à jour ! ===" -ForegroundColor Green