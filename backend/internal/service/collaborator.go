package service

import (
	"errors"
	"translate-front/internal/models"
	"translate-front/internal/repository"
)

type CollaboratorService struct {
	repo *repository.CollaboratorRepository
}

func NewCollaboratorService(repo *repository.CollaboratorRepository) *CollaboratorService {
	return &CollaboratorService{repo: repo}
}

type AddCollaboratorInput struct {
	TranslationID int64  `json:"translation_id"`
	UserID        int64  `json:"user_id"`
	Role          string `json:"role"`
}

func (s *CollaboratorService) Add(input AddCollaboratorInput) (*models.Collaborator, error) {
	// Check if already collaborator
	existing, _ := s.repo.GetByTranslationAndUserID(input.TranslationID, input.UserID)
	if existing != nil {
		return nil, errors.New("user is already a collaborator")
	}

	role := models.RoleMember
	if input.Role == "owner" {
		role = models.RoleOwner
	}

	collaborator := &models.Collaborator{
		TranslationID: input.TranslationID,
		UserID:        input.UserID,
		Role:          role,
	}

	if err := s.repo.Create(collaborator); err != nil {
		return nil, err
	}

	return collaborator, nil
}

func (s *CollaboratorService) GetByTranslationID(translationID int64) ([]models.Collaborator, error) {
	return s.repo.GetByTranslationID(translationID)
}

func (s *CollaboratorService) GetByTranslationAndUserID(translationID, userID int64) (*models.Collaborator, error) {
	return s.repo.GetByTranslationAndUserID(translationID, userID)
}

func (s *CollaboratorService) Remove(translationID, userID int64) error {
	return s.repo.DeleteByTranslationAndUserID(translationID, userID)
}

func (s *CollaboratorService) IsOwner(translationID, userID int64) bool {
	collab, err := s.repo.GetByTranslationAndUserID(translationID, userID)
	if err != nil {
		return false
	}
	return collab.Role == models.RoleOwner
}
