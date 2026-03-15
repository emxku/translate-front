package service

import (
	"errors"
	"translate-front/internal/models"
	"translate-front/internal/repository"
)

type TranslationService struct {
	repo          *repository.TranslationRepository
	collaboratorRepo *repository.CollaboratorRepository
}

func NewTranslationService(repo *repository.TranslationRepository, collaboratorRepo *repository.CollaboratorRepository) *TranslationService {
	return &TranslationService{
		repo:          repo,
		collaboratorRepo: collaboratorRepo,
	}
}

type CreateTranslationInput struct {
	UserID      int64  `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type UpdateTranslationInput struct {
	Title          string `json:"title"`
	Description    string `json:"description"`
	CurrentChapter int    `json:"current_chapter"`
	Status         string `json:"status"`
}

func (s *TranslationService) Create(input CreateTranslationInput) (*models.Translation, error) {
	if input.Title == "" {
		return nil, errors.New("title is required")
	}

	translation := &models.Translation{
		UserID:      input.UserID,
		Title:       input.Title,
		Description: input.Description,
		CurrentChapter: 1,
		Status:      models.TranslationInProgress,
	}

	if err := s.repo.Create(translation); err != nil {
		return nil, err
	}

	// Add owner as collaborator
	collaborator := &models.Collaborator{
		TranslationID: translation.ID,
		UserID:        input.UserID,
		Role:          models.RoleOwner,
	}
	if err := s.collaboratorRepo.Create(collaborator); err != nil {
		return nil, err
	}

	return translation, nil
}

func (s *TranslationService) GetByID(id int64) (*models.Translation, error) {
	return s.repo.GetByID(id)
}

func (s *TranslationService) GetByUserID(userID int64) ([]models.Translation, error) {
	return s.repo.GetByUserID(userID)
}

func (s *TranslationService) GetAll() ([]models.Translation, error) {
	return s.repo.GetAll()
}

func (s *TranslationService) Update(id int64, input UpdateTranslationInput) (*models.Translation, error) {
	translation, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if input.Title != "" {
		translation.Title = input.Title
	}
	if input.Description != "" {
		translation.Description = input.Description
	}
	if input.CurrentChapter > 0 {
		translation.CurrentChapter = input.CurrentChapter
	}
	if input.Status != "" {
		translation.Status = models.TranslationStatus(input.Status)
	}

	if err := s.repo.Update(translation); err != nil {
		return nil, err
	}

	return translation, nil
}

func (s *TranslationService) Delete(id int64) error {
	return s.repo.Delete(id)
}
