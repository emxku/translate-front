package repository

import (
	"translate-front/internal/models"

	"gorm.io/gorm"
)

type CollaboratorRepository struct {
	db *gorm.DB
}

func NewCollaboratorRepository(db *gorm.DB) *CollaboratorRepository {
	return &CollaboratorRepository{db: db}
}

func (r *CollaboratorRepository) Create(collaborator *models.Collaborator) error {
	return r.db.Create(collaborator).Error
}

func (r *CollaboratorRepository) GetByID(id int64) (*models.Collaborator, error) {
	var collaborator models.Collaborator
	err := r.db.First(&collaborator, id).Error
	if err != nil {
		return nil, err
	}
	return &collaborator, nil
}

func (r *CollaboratorRepository) GetByTranslationID(translationID int64) ([]models.Collaborator, error) {
	var collaborators []models.Collaborator
	err := r.db.Where("translation_id = ?", translationID).Find(&collaborators).Error
	return collaborators, err
}

func (r *CollaboratorRepository) GetByTranslationAndUserID(translationID, userID int64) (*models.Collaborator, error) {
	var collaborator models.Collaborator
	err := r.db.Where("translation_id = ? AND user_id = ?", translationID, userID).First(&collaborator).Error
	if err != nil {
		return nil, err
	}
	return &collaborator, nil
}

func (r *CollaboratorRepository) Update(collaborator *models.Collaborator) error {
	return r.db.Save(collaborator).Error
}

func (r *CollaboratorRepository) Delete(id int64) error {
	return r.db.Delete(&models.Collaborator{}, id).Error
}

func (r *CollaboratorRepository) DeleteByTranslationAndUserID(translationID, userID int64) error {
	return r.db.Where("translation_id = ? AND user_id = ?", translationID, userID).Delete(&models.Collaborator{}).Error
}
