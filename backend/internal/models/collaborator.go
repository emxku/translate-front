package models

import "time"

// Roles
type CollaboratorRole string

const (
	RoleOwner  CollaboratorRole = "owner"
	RoleMember CollaboratorRole = "member"
)

type Collaborator struct {
	ID            int64           `json:"id" gorm:"primaryKey"`
	TranslationID int64           `json:"translation_id" gorm:"not null;index:idx_collab_trans_user,unique"`
	UserID        int64           `json:"user_id" gorm:"not null;index:idx_collab_trans_user,unique"`
	Role          CollaboratorRole `json:"role" gorm:"default:'member'"`
	JoinedAt      time.Time       `json:"joined_at" gorm:"autoCreateTime"`

	Translation Translation `gorm:"foreignKey:TranslationID" json:"-"`
	User        User        `gorm:"foreignKey:UserID" json:"-"`
}

func (Collaborator) TableName() string {
	return "collaborators"
}
