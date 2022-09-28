package api.mongodb.articleback.controller;
import api.mongodb.articleback.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail")
    public void sendEmail(@RequestParam String mailto, @RequestParam String fullname){
        emailService.sendEmail(mailto, fullname);
    }

}
