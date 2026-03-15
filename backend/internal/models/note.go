package models

import "time"

type Note struct {
	ID        int64      `json:"id" gorm:"primaryKey"`
	UserID    int64      `json:"user_id" gorm:"not null;index"`
	Content   string     `json:"content" gorm:"type:text;not null"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"autoUpdateTime"`

	User User `gorm:"foreignKey:UserID" json:"-"`
}

func (Note) TableName() string {
	return "notes"
}
