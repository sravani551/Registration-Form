FROM amazoncorretto:21

LABEL version="1.0"

EXPOSE 8080

WORKDIR /app

COPY docker-demo/target/docker-demo-0.0.1-SNAPSHOT.jar /app/docker-demo.jar

ENTRYPOINT ["java", "-jar" ,"docker-demo.jar"]