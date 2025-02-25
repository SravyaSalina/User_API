package com.example.appium;

import java.net.MalformedURLException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;
import io.appium.java_client.android.AndroidDriver;

import java.time.Duration;
import java.util.List;

public class RealAppTest {

    private AndroidDriver driver;

    @BeforeClass
    public void setUp() throws MalformedURLException {
        if (driver != null) {
            driver.quit();
        }

        // startAppiumServer();

        // Initialize the driver using RealApp class
        driver = RealApp.initializeDriver();
    }

    @Test
    public void testButtonClick() {
        // Wait for the button to be visible
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        // from the wedget list of elementsto pick the 4th element - Teams app
        List<WebElement> elements = driver.findElements(By.className("android.widget.TextView"));
        elements.get(3).click(); // Clicking the 4th element in the list (index 3)

        // once visiting the page he is going click on search icon
        WebElement searchButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.id("com.microsoft.teams:id/action_bar_search_action")));
        searchButton.click();

        // In the search bar trying to search for "sravya"
        WebElement passElement = wait
                .until(ExpectedConditions.elementToBeClickable(By.id("com.microsoft.teams:id/search_src_text")));
        passElement.sendKeys("sravya");

        // selecting the element related to search
        WebElement selectElement = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(
                "//android.widget.RelativeLayout[@content-desc=\"Sravya Salina. Jr Test Engineer. User StatusAvailable\"]/android.widget.LinearLayout[1]")));
        selectElement.click();
        driver.quit();
    }

    @AfterClass
    public void tearDown() {
        System.out.println("start Tearing down driver...");
        if (driver != null) {
            driver.quit(); // Quit the driver to close the session
            System.out.println("Driver quit successfully.");
        } else {
            System.out.println("Driver was already null.");
        }
    }
}
