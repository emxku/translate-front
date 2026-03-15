package handler

import (
	"net/http"
	"translate-front/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	userService  *service.UserService
	jwtService   *service.JWTService
}

func NewAuthHandler(userService *service.UserService, jwtService *service.JWTService) *AuthHandler {
	return &AuthHandler{
		userService: userService,
		jwtService:  jwtService,
	}
}

type SignInInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type SignInResponse struct {
	User  interface{} `json:"user"`
	Token string      `json:"token"`
}

// SignIn — вход
func (h *AuthHandler) SignIn(c *gin.Context) {
	var input SignInInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.userService.GetByEmail(input.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if !h.userService.ValidatePassword(user, input.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	// Generate tokens
	tokens, err := h.jwtService.GenerateTokenPair(user.ID, string(user.Email), string(user.Role))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":         user.ID,
			"email":      user.Email,
			"name":       user.Name,
			"bio":        user.Bio,
			"avatar_url": user.AvatarURL,
			"role":       user.Role,
		},
		"access_token":  tokens.AccessToken,
		"refresh_token": tokens.RefreshToken,
	})
}

// SignUp — регистрация (отключаем, так как только админ создаёт юзеров)
func (h *AuthHandler) SignUp(c *gin.Context) {
	c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "registration is disabled"})
}

// Refresh — обновление токенов
func (h *AuthHandler) Refresh(c *gin.Context) {
	var input struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	claims, err := h.jwtService.ValidateToken(input.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid refresh token"})
		return
	}

	user, err := h.userService.GetByID(claims.UserID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
		return
	}

	tokens, err := h.jwtService.GenerateTokenPair(user.ID, string(user.Email), string(user.Role))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, tokens)
}
