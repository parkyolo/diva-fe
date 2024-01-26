package com.checkitout.backend.suzy;

import com.diva.backend.post.repository.PostRepository;
import com.diva.backend.post.service.PostService;
import com.diva.backend.post.service.PostServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PostTest {

    @Autowired
    private PostRepository postRepository;

    @Test
    public void test() {
        System.out.println("asdasdadasd");
    }

}
