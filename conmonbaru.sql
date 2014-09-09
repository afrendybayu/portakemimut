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
  `unit` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `wo` varchar(50) DEFAULT NULL,
  `sap` varchar(50) DEFAULT NULL,
  `url` varchar(75) DEFAULT NULL,
  `pic` varchar(50) DEFAULT NULL,
  `ket` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table medco.conmon: ~16 rows (approximately)
/*!40000 ALTER TABLE `conmon` DISABLE KEYS */;
INSERT INTO `conmon` (`id`, `tgl`, `unit`, `type`, `wo`, `sap`, `url`, `pic`, `ket`) VALUES
	(4, '2014-09-08', 32, 15, 'wqe', 'we', 'qwe', 'qwe', 'qw'),
	(5, '2014-09-02', 28, 30, 'asdsa', 'dsa', 'd', 's', 'a'),
	(6, '2014-09-10', 95, 93, 'asd', 's', 'd', 'a', 'd'),
	(7, '2013-07-10', 35, 17, 'd', 'wqerqw', 'qwe', 'we', 'qwe'),
	(8, '2014-09-10', 96, 93, 'asd', 'sap', 'lkap', 'ekse', 'ket'),
	(9, '2012-12-12', 96, 93, 'wo', 'sap', 'lap', 'ekse', 'ket'),
	(10, '2011-06-07', 96, 93, 'sd', 'd', 's', 'da', 's'),
	(11, '2013-11-05', 35, 17, 'wo ni', 'sap no', 'url', 'ekse', 'ket'),
	(12, '2014-07-07', 35, 17, 'wo nu', 'sap no', 'link', 'saya', 'ket'),
	(13, '2014-09-08', 96, 93, 'woe', 'AKLDJQ', 'KJ', 'ASJDLKA', 'DSADS'),
	(14, '2014-08-24', 96, 6, NULL, NULL, NULL, NULL, NULL),
	(15, '2014-08-24', 96, 6, NULL, NULL, NULL, NULL, NULL),
	(16, '2014-08-24', 96, 6, NULL, NULL, NULL, NULL, NULL),
	(17, '2014-08-24', 96, 6, NULL, NULL, NULL, NULL, NULL),
	(18, '2014-09-23', 31, 5, 'aq', 'e', 'wqe', 'e', 'q'),
	(19, '2012-11-06', 33, 5, 'qw', 'e', 'w', 'w', 'baru'),
	(20, '2014-09-09', 102, 6, 'qe', 'a', 'ad', 'asd', 'asd');
/*!40000 ALTER TABLE `conmon` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
