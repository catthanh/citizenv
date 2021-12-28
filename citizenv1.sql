CREATE DATABASE  IF NOT EXISTS `test3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test3`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: test3
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_code` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `time_begin` date DEFAULT NULL,
  `time_end` date DEFAULT NULL,
  `time_done` date DEFAULT NULL,
  PRIMARY KEY (`address_code`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_users_idx` (`manager_id`),
  CONSTRAINT `fk_users` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'11','Hà Nội',NULL,'2021-12-29','2021-12-31',NULL),(2,'1101','Quận Ba Đình',NULL,'2021-12-28','2021-12-31',NULL),(7,'110101','Phường Phúc Xá',NULL,NULL,NULL,NULL),(15,'11010101','Phố An Xá',NULL,'2021-12-28','2021-12-31',NULL),(16,'11010102','Phố Phúc Xá',NULL,NULL,NULL,NULL),(8,'110102','Phường Trúc Bạch',NULL,'2021-12-28','2021-12-30',NULL),(17,'11010201','Phố Trúc Bạch',NULL,NULL,NULL,NULL),(18,'11010202','Phố Trấn Vũ',NULL,NULL,NULL,NULL),(4,'1102','Quận Hoàn Kiếm',NULL,NULL,NULL,NULL),(9,'110201','Phường Đồng Xuân',NULL,NULL,NULL,NULL),(19,'11020101','Phố Cao Thắng',NULL,NULL,NULL,NULL),(20,'11020102','Phố Đồng Xuân',NULL,NULL,NULL,NULL),(10,'110202','Phường Hàng Mã',NULL,NULL,NULL,NULL),(21,'11020201','Phố Hàng Mã',NULL,NULL,NULL,NULL),(22,'11020202','Phố Hàng Chai',NULL,NULL,NULL,NULL),(41,'1103','Quận Đống Đa',NULL,NULL,NULL,NULL),(36,'1123','sampled',NULL,'2022-01-01','2022-03-04',NULL),(38,'1194','sasa',NULL,NULL,NULL,NULL),(31,'2211','sample',NULL,NULL,NULL,NULL),(32,'221111','sample',NULL,NULL,NULL,NULL),(33,'222211','sample',NULL,NULL,NULL,NULL),(34,'222911','sample',NULL,NULL,NULL,NULL),(35,'2229211','sample',NULL,NULL,NULL,NULL),(40,'35','Thanh Hóa',NULL,NULL,NULL,NULL),(39,'37','Nghệ An',NULL,NULL,NULL,NULL),(37,'79','TP. Hồ Chí Minh',NULL,NULL,NULL,NULL),(5,'7901','Quận 1',NULL,NULL,NULL,NULL),(11,'790101','Phường Tân Định',NULL,NULL,NULL,NULL),(23,'79010101','Đường Bà Lê Chân',NULL,NULL,NULL,NULL),(24,'79010102','Đường Đặng Dung',NULL,NULL,NULL,NULL),(12,'790102','Phường Bến Nghé',NULL,NULL,NULL,NULL),(25,'79010201','Đường Cao Bá Quát',NULL,NULL,NULL,NULL),(26,'79010202','Đường Chợ Tôn Thất Đạm',NULL,NULL,NULL,NULL),(6,'7902','Quận 12',NULL,NULL,NULL,NULL),(13,'790201','Phường Thạnh Xuân',NULL,NULL,NULL,NULL),(27,'79020101','Khu phố 1',NULL,NULL,NULL,NULL),(28,'79020102','Khu phố 2',NULL,NULL,NULL,NULL),(14,'790202','Phường Thạnh Lộc',NULL,NULL,NULL,NULL),(29,'79020201','Khu phố 3a',NULL,NULL,NULL,NULL),(30,'79020202','Khu phố 3b',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citizen`
--

DROP TABLE IF EXISTS `citizen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citizen` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address_code` varchar(10) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `CMND` varchar(45) DEFAULT NULL,
  `countryside` text,
  `permantlyaddress` text,
  `tempaddress` text,
  `religion` varchar(45) DEFAULT NULL,
  `academiclevel` varchar(45) DEFAULT NULL,
  `job` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_area_idx` (`address_code`),
  CONSTRAINT `fk_area` FOREIGN KEY (`address_code`) REFERENCES `area` (`address_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citizen`
--

LOCK TABLES `citizen` WRITE;
/*!40000 ALTER TABLE `citizen` DISABLE KEYS */;
INSERT INTO `citizen` VALUES (1,'Lê Thị An','2021-12-27 16:05:21','11010101','1992-03-06','Nữ','123445546','Hòa Bình','số 12, Ngõ 63/1','Không','Phật Giáo','12','Giáo viên'),(2,'Lê Văn An','2021-12-27 16:05:21','11010101','1982-03-04','Nữ','123445547','Sơn La','số 12, Ngõ 63/2','Không','Đạo Hồi','12','Lập trình viên'),(3,'Nguyễn Đức An','2021-12-27 16:05:21','11010102','1985-03-05','Nữ','123445548','Điện Biên','số 12, Ngõ 63/3','Không','Phật Giáo','12','Giáo viên'),(4,'Nguyễn Hữu An','2021-12-27 16:05:21','11010102','2001-03-06','Nữ','123445549','Lai Châu','số 12, Ngõ 63/4','Không','Đạo Hồi','12','Lập trình viên'),(5,'Cao Đức Anh','2021-12-27 16:05:21','11010201','2005-03-07','Nữ','123445550','Lào Cai','số 12, Ngõ 63/5','Không','Đạo Hồi','12','Lập trình viên'),(6,'Đào Thế Anh','2021-12-27 16:05:21','11010201','2010-03-08','Nữ','123445551','Yên Bái','số 12, Ngõ 63/6','Không','Đạo Hồi','12','Lập trình viên'),(7,'Đỗ Thị Hồng Ánh','2021-12-27 16:05:21','11010201','1999-03-09','Nữ','123445552','Hà Nội','số 12, Ngõ 63/7','Không','Đạo Hồi','12','Lập trình viên'),(8,'Nguyễn Đình Tuấn Anh','2021-12-27 16:05:21','11010201','1982-03-10','Nữ','123445553','Bắc Ninh','số 12, Ngõ 63/8','Không','Phật Giáo','12','Giáo viên'),(9,'Nguyễn Trần Nhật Anh','2021-12-27 16:05:21','11010202','1982-03-11','Nữ','123445554','Hà Nam','số 12, Ngõ 63/9','Không','Không','12','Làm tự do'),(10,'Nguyễn Trọng Quang Anh','2021-12-27 16:05:21','11010202','1974-03-12','Nữ','123445555','Hải Dương','số 12, Ngõ 63/10','Không','Đạo Hồi','12','Giáo viên'),(11,'Nguyễn Việt Anh','2021-12-27 16:05:21','11010202','1982-03-13','Nữ','123445556','Hải Phòng','số 12, Ngõ 63/11','Không','Không','12','Làm tự do'),(12,'Trần Quốc Anh','2021-12-27 16:05:21','11010202','1971-03-14','Nữ','123445557','Hưng Yên','số 12, Ngõ 63/12','Không','Không','12','Làm tự do'),(13,'Trần Thị Lan Anh','2021-12-27 16:05:21','11010202','1982-03-15','Nữ','123445558','Nam Định','số 12, Ngõ 63/13','Không','Đạo Hồi','12','Giáo viên'),(14,'Nguyễn Cao Bách','2021-12-27 16:05:21','11020101','1969-03-16','Nữ','123445559','Thái Bình','số 12, Ngõ 63/14','Không','Không','12','Làm tự do'),(15,'Nguyễn Xuân Bách','2021-12-27 16:05:21','11020101','1982-03-17','Nữ','123445560','Vĩnh Phúc','số 12, Ngõ 63/15','Không','Đạo Hồi','12','Giáo viên'),(16,'Trần Việt Bảo','2021-12-27 16:05:21','11020101','1982-03-18','Nam','123445561','Ninh Bình','số 12, Ngõ 63/16','Không','Không','12','Làm tự do'),(17,'Vũ Quốc Bảo','2021-12-27 16:05:21','11020101','1995-06-10','Nam','123445562','Thanh Hóa','số 12, Ngõ 63/17','Không','Đạo Hồi','12','Giáo viên'),(18,'Nguyễn Lương Bằng','2021-12-27 16:05:21','79010101','1996-06-11','Nam','123445563','Nghệ An','số 12, Ngõ 63/18','Không','Không','12','Làm tự do'),(19,'Lê Trần Lâm Bình','2021-12-27 16:05:21','79010201','1983-06-12','Nam','123445564','Hà Tĩnh','số 12, Ngõ 63/19','Không','Không','12','Làm tự do'),(20,'Ngô Tiến Bình','2021-12-27 16:05:21','79010102','2000-06-13','Nam','123445565','Quảng Bình','số 12, Ngõ 63/20','Không','Không','9','Giáo viên'),(21,'Nguyễn Duy Chiến','2021-12-27 16:05:21','79010102','2004-06-14','Nam','123445566','Quảng Trị','số 12, Ngõ 63/21','Không','Không','9','Làm tự do'),(22,'Phạm Minh Chiến','2021-12-27 16:05:21','79010102','1987-06-15','Nam','123445567','Thừa Thiên Huế','số 12, Ngõ 63/22','Không','Không','9','Giáo viên'),(23,'Phí Hữu Chính','2021-12-27 16:05:21','79010202','1988-06-16','Nam','123445568','Hải Dương','số 12, Ngõ 63/23','Không','Đạo Hồi','9','Lập trình viên'),(24,'Vương Văn Chính','2021-12-27 16:05:21','79010202','1995-06-17','Nam','123445569','Hải Phòng','số 12, Ngõ 63/24','Không','Không','9','Làm tự do'),(25,'Phan Văn Cơ','2021-12-27 16:05:21','79010202','1995-06-18','Nam','123445570','Hưng Yên','số 12, Ngõ 63/25','Không','Đạo Hồi','9','Lập trình viên'),(26,'Đoàn Duy Cường','2021-12-27 16:05:21','79010202','1995-06-19','Nam','123445571','Nam Định','số 12, Ngõ 63/26','Không','Không','9','Làm tự do'),(27,'Nguyễn Quốc Trung','2021-12-28 01:36:05','110101','2001-03-15','Nam','1902008212','Hưng Phúc','Số 66, Phường Phúc Xá, Quận Ba Đình, Hà Nội','Không','Không','9','Giáo viên'),(28,'Nguyễn Hoàng Thùy Trang','2021-12-28 01:38:41','11010101','1994-12-29','Nữ','1902003131','Hưng Yên','Số 66, phố An Xá, Quận Ba Đình ,Tp Hà Nội','Không','Đạo Hồi','12','Nhân viên ngân hàng');
/*!40000 ALTER TABLE `citizen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_code` varchar(10) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123456','admin','2021-12-06 00:00:00','a','1213'),(2,'','A1','2021-12-07 09:15:50','thanh','1213'),(3,'11','A2','2021-12-25 08:16:09','11','1213'),(4,'2211','A3','2021-12-26 01:57:09','2211','1213'),(5,'221111','B1','2021-12-26 02:02:41','221111','1213'),(6,'222211','B1','2021-12-26 02:05:43','222211','1213'),(7,'222911','B1','2021-12-26 02:10:21','222911','1213'),(8,'2229211','admin','2021-12-26 02:15:36','2229211','1213'),(9,'1123','A3','2021-12-26 09:51:06','1123','1213'),(10,'1194','A3','2021-12-26 19:31:41','1194','1213'),(11,'37','A2','2021-12-28 01:20:14','37','1213'),(12,'35','A2','2021-12-28 01:23:19','35','1213'),(13,'1103','A3','2021-12-28 01:26:53','1103','1213'),(14,'1101','A3','2021-12-28 01:30:31','1101','1213'),(15,'110101','B1','2021-12-28 01:30:31','110101','1213'),(16,'11010101','B2','2021-12-28 01:30:31','11010101','1213'),(17,'110102','B1','2021-12-28 01:32:30','110102','1213');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-28  8:55:59
