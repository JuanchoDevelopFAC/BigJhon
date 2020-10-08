--CREADO POR JUAN FERNANDO ALVAREZ CARVAJAL


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bigjhon
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bigjhon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bigjhon` ;

-- -----------------------------------------------------
-- Table `bigjhon`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bigjhon`.`empleados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(500) NULL DEFAULT NULL,
  `apellidos` VARCHAR(500) NULL DEFAULT NULL,
  `cedula` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bigjhon`.`vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bigjhon`.`vehiculos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cilindraje` VARCHAR(10) NULL DEFAULT NULL,
  `tiempos` VARCHAR(10) NULL DEFAULT NULL,
  `placa` VARCHAR(20) NULL DEFAULT NULL,
  `modelo` VARCHAR(10) NULL DEFAULT NULL,
  `cantidadPuertas` INT NULL DEFAULT NULL,
  `foto` BLOB NULL DEFAULT NULL,
  `tipo` VARCHAR(50) NULL DEFAULT NULL,
  `fechaIngreso` DATE NULL DEFAULT NULL,
  `idEmpleado` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idEmpleado` (`idEmpleado` ASC) VISIBLE,
  CONSTRAINT `vehiculos_ibfk_1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `bigjhon`.`empleados` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


