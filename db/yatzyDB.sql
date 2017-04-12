-- --------------------------------------------------------
-- Värd:                         127.0.0.1
-- Serverversion:                5.7.16-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5164
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for yatzydb
CREATE DATABASE IF NOT EXISTS `yatzydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `yatzydb`;

-- Dumping structure for tabell yatzydb.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(9999) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for tabell yatzydb.games
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `winner` varchar(45) DEFAULT NULL,
  `winnerScore` int(11) DEFAULT NULL,
  `averageScore` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for tabell yatzydb.gamesession
CREATE TABLE IF NOT EXISTS `gamesession` (
  `id` int(11) NOT NULL,
  `player` varchar(45) DEFAULT NULL,
  `activeStatus` tinyint(4) DEFAULT NULL,
  `aces` int(11) DEFAULT NULL,
  `twos` int(11) DEFAULT NULL,
  `threes` int(11) DEFAULT NULL,
  `fours` int(11) DEFAULT NULL,
  `fives` int(11) DEFAULT NULL,
  `sixes` int(11) DEFAULT NULL,
  `bonus` int(11) DEFAULT NULL,
  `sum` int(11) DEFAULT NULL,
  `onePair` int(11) DEFAULT NULL,
  `twoPair` int(11) DEFAULT NULL,
  `threeOfAKind` int(11) DEFAULT NULL,
  `fourOfAKind` int(11) DEFAULT NULL,
  `smallStraight` int(11) DEFAULT NULL,
  `largeStraight` int(11) DEFAULT NULL,
  `fullHouse` int(11) DEFAULT NULL,
  `chance` int(11) DEFAULT NULL,
  `yahtzee` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idgameSession_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for tabell yatzydb.players
CREATE TABLE IF NOT EXISTS `players` (
  `idplayers` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `score` double DEFAULT NULL,
  PRIMARY KEY (`idplayers`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
