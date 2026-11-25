# Capacitor Android Build Helper for CarbCalc
# Requires Node.js, Android Studio / Android SDK, and JDK 17+

npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/geolocation @capacitor/camera @capacitor/local-notifications
npx cap add android
npx cap sync android

# Build debug APK via Gradle and place it at ./CarbCalc-Android.apk for direct website download:
Push-Location android
.\gradlew assembleDebug
Pop-Location
Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" -Destination ".\CarbCalc-Android.apk" -Force
Write-Host "Built and updated CarbCalc-Android.apk!"
