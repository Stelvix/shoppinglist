package com.shoppinglist.shoppinglist.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration OpenAPI/Swagger pour la documentation automatique de l'API
 */
@Configuration
public class OpenApiConfig {

        @Bean
        public OpenAPI customOpenAPI() {
                return new OpenAPI()
                                .info(new Info()
                                                .title("ShoppingList API")
                                                .version("1.0.0")
                                                .description("API REST pour la gestion d'une liste de courses avec types de courses")
                                                .contact(new Contact()
                                                                .name("ShoppingList Team")
                                                                .email("hounkpesagbojeff@gmail.com"))
                                                .license(new License()
                                                                .name("MIT")
                                                                .url("https://opensource.org/licenses/MIT")));
        }
}
