package repository

import (
	"translate-front/internal/models"

	"gorm.io/gorm"
)

type ChapterRepository struct {
	db *gorm.DB
}

func NewChapterRepository(db *gorm.DB) *ChapterRepository {
	return &ChapterRepository{db: db}
}

func (r *ChapterRepository) Create(chapter *models.Chapter) error {
	return r.db.Create(chapter).Error
}

func (r *ChapterRepository) GetByID(id int64) (*models.Chapter, error) {
	var chapter models.Chapter
	err := r.db.First(&chapter, id).Error
	if err != nil {
		return nil, err
	}
	return &chapter, nil
}

func (r *ChapterRepository) GetByTranslationID(translationID int64) ([]models.Chapter, error) {
	var chapters []models.Chapter
	err := r.db.Where("translation_id = ?", translationID).Order("`order` ASC").Find(&chapters).Error
	return chapters, err
}

func (r *ChapterRepository) Update(chapter *models.Chapter) error {
	return r.db.Save(chapter).Error
}

func (r *ChapterRepository) Delete(id int64) error {
	return r.db.Delete(&models.Chapter{}, id).Error
}

func (r *ChapterRepository) Reorder(chapters []models.Chapter) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		for _, ch := range chapters {
			if err := tx.Save(&ch).Error; err != nil {
				return err
			}
		}
		return nil
	})
}
