import type { NativeModule } from "react-native";
import { NativeEventEmitter, NativeModules } from "react-native";

enum RemitlyCeEvents {
    transferSubmitted = "RemitlyTransferSubmitted",
    userActivity = "RemitlyUserActivity",
    error = "RemitlyError",
}

interface RemitlyCeNativeModule extends NativeModule {
    configure(config: RemitlyCeConfig) : Promise<boolean>;
    present() : Promise<boolean>;
    dismiss(logout: boolean) : Promise<void>;
}

const nativeCE: RemitlyCeNativeModule = NativeModules.RemitlyCE;
let nativeCEEventEmitter: NativeEventEmitter;
if (nativeCE) {
    nativeCEEventEmitter = new NativeEventEmitter(nativeCE);
}

let isPresented = false;

export interface RemitlyCeConfig {
    /**
     * Unique identifier for your app, provided by Remitly.
     */
    appId: string;

    /**
     * 2-letter ISO language code. Unsupported languages fallback to English.
     */
    languageCode?: string;

    /**
     * Will prepopulate the end-user login screen.
     */
    customerEmail?: string;

    /**
     * Three letter country code (ISO 3166-1 alpha-3).
     * (Optional)
     */
    defaultSendCountry?: string;

    /**
     * Three letter country code (ISO 3166-1 alpha-3).
     * (Optional)
     */
    defaultReceiveCountry?: string;

    /**
     * remitly-internal-use
     * @internal
     */
    webHost?: string;

    /**
     * remitly-internal-use
     * @internal
     */
    apiHost?: string;
}

export interface RemitlyCeParams {
    /**
     * If supplied, will be called when the user successfully submits a
     * transaction to send money. 
     */
    transferSubmittedHandler?: () => void;

    /**
     * If supplied, will be called frequently as the user interacts with the
     * Remitly UI. 
     */
    userActivityHandler?: () => void;

    /**
     * If supplied, will be called when there is an error presenting the UX or
     * when the user encounters an error in the UI.
     */
    errorHandler?: (error?: RemitlyCeError) => void;
}

export interface RemitlyCeError {
    error: String
}

export const RemitlyCE = {

    /**
     * Accepts a {@link RemitlyCeConfig} and must be called prior to presenting the
     * Remitly UX. Validates the config and initializes the SDK.
     * 
     * @param props - {@link RemitlyCeConfig}
     * @returns success
     */
    configure: async (config: RemitlyCeConfig): Promise<boolean> => {
        return nativeCE.configure(config)
    },

    /**
     * Accepts event callback handler methods, and presents the Remitly UX atop
     * your app in a full-screen modal. `await` this async method to determine
     * when the user has dismissed the Remitly UX. 
     * 
     * @param props {@link RemitlyCeParams}
     * @returns success
     */
    present: async (props: RemitlyCeParams): Promise<boolean> => {
        if (isPresented) {
            return false;
        }
        isPresented = true;
        try {
            nativeCEEventEmitter.addListener(
                RemitlyCeEvents.transferSubmitted,
                async () => {
                    props.transferSubmittedHandler?.();
                },
            );

            nativeCEEventEmitter.addListener(
                RemitlyCeEvents.userActivity,
                async () => {
                    props.userActivityHandler?.();
                },
            );

            nativeCEEventEmitter.addListener(
                RemitlyCeEvents.error,
                async (error?: RemitlyCeError) => {
                    props.errorHandler?.(error);
                },
            );

            return nativeCE.present();
            
        } catch (ex) {
            console.error('Error occurred in presenting CE', ex)
            return false
        } finally {
            isPresented = false;
            for (const event in RemitlyCeEvents) {
                nativeCEEventEmitter.removeAllListeners(event);
            }
        }
    },

    /**
     * An idempotent API to hide any presented Remitly UX and optionally log
     * the user out of Remitly. This must be called (passing `logout: true`)
     * whenever the user logs out of your app. 
     * 
     * @param logout - should logout?
     * @returns done
     */
    dismiss: async (logout: boolean = false): Promise<void> => {
        return nativeCE?.dismiss(logout);
    },

    isPresented: (): boolean => {
        return isPresented;
    }
}

