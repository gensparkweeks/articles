package api.mongodb.articleback.dao;

import api.mongodb.articleback.model.Article;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleDao extends MongoRepository<Article, String> {

}
