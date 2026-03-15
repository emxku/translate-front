package repository

import (
	"translate-front/internal/models"

	"gorm.io/gorm"
)

type TranslationRepository struct {
	db *gorm.DB
}

func NewTranslationRepository(db *gorm.DB) *TranslationRepository {
	return &TranslationRepository{db: db}
}

func (r *TranslationRepository) Create(translation *models.Translation) error {
	return r.db.Create(translation).Error
}

func (r *TranslationRepository) GetByID(id int64) (*models.Translation, error) {
	var translation models.Translation
	err := r.db.First(&translation, id).Error
	if err != nil {
		return nil, err
	}
	return &translation, nil
}

func (r *TranslationRepository) GetByUserID(userID int64) ([]models.Translation, error) {
	var translations []models.Translation
	err := r.db.Where("user_id = ?", userID).Find(&translations).Error
	return translations, err
}

func (r *TranslationRepository) GetAll() ([]models.Translation, error) {
	var translations []models.Translation
	err := r.db.Find(&translations).Error
	return translations, err
}

func (r *TranslationRepository) Update(translation *models.Translation) error {
	return r.db.Save(translation).Error
}

func (r *TranslationRepository) Delete(id int64) error {
	return r.db.Delete(&models.Translation{}, id).Error
}
