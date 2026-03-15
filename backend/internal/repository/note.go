package repository

import (
	"translate-front/internal/models"

	"gorm.io/gorm"
)

type NoteRepository struct {
	db *gorm.DB
}

func NewNoteRepository(db *gorm.DB) *NoteRepository {
	return &NoteRepository{db: db}
}

func (r *NoteRepository) Create(note *models.Note) error {
	return r.db.Create(note).Error
}

func (r *NoteRepository) GetByID(id int64) (*models.Note, error) {
	var note models.Note
	err := r.db.First(&note, id).Error
	if err != nil {
		return nil, err
	}
	return &note, nil
}

func (r *NoteRepository) GetByUserID(userID int64) ([]models.Note, error) {
	var notes []models.Note
	err := r.db.Where("user_id = ?", userID).Order("created_at DESC").Find(&notes).Error
	return notes, err
}

func (r *NoteRepository) Update(note *models.Note) error {
	return r.db.Save(note).Error
}

func (r *NoteRepository) Delete(id int64) error {
	return r.db.Delete(&models.Note{}, id).Error
}
