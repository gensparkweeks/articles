package api.mongodb.articleback.controller;
import api.mongodb.articleback.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail")
    public void sendEmail(@RequestParam String mailto,
                          @RequestParam String fullname,
                          @RequestParam String email,
                          @RequestParam String message){
        emailService.sendEmail(mailto, fullname, email, message);
    }

}
