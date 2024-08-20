#FROM maven:3.8.5-openjdk-17 AS build
##WORKDIR /app
#COPY . .
#RUN mvn clean package -DskipTests
#
#FROM openjdk:17.0.1-jdk-slim
##WORKDIR /app
#COPY --from=build /target/KobiRightPro-0.0.1-SNAPSHOT.jar kobirightpro.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar", "kobirightpro.jar"]

FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --from=build /target/* app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]