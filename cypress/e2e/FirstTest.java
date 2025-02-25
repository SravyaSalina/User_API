package sravyas;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import io.appium.java_client.android.AndroidDriver;

public class FirstTest {

	public AndroidDriver driver;

//	@BeforeTest
//	public void setup() throws MalformedURLException {
//		String appiumServerUrl = "http://127.0.0.1:4723";
//
//		// Creating the URL object explicitly for Appium server connection
//		URL url = new URL(appiumServerUrl);
//
//		DesiredCapabilities dc = new DesiredCapabilities();
//		dc.setCapability("platformName", "Android");
//		dc.setCapability("automationName", "UiAutomator2");
//		dc.setCapability("platformVersion", "15");
//		dc.setCapability("deviceName", "emulator-5554");
//		dc.setCapability("app", System.getProperty("user.dir") + "/apps/ApiDemos-debug.apk");
//
//		// Initialize AndroidDriver with the capabilities
//		driver = new AndroidDriver(url, dc);
//	}
//
//	@Test
//	public void test() {
//		// Use AppiumBy.id for locating elements by resource ID
//		driver.findElements(By.id("android:id/text1")).get(11).click();
//		driver.findElements(By.id("android:id/text1")).get(4).click();
//		driver.findElements(By.id("android:id/text1")).get(0).click();
//		driver.findElement(By.id("io.appium.android.apis:id/check1")).click();
//		// driver.findElement(By.id("io.appium.android.apis:id/spinner1")).click();
//		// List<WebElement> elements = driver.findElements(By.id("android:id/text1"));
//		// System.out.println("Number of elements found: " + elements.size());
//
//		// driver.findElements(By.id("android:id/text1")).get(4).click();
//
//		// driver.findElement(By.xpath("//android.widget.Spinner[@resource-id=\"io.appium.android.apis:id/spinner1\"]")).click();
//		// driver.findElements(By.id("//android.widget.CheckedTextView[@resource-id=\"android:id/text1\"
//		// and @text=\"Jupiter\"]")).get(4).click();
//
//	}
//
//	@AfterTest
//	public void close() {
//		// Quit the driver after tests are complete
//		if (driver != null) {
//			driver.quit();
//		}
//	}

	public static void main(String[] args) throws MalformedURLException {

		DesiredCapabilities dc = new DesiredCapabilities();
		dc.setCapability("platformName", "Android");
		dc.setCapability("automationName", "UiAutomator2"); 
		dc.setCapability("platformVersion", "15");
		dc.setCapability("deviceName", "emulator-5554");
		dc.setCapability("app", System.getProperty("user.dir") + "/apps/ApiDemos-debug.apk"); // Path to the app

		URL url = URI.create("http://127.0.0.1:4723/").toURL();
		AndroidDriver driver = new AndroidDriver(url, dc);
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("application Started");
		
		driver.findElements(By.id("android:id/text1")).get(11).click();
		driver.findElements(By.id("android:id/text1")).get(4).click();
		driver.findElements(By.id("android:id/text1")).get(0).click();

		driver.quit();
	}

}
