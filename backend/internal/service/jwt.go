package service

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTService struct {
	secret          string
	accessTokenTTL  time.Duration
	refreshTokenTTL time.Duration
}

func NewJWTService(secret string, accessTokenTTL, refreshTokenTTL time.Duration) *JWTService {
	return &JWTService{
		secret:          secret,
		accessTokenTTL:  accessTokenTTL,
		refreshTokenTTL: refreshTokenTTL,
	}
}

type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type Claims struct {
	UserID int64  `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

func (s *JWTService) GenerateTokenPair(userID int64, email, role string) (*TokenPair, error) {
	accessToken, err := s.generateToken(userID, email, role, s.accessTokenTTL)
	if err != nil {
		return nil, err
	}

	refreshToken, err := s.generateToken(userID, email, role, s.refreshTokenTTL)
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (s *JWTService) GenerateAccessToken(userID int64, email, role string) (string, error) {
	return s.generateToken(userID, email, role, s.accessTokenTTL)
}

func (s *JWTService) generateToken(userID int64, email, role string, ttl time.Duration) (string, error) {
	claims := Claims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(ttl)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.secret))
}

func (s *JWTService) ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.secret), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, jwt.ErrSignatureInvalid
}
