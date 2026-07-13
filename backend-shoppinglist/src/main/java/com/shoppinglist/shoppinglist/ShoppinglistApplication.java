package com.shoppinglist.shoppinglist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.microsoft.applicationinsights.attach.ApplicationInsightsHtmlAttach;
import com.microsoft.applicationinsights.attach.RuntimeAttach;

@SpringBootApplication
public class ShoppinglistApplication {

	public static void main(String[] args) {
		RuntimeAttach.attach();
		SpringApplication.run(ShoppinglistApplication.class, args);
	}

}
