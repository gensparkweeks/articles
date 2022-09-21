package api.mongodb.articleback.service;
import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

    public void uploadFile(MultipartFile file);
}
