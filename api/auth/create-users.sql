-- ============================================================
-- Script SQL de Création des Utilisateurs Admin
-- MDO Services - Espaces Partenaire et Client
-- ============================================================
--
-- Ce script crée la table users et insère les comptes admin
-- Utilisation : Importez ce fichier dans phpMyAdmin
--
-- ⚠️ IMPORTANT : Changez les mots de passe après la première connexion !
-- ============================================================

-- Créer la table users (si elle n'existe pas)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100),
  `role` VARCHAR(20) NOT NULL DEFAULT 'client',
  `is_admin` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL,
  INDEX `idx_username` (`username`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Supprimer les utilisateurs existants (pour recréation)
-- ============================================================

DELETE FROM `users` WHERE `username` IN ('admin_partner', 'admin_client', 'demo_partner', 'demo_client');

-- ============================================================
-- Insérer les utilisateurs par défaut
-- ============================================================

-- 1. ADMIN ESPACE PARTENAIRE
-- Username: admin_partner
-- Password: MDOPartner2024!
-- Rôle: partner (admin)
INSERT INTO `users` (`username`, `password_hash`, `email`, `role`, `is_admin`)
VALUES (
  'admin_partner',
  '$2y$10$W5xJZ1KvXQh5R8mF3.7nK.YHdLz0PQZ9yDxJvMnWqE8RtLzF6xKNC',
  'admin@mdoservices.fr',
  'partner',
  TRUE
);

-- 2. ADMIN ESPACE CLIENT
-- Username: admin_client
-- Password: MDOClient2024!
-- Rôle: client (non-admin)
INSERT INTO `users` (`username`, `password_hash`, `email`, `role`, `is_admin`)
VALUES (
  'admin_client',
  '$2y$10$8ZKr3YzLm2QxJnF4WpHtQe.vR7sD1MaP6kN9bC5oE2wTxLvY8hGiS',
  'client@mdoservices.fr',
  'client',
  FALSE
);

-- 3. COMPTE DEMO PARTENAIRE
-- Username: demo_partner
-- Password: DemoPartner2024
-- Rôle: partner (non-admin)
INSERT INTO `users` (`username`, `password_hash`, `email`, `role`, `is_admin`)
VALUES (
  'demo_partner',
  '$2y$10$R4pM8XfT1kLnJvD2wH9ZQ.A3sC6eF9gB7mN5oE1rTyWxKvP2hLiU',
  'demo.partner@mdoservices.fr',
  'partner',
  FALSE
);

-- 4. COMPTE DEMO CLIENT
-- Username: demo_client
-- Password: DemoClient2024
-- Rôle: client (non-admin)
INSERT INTO `users` (`username`, `password_hash`, `email`, `role`, `is_admin`)
VALUES (
  'demo_client',
  '$2y$10$Q7nJ9VdS5mKwLxE3vG8YP.B4rD8fH1nC6oM4pF2sUzXyJvN3kMjT',
  'demo.client@mdoservices.fr',
  'client',
  FALSE
);

-- ============================================================
-- Vérifier les utilisateurs créés
-- ============================================================

SELECT
  id,
  username,
  email,
  role,
  is_admin,
  created_at
FROM `users`
ORDER BY id DESC;

-- ============================================================
-- IDENTIFIANTS DE CONNEXION
-- ============================================================
--
-- 🔹 ESPACE PARTENAIRE (https://mdoservices.fr/partner)
--    Username: admin_partner
--    Password: MDOPartner2024!
--    Rôle: Admin Partenaire
--
-- 🔹 ESPACE CLIENT (https://mdoservices.fr/client)
--    Username: admin_client
--    Password: MDOClient2024!
--    Rôle: Client
--
-- 🔹 COMPTE DEMO PARTENAIRE
--    Username: demo_partner
--    Password: DemoPartner2024
--    Rôle: Partenaire (non-admin)
--
-- 🔹 COMPTE DEMO CLIENT
--    Username: demo_client
--    Password: DemoClient2024
--    Rôle: Client (non-admin)
--
-- ============================================================
-- ⚠️ SÉCURITÉ
-- ============================================================
--
-- 1. Changez immédiatement ces mots de passe après la première connexion
-- 2. Supprimez ce fichier SQL du serveur après utilisation
-- 3. Ne partagez jamais ces identifiants par email non sécurisé
-- 4. Utilisez un gestionnaire de mots de passe sécurisé
--
-- ============================================================
