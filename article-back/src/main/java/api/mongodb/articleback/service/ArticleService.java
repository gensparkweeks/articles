package api.mongodb.articleback.service;

import api.mongodb.articleback.model.Article;

import java.util.List;

public interface ArticleService {

    public List<Article> findAll();
    public Article findById(String id);
    public Article save(Article article);
    public Article update(Article article);
    public  void delete(String id);
    public List<Article> findPublishedDesc();
}
