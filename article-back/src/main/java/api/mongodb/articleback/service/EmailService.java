package api.mongodb.articleback.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String toEmail, String fullName){

        String url = "https://www.google.com/";
        String subject = "Action Required - Thank you for contacting us";
        String body = "Dear "+ fullName+",\n";
        body += "    Please click the link below to create your credentials:\n\n";
        body+= "click here: " + url + "\n\n";
        body += "Thank you,\n";
        body += "The Articles Manage App Team";


        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mtoirac2011@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);

        System.out.println("EMail sent successfully");
    }

}
