-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema YatzyDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema YatzyDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `YatzyDB` DEFAULT CHARACTER SET utf8 ;
USE `YatzyDB` ;

-- -----------------------------------------------------
-- Table `YatzyDB`.`players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YatzyDB`.`players` (
  `idplayers` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `score` DOUBLE NULL,
  PRIMARY KEY (`idplayers`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
