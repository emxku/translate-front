package service

import (
	"errors"
	"translate-front/internal/models"
	"translate-front/internal/repository"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

type CreateUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Bio      string `json:"bio"`
	Role     string `json:"role"`
}

type UpdateUserInput struct {
	Name      string `json:"name"`
	Bio       string `json:"bio"`
	AvatarURL string `json:"avatar_url"`
	Role      string `json:"role"`
}

func (s *UserService) Create(input CreateUserInput) (*models.User, error) {
	// Check if email exists
	existing, _ := s.repo.GetByEmail(input.Email)
	if existing != nil {
		return nil, errors.New("email already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	role := models.RoleUser
	if input.Role == "admin" {
		role = models.RoleAdmin
	}

	user := &models.User{
		Email:        input.Email,
		PasswordHash: string(hashedPassword),
		Name:         input.Name,
		Bio:          input.Bio,
		Role:         role,
	}

	if err := s.repo.Create(user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) GetByID(id int64) (*models.User, error) {
	return s.repo.GetByID(id)
}

func (s *UserService) GetByEmail(email string) (*models.User, error) {
	return s.repo.GetByEmail(email)
}

func (s *UserService) GetAll() ([]models.User, error) {
	return s.repo.GetAll()
}

func (s *UserService) Update(id int64, input UpdateUserInput) (*models.User, error) {
	user, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if input.Name != "" {
		user.Name = input.Name
	}
	if input.Bio != "" {
		user.Bio = input.Bio
	}
	if input.AvatarURL != "" {
		user.AvatarURL = input.AvatarURL
	}
	if input.Role != "" {
		user.Role = models.UserRole(input.Role)
	}

	if err := s.repo.Update(user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) Delete(id int64) error {
	return s.repo.Delete(id)
}

func (s *UserService) GetStats(userID int64) (*models.UserStats, error) {
	return s.repo.GetStats(userID)
}

func (s *UserService) ValidatePassword(user *models.User, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	return err == nil
}
