package models

import "time"

// Statuses
type TranslationStatus string

const (
	TranslationInProgress TranslationStatus = "in_progress"
	TranslationFinished   TranslationStatus = "finished"
)

type Translation struct {
	ID              int64            `json:"id" gorm:"primaryKey"`
	UserID          int64            `json:"user_id" gorm:"not null;index"`
	Title           string           `json:"title" gorm:"not null"`
	Description     string           `json:"description"`
	CurrentChapter  int              `json:"current_chapter" gorm:"default:1"`
	Status          TranslationStatus `json:"status" gorm:"default:'in_progress'"`
	CreatedAt       time.Time        `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt       *time.Time       `json:"updated_at" gorm:"autoUpdateTime"`

	Chapters      []Chapter      `gorm:"foreignKey:TranslationID" json:"-"`
	Collaborators []Collaborator `gorm:"foreignKey:TranslationID" json:"-"`
}

func (Translation) TableName() string {
	return "translations"
}