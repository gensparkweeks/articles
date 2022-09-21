package api.mongodb.articleback;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        exposeDirectory("user-photos", registry);
        registry.addResourceHandler("/resources/images/**")
                .addResourceLocations("file:/fotos/articles/");
    }

}
