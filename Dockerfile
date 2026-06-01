# voici mon dockerfile actu : # utiliser l'image de base de java 25
FROM eclipse-temurin:21-jre-jammy

# Je définis le dossier de travail dans le container
WORKDIR /shoppinglistApp

# Copy du fichier jar compilé
COPY target/shoppinglist-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port
EXPOSE 8080

# commande pour lancer l'application
ENTRYPOINT [ "java", "-jar", "app.jar" ]