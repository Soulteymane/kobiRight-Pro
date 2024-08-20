FROM maven:3.8.5-openjdk-17 AS build
#WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
#WORKDIR /app
COPY --from=build /target/kobirightpro-0.0.1-SNAPSHOT.jar kobirightpro.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "kobirightpro.jar"]