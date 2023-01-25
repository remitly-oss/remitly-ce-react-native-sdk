import React, { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type { RemitlyCeError } from "@remitly/react-native-remitly-cesdk";
import { RemitlyCE } from "@remitly/react-native-remitly-cesdk";

export default function ConnectedExperiencesTestHarness() {
    const [error, setError] = useState<String | undefined>();

    useEffect(() => {
        RemitlyCE.configure({
            appId: "app_7nVPijUnbBreiULsJPFG2X3",
            defaultSendCountry: "USA",
            defaultReceiveCountry: "PHL",
            languageCode: "en",
            customerEmail: "example@remitly.com"
        });
    }, []);

    // Will be called when the user successfully submits a transaction to
    // send money.
    const transferSubmittedHandler = useCallback(() => {
        console.log("Example app transferSubmittedHandler callback called");
    }, []);

    // Will be called frequently as the user interacts with the Remitly UI.
    const userActivityHandler = useCallback(() => {
        console.log("Example app userActivityHandler callback called");
    }, []);

    // Will be called when there is an error presenting the UX or when the user
    // encounters an error in the UI.
    const errorHandler = useCallback((error?: RemitlyCeError) => {
        console.warn("Example app errorHandler callback called", error);
        setError(error?.error);
    }, []);

    // On Send Money button click
    const onSendMoney = useCallback(async () => {
        console.log("Presenting Remitly UX");

        // Launch the experience
        await RemitlyCE.present({
            transferSubmittedHandler,
            userActivityHandler,
            errorHandler,
        });

        console.log("Remitly UX dismissed");
    }, [transferSubmittedHandler, userActivityHandler, errorHandler]);

    // On Logout button click
    const onLogout = useCallback(async () => {
        // Hide any presented Remitly UX and log the user out of Remitly.
        await RemitlyCE.dismiss(true);
    }, []);

    return (
        <SafeAreaView style={styles.viewContainer}>
            <View style={styles.buttonContainer}>
                <Button title="Send Money" onPress={onSendMoney} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Log Out" onPress={onLogout} />
            </View>
            <View>{error && <Text style={styles.error}>Error received: ${error}</Text>}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 30,
        width: 250,
    },
    viewContainer: {
        padding: 20,
        minHeight: 450,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    error: {
        padding: 20,
        color: "darkred",
    },
});
