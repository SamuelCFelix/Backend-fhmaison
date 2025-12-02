const prisma = require("../../utils/prismaClient");
const logger = require("../../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Funções: login, logout, refresh token, forgot password
