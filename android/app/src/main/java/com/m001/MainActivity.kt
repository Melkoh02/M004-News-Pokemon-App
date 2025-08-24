package com.m001

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // show the native splash before React content is initialized
    SplashScreen.show(this)
    super.onCreate(savedInstanceState)
  }

  /** Must match your app name in index.js */
  override fun getMainComponentName(): String = "M004NewsPokemonApp"

  /**
   * Use the default delegate (with Fabric toggle)
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
