package models

import "time"

// Roles
type UserRole string

const (
	RoleUser  UserRole = "user"
	RoleAdmin UserRole = "admin"
)

type User struct {
	ID           int64      `json:"id" gorm:"primaryKey"`
	Email        string     `json:"email" gorm:"uniqueIndex;not null"`
	PasswordHash string     `json:"-" gorm:"not null"`
	Name         string     `json:"name" gorm:"not null"`
	Bio          string     `json:"bio"`
	AvatarURL    string     `json:"avatar_url"`
	Role         UserRole   `json:"role" gorm:"default:'user'"`
	CreatedAt    time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    *time.Time `json:"updated_at" gorm:"autoUpdateTime"`

	Translations  []Translation  `gorm:"foreignKey:UserID" json:"-"`
	Notes         []Note         `gorm:"foreignKey:UserID" json:"-"`
	Collaborators []Collaborator `gorm:"foreignKey:UserID" json:"-"`
}

func (User) TableName() string {
	return "users"
}

type UserStats struct {
	UserID           int64 `json:"user_id" gorm:"primaryKey"`
	ProjectsActive   int   `json:"projects_active"`
	ProjectsFinished int   `json:"projects_finished"`
	NotesCount       int   `json:"notes_count"`
	ChaptersCount    int   `json:"chapters_count"`
}

func (UserStats) TableName() string {
	return "user_stats"
}