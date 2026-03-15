package service

import (
	"errors"
	"translate-front/internal/models"
	"translate-front/internal/repository"
)

type ChapterService struct {
	repo *repository.ChapterRepository
}

func NewChapterService(repo *repository.ChapterRepository) *ChapterService {
	return &ChapterService{repo: repo}
}

type CreateChapterInput struct {
	TranslationID int64  `json:"translation_id"`
	Title         string `json:"title"`
	Order         int    `json:"order"`
	OriginalText  string `json:"original_text"`
}

type UpdateChapterInput struct {
	Title          string `json:"title"`
	OriginalText   string `json:"original_text"`
	TranslatedText string `json:"translated_text"`
	Status         string `json:"status"`
}

type ReorderChapterInput struct {
	ID    int64 `json:"id"`
	Order int   `json:"order"`
}

func (s *ChapterService) Create(input CreateChapterInput) (*models.Chapter, error) {
	if input.Title == "" {
		return nil, errors.New("title is required")
	}

	// If order not provided, get max order + 1
	if input.Order == 0 {
		chapters, err := s.repo.GetByTranslationID(input.TranslationID)
		if err != nil {
			return nil, err
		}
		input.Order = len(chapters) + 1
	}

	chapter := &models.Chapter{
		TranslationID: input.TranslationID,
		Title:         input.Title,
		Order:         input.Order,
		OriginalText:  input.OriginalText,
		Status:        models.ChapterInProgress,
	}

	if err := s.repo.Create(chapter); err != nil {
		return nil, err
	}

	return chapter, nil
}

func (s *ChapterService) GetByID(id int64) (*models.Chapter, error) {
	return s.repo.GetByID(id)
}

func (s *ChapterService) GetByTranslationID(translationID int64) ([]models.Chapter, error) {
	return s.repo.GetByTranslationID(translationID)
}

func (s *ChapterService) Update(id int64, input UpdateChapterInput) (*models.Chapter, error) {
	chapter, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if input.Title != "" {
		chapter.Title = input.Title
	}
	if input.OriginalText != "" {
		chapter.OriginalText = input.OriginalText
	}
	if input.TranslatedText != "" {
		chapter.TranslatedText = input.TranslatedText
	}
	if input.Status != "" {
		chapter.Status = models.ChapterStatus(input.Status)
	}

	if err := s.repo.Update(chapter); err != nil {
		return nil, err
	}

	return chapter, nil
}

func (s *ChapterService) Delete(id int64) error {
	return s.repo.Delete(id)
}

func (s *ChapterService) Reorder(inputs []ReorderChapterInput) error {
	var chapters []models.Chapter
	for _, inp := range inputs {
		chapter, err := s.repo.GetByID(inp.ID)
		if err != nil {
			return err
		}
		chapter.Order = inp.Order
		chapters = append(chapters, *chapter)
	}
	return s.repo.Reorder(chapters)
}
