# Base: Debian-based OpenJDK 21
FROM openjdk:21-slim-bullseye

# Install necessary packages: Android tools, Node.js, npm, Gradle dependencies
RUN apt-get update && apt-get install -y wget unzip curl gnupg ca-certificates git

# Install Node.js + npm (Node.js 20 LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Gradle (optional: you can also use gradlew from project)
RUN wget https://services.gradle.org/distributions/gradle-8.6-bin.zip -P /tmp \
    && unzip -d /opt/gradle /tmp/gradle-8.6-bin.zip \
    && ln -s /opt/gradle/gradle-8.6/bin/gradle /usr/bin/gradle

# Environment vars
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Download and install Android SDK Command-line Tools
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools \
    && cd $ANDROID_SDK_ROOT/cmdline-tools \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip \
    && unzip cmdline-tools.zip \
    && mv cmdline-tools latest \
    && rm cmdline-tools.zip

# Accept licenses and install platforms & build-tools
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Done
