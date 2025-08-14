# File: watch-notifications.ps1
# Purpose: Monitor React Native JS, Notifee, and Android alarm logs

param (
    [string]$packageName = "com.sudokugameapp"
)

# Get PID of running app
$appPid = adb shell pidof $packageName
if (-not $appPid) {
    Write-Host "App '$packageName' is not running. Please launch it first." -ForegroundColor Red
    exit
}
Write-Host "App PID: $appPid" -ForegroundColor Yellow

# Get UID of app
$pkgInfo = adb shell dumpsys package $packageName
if (-not $pkgInfo) {
    Write-Host "Could not get package info for $packageName" -ForegroundColor Red
    exit
}
# Try to extract the uid from the line containing "uid="
$uidLine = $pkgInfo -split "`n" | Where-Object { $_ -match "uid=" }
if (-not $uidLine) {
    Write-Host "Could not determine UID for $packageName" -ForegroundColor Red
    exit
}
# Extract the number after uid=
$appUid = ($uidLine -split "uid=")[1] -replace '[^\d]', ''
Write-Host "App UID: $appUid" -ForegroundColor Yellow

# Function to colorize logs
function Show-Log($line) {
    if ($line -match " E/") { Write-Host $line -ForegroundColor Red }
    elseif ($line -match " W/") { Write-Host $line -ForegroundColor Yellow }
    else { Write-Host $line -ForegroundColor Green }
}

# Start logcat for app logs (ReactNativeJS + Notifee)
$job1 = Start-Job -ScriptBlock {
    param($appPid)
    adb logcat --pid $appPid ReactNativeJS:D Notifee:D *:S
} -ArgumentList $appPid

# Start logcat for AlarmManager logs (only this app's UID)
$job2 = Start-Job -ScriptBlock {
    param($appUid)
    adb logcat AlarmManager:D AlarmManagerService:D *:S |
    Select-String "uid $appUid"
} -ArgumentList $appUid

# Keep script running
Write-Host "Monitoring app logs for PID=$appPid, UID=$appUid" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Cyan

# Keep fetching logs live
while ($true) {
    foreach ($job in @($job1, $job2)) {
        Receive-Job -Job $job -Wait | ForEach-Object { Show-Log $_ }
    }
}
