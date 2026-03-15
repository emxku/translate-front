package handler

import (
	"net/http"
	"strconv"
	"translate-front/internal/service"

	"github.com/gin-gonic/gin"
)

type ProfileHandler struct {
	userService *service.UserService
}

func NewProfileHandler(userService *service.UserService) *ProfileHandler {
	return &ProfileHandler{userService: userService}
}

func (h *ProfileHandler) Get(c *gin.Context) {
	userID, _ := c.Get("userID")

	user, err := h.userService.GetByID(userID.(int64))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":         user.ID,
		"email":      user.Email,
		"name":       user.Name,
		"bio":        user.Bio,
		"avatar_url": user.AvatarURL,
		"role":       user.Role,
	})
}

func (h *ProfileHandler) Update(c *gin.Context) {
	userID, _ := c.Get("userID")

	var input service.UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.userService.Update(userID.(int64), input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":         user.ID,
		"email":      user.Email,
		"name":       user.Name,
		"bio":        user.Bio,
		"avatar_url": user.AvatarURL,
		"role":       user.Role,
	})
}

func (h *ProfileHandler) GetStats(c *gin.Context) {
	userID, _ := c.Get("userID")

	stats, err := h.userService.GetStats(userID.(int64))
	if err != nil {
		// Return empty stats if not found
		c.JSON(http.StatusOK, gin.H{"user_id": userID, "projects_active": 0, "projects_finished": 0, "notes_count": 0, "chapters_count": 0})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// GetByID — получить профиль любого пользователя (для админки)
func (h *ProfileHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	user, err := h.userService.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":         user.ID,
		"email":      user.Email,
		"name":       user.Name,
		"bio":        user.Bio,
		"avatar_url": user.AvatarURL,
		"role":       user.Role,
	})
}
