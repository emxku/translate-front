package handler

import (
	"net/http"
	"strconv"
	"translate-front/internal/service"

	"github.com/gin-gonic/gin"
)

type CollaboratorHandler struct {
	service *service.CollaboratorService
}

func NewCollaboratorHandler(s *service.CollaboratorService) *CollaboratorHandler {
	return &CollaboratorHandler{service: s}
}

func (h *CollaboratorHandler) Add(c *gin.Context) {
	var input service.AddCollaboratorInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collaborator, err := h.service.Add(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, collaborator)
}

func (h *CollaboratorHandler) GetByTranslationID(c *gin.Context) {
	translationID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid translation id"})
		return
	}

	collaborators, err := h.service.GetByTranslationID(translationID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, collaborators)
}

func (h *CollaboratorHandler) Remove(c *gin.Context) {
	translationID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid translation id"})
		return
	}

	userID, err := strconv.ParseInt(c.Param("userId"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}

	if err := h.service.Remove(translationID, userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "removed"})
}
