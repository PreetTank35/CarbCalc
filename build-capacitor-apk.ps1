# Capacitor Android Local Build Script for CarbCalc
# Uses local OpenJDK 17

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (Test-Path "$scriptDir\jdk17\jdk-17.0.10+7") {
    $env:JAVA_HOME = "$scriptDir\jdk17\jdk-17.0.10+7"
    $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
    Write-Host "Configured JAVA_HOME: $env:JAVA_HOME"
}

Write-Host "1. Staging web assets into ./www directory..."
New-Item -ItemType Directory -Force -Path "$scriptDir\www" | Out-Null
Copy-Item -Path "$scriptDir\index.html", "$scriptDir\dashboard.html", "$scriptDir\heal.html", "$scriptDir\circle.html", "$scriptDir\studio.html", "$scriptDir\styles.css", "$scriptDir\app.js", "$scriptDir\sw.js", "$scriptDir\manifest.webmanifest", "$scriptDir\icon.svg" -Destination "$scriptDir\www\" -Force
Copy-Item -Path "$scriptDir\researched by anti gravity" -Destination "$scriptDir\www\" -Recurse -Force

Write-Host "2. Syncing Capacitor Android..."
npx cap sync android

Write-Host "3. Compiling native Android debug APK..."
if (Test-Path "$scriptDir\android\gradlew.bat") {
    Push-Location "$scriptDir\android"
    .\gradlew.bat assembleDebug --no-daemon
    Pop-Location
    if (Test-Path "$scriptDir\android\app\build\outputs\apk\debug\app-debug.apk") {
        Copy-Item "$scriptDir\android\app\build\outputs\apk\debug\app-debug.apk" -Destination "$scriptDir\CarbCalc-Android.apk" -Force
        Write-Host "SUCCESS: Built and updated CarbCalc-Android.apk!" -ForegroundColor Green
    }
}
