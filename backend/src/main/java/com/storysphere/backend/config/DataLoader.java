package com.storysphere.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.storysphere.backend.model.Book;
import com.storysphere.backend.repository.BookRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(BookRepository repository) {

        return args -> {

            if (repository.count() == 0) {

                Book book1 = new Book();

                book1.setTitle("Harry Potter");
                book1.setAuthor("J.K. Rowling");
                book1.setCategory("Magical");
                book1.setContent("This is Harry Potter book content...");
                book1.setCoverImage(
                    "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg"
                );

                repository.save(book1);

                Book book2 = new Book();

                book2.setTitle("Atomic Habits");
                book2.setAuthor("James Clear");
                book2.setCategory("Motivation");
                book2.setContent("This is Atomic Habits content...");
                book2.setCoverImage(
                    "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
                );

                repository.save(book2);

                Book book3 = new Book();

                book3.setTitle("Rich Dad Poor Dad");
                book3.setAuthor("Robert Kiyosaki");
                book3.setCategory("Finance");
                book3.setContent("This is Rich Dad Poor Dad content...");
                book3.setCoverImage(
                    "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"
                );

                repository.save(book3);
            }
        };
    }
}