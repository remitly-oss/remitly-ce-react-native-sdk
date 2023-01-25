package com.remitly.rnremitlyce

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RemitlyCEPackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(RemitlyCEModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext) = listOf<ViewManager<*, *>>()

}