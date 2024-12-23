let title = "Stagetalk";
let bundleId = "app.stagetalk.mobile";

if(process.env.APP_ENV==="development") {
	title += " (dev)";
	bundleId += "-dev";
} else if(process.env.APP_ENV==="preview") {
	title += " (preview)";
	bundleId += "-preview";
}

export default () => {
  return {
    "name": title,
    "slug": "stagetalk",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "stagetalk",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": bundleId
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ]
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-secure-store",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow Stagetalk to access your camera"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "ab18da24-4d73-4c88-8341-1cc5c0f51927"
      }
    },
    "owner": "mennov",
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/ab18da24-4d73-4c88-8341-1cc5c0f51927"
    }
  }
}
