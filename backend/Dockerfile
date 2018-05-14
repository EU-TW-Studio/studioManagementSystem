#origin Dockerfile: https://github.com/keeganwitt/docker-gradle/blob/64a348e79cbe0bc8acb9da9062f75aca02bf3023/jdk8/Dockerfile
FROM gradle:4.7.0-jdk8

COPY . /home/gradle

RUN gradle build

WORKDIR /home/gradle/build/libs

ENTRYPOINT ["java","-jar","backend-0.0.1-SNAPSHOT.jar"]