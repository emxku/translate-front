package service

import (
	"errors"
	"translate-front/internal/models"
	"translate-front/internal/repository"
)

type NoteService struct {
	repo *repository.NoteRepository
}

func NewNoteService(repo *repository.NoteRepository) *NoteService {
	return &NoteService{repo: repo}
}

type CreateNoteInput struct {
	UserID  int64  `json:"user_id"`
	Content string `json:"content"`
}

type UpdateNoteInput struct {
	Content string `json:"content"`
}

func (s *NoteService) Create(input CreateNoteInput) (*models.Note, error) {
	if input.Content == "" {
		return nil, errors.New("content is required")
	}

	note := &models.Note{
		UserID:  input.UserID,
		Content: input.Content,
	}

	if err := s.repo.Create(note); err != nil {
		return nil, err
	}

	return note, nil
}

func (s *NoteService) GetByID(id int64) (*models.Note, error) {
	return s.repo.GetByID(id)
}

func (s *NoteService) GetByUserID(userID int64) ([]models.Note, error) {
	return s.repo.GetByUserID(userID)
}

func (s *NoteService) Update(id int64, input UpdateNoteInput) (*models.Note, error) {
	note, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if input.Content != "" {
		note.Content = input.Content
	}

	if err := s.repo.Update(note); err != nil {
		return nil, err
	}

	return note, nil
}

func (s *NoteService) Delete(id int64) error {
	return s.repo.Delete(id)
}
