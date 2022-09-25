package api.mongodb.articleback.dao;

import api.mongodb.articleback.model.Article;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleDao extends MongoRepository<Article, String> {

@Query(value = "{}", sort= "{published: -1}")
public List<Article> findPublishedDesc();

}
