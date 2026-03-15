package models

import "time"

// Statuses
type ChapterStatus string

const (
	ChapterInProgress ChapterStatus = "in_progress"
	ChapterTranslated ChapterStatus = "translated"
	ChapterReviewed   ChapterStatus = "reviewed"
)

type Chapter struct {
	ID             int64         `json:"id" gorm:"primaryKey"`
	TranslationID  int64         `json:"translation_id" gorm:"not null;index"`
	Title          string        `json:"title" gorm:"not null"`
	Order          int           `json:"order" gorm:"not null"`
	OriginalText   string        `json:"original_text" gorm:"type:text"`
	TranslatedText string        `json:"translated_text" gorm:"type:text"`
	Status         ChapterStatus `json:"status" gorm:"default:'in_progress'"`
	CreatedAt      time.Time     `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      *time.Time    `json:"updated_at" gorm:"autoUpdateTime"`

	Translation Translation `gorm:"foreignKey:TranslationID" json:"-"`
}

func (Chapter) TableName() string {
	return "chapters"
}