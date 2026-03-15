package config

import "time"

type Config struct {
	Env        string       `yaml:"env" env:"ENV"`
	HTTPServer ServerConfig `yaml:"server"`
	DB         DBConfig     `yaml:"db"`
	JWT        JWTConfig    `yaml:"jwt"`
	CORS       CORSConfig   `yaml:"cors"`
	Admin      AdminConfig  `yaml:"admin"`
}

type AdminConfig struct {
	Email    string `yaml:"email"`
	Password string `yaml:"password"`
	Name     string `yaml:"name"`
}

type ServerConfig struct {
	Address         string
	ReadTimeout     time.Duration
	WriteTimeout    time.Duration
	IdleTimeout     time.Duration
	ShutdownTimeout time.Duration
	MaxHeaderBytes  int
	Concurrency     int
}

type DBConfig struct {
	Name             string
	Driver           string
	URL              string
	MaxOpenConns     int
	MaxIdleConns     int
	ConnMaxLifetime  time.Duration
	ConnIdleLifetime time.Duration
}

type JWTConfig struct {
	Secret          string
	RefreshTokenTTL time.Duration
	AccessTokenTTL  time.Duration
}

type CORSConfig struct {
	AllowedOrigins []string `yaml:"allowed_origins"`
	AllowedMethods []string `yaml:"allowed_methods"`
	AllowedHeaders []string `yaml:"allowed_headers"`
}