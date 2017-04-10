CREATE TABLE `gamesession` (
	`id` INT(11) NOT NULL,
	`player` VARCHAR(45) NULL DEFAULT NULL,
	`activeStatus` TINYINT(4) NULL DEFAULT NULL,
	`aces` INT(11) NULL DEFAULT NULL,
	`twos` INT(11) NULL DEFAULT NULL,
	`threes` INT(11) NULL DEFAULT NULL,
	`fours` INT(11) NULL DEFAULT NULL,
	`fives` INT(11) NULL DEFAULT NULL,
	`sixes` INT(11) NULL DEFAULT NULL,
	`bonus` INT(11) NULL DEFAULT NULL,
	`sum` INT(11) NULL DEFAULT NULL,
	`onePair` INT(11) NULL DEFAULT NULL,
	`twoPair` INT(11) NULL DEFAULT NULL,
	`threeOfAKind` INT(11) NULL DEFAULT NULL,
	`fourOfAKind` INT(11) NULL DEFAULT NULL,
	`smallStraight` INT(11) NULL DEFAULT NULL,
	`largeStraight` INT(11) NULL DEFAULT NULL,
	`fullHouse` INT(11) NULL DEFAULT NULL,
	`chance` INT(11) NULL DEFAULT NULL,
	`yahtzee` INT(11) NULL DEFAULT NULL,
	`total` INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `idgameSession_UNIQUE` (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
