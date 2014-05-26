-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Sam 03 Mai 2014 à 20:55
-- Version du serveur :  5.1.56-community
-- Version de PHP :  5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `hébergement`
--

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `city`
--

INSERT INTO `city` (`id`, `name`) VALUES
(3, 'Paris'),
(4, 'Nimes'),
(5, 'Marseille'),
(6, 'Lyon'),
(7, 'Lille'),
(8, 'Avignon'),
(9, 'Strasbourg'),
(10, 'Toulouse'),
(11, 'Nice'),
(12, 'Monaco'),
(13, 'Saint Etienne'),
(14, 'Loraine'),
(15, 'Montpellier'),
(16, 'Bordeau');

-- --------------------------------------------------------

--
-- Structure de la table `hotel`
--

CREATE TABLE IF NOT EXISTS `hotel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hotel` text NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `address` varchar(45) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `belongs_to` (`city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Contenu de la table `hotel`
--

INSERT INTO `hotel` (`id`, `hotel`, `city_id`, `address`, `description`) VALUES
(28, 'Paris Hotel', 3, 'Paris, 75007', 'SituÃ© Ã  300 mÃ¨tres du quartier de la rue Montorgueil, une zone piÃ©tonne animÃ©e au cÅ“ur de Paris, le Luxury and ultra modern Loft in the heart of Paris vous propose un hÃ©bergement indÃ©pendant et une.'),
(37, 'Paris Hotel', 3, 'Paris, 75006', 'SituÃ© Ã  300 mÃ¨tres du quartier de la rue Montorgueil, une zone piÃ©tonne animÃ©e au cÅ“ur de Paris, le Luxury and ultra modern Loft in the heart of Paris vous propose un hÃ©bergement indÃ©pendant et une.'),
(38, 'Angleterre', 3, 'Paris, 75007', 'SituÃ© Ã  300 mÃ¨tres du quartier de la rue Montorgueil, une zone piÃ©tonne animÃ©e au cÅ“ur de Paris, le Luxury and ultra modern Loft in the heart of Paris vous propose un hÃ©bergement indÃ©pendant et une.'),
(41, 'Nimes Hotel', 4, 'Nimes, 34990', 'SituÃ© Ã  300 mÃ¨tres du quartier de la rue Montorgueil, une zone piÃ©tonne animÃ©e au cÅ“ur de Paris, le Luxury and ultra modern Loft in the heart of Paris vous propose un hÃ©bergement indÃ©pendant et une.'),
(42, 'Marseille Hotel', 5, 'Marseille, 35223', 'SituÃ© Ã  300 mÃ¨tres du quartier de la rue Montorgueil, une zone piÃ©tonne animÃ©e au cÅ“ur de Paris, le Luxury and ultra modern Loft in the heart of Paris vous propose un hÃ©bergement indÃ©pendant et une.'),
(43, 'Lyon Hotel', 6, 'Lyon, 96523', 'SituÃ© Ã  300 mÃ¨tres du quartier de la rue Montorgueil, une zone piÃ©tonne animÃ©e au cÅ“ur de Paris, le Luxury and ultra modern Loft in the heart of Paris vous propose un hÃ©bergement indÃ©pendant et une.');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `belongs_to` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
