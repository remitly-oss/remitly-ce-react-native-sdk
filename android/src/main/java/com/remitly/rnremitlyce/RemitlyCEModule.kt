package com.remitly.rnremitlyce

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.remitly.cesdk.*


enum class RNEvent(val type: String) {
    transferSubmitted("RemitlyTransferSubmitted"),
    userActivity("RemitlyUserActivity"),
    error("RemitlyError"),
}

internal class RemitlyCEModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val remitly: RemitlyCE by lazy { getRNClass() }
    private var presentPromise: Promise? = null

    override fun getName() = "RemitlyCE"

    fun sendEvent(reactContext: ReactContext, event: RNEvent, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(event.type, params)
    }

    fun getRNClass(): RemitlyCE {
        return object : RemitlyCE() {
            override fun onUserActivity() {
                sendEvent(reactApplicationContext, RNEvent.userActivity, null)
            }

            override fun onTransferSubmitted() {
                sendEvent(reactApplicationContext, RNEvent.transferSubmitted, null)
            }

            override fun onError(error: Throwable) {
                val params = Arguments.createMap().apply {
                    putString("error", error.toString())
                }
                sendEvent(reactApplicationContext, RNEvent.error, params)
                presentPromise?.resolve(false)
            }

            override fun onDismissed() {
                presentPromise?.resolve(true)
            }
        }
    }

    @ReactMethod
    fun configure(map: ReadableMap, promise: Promise) {
        val config = readableMapToConfig(map)
        val isValidConfig = remitly.loadConfig(currentActivity as FragmentActivity, config)
        promise.resolve(isValidConfig)
    }

    @ReactMethod
    fun present(presentPromise: Promise) {
        this.presentPromise = presentPromise
        remitly.present()
    }

    @ReactMethod
    fun addListener(type: String?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(type: Int?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun dismiss(logout: Boolean, promise: Promise) {
        val logoutResult = remitly.logout()
        val dismissResult = remitly.dismiss()
        promise.resolve(logoutResult && dismissResult)
    }

    private fun readableMapToConfig(map: ReadableMap): RemitlyCEConfiguration {
        val iterator = map.entryIterator
        val builder = RemitlyCEConfiguration.Builder()

        while (iterator.hasNext()) {
            val current = iterator.next()
            try {
                val field = builder::class.java.getDeclaredField(current.key)
                if (field.name == current.key && current.value is String) {
                    field.isAccessible = true
                    field.set(builder, current.value)
                }
            } catch (_: Exception) {
                continue
            }
        }
        return builder.build()
    }

}
