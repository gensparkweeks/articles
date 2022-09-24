package api.mongodb.articleback.service;
import api.mongodb.articleback.dao.ArticleDao;
import api.mongodb.articleback.model.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService{

    @Autowired
    ArticleDao articleDao;

    @Override
    public List<Article> findAll() {
        return articleDao.findAll();
    }

    @Override
    public Article findById(String id) {
        return articleDao
                .findById(id)
                .orElseThrow(RuntimeException::new);
    }

    @Override
    public Article save(Article article) {

        article.setPublished(new Date());

        return articleDao.save(article);
    }

    @Override
    public Article update(Article article) {

        return articleDao.save(article);
    }

    @Override
    public void delete(String id) {
        articleDao.deleteById(id);
    }

    @Override
    public List<Article> findPublishedDesc() {
        return articleDao.findPublishedDesc();
    }
}
