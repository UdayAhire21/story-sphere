package com.storysphere.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.storysphere.backend.model.Book;
import com.storysphere.backend.repository.BookRepository;
import com.storysphere.backend.service.CloudinaryService;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
private CloudinaryService cloudinaryService;

// Show only approved books to users
@GetMapping
public List<Book> getAllBooks() {

    return bookRepository.findByStatus("APPROVED");
}

// Get book by ID
@GetMapping("/{id}")
public Book getBookById(
        @PathVariable Long id
) {

    return bookRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Book not found"));
}

// Add new book (goes to admin approval)
// Add new book (goes to admin approval)
@PostMapping
public Book addBook(
        @RequestBody Book book
) {

    System.out.println("========== NEW BOOK ==========");

    System.out.println("Title: " + book.getTitle());

    System.out.println("Author: " + book.getAuthor());

    System.out.println("Cover Image: " + book.getCoverImage());

    System.out.println("Cloudinary Public ID: "
            + book.getCloudinaryPublicId());

    System.out.println("Created By: "
            + book.getCreatedBy());

    System.out.println("==============================");

    book.setStatus("PENDING");

    Book savedBook = bookRepository.save(book);

    System.out.println("Saved Cloudinary Public ID: "
            + savedBook.getCloudinaryPublicId());

    return savedBook;
}

// Update book (again requires approval)
// Update book (requires admin approval)
@PutMapping("/{id}")
public Book updateBook(
        @PathVariable Long id,
        @RequestBody Book updatedBook
) {

    Book existingBook =
            bookRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Book not found"
                            ));

    // Store pending changes
    existingBook.setPendingTitle(
            updatedBook.getTitle()
    );

    existingBook.setPendingAuthor(
            updatedBook.getAuthor()
    );

    existingBook.setPendingCategory(
            updatedBook.getCategory()
    );

    existingBook.setPendingContent(
            updatedBook.getContent()
    );

    existingBook.setPendingCoverImage(
            updatedBook.getCoverImage()
    );

    // NEW: Save pending Cloudinary Public ID
    existingBook.setPendingCloudinaryPublicId(
            updatedBook.getCloudinaryPublicId()
    );

    existingBook.setPendingCloudinaryPublicId(
        updatedBook.getCloudinaryPublicId()
);

    // Mark book as waiting for admin approval
    existingBook.setUpdatePending(true);

    System.out.println("========== BOOK UPDATE ==========");
    System.out.println("Book ID: " + existingBook.getId());
    System.out.println("Pending Cover Image: " + updatedBook.getCoverImage());
    System.out.println("Pending Cloudinary Public ID: "
            + updatedBook.getCloudinaryPublicId());
    System.out.println("=================================");

    return bookRepository.save(existingBook);
}

// Delete book
@DeleteMapping("/{id}")
public String deleteBook(
        @PathVariable Long id
) {

    Book book = bookRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Book not found"));

    // Delete image from Cloudinary
    if (book.getCloudinaryPublicId() != null &&
        !book.getCloudinaryPublicId().isBlank()) {

        try {

            cloudinaryService.deleteImage(
                    book.getCloudinaryPublicId()
            );

        } catch (Exception e) {

            e.printStackTrace();

        }

    }

    bookRepository.delete(book);

    return "Book Deleted Successfully";
}

// Search approved books only
@GetMapping("/search/{keyword}")
public List<Book> searchBooks(
        @PathVariable String keyword
) {

    return bookRepository
            .findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                    keyword,
                    keyword
            );
}

// My Books
@GetMapping("/my-books/{email}")
public List<Book> getMyBooks(
        @PathVariable String email
) {

    return bookRepository.findByCreatedBy(email);
}

// ==========================
// ADMIN APIs
// ==========================

// View pending books
@GetMapping("/pending")
public List<Book> getPendingBooks() {

    List<Book> pendingBooks =
            bookRepository.findByStatus("PENDING");

    List<Book> editedBooks =
            bookRepository.findByUpdatePending(true);

    pendingBooks.addAll(editedBooks);

    return pendingBooks;
}

// Approve book
@PutMapping("/approve/{id}")
public Book approveBook(
        @PathVariable Long id
) {

    Book book = bookRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Book not found"));

    // If this is an edited book,
    // apply pending changes
    if (book.getUpdatePending() != null
            && book.getUpdatePending()) {

        book.setTitle(
                book.getPendingTitle()
        );

        book.setAuthor(
                book.getPendingAuthor()
        );

        book.setCategory(
                book.getPendingCategory()
        );

        book.setContent(
                book.getPendingContent()
        );

        // Delete previous Cloudinary image

if(book.getCloudinaryPublicId()!=null){

    try{

        cloudinaryService.deleteImage(
                book.getCloudinaryPublicId()
        );

    }catch(Exception e){

        e.printStackTrace();

    }

}

// Save new image

// Delete old Cloudinary image

if (book.getCloudinaryPublicId() != null &&
    !book.getCloudinaryPublicId().isBlank()) {

    try {

        cloudinaryService.deleteImage(
                book.getCloudinaryPublicId()
        );

    } catch (Exception e) {

        e.printStackTrace();

    }

}

// Save new image

book.setCoverImage(
        book.getPendingCoverImage()
);

book.setCloudinaryPublicId(
        book.getPendingCloudinaryPublicId()
);

book.setCloudinaryPublicId(
        book.getPendingCloudinaryPublicId()
);

        // Clear pending fields
        book.setPendingTitle(null);
        book.setPendingAuthor(null);
        book.setPendingCategory(null);
        book.setPendingContent(null);
        book.setPendingCoverImage(null);
         book.setPendingCloudinaryPublicId(null);
        book.setUpdatePending(false);
    }

    book.setStatus("APPROVED");

    return bookRepository.save(book);
}

// Reject book
@PutMapping("/reject/{id}")
public Book rejectBook(
        @PathVariable Long id
) {

    Book book = bookRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Book not found"));
        if(book.getPendingCloudinaryPublicId()!=null){

    try{

        cloudinaryService.deleteImage(
                book.getPendingCloudinaryPublicId()
        );

    }catch(Exception e){

        e.printStackTrace();

    }

    if (book.getPendingCloudinaryPublicId() != null &&
    !book.getPendingCloudinaryPublicId().isBlank()) {

    try {

        cloudinaryService.deleteImage(
                book.getPendingCloudinaryPublicId()
        );

    } catch (Exception e) {

        e.printStackTrace();

    }

}

}
    // Remove pending changes
    book.setPendingTitle(null);
    book.setPendingAuthor(null);
    book.setPendingCategory(null);
    book.setPendingContent(null);
    book.setPendingCoverImage(null);
    book.setPendingCloudinaryPublicId(null);
    book.setUpdatePending(false);

    // If it was a new book
    if ("PENDING".equals(book.getStatus())) {

        book.setStatus("REJECTED");

    } else {

        // Existing approved book stays approved
        book.setStatus("APPROVED");
    }

    return bookRepository.save(book);
}

}
