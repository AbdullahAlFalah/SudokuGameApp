# File: watch-notifications.ps1
# Purpose: Monitor React Native JS, Notifee, and Android alarm logs

param (
    [string]$packageName = "com.sudokugameapp"
)

# Immediately check if a WorkManager job is scheduled
Write-Host "`nChecking WM scheduled jobs for $packageName..." -ForegroundColor Cyan
$jobsOutput = adb shell dumpsys jobscheduler | Select-String $packageName
if ($jobsOutput) {
    Write-Host "Found WM scheduled jobs:" -ForegroundColor Green
    $jobsOutput
} else {
    Write-Host "No WM jobs found for $packageName in JobScheduler." -ForegroundColor Red
}

# Immediately check if an Alarm job is scheduled
Write-Host "`nChecking Alarm scheduled jobs for $packageName..." -ForegroundColor Cyan
$jobsOutput = adb shell dumpsys alarm | Select-String $packageName
if ($jobsOutput) {
    Write-Host "Found Alarm scheduled jobs:" -ForegroundColor Green
    $jobsOutput
} else {
    Write-Host "No Alarm jobs found for $packageName in JobScheduler." -ForegroundColor Red
}

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

# Helper function to start a log process
function Start-LogStream {
    param(
        [string]$Name, # job name argument
        [string]$Command # command to be used by adb 
    )

    # Start the job directly with the command
    Start-Job -Name $Name -ScriptBlock {
        param($cmd)
        # Run adb with the command and stream output line by line
        & cmd /c "adb.exe $cmd" 2>&1 | ForEach-Object { Write-Output $_ }
    } -ArgumentList $Command
    return $job
}

# Helper function to colorize logs
function Show-Log($line) {
    if ($line -match "\sF\s") { 
        Write-Host $line -ForegroundColor Magenta # Fatal error 
    }
    elseif ($line -match "\sE\s") {          
        Write-Host $line -ForegroundColor Red # Error
    }
    elseif ($line -match "\sW\s") { 
        Write-Host $line -ForegroundColor Yellow # Warning
    }
    elseif ($line -match "\sI\s") { 
        Write-Host $line -ForegroundColor Green # Info
    }
    elseif ($line -match "\sD\s") {      
        Write-Host $line -ForegroundColor Green # Debug
    }
    elseif ($line -match "\sV\s") {      
        Write-Host $line -ForegroundColor Green # Verbose
    }
    else {                                
        Write-Host $line -ForegroundColor Blue # Anything else
    }
}

# Start monitoring each log source in parallel using Start-Job for async streaming
$logJobs = @()

# Start logcat for app logs (ReactNativeJS)
$RNCommand = @("logcat --pid $appPid ReactNativeJS:D *:S")
$logJobs += Start-LogStream -Name "RNLogs" -Command $RNCommand

# Start logcat for WorkManager logs (only for this app's PID)
$WMCommand = @("logcat --pid $appPid WorkManager:D WM-JobScheduler:D WM-SystemJobScheduler:D WM-WorkSpec:D WM-GreedyScheduler:D WM-WorkerWrapper:D WM-ConstraintsTracker:D WM-Processor:D SystemAlarmDispatcher:D SystemJobScheduler:D Notifee:D NotifeeWorker:D *:S")
$logJobs += Start-LogStream -Name "WMLogs" -Command $WMCommand

# Start logcat for AlarmManager logs (only for this app's PID)
$AlarmCommand = @("logcat --pid $appPid AlarmManager:D AlarmManagerService:D ExactAlarm:D *:S")
$logJobs += Start-LogStream -Name "AlarmLogs" -Command $AlarmCommand

# Keep script running
Write-Host "Monitoring app logs for PID=$appPid, UID=$appUid" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Cyan

# Keep fetching logs live
while ($true) {
    foreach ($job in $logJobs) {
        if ($job) { # filter nulls
            Receive-Job -Job $job -Wait | ForEach-Object {
                $prefix = $job.Name
                Show-Log "[$prefix] $_"
            }
        }
    }
}
