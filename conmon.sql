-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.14 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for medco
CREATE DATABASE IF NOT EXISTS `medco` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `medco`;


-- Dumping structure for table medco.conmon
CREATE TABLE IF NOT EXISTS `conmon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tgl` date DEFAULT NULL,
  `lokasi` varchar(50) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `wo` varchar(50) DEFAULT NULL,
  `sap` varchar(50) DEFAULT NULL,
  `url` varchar(75) DEFAULT NULL,
  `pic` varchar(50) DEFAULT NULL,
  `ket` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table medco.conmon: ~3 rows (approximately)
/*!40000 ALTER TABLE `conmon` DISABLE KEYS */;
INSERT INTO `conmon` (`id`, `tgl`, `lokasi`, `unit`, `wo`, `sap`, `url`, `pic`, `ket`) VALUES
	(1, '2014-08-29', 'lagan', 'equipt1', 'rw44wrw', '123456', 'ksd/ksj', '0', '0'),
	(2, '2013-08-29', 'ibul', 'eq2', 'eqw', '4qwe', 'ads', '0', '0'),
	(3, '2013-07-29', 'ibul', 'eq2', 'eqw', '4qwe', 'ads', '0', '0');
/*!40000 ALTER TABLE `conmon` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
