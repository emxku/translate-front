package repository

import (
	"translate-front/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Seeder struct {
	db *gorm.DB
}

func NewSeeder(db *gorm.DB) *Seeder {
	return &Seeder{db: db}
}

func (s *Seeder) SeedAdmin(email, password, name string) error {
	// Check if admin already exists
	var count int64
	s.db.Model(&models.User{}).Count(&count)
	if count > 0 {
		return nil // Already seeded
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	admin := &models.User{
		Email:        email,
		PasswordHash: string(hashedPassword),
		Name:         name,
		Role:         models.RoleAdmin,
		Bio:          "Администратор",
	}

	return s.db.Create(admin).Error
}
