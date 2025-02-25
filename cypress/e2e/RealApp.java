package com.example.appium;

import io.appium.java_client.android.AndroidDriver;

import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.MalformedURLException;
import java.net.URL;

public class RealApp {
    public static AndroidDriver initializeDriver() throws MalformedURLException {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("platformVersion", "15"); // Android version
        capabilities.setCapability("deviceName", "RMX3842"); // Device model
        capabilities.setCapability("udid", "63b2ea47"); // Your device UDID
        capabilities.setCapability("automationName", "UiAutomator2");

        // Set app-related capabilities
        capabilities.setCapability("appPackage", "com.google.android.youtube");
        capabilities.setCapability("appActivity", "com.google.android.youtube.MainActivity");
        capabilities.setCapability("autoGrantPermissions", true);

        // URL for the Appium server
        URL appiumServerURL = new URL("http://127.0.0.1:4723");

        // Return the initialized AndroidDriver
        return new AndroidDriver(appiumServerURL, capabilities);

    }

    public static void main(String[] args) {
        try {
            AndroidDriver driver = initializeDriver();
            // Add your test steps here, for example:
            // driver.findElement(By.id("element_id")).click();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }
}
