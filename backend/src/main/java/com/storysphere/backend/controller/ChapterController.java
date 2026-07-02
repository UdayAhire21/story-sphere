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

import com.storysphere.backend.model.Chapter;
import com.storysphere.backend.repository.ChapterRepository;


@RestController
@RequestMapping("/chapters")
@CrossOrigin(origins = "*")
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    // Get approved chapters of a specific book
    @GetMapping("/book/{bookId}")
    public List<Chapter> getChaptersByBook(
            @PathVariable Long bookId
    ) {

        return chapterRepository
                .findByBookIdAndStatusOrderByChapterNumber(
                        bookId,
                        "APPROVED"
                );
    }

    // Get chapter by ID
    @GetMapping("/{id}")
    public Chapter getChapterById(
            @PathVariable Long id
    ) {

        return chapterRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Chapter not found"
                        ));
    }

    // Add chapter (requires admin approval)
    @PostMapping
    public Chapter addChapter(
            @RequestBody Chapter chapter
    ) {

        chapter.setStatus("PENDING");

        return chapterRepository.save(chapter);
    }

    // Update chapter (requires re-approval)
    @PutMapping("/{id}")
public Chapter updateChapter(
        @PathVariable Long id,
        @RequestBody Chapter updatedChapter
) {

    Chapter existingChapter =
            chapterRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Chapter not found"
                            ));

    existingChapter.setPendingChapterTitle(
            updatedChapter.getChapterTitle()
    );

    existingChapter.setPendingChapterNumber(
            updatedChapter.getChapterNumber()
    );

    existingChapter.setPendingContent(
            updatedChapter.getContent()
    );

    existingChapter.setStatus("PENDING");

    return chapterRepository.save(
            existingChapter
    );
}

    // Delete chapter
    @DeleteMapping("/{id}")
    public String deleteChapter(
            @PathVariable Long id
    ) {

        Chapter chapter =
                chapterRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Chapter not found"
                                ));

        chapterRepository.delete(chapter);

        return "Chapter Deleted Successfully";
    }

    // Get chapters by author
    @GetMapping("/author/{email}")
    public List<Chapter> getAuthorChapters(
            @PathVariable String email
    ) {

        return chapterRepository
                .findByCreatedBy(email);
    }

    // ==========================
    // ADMIN APIs
    // ==========================

    // Get all pending chapters
    @GetMapping("/pending")
    public List<Chapter> getPendingChapters() {

        return chapterRepository
                .findByStatus("PENDING");
    }

    // Approve chapter
    @PutMapping("/approve/{id}")
public Chapter approveChapter(
        @PathVariable Long id
) {

    Chapter chapter =
            chapterRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Chapter not found"
                            ));

    if (chapter.getPendingChapterTitle() != null) {

        chapter.setChapterTitle(
                chapter.getPendingChapterTitle()
        );

        chapter.setChapterNumber(
                chapter.getPendingChapterNumber()
        );

        chapter.setContent(
                chapter.getPendingContent()
        );

        chapter.setPendingChapterTitle(null);
        chapter.setPendingChapterNumber(null);
        chapter.setPendingContent(null);
    }

    chapter.setStatus("APPROVED");

    return chapterRepository.save(
            chapter
    );
}

    // Reject chapter
  @PutMapping("/reject/{id}")
public Chapter rejectChapter(
        @PathVariable Long id
) {

    Chapter chapter =
            chapterRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Chapter not found"
                            ));

    chapter.setPendingChapterTitle(null);
    chapter.setPendingChapterNumber(null);
    chapter.setPendingContent(null);

    chapter.setStatus("APPROVED");

    return chapterRepository.save(
            chapter
    );
}
}