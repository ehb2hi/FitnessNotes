FROM openjdk:21-slim-bullseye

# Install necessary packages
RUN apt-get update && apt-get install -y wget unzip curl

# Set environment variables
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Download and install Android SDK Command-line Tools
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools \
    && cd $ANDROID_SDK_ROOT/cmdline-tools \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip \
    && unzip cmdline-tools.zip \
    && mv cmdline-tools latest \
    && rm cmdline-tools.zip

# Accept licenses and install platforms
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
