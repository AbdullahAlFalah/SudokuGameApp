# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep all Notifee native classes
-keep class app.notifee.** { *; }
-keep interface app.notifee.** { *; }

# Keep React Native bridge classes that Notifee uses
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.modules.** { *; }

# Keep AndroidX Core notification classes
-keep class androidx.core.app.** { *; }

# Keep parcelable data structures used by Notifee
-keep class android.os.Parcelable { *; }
-keep class android.os.Parcel { *; }

