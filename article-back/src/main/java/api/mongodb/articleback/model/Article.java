package api.mongodb.articleback.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document
public class Article {

    @Id
    private String id;
    private String name;
    private String description;
    private Date published;
    private String photo;
    private boolean completed;

}
