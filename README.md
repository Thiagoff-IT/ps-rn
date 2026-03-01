# React Native Animation Challenge

This repository contains a simple Expo React Native app demonstrating an animation requirement.

## Features

- **Overlay slide-up animation** 🚀
- **Number slider** with draggable knob and animated value 🎚️
- iOS-only focus (works in Expo Go on iOS)

## Running the App

1. Install dependencies:
   ```bash
   npm install
   # or yarn
   ```

2. Start Expo:
   ```bash
   npm run ios
   # or `expo start --ios`
   ```

3. Open in the iOS simulator (or Expo Go on a device).

### Using Docker

You can also build and run the project inside a container:

```bash
# build the image from the repo root
docker build -t ps-rn-app .

# start the container, mapping the usual ports so Expo can be accessed
docker run -it --rm -p 19000:19000 -p 19001:19001 -p 19002:19002 -v "$PWD":/app ps-rn-app
```

From there the Metro bundler will be available on `localhost:19000` and you can open the project with Expo Go on an iOS device or simulator on your network.

> The Docker setup simply provides a consistent Node/Expo environment and can be handy for CI or when you don't want global packages installed.


## Animation Description

Tapping the **Open** button at the center of the screen slides an overlay up from the bottom using a spring animation.  When the overlay has finished opening, a horizontal number slider fades in.  Drag the blue knob left or right to change the selected number (1–10).  Press **Close** to slide the overlay back down.


> This implementation focuses on the animation behavior; layout and styling are intentionally minimal.


## Notes

- No Android-specific code has been added.
- Built with Expo SDK 55 and React 19 / React Native 0.83.
