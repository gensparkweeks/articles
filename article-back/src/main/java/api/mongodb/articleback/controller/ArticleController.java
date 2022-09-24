package api.mongodb.articleback.controller;
import api.mongodb.articleback.model.Article;
import api.mongodb.articleback.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/api/articles")
public class ArticleController {
    @Autowired
    ArticleService articleService;

    @GetMapping("/home")
    public String home(){
        return "<html><h1>Welcome to Article Manage App</h1></html>";
    }

    @GetMapping
    public List<Article> findAll(){
        return articleService.findAll();
    }

    @GetMapping("/{id}")
    public Article findById(@PathVariable String id){
        return articleService.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Article save(@RequestBody Article article){
        return articleService.save(article);
    }

    @PutMapping
    public Article update(@RequestBody Article article){
        return articleService.save(article);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id){
        articleService.delete(id);
    }

    @GetMapping("/published")
    public List<Article> publishedDesc(){
        return articleService.findPublishedDesc();
    }
}
