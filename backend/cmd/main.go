package main

import (
	"log"
	"os"

	"translate-front/internal/config"
	"translate-front/internal/handler"
	"translate-front/internal/middleware"
	"translate-front/internal/models"
	"translate-front/internal/repository"
	"translate-front/internal/service"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load config
	cfg := config.Config{
		Env: "development",
		HTTPServer: config.ServerConfig{
			Address: ":8080",
		},
		DB: config.DBConfig{
			Driver: "postgres",
			URL:    getEnv("DATABASE_URL", "host=localhost user=postgres password=postgres dbname=translate port=5432 sslmode=disable"),
		},
		JWT: config.JWTConfig{
			Secret:         getEnv("JWT_SECRET", "dev-secret-change-in-production"),
			AccessTokenTTL: 3600 * 24, // 24 hours
		},
		CORS: config.CORSConfig{
			AllowedOrigins: []string{"http://localhost:5173"},
			AllowedMethods: []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
		},
		Admin: config.AdminConfig{
			Email:    getEnv("ADMIN_EMAIL", "admin@translate.local"),
			Password: getEnv("ADMIN_PASSWORD", "admin123"),
			Name:     getEnv("ADMIN_NAME", "Администратор"),
		},
	}

	// Connect to database
	db, err := gorm.Open(postgres.Open(cfg.DB.URL), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate
	if err := db.AutoMigrate(
		&models.User{},
		&models.UserStats{},
		&models.Translation{},
		&models.Chapter{},
		&models.Note{},
		&models.Collaborator{},
	); err != nil {
		log.Fatalf("Failed to migrate: %v", err)
	}

	// Seed admin user
	seeder := repository.NewSeeder(db)
	if err := seeder.SeedAdmin(cfg.Admin.Email, cfg.Admin.Password, cfg.Admin.Name); err != nil {
		log.Printf("Warning: failed to seed admin: %v", err)
	} else {
		log.Printf("Admin user created: %s", cfg.Admin.Email)
	}

	// Repositories
	userRepo := repository.NewUserRepository(db)
	translationRepo := repository.NewTranslationRepository(db)
	chapterRepo := repository.NewChapterRepository(db)
	noteRepo := repository.NewNoteRepository(db)
	collaboratorRepo := repository.NewCollaboratorRepository(db)

	// Services
	userService := service.NewUserService(userRepo)
	translationService := service.NewTranslationService(translationRepo, collaboratorRepo)
	chapterService := service.NewChapterService(chapterRepo)
	noteService := service.NewNoteService(noteRepo)
	collaboratorService := service.NewCollaboratorService(collaboratorRepo)
	jwtService := service.NewJWTService(cfg.JWT.Secret, cfg.JWT.AccessTokenTTL, cfg.JWT.RefreshTokenTTL)

	// Handlers
	authHandler := handler.NewAuthHandler(userService, jwtService)
	adminHandler := handler.NewAdminHandler(userService)
	profileHandler := handler.NewProfileHandler(userService)
	translationHandler := handler.NewTranslationHandler(translationService)
	chapterHandler := handler.NewChapterHandler(chapterService)
	noteHandler := handler.NewNoteHandler(noteService)
	collaboratorHandler := handler.NewCollaboratorHandler(collaboratorService)

	// Router
	r := gin.Default()
	r.Use(middleware.CORS())

	// Auth routes
	r.POST("/auth/signin", authHandler.SignIn)
	r.POST("/auth/signup", authHandler.SignUp)
	r.POST("/auth/refresh", authHandler.Refresh)

	// Protected routes
	protected := r.Group("")
	protected.Use(middleware.AuthMiddleware(cfg.JWT.Secret))
	{
		// Profile
		protected.GET("/profile", profileHandler.Get)
		protected.PATCH("/profile", profileHandler.Update)
		protected.GET("/profile/stats", profileHandler.GetStats)

		// Translations
		protected.GET("/translations", translationHandler.GetAll)
		protected.POST("/translations", translationHandler.Create)
		protected.GET("/translations/:id", translationHandler.GetByID)
		protected.PATCH("/translations/:id", translationHandler.Update)
		protected.DELETE("/translations/:id", translationHandler.Delete)

		// Chapters
		protected.GET("/translations/:id/chapters", chapterHandler.GetByTranslationID)
		protected.POST("/translations/:id/chapters", chapterHandler.Create)
		protected.PATCH("/chapters/:id", chapterHandler.Update)
		protected.DELETE("/chapters/:id", chapterHandler.Delete)
		protected.PUT("/chapters/reorder", chapterHandler.Reorder)

		// Notes
		protected.GET("/notes", noteHandler.GetByUserID)
		protected.POST("/notes", noteHandler.Create)
		protected.GET("/notes/:id", noteHandler.GetByID)
		protected.PATCH("/notes/:id", noteHandler.Update)
		protected.DELETE("/notes/:id", noteHandler.Delete)

		// Collaborators
		protected.GET("/translations/:id/members", collaboratorHandler.GetByTranslationID)
		protected.POST("/translations/:id/members", collaboratorHandler.Add)
		protected.DELETE("/translations/:id/members/:userId", collaboratorHandler.Remove)
	}

	// Admin routes
	admin := r.Group("/admin")
	admin.Use(middleware.AuthMiddleware(cfg.JWT.Secret))
	admin.Use(middleware.RequireAdmin())
	{
		admin.GET("/users", adminHandler.GetUsers)
		admin.POST("/users", adminHandler.CreateUser)
		admin.PATCH("/users/:id", adminHandler.UpdateUser)
		admin.DELETE("/users/:id", adminHandler.DeleteUser)
		admin.GET("/users/:id", profileHandler.GetByID)
	}

	// Start server
	log.Printf("Server starting on %s", cfg.HTTPServer.Address)
	if err := r.Run(cfg.HTTPServer.Address); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}