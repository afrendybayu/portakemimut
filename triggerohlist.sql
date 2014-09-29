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


-- Dumping structure for trigger medco.ohlist_AINS
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `ohlist_AINS` AFTER INSERT ON `ohlist` FOR EACH ROW begin
	declare l,b,t,w,m,lm int;
	
	set l = ceil(new.durasiplan/7);
	set b = month(new.tglplan);
	set t = year(new.tglplan);
	set w = day(new.tglplan);
	if w>21 then set m=4 ;
	elseif w>14 then set m=3;
	elseif w>7 then set m=2;
	else set m=1;
	end if;
	
		
	set lm = 0;
	while lm < l do 
		begin 
			while (m <= 4 and lm < l) do 
				begin 
					insert into overhaul (equip, oh, pekan, bln, thn) values (new.equip,new.ohcat, m, b, t );
					
					set m = m+1; 
					set lm = lm+1;
				
				end;
			end while;
			
			
			set m = 1;
			set b = b+1;
		end;
	end while;

	
end//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
