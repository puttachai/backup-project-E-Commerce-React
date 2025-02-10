/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.2-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: laravel
-- ------------------------------------------------------
-- Server version	11.4.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `name_lasname` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address_type` enum('Home','Work') DEFAULT 'Home',
  `address_line` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `country` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_addresses_user_id` (`user_id`),
  CONSTRAINT `fk_addresses_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES
(1,1,'พุทธชัย บดขุนทด','952517869','Home','123/45 หมู่บ้านตัวอย่าง','กรุงเทพฯ','กรุงเทพมหานคร','10110','ไทย','2025-01-06 11:11:12','2025-01-06 12:31:08'),
(2,1,'พุทธชัย บดขุนทด','952517869','Work','ชั้น 3 อาคารสำนักงานตัวอย่าง','นนทบุรี','นนทบุรี','11000','ไทย','2025-01-06 11:11:12','2025-01-06 12:31:08'),
(28,2,'วิชุดา ชะเทียนรัมย์','0952517869','Home','บ้านเลขที่119 หมู่8 ต.หนองใหญ่ อำเภอสตึก','บ้านเลขที่119 หมู่8 ต.หนองใหญ่ อำเภอสตึก ','0952517869','31150','0952517869','2025-01-18 10:39:38','2025-01-18 10:39:38'),
(32,24,'พุทธชัย บดขุนทด','0984586934','Home','Rbac 107','กรุงเทพมหานคร','กรุงเทพมหานคร','10545','ไทย','2025-01-29 18:10:54','2025-01-29 18:10:54'),
(33,28,'puttachai','085648769','Home','107 ','thai','กรุงเทพ','10640','ไทย','2025-02-10 08:29:45','2025-02-10 08:29:45');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity_id` int(11) NOT NULL,
  `added_at` timestamp NULL DEFAULT current_timestamp(),
  `_id` int(11) DEFAULT NULL,
  `_idassets` int(11) DEFAULT NULL,
  `is_selected` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  KEY `fk_product_id` (`product_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=377 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES
(120,25,2,2,'2024-12-09 07:59:21',NULL,NULL,0),
(121,25,3,2,'2024-12-09 07:59:25',NULL,NULL,0),
(140,26,3,1,'2025-01-13 07:01:34',NULL,NULL,0),
(261,2,5,3,'2025-01-23 18:02:36',NULL,NULL,0),
(262,2,3,1,'2025-01-24 13:47:36',NULL,NULL,0),
(371,28,4,4,'2025-02-10 08:16:16',NULL,NULL,0),
(373,28,38,1,'2025-02-10 08:17:56',NULL,NULL,1);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `categories_id` int(10) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,1,'computer.webp','คอมพิวเตอร์','สินค้าเกี่ยวกับคอมพิวเตอร์','2025-01-19 04:05:53','2025-01-19 10:12:53'),
(2,2,'mobile.webp','มือถือ','สินค้าเกี่ยวกับโทรศัพท์มือถือ','2025-01-19 04:05:53','2025-01-19 10:13:37'),
(3,3,'watches.webp','นาฬิกา','สินค้าเกี่ยวกับอุปกรณ์บอกเวลา','2025-01-19 04:05:53','2025-01-19 10:12:16'),
(4,4,'camera.webp','กล้อง','สินค้าเกี่ยวกับภาพถ่ายและวิดีโอ (Photography & Videography Equipment)','2025-01-19 04:05:53','2025-01-19 10:11:49'),
(5,5,'Electronics Accessories.webp','Electronics Accessories','Electronics Accessories','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(6,6,'Home Living.webp','Home Living','Home Living','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(7,7,'Men Clothes.webp','Men Clothes','Men Clothes','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(8,8,'Men Shoes.webp','Men Shoes','Men Shoes','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(9,9,'HomeAppliances.webp','Home Appliances','Home Appliances','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(10,10,'Bags.webp','Bags','Bags','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(11,11,'Beauty & Personal Care.webp','Beauty & Personal Care','Beauty & Personal Care','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(12,12,'Fashion Accessories.webp','Fashion Accessories','Fashion Accessories','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(13,13,'Women Shoes.webp','Women Shoes','Women Shoes','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(14,14,'Baby & Toys.webp','Baby & Toys','Baby & Toys','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(15,15,'Sports & Outdoors.webp','Sports & Outdoors','Sports & Outdoors','2025-01-19 10:19:03','2025-01-19 10:24:05'),
(16,16,'Fashion Accessories.webp','Fashion Accessories','Fashion Accessories','2025-01-19 10:19:03','2025-01-19 10:22:32');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriestest`
--

DROP TABLE IF EXISTS `categoriestest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoriestest` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_barcode` varchar(100) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `type_price` float DEFAULT NULL,
  `type_qty` int(10) NOT NULL DEFAULT 0,
  `type_image` varchar(1024) DEFAULT NULL,
  `type_imageBackup` varchar(1024) DEFAULT NULL,
  `type_description` text DEFAULT NULL,
  `type_status` tinyint(4) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `type_parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_barcode` (`type_barcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriestest`
--

LOCK TABLES `categoriestest` WRITE;
/*!40000 ALTER TABLE `categoriestest` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoriestest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cetegoriespro`
--

DROP TABLE IF EXISTS `cetegoriespro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cetegoriespro` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `badge` tinyint(1) DEFAULT NULL,
  `des` text DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cetegoriespro`
--

LOCK TABLES `cetegoriespro` WRITE;
/*!40000 ALTER TABLE `cetegoriespro` DISABLE KEYS */;
/*!40000 ALTER TABLE `cetegoriespro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche_tech`
--

DROP TABLE IF EXISTS `fiche_tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fiche_tech` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(50) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `value` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fiche_tech_ibfk_1` FOREIGN KEY (`id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche_tech`
--

LOCK TABLES `fiche_tech` WRITE;
/*!40000 ALTER TABLE `fiche_tech` DISABLE KEYS */;
INSERT INTO `fiche_tech` VALUES
(11,'201','Technology','Electrophotographic monochrome laser'),
(12,'201','Print speed','22 ppm (A4)/23 ppm (Letter)'),
(13,'202','Vitesse d\'impression','40ppm(A4)/42ppm(lettre)'),
(14,'202','Temps de sortie de la première page','≤6.9 s'),
(15,'203','Vitesse d\'impression','40ppm(A4)/42ppm(lettre)'),
(16,'203','Temps de sortie de la première page','≤6.9 s'),
(17,'2005','gtin','M6559N'),
(18,'2005','Marque','PANTUM'),
(19,'2005','fonctions','Monofonction'),
(20,'2005','Technologie d impression','Laser');
/*!40000 ALTER TABLE `fiche_tech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_resets_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2024_09_06_121741_add_timestamps_to_products_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetailexample`
--

DROP TABLE IF EXISTS `orderdetailexample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetailexample` (
  `orderdetail_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `product_id` int(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `UnitPrice` decimal(10,2) NOT NULL,
  `TotalPrice` decimal(10,2) NOT NULL,
  `Discount` decimal(10,2) DEFAULT 0.00,
  `Tax` decimal(10,2) DEFAULT 0.00,
  `CreatedAt` datetime DEFAULT current_timestamp(),
  `UpdatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Status` enum('Pending','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  PRIMARY KEY (`orderdetail_id`),
  KEY `fk_orderdetailexample_order_id` (`order_id`),
  KEY `fk_orderdetailexample_product_id` (`product_id`),
  KEY `fk_orderdetailexample_user_id` (`user_id`),
  CONSTRAINT `fk_orderdetailexample_order_id` FOREIGN KEY (`order_id`) REFERENCES `ordersexample` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderdetailexample_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderdetailexample_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetailexample`
--

LOCK TABLES `orderdetailexample` WRITE;
/*!40000 ALTER TABLE `orderdetailexample` DISABLE KEYS */;
INSERT INTO `orderdetailexample` VALUES
(4,15,2,3,1,23900.00,23900.00,0.00,0.00,'2025-01-22 00:04:16','2025-01-22 00:04:16','Pending'),
(5,15,2,7,1,32500.00,32500.00,0.00,0.00,'2025-01-22 00:04:16','2025-01-22 00:04:16','Pending'),
(6,16,2,3,1,23900.00,23900.00,0.00,0.00,'2025-01-22 00:12:15','2025-01-22 00:12:15','Pending'),
(7,16,2,7,1,32500.00,32500.00,0.00,0.00,'2025-01-22 00:12:15','2025-01-22 00:12:15','Pending'),
(8,17,2,1,1,2400.00,2400.00,0.00,0.00,'2025-01-22 10:02:53','2025-01-22 10:02:53','Pending'),
(9,17,2,3,1,23900.00,23900.00,0.00,0.00,'2025-01-22 10:02:53','2025-01-22 10:02:53','Pending'),
(10,18,2,1,1,2400.00,2400.00,0.00,0.00,'2025-01-22 12:19:42','2025-01-22 12:19:42','Pending'),
(11,18,2,2,1,1900.00,1900.00,0.00,0.00,'2025-01-22 12:19:42','2025-01-22 12:19:42','Pending'),
(12,19,2,2,2,1900.00,3800.00,0.00,0.00,'2025-01-22 13:30:35','2025-01-22 13:30:35','Pending'),
(13,20,2,1,1,2400.00,2400.00,0.00,0.00,'2025-01-22 13:52:11','2025-01-22 13:52:11','Pending'),
(14,20,2,2,1,1900.00,1900.00,0.00,0.00,'2025-01-22 13:52:11','2025-01-22 13:52:11','Pending'),
(15,21,2,1,1,2400.00,2400.00,0.00,0.00,'2025-01-22 16:47:54','2025-01-22 16:47:54','Pending'),
(16,22,2,5,1,24700.00,24700.00,0.00,0.00,'2025-01-23 17:47:16','2025-01-23 17:47:16','Pending'),
(17,22,2,10,1,25900.00,25900.00,0.00,0.00,'2025-01-23 17:47:16','2025-01-23 17:47:16','Pending'),
(18,23,2,2,1,1900.00,1900.00,0.00,0.00,'2025-01-23 21:47:50','2025-01-23 21:47:50','Pending'),
(19,23,2,10,1,25900.00,25900.00,0.00,0.00,'2025-01-23 21:47:50','2025-01-23 21:47:50','Pending'),
(20,23,2,40,2,76990.00,153980.00,0.00,0.00,'2025-01-23 21:47:50','2025-01-23 21:47:50','Pending'),
(21,24,24,2,2,1900.00,3800.00,0.00,0.00,'2025-01-29 20:44:52','2025-01-29 20:44:52','Pending'),
(22,24,24,4,2,43000.00,86000.00,0.00,0.00,'2025-01-29 20:44:52','2025-01-29 20:44:52','Pending'),
(23,25,24,3,2,23900.00,47800.00,0.00,0.00,'2025-02-02 21:48:57','2025-02-02 21:48:57','Pending'),
(24,25,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-02 21:48:57','2025-02-02 21:48:57','Pending'),
(25,26,24,3,2,23900.00,47800.00,0.00,0.00,'2025-02-03 12:42:33','2025-02-03 12:42:33','Pending'),
(26,27,24,7,1,32500.00,32500.00,0.00,0.00,'2025-02-03 12:44:39','2025-02-03 12:44:39','Pending'),
(27,28,24,7,1,32500.00,32500.00,0.00,0.00,'2025-02-03 14:13:47','2025-02-03 14:13:47','Pending'),
(28,29,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-04 10:08:17','2025-02-04 10:08:17','Pending'),
(29,30,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 12:01:53','2025-02-08 12:01:53','Pending'),
(30,31,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 13:52:42','2025-02-08 13:52:42','Pending'),
(31,32,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 13:53:23','2025-02-08 13:53:23','Pending'),
(32,33,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 13:58:26','2025-02-08 13:58:26','Pending'),
(33,34,24,7,1,32500.00,32500.00,0.00,0.00,'2025-02-08 14:10:46','2025-02-08 14:10:46','Pending'),
(34,35,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 17:36:22','2025-02-08 17:36:22','Pending'),
(35,36,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:42:30','2025-02-08 17:42:30','Pending'),
(36,37,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:42:56','2025-02-08 17:42:56','Pending'),
(37,38,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:43:24','2025-02-08 17:43:24','Pending'),
(38,39,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:45:48','2025-02-08 17:45:48','Pending'),
(39,40,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:46:11','2025-02-08 17:46:11','Pending'),
(40,41,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:47:25','2025-02-08 17:47:25','Pending'),
(41,42,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 17:47:49','2025-02-08 17:47:49','Pending'),
(42,43,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:51:23','2025-02-08 17:51:23','Pending'),
(43,44,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:52:28','2025-02-08 17:52:28','Pending'),
(44,45,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:52:34','2025-02-08 17:52:34','Pending'),
(45,46,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 17:53:07','2025-02-08 17:53:07','Pending'),
(46,47,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 17:53:27','2025-02-08 17:53:27','Pending'),
(47,48,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 18:04:47','2025-02-08 18:04:47','Pending'),
(48,49,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 18:07:33','2025-02-08 18:07:33','Pending'),
(49,50,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 18:07:39','2025-02-08 18:07:39','Pending'),
(50,51,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 18:08:16','2025-02-08 18:08:16','Pending'),
(51,52,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 18:10:43','2025-02-08 18:10:43','Pending'),
(52,53,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-08 18:17:06','2025-02-08 18:17:06','Pending'),
(53,54,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 18:23:16','2025-02-08 18:23:16','Pending'),
(54,55,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-08 18:23:50','2025-02-08 18:23:50','Pending'),
(55,56,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 20:24:46','2025-02-08 20:24:46','Pending'),
(56,57,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 21:06:09','2025-02-08 21:06:09','Pending'),
(57,58,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 21:08:38','2025-02-08 21:08:38','Pending'),
(58,59,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 21:10:15','2025-02-08 21:10:15','Pending'),
(59,60,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 21:18:24','2025-02-08 21:18:24','Pending'),
(60,61,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-08 21:21:07','2025-02-08 21:21:07','Pending'),
(61,62,24,4,1,43000.00,43000.00,0.00,0.00,'2025-02-09 09:47:56','2025-02-09 09:47:56','Pending'),
(62,63,24,4,1,43000.00,43000.00,0.00,0.00,'2025-02-09 09:56:06','2025-02-09 09:56:06','Pending'),
(63,64,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 10:03:49','2025-02-09 10:03:49','Pending'),
(64,65,24,36,1,1300.00,1300.00,0.00,0.00,'2025-02-09 10:05:45','2025-02-09 10:05:45','Pending'),
(65,66,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 10:21:15','2025-02-09 10:21:15','Pending'),
(66,67,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 10:25:54','2025-02-09 10:25:54','Pending'),
(67,68,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 10:31:21','2025-02-09 10:31:21','Pending'),
(68,69,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 11:11:33','2025-02-09 11:11:33','Pending'),
(69,70,24,3,1,23900.00,23900.00,0.00,0.00,'2025-02-09 12:43:15','2025-02-09 12:43:15','Pending'),
(70,71,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 12:47:24','2025-02-09 12:47:24','Pending'),
(71,72,24,3,1,23900.00,23900.00,0.00,0.00,'2025-02-09 12:48:41','2025-02-09 12:48:41','Pending'),
(72,73,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 14:16:29','2025-02-09 14:16:29','Pending'),
(73,74,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 14:28:19','2025-02-09 14:28:19','Pending'),
(74,75,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 14:31:14','2025-02-09 14:31:14','Pending'),
(75,76,24,3,1,23900.00,23900.00,0.00,0.00,'2025-02-09 14:34:32','2025-02-09 14:34:32','Pending'),
(76,77,24,3,1,23900.00,23900.00,0.00,0.00,'2025-02-09 17:54:52','2025-02-09 17:54:52','Pending'),
(77,78,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 18:02:22','2025-02-09 18:02:22','Pending'),
(78,79,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-09 18:14:14','2025-02-09 18:14:14','Pending'),
(79,80,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-09 18:31:04','2025-02-09 18:31:04','Pending'),
(80,81,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-09 19:22:04','2025-02-09 19:22:04','Pending'),
(81,82,24,7,1,32500.00,32500.00,0.00,0.00,'2025-02-09 19:32:48','2025-02-09 19:32:48','Pending'),
(82,83,24,7,1,32500.00,32500.00,0.00,0.00,'2025-02-09 19:52:51','2025-02-09 19:52:51','Pending'),
(83,84,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-09 22:08:22','2025-02-09 22:08:22','Pending'),
(84,85,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-09 22:10:32','2025-02-09 22:10:32','Pending'),
(85,86,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-09 22:15:44','2025-02-09 22:15:44','Pending'),
(86,87,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-09 22:21:34','2025-02-09 22:21:34','Pending'),
(87,88,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-10 08:08:43','2025-02-10 08:08:43','Pending'),
(88,89,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-10 08:13:57','2025-02-10 08:13:57','Pending'),
(89,90,24,38,1,42990.00,42990.00,0.00,0.00,'2025-02-10 08:15:09','2025-02-10 08:15:09','Pending'),
(90,91,24,38,1,42990.00,42990.00,0.00,0.00,'2025-02-10 11:33:34','2025-02-10 11:33:34','Pending'),
(91,92,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-10 11:57:23','2025-02-10 11:57:23','Pending'),
(92,93,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-10 12:44:45','2025-02-10 12:44:45','Pending'),
(93,95,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-10 14:11:06','2025-02-10 14:11:06','Pending'),
(94,96,24,1,1,2400.00,2400.00,0.00,0.00,'2025-02-10 14:25:14','2025-02-10 14:25:14','Pending'),
(95,97,24,7,1,32500.00,32500.00,0.00,0.00,'2025-02-10 14:34:02','2025-02-10 14:34:02','Pending'),
(96,98,28,69,1,25490.00,25490.00,0.00,0.00,'2025-02-10 15:19:06','2025-02-10 15:19:06','Pending'),
(97,99,28,38,1,42990.00,42990.00,0.00,0.00,'2025-02-10 15:21:51','2025-02-10 15:21:51','Pending'),
(98,100,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-10 15:57:30','2025-02-10 15:57:30','Pending'),
(99,101,24,69,1,25490.00,25490.00,0.00,0.00,'2025-02-10 22:15:50','2025-02-10 22:15:50','Pending'),
(100,102,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-10 22:18:48','2025-02-10 22:18:48','Pending'),
(101,103,24,2,1,1900.00,1900.00,0.00,0.00,'2025-02-10 22:21:13','2025-02-10 22:21:13','Pending'),
(102,104,24,5,1,24700.00,24700.00,0.00,0.00,'2025-02-10 23:37:17','2025-02-10 23:37:17','Pending'),
(103,105,24,5,1,24700.00,24700.00,0.00,0.00,'2025-02-10 23:51:59','2025-02-10 23:51:59','Pending');
/*!40000 ALTER TABLE `orderdetailexample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `total` decimal(10,2) GENERATED ALWAYS AS (`quantity` * `price`) STORED,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_orderdetails_order_id` (`order_id`),
  KEY `fk_orderdetails_product_id` (`product_id`),
  KEY `fk_orderdetails_user_id` (`user_id`),
  CONSTRAINT `fk_orderdetails_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderdetails_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderdetails_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES
(1,1,1,1,2,2400.00,4800.00,'2025-01-06 12:03:36','2025-01-07 10:57:50'),
(2,1,2,2,1,1900.00,1900.00,'2025-01-06 12:03:36','2025-01-07 10:57:50');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `order_date` timestamp NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Completed','Canceled') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_orders_user_id` (`user_id`),
  CONSTRAINT `fk_orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
(1,1,'2025-01-01 03:00:00',1500.00,'Completed','2025-01-06 11:21:32','2025-01-06 11:21:32'),
(2,1,'2025-01-05 07:30:00',750.00,'Pending','2025-01-06 11:21:32','2025-01-06 11:21:32');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordersexample`
--

DROP TABLE IF EXISTS `ordersexample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordersexample` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `referenceNumber` varchar(50) NOT NULL,
  `Transaction_id` varchar(255) DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `Discount` decimal(10,2) DEFAULT 0.00,
  `Tax` decimal(10,2) DEFAULT 0.00,
  `FinalAmount` decimal(10,2) NOT NULL,
  `QRCodeUrl` text DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp(),
  `UpdatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Status` enum('Pending','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `referenceNumber` (`referenceNumber`),
  KEY `fk_ordersExample_user_id` (`user_id`),
  CONSTRAINT `fk_ordersExample_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordersexample`
--

LOCK TABLES `ordersexample` WRITE;
/*!40000 ALTER TABLE `ordersexample` DISABLE KEYS */;
INSERT INTO `ordersexample` VALUES
(3,2,'GEK1739019807130',NULL,6700.00,0.00,469.00,7169.00,NULL,'2025-01-21 23:21:17','2025-02-08 20:03:27','Pending'),
(4,2,'GEK1739019807796',NULL,6700.00,0.00,469.00,7169.00,NULL,'2025-01-21 23:30:40','2025-02-08 20:03:27','Pending'),
(5,2,'GEK1739019807592',NULL,7200.00,0.00,504.00,7704.00,NULL,'2025-01-21 23:31:54','2025-02-08 20:03:27','Pending'),
(6,2,'GEK1739019807570',NULL,7200.00,0.00,504.00,7704.00,NULL,'2025-01-21 23:37:34','2025-02-08 20:03:27','Pending'),
(7,2,'GEK173901980778',NULL,26300.00,0.00,1841.00,28141.00,NULL,'2025-01-21 23:38:34','2025-02-08 20:03:27','Pending'),
(8,2,'GEK1739019807678',NULL,26300.00,0.00,1841.00,28141.00,NULL,'2025-01-21 23:44:54','2025-02-08 20:03:27','Pending'),
(9,2,'GEK1739019807157',NULL,45400.00,0.00,3178.00,48578.00,NULL,'2025-01-21 23:45:18','2025-02-08 20:03:27','Pending'),
(10,2,'GEK1739019807752',NULL,47300.00,0.00,3311.00,50611.00,NULL,'2025-01-21 23:47:12','2025-02-08 20:03:27','Pending'),
(11,2,'GEK1739019807290',NULL,66900.00,0.00,4683.00,71583.00,NULL,'2025-01-21 23:49:48','2025-02-08 20:03:27','Pending'),
(12,2,'GEK1739019807192',NULL,43000.00,0.00,3010.00,46010.00,NULL,'2025-01-21 23:54:34','2025-02-08 20:03:27','Pending'),
(13,2,'GEK173901980794',NULL,43000.00,0.00,3010.00,46010.00,NULL,'2025-01-21 23:56:24','2025-02-08 20:03:27','Pending'),
(14,2,'GEK1739019807893',NULL,66900.00,0.00,4683.00,71583.00,NULL,'2025-01-21 23:58:35','2025-02-08 20:03:27','Pending'),
(15,2,'GEK1739019807183',NULL,56400.00,0.00,3948.00,60348.00,NULL,'2025-01-22 00:04:16','2025-02-08 20:03:27','Pending'),
(16,2,'GEK1739019807235',NULL,56400.00,0.00,3948.00,60348.00,NULL,'2025-01-22 00:12:15','2025-02-08 20:03:27','Pending'),
(17,2,'GEK1739019807629',NULL,26300.00,0.00,1841.00,28141.00,NULL,'2025-01-22 10:02:53','2025-02-08 20:03:27','Pending'),
(18,2,'GEK1739019807438',NULL,4300.00,0.00,301.00,4601.00,NULL,'2025-01-22 12:19:42','2025-02-08 20:03:27','Pending'),
(19,2,'GEK1739019807303',NULL,3800.00,0.00,266.00,4066.00,NULL,'2025-01-22 13:30:35','2025-02-08 20:03:27','Pending'),
(20,2,'GEK1739019807203',NULL,4300.00,0.00,301.00,4601.00,NULL,'2025-01-22 13:52:11','2025-02-08 20:03:27','Pending'),
(21,2,'GEK1739019807108',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-01-22 16:47:54','2025-02-08 20:03:27','Pending'),
(22,2,'GEK1739019807930',NULL,50600.00,0.00,3542.00,54142.00,NULL,'2025-01-23 17:47:16','2025-02-08 20:03:27','Pending'),
(23,2,'GEK1739019807328',NULL,181780.00,0.00,12724.60,194504.60,NULL,'2025-01-23 21:47:50','2025-02-08 20:03:27','Pending'),
(24,24,'GEK1739019807851',NULL,89800.00,0.00,6286.00,96086.00,NULL,'2025-01-29 20:44:52','2025-02-08 20:03:27','Pending'),
(25,24,'GEK1739019807269',NULL,73290.00,0.00,5130.30,78420.30,NULL,'2025-02-02 21:48:57','2025-02-08 20:03:27','Pending'),
(26,24,'GEK1739019807792',NULL,47800.00,0.00,3346.00,51146.00,NULL,'2025-02-03 12:42:33','2025-02-08 20:03:27','Pending'),
(27,24,'GEK1739019807156',NULL,32500.00,0.00,2275.00,34775.00,NULL,'2025-02-03 12:44:39','2025-02-08 20:03:27','Pending'),
(28,24,'GEK1739019807402',NULL,32500.00,0.00,2275.00,34775.00,NULL,'2025-02-03 14:13:47','2025-02-08 20:03:27','Pending'),
(29,24,'GEK1739019807545',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-04 10:08:17','2025-02-08 20:03:27','Pending'),
(30,24,'GEK1739019807518',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 12:01:53','2025-02-08 20:03:27','Pending'),
(31,24,'GEK1739019807955',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 13:52:42','2025-02-08 20:03:27','Pending'),
(32,24,'GEK1739019807223',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 13:53:23','2025-02-08 20:03:27','Pending'),
(33,24,'GEK1739019807251',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 13:58:26','2025-02-08 20:03:27','Pending'),
(34,24,'GEK1739019807586',NULL,32500.00,0.00,2275.00,34775.00,NULL,'2025-02-08 14:10:46','2025-02-08 20:03:27','Pending'),
(35,24,'GEK1739019807179',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 17:36:22','2025-02-08 20:03:27','Pending'),
(36,24,'GEK1739019807136',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:42:30','2025-02-08 20:03:27','Pending'),
(37,24,'GEK1739019807143',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:42:56','2025-02-08 20:03:27','Pending'),
(38,24,'GEK1739019807307',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:43:24','2025-02-08 20:03:27','Pending'),
(39,24,'GEK1739019807109',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:45:48','2025-02-08 20:03:27','Pending'),
(40,24,'GEK1739019807624',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:46:11','2025-02-08 20:03:27','Pending'),
(41,24,'GEK1739019807794',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:47:25','2025-02-08 20:03:27','Pending'),
(42,24,'GEK173901980796',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 17:47:49','2025-02-08 20:03:27','Pending'),
(43,24,'GEK1739019807101',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:51:23','2025-02-08 20:03:27','Pending'),
(44,24,'GEK1739019807219',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:52:28','2025-02-08 20:03:27','Pending'),
(45,24,'GEK1739019807790',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:52:34','2025-02-08 20:03:27','Pending'),
(46,24,'GEK1739019807293',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 17:53:07','2025-02-08 20:03:27','Pending'),
(47,24,'GEK173901980795',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 17:53:27','2025-02-08 20:03:27','Pending'),
(48,24,'GEK1739019807599',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 18:04:47','2025-02-08 20:03:27','Pending'),
(49,24,'GEK1739019807711',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 18:07:33','2025-02-08 20:03:27','Pending'),
(50,24,'GEK1739019807759',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 18:07:39','2025-02-08 20:03:27','Pending'),
(51,24,'GEK1739019807661',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 18:08:16','2025-02-08 20:03:27','Pending'),
(52,24,'GEK173901980729',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 18:10:43','2025-02-08 20:03:27','Pending'),
(53,24,'GEK1739019807160',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-08 18:17:06','2025-02-08 20:03:27','Pending'),
(54,24,'GEK1739019807716',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 18:23:16','2025-02-08 20:03:27','Pending'),
(55,24,'GEK1739019807100',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-08 18:23:50','2025-02-08 20:03:27','Pending'),
(56,24,'GEKM6W896G7',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 20:24:46','2025-02-08 20:24:46','Pending'),
(57,24,'GEKM6W9QE92',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 21:06:09','2025-02-08 21:06:09','Pending'),
(58,24,'GEKM6W9TL20',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 21:08:38','2025-02-08 21:08:38','Pending'),
(59,24,'GEKM6W9VNS8',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 21:10:15','2025-02-08 21:10:15','Pending'),
(60,24,'GEKM6WA65FO',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 21:18:24','2025-02-08 21:20:34','Cancelled'),
(61,24,'GEKM6WA9N81',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-08 21:21:07','2025-02-08 21:21:33','Cancelled'),
(62,24,'GEKM6X0Y1S4',NULL,43000.00,0.00,3010.00,46010.00,NULL,'2025-02-09 09:47:56','2025-02-09 09:47:56','Pending'),
(63,24,'GEKM6X18JQ8',NULL,43000.00,0.00,3010.00,46010.00,NULL,'2025-02-09 09:56:06','2025-02-09 10:03:29','Cancelled'),
(64,24,'GEKM6X1IH9Z',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 10:03:49','2025-02-09 10:05:29','Cancelled'),
(65,24,'GEKM6X1KYTK',NULL,1300.00,0.00,91.00,1391.00,NULL,'2025-02-09 10:05:45','2025-02-09 10:20:54','Cancelled'),
(66,24,'GEKM6X24W3G',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 10:21:15','2025-02-09 10:25:37','Cancelled'),
(67,24,'GEKM6X2AVT8',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 10:25:54','2025-02-09 10:31:04','Cancelled'),
(68,24,'GEKM6X2HVX8',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 10:31:21','2025-02-09 10:31:21','Pending'),
(69,24,'GEKM6X3XL4L',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 11:11:33','2025-02-09 12:42:45','Cancelled'),
(70,24,'GEKM6X77IIO',NULL,23900.00,0.00,1673.00,25573.00,NULL,'2025-02-09 12:43:15','2025-02-09 12:47:04','Cancelled'),
(71,24,'GEKM6X7CU8H',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 12:47:24','2025-02-09 12:48:25','Cancelled'),
(72,24,'GEKM6X7EHOJ',NULL,23900.00,0.00,1673.00,25573.00,NULL,'2025-02-09 12:48:41','2025-02-09 14:16:00','Cancelled'),
(73,24,'GEKM6XAJEU3',NULL,1900.00,0.00,133.00,2033.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAUSSURBVO3BQQ4kR5LAQDJQ//8yt49+SiBRUS1p1s3sD9a65LDWRYe1LjqsddFhrYsOa110WOuiw1oXHda66LDWRYe1LjqsddFhrYsOa110WOuiw1oXffiSyt9U8UTlScWkMlV8Q+UbFZPK31TxjcNaFx3Wuuiw1kUfLqu4SeWJylQxqbyhMlU8UXlSMalMFW9U3KRy02Gtiw5rXXRY66IPP6byRsUbFZPKVDGpTBVvqDypmFSmikllqnhD5Y2KXzqsddFhrYsOa1304f+ZiknlScWTiknlicr/ssNaFx3Wuuiw1kUf/uNUpopJZaqYKp6oTBVvVDxR+V9yWOuiw1oXHda66MOPVfxSxaTyRGWqmFSmiknlScWk8ksV/yaHtS46rHXRYa2LPlym8jepTBWTylQxqUwVk8pUMam8UTGpvKHyb3ZY66LDWhcd1rrow5cq/kkVk8pUMak8UfmGyk0V/yWHtS46rHXRYa2LPnxJZaqYVKaKSWWqmFSmijdU3qiYVG5SuUllqniiMlXcdFjrosNaFx3Wusj+4B+k8qRiUpkq/kkqU8WkMlW8oTJVPFGZKp6oTBXfOKx10WGtiw5rXfThx1SmiicVk8oTlScVN6k8UZkqblJ5UjGp/E2HtS46rHXRYa2L7A++oPKkYlKZKiaVqWJSmSomlTcqvqEyVbyh8qTiicpU8URlqrjpsNZFh7UuOqx10YcfU5kq3lD5RsUbKk8qpopJZaqYVN5QmSqmikllqniiMlV847DWRYe1LjqsdZH9wT9IZap4ovJfVjGpTBWTylTxRGWqeKIyVXzjsNZFh7UuOqx10YfLVKaKSWWqmFSeVDxReVIxqbxR8YbKk4pJ5YnKVPGGyi8d1rrosNZFh7Uu+vAvV/FE5Q2VqWJSeUPlDZWp4knFE5VvVNx0WOuiw1oXHda6yP7gh1SmijdUpopvqEwVT1Smiicqv1TxRGWqmFSeVHzjsNZFh7UuOqx10YfLVKaKJypPKiaVb1RMKlPFVPFEZap4Q2WqmFS+oTJVTCo3Hda66LDWRYe1LvrwJZWp4onKVPFE5UnFE5VJ5YnKVDGpvKEyVfxSxROVXzqsddFhrYsOa1304UsVk8qTiicqU8Wk8kbFpDJVvFExqUwq31CZKiaVqWJSmSqeVNx0WOuiw1oXHda66MOXVKaKSeUbKm+o/E0Vb6i8ofJEZap4UvFLh7UuOqx10WGtiz58qeJJxRsVb6g8qXii8qRiUnmj4o2KN1SeqLxR8Y3DWhcd1rrosNZFH76k8jdVTBWTyhsVT1TeqJhUvqEyVTxRmSomlV86rHXRYa2LDmtd9OGyiptU3qiYVJ5UTCpPKiaVJxWTyhsVN1X80mGtiw5rXXRY66IPP6byRsUbKlPFVDGpPKmYVJ5UPFGZKiaVSeUbFU9UnlR847DWRYe1LjqsddGH/7iKSeVJxTdUpopJZap4UvENlScqU8UvHda66LDWRYe1LvrwH6fyhspUMalMFU9UnqhMFd9QeaIyVTxRmSq+cVjrosNaFx3WuujDj1X8UsWk8obKE5Wp4knFpPJE5UnFk4o3VKaKmw5rXXRY66LDWhd9uEzlb1KZKiaVqWJSmSomlScVk8pUMam8oTJVTCpPKp6oTBXfOKx10WGtiw5rXWR/sNYlh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rro/wCCrkp/2OdKYAAAAABJRU5ErkJggg==','2025-02-09 14:16:29','2025-02-09 14:28:02','Cancelled'),
(74,24,'GEKM6XAYM6V',NULL,1900.00,0.00,133.00,2033.00,NULL,'2025-02-09 14:28:19','2025-02-09 14:31:00','Cancelled'),
(75,24,'GEKM6XB2DTK','TX-1739086416116',1900.00,0.00,133.00,2033.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAUSSURBVO3BQQ4kR5LAQDJQ//8yt49+SiBRUS1p1s3sD9a65LDWRYe1LjqsddFhrYsOa110WOuiw1oXHda66LDWRYe1LjqsddFhrYsOa110WOuiw1oXffiSyt9U8UTlScWkMlV8Q+UbFZPK31TxjcNaFx3Wuuiw1kUfLqu4SeWJylQxqbyhMlU8UXlSMalMFW9U3KRy02Gtiw5rXXRY66IPP6byRsUbFZPKVDGpTBVvqDypmFSmikllqnhD5Y2KXzqsddFhrYsOa1304f+ZiknlScWTiknlicr/ssNaFx3Wuuiw1kUf/uNUpopJZaqYKp6oTBVvVDxR+V9yWOuiw1oXHda66MOPVfxSxaTyRGWqmFSmiknlScWk8ksV/yaHtS46rHXRYa2LPlym8jepTBWTylQxqUwVk8pUMam8UTGpvKHyb3ZY66LDWhcd1rrow5cq/kkVk8pUMak8UfmGyk0V/yWHtS46rHXRYa2LPnxJZaqYVKaKSWWqmFSmijdU3qiYVG5SuUllqniiMlXcdFjrosNaFx3Wusj+4B+k8qRiUpkq/kkqU8WkMlW8oTJVPFGZKp6oTBXfOKx10WGtiw5rXfThx1SmiicVk8oTlScVN6k8UZkqblJ5UjGp/E2HtS46rHXRYa2L7A++oPKkYlKZKiaVqWJSmSomlTcqvqEyVbyh8qTiicpU8URlqrjpsNZFh7UuOqx10YcfU5kq3lD5RsUbKk8qpopJZaqYVN5QmSqmikllqniiMlV847DWRYe1LjqsdZH9wT9IZap4ovJfVjGpTBWTylTxRGWqeKIyVXzjsNZFh7UuOqx10YfLVKaKSWWqmFSeVDxReVIxqbxR8YbKk4pJ5YnKVPGGyi8d1rrosNZFh7Uu+vAvV/FE5Q2VqWJSeUPlDZWp4knFE5VvVNx0WOuiw1oXHda6yP7gh1SmijdUpopvqEwVT1Smiicqv1TxRGWqmFSeVHzjsNZFh7UuOqx10YfLVKaKJypPKiaVb1RMKlPFVPFEZap4Q2WqmFS+oTJVTCo3Hda66LDWRYe1LvrwJZWp4onKVPFE5UnFE5VJ5YnKVDGpvKEyVfxSxROVXzqsddFhrYsOa1304UsVk8qTiicqU8Wk8kbFpDJVvFExqUwq31CZKiaVqWJSmSqeVNx0WOuiw1oXHda66MOXVKaKSeUbKm+o/E0Vb6i8ofJEZap4UvFLh7UuOqx10WGtiz58qeJJxRsVb6g8qXii8qRiUnmj4o2KN1SeqLxR8Y3DWhcd1rrosNZFH76k8jdVTBWTyhsVT1TeqJhUvqEyVTxRmSomlV86rHXRYa2LDmtd9OGyiptU3qiYVJ5UTCpPKiaVJxWTyhsVN1X80mGtiw5rXXRY66IPP6byRsUbKlPFVDGpPKmYVJ5UPFGZKiaVSeUbFU9UnlR847DWRYe1LjqsddGH/7iKSeVJxTdUpopJZap4UvENlScqU8UvHda66LDWRYe1LvrwH6fyhspUMalMFU9UnqhMFd9QeaIyVTxRmSq+cVjrosNaFx3WuujDj1X8UsWk8obKE5Wp4knFpPJE5UnFk4o3VKaKmw5rXXRY66LDWhd9uEzlb1KZKiaVqWJSmSomlScVk8pUMam8oTJVTCpPKp6oTBXfOKx10WGtiw5rXWR/sNYlh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rro/wCCrkp/2OdKYAAAAABJRU5ErkJggg==','2025-02-09 14:31:14','2025-02-09 14:33:36','Cancelled'),
(76,24,'GEKM6XB6MK7','TX-1739086536791',23900.00,0.00,1673.00,25573.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATJSURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ2clIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1IzAZnU3ACZ1NwA+SY1N0B+k5o3TqoWnVQtOqla9MkyNZuAbFLzm9TcAJnU3KjZBGTTSdWik6pFJ1WLPvkyIE+oeULNBORGzQRkk5obIJOaN4A8oeabTqoWnVQtOqla9MlfDsgTQG7U3ACZ1DyhZgIyqfmbnVQtOqladFK16JO/nJobIJOaCcgNkEnNBGRSMwGZ1PzLTqoWnVQtOqla9MmXqfmbAJnU3KiZgNwA2aTmT3JSteikatFJ1aJPlgH5TUAmNW+omYBMaiYgk5oJyKRmAvIEkD/ZSdWik6pFJ1WL8Ef+YkAmNd8EZJOaf8lJ1aKTqkUnVYs+eQnIpGYCcqNmAvKEmhsgN2omIDdqJiA3at4AMqm5ATKpmYDcqHnjpGrRSdWik6pFn/wyNU+oeQLIpOYNNZuATGqeAHKj5kbNBGTTSdWik6pFJ1WLPvllQCY1N0AmNTdqJiCTmgnIE0AmNTdAJjVPqHkDyI2aTSdVi06qFp1ULfrkJTUTkEnNG2q+Sc0NkCeATGpugExqJiBPqJnU3ACZ1LxxUrXopGrRSdUi/JEXgExqNgG5UfMEkN+kZgIyqdkE5EbNN51ULTqpWnRStQh/5AUgN2pugExqngByo+YJIJOaGyBvqJmA3Kh5AsgTat44qVp0UrXopGrRJ18GZFJzA2QTkBs1b6h5AsgE5AkgN2r+TydVi06qFp1ULcIf+SIgk5o3gExqngAyqbkBMqmZgExq3gAyqZmATGqeADKp2XRSteikatFJ1aJPlgHZBOQNIJOaGyDfBGQTkBs1v+mkatFJ1aKTqkWfLFPzBJBJzaTmBsik5gbIpOZGzQRkUjMBmdRMaiYgb6iZgExAftNJ1aKTqkUnVYvwR14AMqmZgExqboDcqJmAPKFmAjKp2QRkUnMDZFLzBpBJzTedVC06qVp0UrXok5fUPAFkUnOj5gk1N0CeALIJyKRmUnMDZFLzJzmpWnRSteikatEny4BMam6ATGomIJOaSc0EZFJzo2YCMql5A8ikZgLyBpA/yUnVopOqRSdViz5ZpuYJNTdqboBMam7UTECeAHKj5g01TwB5AsiNmjdOqhadVC06qVr0yUtAfpOaN4BsUjMBmdRMQJ4AMql5Qs0EZFKz6aRq0UnVopOqRZ8sU7MJyBNAnlDzJ1PzTUAmNW+cVC06qVp0UrXoky8D8oSaJ9RMQG7UPAHkBsikZgIyqZmATEDeUDMBmdR800nVopOqRSdViz75ywGZ1ExAboBMam7U3ACZ1ExAnlBzA2QCMqmZgExqNp1ULTqpWnRSteiTfwyQSc0bam6AbFJzA2RScwNkUjMBmdS8cVK16KRq0UnVok++TM03qZmAvAFkUvObgExqJjUTkBs1E5BJzaaTqkUnVYtOqhZ9sgzIbwJyA2RSM6mZgExAJjU3aiYgm4BMaiYg/6eTqkUnVYtOqhbhj1QtOaladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhb9B4CtMzmUMO9JAAAAAElFTkSuQmCC','2025-02-09 14:34:32','2025-02-09 14:35:36','Pending'),
(77,24,'GEKM6XIC8VQ','TX-1739098657882',23900.00,0.00,1673.00,25573.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATJSURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ2clIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1IzAZnU3ACZ1NwA+SY1N0B+k5o3TqoWnVQtOqla9MkyNZuAbFLzm9TcAJnU3KjZBGTTSdWik6pFJ1WLPvkyIE+oeULNBORGzQRkk5obIJOaN4A8oeabTqoWnVQtOqla9MlfDsgTQG7U3ACZ1DyhZgIyqfmbnVQtOqladFK16JO/nJobIJOaCcgNkEnNBGRSMwGZ1PzLTqoWnVQtOqla9MmXqfmbAJnU3KiZgNwA2aTmT3JSteikatFJ1aJPlgH5TUAmNW+omYBMaiYgk5oJyKRmAvIEkD/ZSdWik6pFJ1WL8Ef+YkAmNd8EZJOaf8lJ1aKTqkUnVYs+eQnIpGYCcqNmAvKEmhsgN2omIDdqJiA3at4AMqm5ATKpmYDcqHnjpGrRSdWik6pFn/wyNU+oeQLIpOYNNZuATGqeAHKj5kbNBGTTSdWik6pFJ1WLPvllQCY1N0AmNTdqJiCTmgnIE0AmNTdAJjVPqHkDyI2aTSdVi06qFp1ULfrkJTUTkEnNG2q+Sc0NkCeATGpugExqJiBPqJnU3ACZ1LxxUrXopGrRSdUi/JEXgExqNgG5UfMEkN+kZgIyqdkE5EbNN51ULTqpWnRStQh/5AUgN2pugExqngByo+YJIJOaGyBvqJmA3Kh5AsgTat44qVp0UrXopGrRJ18GZFJzA2QTkBs1b6h5AsgE5AkgN2r+TydVi06qFp1ULcIf+SIgk5o3gExqngAyqbkBMqmZgExq3gAyqZmATGqeADKp2XRSteikatFJ1aJPlgHZBOQNIJOaGyDfBGQTkBs1v+mkatFJ1aKTqkWfLFPzBJBJzaTmBsik5gbIpOZGzQRkUjMBmdRMaiYgb6iZgExAftNJ1aKTqkUnVYvwR14AMqmZgExqboDcqJmAPKFmAjKp2QRkUnMDZFLzBpBJzTedVC06qVp0UrXok5fUPAFkUnOj5gk1N0CeALIJyKRmUnMDZFLzJzmpWnRSteikatEny4BMam6ATGomIJOaSc0EZFJzo2YCMql5A8ikZgLyBpA/yUnVopOqRSdViz5ZpuYJNTdqboBMam7UTECeAHKj5g01TwB5AsiNmjdOqhadVC06qVr0yUtAfpOaN4BsUjMBmdRMQJ4AMql5Qs0EZFKz6aRq0UnVopOqRZ8sU7MJyBNAnlDzJ1PzTUAmNW+cVC06qVp0UrXoky8D8oSaJ9RMQG7UPAHkBsikZgIyqZmATEDeUDMBmdR800nVopOqRSdViz75ywGZ1ExAboBMam7U3ACZ1ExAnlBzA2QCMqmZgExqNp1ULTqpWnRSteiTfwyQSc0bam6AbFJzA2RScwNkUjMBmdS8cVK16KRq0UnVok++TM03qZmAvAFkUvObgExqJjUTkBs1E5BJzaaTqkUnVYtOqhZ9sgzIbwJyA2RSM6mZgExAJjU3aiYgm4BMaiYg/6eTqkUnVYtOqhbhj1QtOaladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhb9B4CtMzmUMO9JAAAAAElFTkSuQmCC','2025-02-09 17:54:52','2025-02-09 18:02:09','Cancelled'),
(78,24,'GEKM6XILW3T','TX-1739099620410',1900.00,0.00,133.00,2033.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAUSSURBVO3BQQ4kR5LAQDJQ//8yt49+SiBRUS1p1s3sD9a65LDWRYe1LjqsddFhrYsOa110WOuiw1oXHda66LDWRYe1LjqsddFhrYsOa110WOuiw1oXffiSyt9U8UTlScWkMlV8Q+UbFZPK31TxjcNaFx3Wuuiw1kUfLqu4SeWJylQxqbyhMlU8UXlSMalMFW9U3KRy02Gtiw5rXXRY66IPP6byRsUbFZPKVDGpTBVvqDypmFSmikllqnhD5Y2KXzqsddFhrYsOa1304f+ZiknlScWTiknlicr/ssNaFx3Wuuiw1kUf/uNUpopJZaqYKp6oTBVvVDxR+V9yWOuiw1oXHda66MOPVfxSxaTyRGWqmFSmiknlScWk8ksV/yaHtS46rHXRYa2LPlym8jepTBWTylQxqUwVk8pUMam8UTGpvKHyb3ZY66LDWhcd1rrow5cq/kkVk8pUMak8UfmGyk0V/yWHtS46rHXRYa2LPnxJZaqYVKaKSWWqmFSmijdU3qiYVG5SuUllqniiMlXcdFjrosNaFx3Wusj+4B+k8qRiUpkq/kkqU8WkMlW8oTJVPFGZKp6oTBXfOKx10WGtiw5rXfThx1SmiicVk8oTlScVN6k8UZkqblJ5UjGp/E2HtS46rHXRYa2L7A++oPKkYlKZKiaVqWJSmSomlTcqvqEyVbyh8qTiicpU8URlqrjpsNZFh7UuOqx10YcfU5kq3lD5RsUbKk8qpopJZaqYVN5QmSqmikllqniiMlV847DWRYe1LjqsdZH9wT9IZap4ovJfVjGpTBWTylTxRGWqeKIyVXzjsNZFh7UuOqx10YfLVKaKSWWqmFSeVDxReVIxqbxR8YbKk4pJ5YnKVPGGyi8d1rrosNZFh7Uu+vAvV/FE5Q2VqWJSeUPlDZWp4knFE5VvVNx0WOuiw1oXHda6yP7gh1SmijdUpopvqEwVT1Smiicqv1TxRGWqmFSeVHzjsNZFh7UuOqx10YfLVKaKJypPKiaVb1RMKlPFVPFEZap4Q2WqmFS+oTJVTCo3Hda66LDWRYe1LvrwJZWp4onKVPFE5UnFE5VJ5YnKVDGpvKEyVfxSxROVXzqsddFhrYsOa1304UsVk8qTiicqU8Wk8kbFpDJVvFExqUwq31CZKiaVqWJSmSqeVNx0WOuiw1oXHda66MOXVKaKSeUbKm+o/E0Vb6i8ofJEZap4UvFLh7UuOqx10WGtiz58qeJJxRsVb6g8qXii8qRiUnmj4o2KN1SeqLxR8Y3DWhcd1rrosNZFH76k8jdVTBWTyhsVT1TeqJhUvqEyVTxRmSomlV86rHXRYa2LDmtd9OGyiptU3qiYVJ5UTCpPKiaVJxWTyhsVN1X80mGtiw5rXXRY66IPP6byRsUbKlPFVDGpPKmYVJ5UPFGZKiaVSeUbFU9UnlR847DWRYe1LjqsddGH/7iKSeVJxTdUpopJZap4UvENlScqU8UvHda66LDWRYe1LvrwH6fyhspUMalMFU9UnqhMFd9QeaIyVTxRmSq+cVjrosNaFx3WuujDj1X8UsWk8obKE5Wp4knFpPJE5UnFk4o3VKaKmw5rXXRY66LDWhd9uEzlb1KZKiaVqWJSmSomlScVk8pUMam8oTJVTCpPKp6oTBXfOKx10WGtiw5rXWR/sNYlh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rro/wCCrkp/2OdKYAAAAABJRU5ErkJggg==','2025-02-09 18:02:22','2025-02-09 18:13:48','Cancelled'),
(79,24,'GEKM6XJ15C8','TX-1739100536220',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-09 18:14:14','2025-02-09 18:30:49','Cancelled'),
(80,24,'GEKM6XJMT77','TX-1739103018318',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-09 18:31:04','2025-02-09 19:10:18','Pending'),
(81,24,'GEKM6XLGE1W','TX-1739103967198',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-09 19:22:04','2025-02-09 19:31:47','Cancelled'),
(82,24,'GEKM6XLU721','TX-1739105563740',32500.00,0.00,2275.00,34775.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAT3SURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ0crIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1JzA2RSMwG5UfMGkDfUTEB+k5o3TqoWnVQtOqla9MkyNZuA3ACZ1NyouQEyqbkBcqNmAjKpeULNJiCbTqoWnVQtOqla9MmXAXlCzRNq3gAyqbkBcqNmAjKpmYBMap4A8oSabzqpWnRSteikatEn/xggT6iZgExqbtRMQG6A/MtOqhadVC06qVr0yV8OyKRmAnIDZFIzAZnUPKHmBsi/5KRq0UnVopOqRZ98mZpvUvOGmgnIpGYCcqNmAvJNav5PTqoWnVQtOqla9MkyIL8JyKTmRs0EZFIzAZnUTECeUDMBeQLI/9lJ1aKTqkUnVYs+eUnNn6TmCSCTmgnIG0A2qfmbnFQtOqladFK16JOXgExqJiCTmgnIpGYCMqm5AXKjZgIyqfkmIJuATGpugExqNp1ULTqpWnRStQh/5AUgN2omIE+omYDcqHkCyBNqJiCTmgnIpOYJIJOaGyCTmhsgk5o3TqoWnVQtOqla9MmXAblRMwGZgExqboC8oeYGyA2QSc0mIDdqJiC/6aRq0UnVopOqRZ98mZobIDdq3lDzBpBJzQRkUvMEkBs1N0Bu1ExAJjWbTqoWnVQtOqlahD+yCMiNmgnIpGYCMql5AsgmNTdAJjUTkDfU3ACZ1ExAbtS8cVK16KRq0UnVok/+MDUTkEnNG2omIJOaGyATkCeATGomIJOaCcgmNROQTSdVi06qFp1ULfpkmZobIJOaGyCTmhsgk5pNap4AcqNmAnIDZFLzBJBvOqladFK16KRq0SfLgExqJjVPqLkBcgPkCSBPAHkCyKTmRs0NkDfUbDqpWnRSteikahH+yAtAbtQ8AeSb1ExAbtQ8AeSb1NwAmdRMQG7UvHFSteikatFJ1aJPXlIzAZmA3Ki5UXMD5EbNjZoJyBNAJjVPAJnUTEDeADKpmYBsOqladFK16KRq0ScvAZnUTEDeADKpmdRMQCYgk5obNROQN4BMar5JzQ2QbzqpWnRSteikatEnL6mZgNyomYBMat5QMwG5AXKj5gbIBOQNIJOaCcikZgIyqblRs+mkatFJ1aKTqkX4Iy8AmdQ8AeQNNd8EZFLzBpBvUvMnnVQtOqladFK16JOX1Lyh5g0gN2omIDdqJjUTkCfUPKHmCSA3QJ5Q88ZJ1aKTqkUnVYs+eQnIb1IzqZmA3Ki5ATKpeULNBOQNIJOaGyCTmgnIN51ULTqpWnRSteiTZWo2AXkDyI2aSc2NmgnIjZoJyBNqNqn5ppOqRSdVi06qFn3yZUCeUPMEkD9JzQ2QSc0EZALyhpobIDdq3jipWnRSteikatEnfzk1N0CeADKpmYBMaiYgk5obNW8AuQEyqfmmk6pFJ1WLTqoWffKXAzKpeUPNBGRSMwG5ATKpeQPIDZBJzQ2QSc0bJ1WLTqoWnVQt+uTL1HyTmgnIpGYC8oSaJ9RMQG6A3Ki5UfMEkEnNppOqRSdVi06qFn2yDMhvAvIGkEnNE2omIJOaCcgTQCY1E5AbNTdAJjVvnFQtOqladFK1CH+kaslJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16D8PmkdYiwaQSwAAAABJRU5ErkJggg==','2025-02-09 19:32:48','2025-02-09 19:52:43','Pending'),
(83,24,'GEKM6XMJYQY','TX-1739105573230',32500.00,0.00,2275.00,34775.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAT3SURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ0crIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1JzA2RSMwG5UfMGkDfUTEB+k5o3TqoWnVQtOqla9MkyNZuA3ACZ1NyouQEyqbkBcqNmAjKpeULNJiCbTqoWnVQtOqla9MmXAXlCzRNq3gAyqbkBcqNmAjKpmYBMap4A8oSabzqpWnRSteikatEn/xggT6iZgExqbtRMQG6A/MtOqhadVC06qVr0yV8OyKRmAnIDZFIzAZnUPKHmBsi/5KRq0UnVopOqRZ98mZpvUvOGmgnIpGYCcqNmAvJNav5PTqoWnVQtOqla9MkyIL8JyKTmRs0EZFIzAZnUTECeUDMBeQLI/9lJ1aKTqkUnVYs+eUnNn6TmCSCTmgnIG0A2qfmbnFQtOqladFK16JOXgExqJiCTmgnIpGYCMqm5AXKjZgIyqfkmIJuATGpugExqNp1ULTqpWnRStQh/5AUgN2omIE+omYDcqHkCyBNqJiCTmgnIpOYJIJOaGyCTmhsgk5o3TqoWnVQtOqla9MmXAblRMwGZgExqboC8oeYGyA2QSc0mIDdqJiC/6aRq0UnVopOqRZ98mZobIDdq3lDzBpBJzQRkUvMEkBs1N0Bu1ExAJjWbTqoWnVQtOqlahD+yCMiNmgnIpGYCMql5AsgmNTdAJjUTkDfU3ACZ1ExAbtS8cVK16KRq0UnVok/+MDUTkEnNG2omIJOaGyATkCeATGomIJOaCcgmNROQTSdVi06qFp1ULfpkmZobIJOaGyCTmhsgk5pNap4AcqNmAnIDZFLzBJBvOqladFK16KRq0SfLgExqJjVPqLkBcgPkCSBPAHkCyKTmRs0NkDfUbDqpWnRSteikahH+yAtAbtQ8AeSb1ExAbtQ8AeSb1NwAmdRMQG7UvHFSteikatFJ1aJPXlIzAZmA3Ki5UXMD5EbNjZoJyBNAJjVPAJnUTEDeADKpmYBsOqladFK16KRq0ScvAZnUTEDeADKpmdRMQCYgk5obNROQN4BMar5JzQ2QbzqpWnRSteikatEnL6mZgNyomYBMat5QMwG5AXKj5gbIBOQNIJOaCcikZgIyqblRs+mkatFJ1aKTqkX4Iy8AmdQ8AeQNNd8EZFLzBpBvUvMnnVQtOqladFK16JOX1Lyh5g0gN2omIDdqJjUTkCfUPKHmCSA3QJ5Q88ZJ1aKTqkUnVYs+eQnIb1IzqZmA3Ki5ATKpeULNBOQNIJOaGyCTmgnIN51ULTqpWnRSteiTZWo2AXkDyI2aSc2NmgnIjZoJyBNqNqn5ppOqRSdVi06qFn3yZUCeUPMEkD9JzQ2QSc0EZALyhpobIDdq3jipWnRSteikatEnfzk1N0CeADKpmYBMaiYgk5obNW8AuQEyqfmmk6pFJ1WLTqoWffKXAzKpeUPNBGRSMwG5ATKpeQPIDZBJzQ2QSc0bJ1WLTqoWnVQt+uTL1HyTmgnIpGYC8oSaJ9RMQG6A3Ki5UfMEkEnNppOqRSdVi06qFn2yDMhvAvIGkEnNE2omIJOaCcgTQCY1E5AbNTdAJjVvnFQtOqladFK1CH+kaslJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16D8PmkdYiwaQSwAAAABJRU5ErkJggg==','2025-02-09 19:52:51','2025-02-09 19:52:53','Pending'),
(84,24,'GEKM6XRE91A','TX-1739113705457',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-09 22:08:22','2025-02-09 22:10:20','Cancelled'),
(85,24,'GEKM6XRH16S','TX-1739113999452',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-09 22:10:32','2025-02-09 22:13:19','Pending'),
(86,24,'GEKM6XRNQ7T','TX-1739114408531',1900.00,0.00,133.00,2033.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAUSSURBVO3BQQ4kR5LAQDJQ//8yt49+SiBRUS1p1s3sD9a65LDWRYe1LjqsddFhrYsOa110WOuiw1oXHda66LDWRYe1LjqsddFhrYsOa110WOuiw1oXffiSyt9U8UTlScWkMlV8Q+UbFZPK31TxjcNaFx3Wuuiw1kUfLqu4SeWJylQxqbyhMlU8UXlSMalMFW9U3KRy02Gtiw5rXXRY66IPP6byRsUbFZPKVDGpTBVvqDypmFSmikllqnhD5Y2KXzqsddFhrYsOa1304f+ZiknlScWTiknlicr/ssNaFx3Wuuiw1kUf/uNUpopJZaqYKp6oTBVvVDxR+V9yWOuiw1oXHda66MOPVfxSxaTyRGWqmFSmiknlScWk8ksV/yaHtS46rHXRYa2LPlym8jepTBWTylQxqUwVk8pUMam8UTGpvKHyb3ZY66LDWhcd1rrow5cq/kkVk8pUMak8UfmGyk0V/yWHtS46rHXRYa2LPnxJZaqYVKaKSWWqmFSmijdU3qiYVG5SuUllqniiMlXcdFjrosNaFx3Wusj+4B+k8qRiUpkq/kkqU8WkMlW8oTJVPFGZKp6oTBXfOKx10WGtiw5rXfThx1SmiicVk8oTlScVN6k8UZkqblJ5UjGp/E2HtS46rHXRYa2L7A++oPKkYlKZKiaVqWJSmSomlTcqvqEyVbyh8qTiicpU8URlqrjpsNZFh7UuOqx10YcfU5kq3lD5RsUbKk8qpopJZaqYVN5QmSqmikllqniiMlV847DWRYe1LjqsdZH9wT9IZap4ovJfVjGpTBWTylTxRGWqeKIyVXzjsNZFh7UuOqx10YfLVKaKSWWqmFSeVDxReVIxqbxR8YbKk4pJ5YnKVPGGyi8d1rrosNZFh7Uu+vAvV/FE5Q2VqWJSeUPlDZWp4knFE5VvVNx0WOuiw1oXHda6yP7gh1SmijdUpopvqEwVT1Smiicqv1TxRGWqmFSeVHzjsNZFh7UuOqx10YfLVKaKJypPKiaVb1RMKlPFVPFEZap4Q2WqmFS+oTJVTCo3Hda66LDWRYe1LvrwJZWp4onKVPFE5UnFE5VJ5YnKVDGpvKEyVfxSxROVXzqsddFhrYsOa1304UsVk8qTiicqU8Wk8kbFpDJVvFExqUwq31CZKiaVqWJSmSqeVNx0WOuiw1oXHda66MOXVKaKSeUbKm+o/E0Vb6i8ofJEZap4UvFLh7UuOqx10WGtiz58qeJJxRsVb6g8qXii8qRiUnmj4o2KN1SeqLxR8Y3DWhcd1rrosNZFH76k8jdVTBWTyhsVT1TeqJhUvqEyVTxRmSomlV86rHXRYa2LDmtd9OGyiptU3qiYVJ5UTCpPKiaVJxWTyhsVN1X80mGtiw5rXXRY66IPP6byRsUbKlPFVDGpPKmYVJ5UPFGZKiaVSeUbFU9UnlR847DWRYe1LjqsddGH/7iKSeVJxTdUpopJZap4UvENlScqU8UvHda66LDWRYe1LvrwH6fyhspUMalMFU9UnqhMFd9QeaIyVTxRmSq+cVjrosNaFx3WuujDj1X8UsWk8obKE5Wp4knFpPJE5UnFk4o3VKaKmw5rXXRY66LDWhd9uEzlb1KZKiaVqWJSmSomlScVk8pUMam8oTJVTCpPKp6oTBXfOKx10WGtiw5rXWR/sNYlh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rro/wCCrkp/2OdKYAAAAABJRU5ErkJggg==','2025-02-09 22:15:44','2025-02-09 22:21:16','Cancelled'),
(87,24,'GEKM6XRV80Y','TX-1739115718692',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-09 22:21:34','2025-02-09 22:41:58','Pending'),
(88,24,'GEKM6YCUB54','TX-1739149725810',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-10 08:08:43','2025-02-10 08:13:29','Cancelled'),
(89,24,'GEKM6YD119Q','TX-1739150051785',25490.00,0.00,1784.30,27274.30,'data:image/png;base64,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','2025-02-10 08:13:57','2025-02-10 08:14:11','Pending'),
(90,24,'GEKM6YD2KUQ','TX-1739153935355',42990.00,0.00,3009.30,45999.30,'data:image/png;base64,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','2025-02-10 08:15:09','2025-02-10 09:18:55','Pending'),
(91,24,'GEKM6YK5QS5','TX-1739163419442',42990.00,0.00,3009.30,45999.30,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAY+SURBVO3BQW4su5bAQFKo/W+Z7aFGAhJZ9tP9fSLsB2NcYjHGRRZjXGQxxkUWY1xkMcZFFmNcZDHGRRZjXGQxxkUWY1xkMcZFFmNcZDHGRRZjXGQxxkU+vKTylyp2KruKncpJxYnKrmKnsqt4Q+WJihOVv1TxxmKMiyzGuMhijIt8+LKKb1J5QmVX8U0qJyq7iicqTlTeqPgmlW9ajHGRxRgXWYxxkQ+/TOWJiicqTlR2FScqb1TsVHYVO5VdxUnFN6k8UfGbFmNcZDHGRRZjXOTDP07lCZVdxa7iRGVX8YTKrmKnsqs4UdlV/MsWY1xkMcZFFmNc5MM/ruJEZVfxRsVO5YmKk4qdyv8nizEushjjIosxLvLhl1X8JZUnVHYVO5UnKr6pYqeyq3ij4iaLMS6yGOMiizEu8uHLVP6Syq5ip/JNFTuVE5VdxU5lV7FT2VXsVHYVJyo3W4xxkcUYF1mMcZEPL1X8S1R2FU+onKjsKnYqu4qTijcq/iWLMS6yGOMiizEu8uEllV3FTuWkYqfyRMVOZVdxonJSsVN5o+JEZVexU3lCZVdxorKr2KmcVLyxGOMiizEushjjIvaD/5DKScVO5aTiRGVXsVN5omKn8kTFicpJxYnKScVO5YmKb1qMcZHFGBdZjHER+8ELKicVO5WTip3KruIJlV3FTuWkYqeyqzhR2VWcqLxRcaLyRMVO5aTijcUYF1mMcZHFGBf58GUVT1TsVHYV36Syq3iiYqdyUnGi8kTFTuVE5aRip3JSsVP5psUYF1mMcZHFGBf58FLFicqu4qRip7KreKPiCZUnKk5U3lD5L6nsKr5pMcZFFmNcZDHGRT58mcquYqdyUrGr2KmcVDyh8kTFGxU7lV3FicquYqdyUrFT2VX8lxZjXGQxxkUWY1zkw+VUdhU7lZ3KicoTFd+k8oTKrmKnsqvYqexUdhUnKruK37QY4yKLMS6yGOMiH/5YxRMVO5WTip3KrmKn8oTKruJEZVdxorKr2KmcqLyhsqv4S4sxLrIY4yKLMS7y4SWVJ1R2FTuVk4oTlV3FExUnFScqT6icqJxU7FROKnYqJyq7it+0GOMiizEushjjIh9eqjhR2VXsVE4q3lD5SxU7lScqdionKruKncobFScqu4o3FmNcZDHGRRZjXOTDl6nsKnYqu4qdyk5lV3FSsVPZVexUdipvVLyhsqt4o2KnclKxU/lLizEushjjIosxLvLhJZVdxU7lRGVXcaLyRMVO5aTiDZU3KnYqu4qdyknFrmKnclLxlxZjXGQxxkUWY1zkw5epnFScqJxUnKg8UbFT2VXsVE4qnqh4QmVXsVN5Q+Wk4jctxrjIYoyLLMa4iP3gBZWTip3KScVNVN6oOFF5ouJE5YmKncpJxU5lV/HGYoyLLMa4yGKMi3x4qeKNip3KScUTKruKE5UnKk5Unqh4QmVXsVPZVexUdhU7lZ3Kb1qMcZHFGBdZjHGRD1+m8oTKruJEZVexUzlReaJip/JGxU7lCZUTlV3FEyq7ir+0GOMiizEushjjIvaDF1R2Fd+k8kbFTuWkYqeyqzhReaLiROUvVexUTiq+aTHGRRZjXGQxxkXsB/8wlZOKE5VdxYnKruJE5aRip/JGxRMqJxU7lZOKNxZjXGQxxkUWY1zkw0sqf6nipOJEZVdxorKrOFH5poqdyhMqu4qTipOKnco3Lca4yGKMiyzGuMiHL6v4JpU3VE5UnlDZVbyhsqv4poonVE4qftNijIssxrjIYoyLfPhlKk9UPFGxU3mi4g2VNypOVJ5QeaNip7JT+U2LMS6yGOMiizEu8uEfp3JScaKyq9ip7CqeqNipnKicVOxUdhUnKruKk4q/tBjjIosxLrIY4yIf/sdU7FR2FbuKncquYqfyRsVO5aTiCZU3VHYVf2kxxkUWY1xkMcZFPvyyit9UcVKxU9lVPFHxmyp2Km9U7FR2KruKncquYqeyq3hjMcZFFmNcZDHGRewHL6j8pYqdyknFicquYqeyqzhReaJip/JExU5lV3GiclLxlxZjXGQxxkUWY1zEfjDGJRZjXGQxxkUWY1xkMcZFFmNcZDHGRRZjXGQxxkUWY1xkMcZFFmNcZDHGRRZjXGQxxkUWY1zk/wCEEgOH+FzygQAAAABJRU5ErkJggg==','2025-02-10 11:33:34','2025-02-10 11:56:59','Pending'),
(92,24,'GEKM6YL0DC1','TX-1739163783182',2400.00,0.00,168.00,2568.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4kRxIEQdNA/f/Lun30ywaQSK8eDmki+CNVS06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFn7wE5DepmYBMap4AcqNmAjKpuQEyqZmATGomIL9JzRsnVYtOqhadVC36ZJmaTUBu1NwAuVHzBpBJzaTmRs0TajYB2XRSteikatFJ1aJPvgzIE2qeAHKjZgIyAblRM6mZgExA3lDzBJAn1HzTSdWik6pFJ1WLPvnLqZmATEAmNZvU3ACZ1ExA/k1OqhadVC06qVr0yX8ckDfU3KiZgPybnVQtOqladFK16JMvU/NNQCY1E5AJyI2aJ4A8oWYC8oaaf5KTqkUnVYtOqhZ9sgzIP5maCcgNkEnNjZoJyCYg/2QnVYtOqhadVC365CU1f5KaJ4BMap4A8gaQJ9T8TU6qFp1ULTqpWvTJS0AmNROQSc0TQG7U3Ki5AfKb1ExAngAyqbkBMqmZgExq3jipWnRSteikahH+SP1fQL5JzQTkCTVPALlR88ZJ1aKTqkUnVYs+eQnIpGYCcqPmBsgTaiYgN2omIDdqJiCTmhsgb6iZgDyhZgKy6aRq0UnVopOqRfgjLwCZ1ExAnlBzA+QJNTdAJjU3QJ5QMwG5UXMD5Ak1v+mkatFJ1aKTqkX4I4uATGomIJOaCciNmhsgN2pugDyh5g0gk5oJyI2aN4BMat44qVp0UrXopGrRJy8BuQEyqZmA3KiZgExqJjU3QCY1N2pugExqJiBPAPkmIN90UrXopGrRSdUi/JFfBGRSMwHZpGYCsknNBOQJNTdAJjWbgExq3jipWnRSteikahH+yAtAbtRMQJ5QMwF5Qs0mIDdqJiCTmjeA3Kj5k06qFp1ULTqpWvTJS2o2qZmA3KiZgDwB5A01bwCZ1ExAbtS8AWRS88ZJ1aKTqkUnVYvwRxYBmdQ8AWRS8waQSc0NkEnNBOQJNROQTWpugDyh5o2TqkUnVYtOqhbhj7wA5Ak1E5BJzQRkUnMDZFLzTUD+JDUTkEnNDZBJzRsnVYtOqhadVC3CH/kiIJOaGyCTmgnIjZongNyomYDcqJmAPKHmb3ZSteikatFJ1aJPXgLyBJBJzaRmAjKpuQHyhJoJyBNqJiCTmhsgE5BNaiYgk5pNJ1WLTqoWnVQtwh/5iwGZ1ExAJjUTkEnNE0AmNU8AmdQ8AeQJNROQSc0bJ1WLTqoWnVQt+uQlIL9JzRNqJiA3QG7U3AC5UfMEkEnNjZo/6aRq0UnVopOqRZ8sU7MJyI2aGyA3am6ATECeUPOGmk1AJjWbTqoWnVQtOqla9MmXAXlCzRtAJjUTkAnIG2omIBOQJ4C8AWRSM6mZgExq3jipWnRSteikatEn/3FqboBMam7U3ACZ1ExAJjUTkCeA3KjZdFK16KRq0UnVok/+ckAmNROQGyCTmhsgN2omIJvUTEAmNTdAJiCTmjdOqhadVC06qVqEP/ICkEnNJiCTmhsgk5obIJOaGyDfpOYNIJOa33RSteikatFJ1aJPlgH5TUAmNROQb1LzBpAbIE+oeQLIpOaNk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q85vDhDtcIxXgAAAABJRU5ErkJggg==','2025-02-10 11:57:23','2025-02-10 12:03:03','Pending'),
(93,24,'GEKM6YMP9ZH',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-10 12:44:45','2025-02-10 12:44:45','Pending'),
(95,24,'GEKM6YPSC1N','TX-1739172168116',1900.00,0.00,133.00,2033.00,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAUSSURBVO3BQQ4kR5LAQDJQ//8yt49+SiBRUS1p1s3sD9a65LDWRYe1LjqsddFhrYsOa110WOuiw1oXHda66LDWRYe1LjqsddFhrYsOa110WOuiw1oXffiSyt9U8UTlScWkMlV8Q+UbFZPK31TxjcNaFx3Wuuiw1kUfLqu4SeWJylQxqbyhMlU8UXlSMalMFW9U3KRy02Gtiw5rXXRY66IPP6byRsUbFZPKVDGpTBVvqDypmFSmikllqnhD5Y2KXzqsddFhrYsOa1304f+ZiknlScWTiknlicr/ssNaFx3Wuuiw1kUf/uNUpopJZaqYKp6oTBVvVDxR+V9yWOuiw1oXHda66MOPVfxSxaTyRGWqmFSmiknlScWk8ksV/yaHtS46rHXRYa2LPlym8jepTBWTylQxqUwVk8pUMam8UTGpvKHyb3ZY66LDWhcd1rrow5cq/kkVk8pUMak8UfmGyk0V/yWHtS46rHXRYa2LPnxJZaqYVKaKSWWqmFSmijdU3qiYVG5SuUllqniiMlXcdFjrosNaFx3Wusj+4B+k8qRiUpkq/kkqU8WkMlW8oTJVPFGZKp6oTBXfOKx10WGtiw5rXfThx1SmiicVk8oTlScVN6k8UZkqblJ5UjGp/E2HtS46rHXRYa2L7A++oPKkYlKZKiaVqWJSmSomlTcqvqEyVbyh8qTiicpU8URlqrjpsNZFh7UuOqx10YcfU5kq3lD5RsUbKk8qpopJZaqYVN5QmSqmikllqniiMlV847DWRYe1LjqsdZH9wT9IZap4ovJfVjGpTBWTylTxRGWqeKIyVXzjsNZFh7UuOqx10YfLVKaKSWWqmFSeVDxReVIxqbxR8YbKk4pJ5YnKVPGGyi8d1rrosNZFh7Uu+vAvV/FE5Q2VqWJSeUPlDZWp4knFE5VvVNx0WOuiw1oXHda6yP7gh1SmijdUpopvqEwVT1Smiicqv1TxRGWqmFSeVHzjsNZFh7UuOqx10YfLVKaKJypPKiaVb1RMKlPFVPFEZap4Q2WqmFS+oTJVTCo3Hda66LDWRYe1LvrwJZWp4onKVPFE5UnFE5VJ5YnKVDGpvKEyVfxSxROVXzqsddFhrYsOa1304UsVk8qTiicqU8Wk8kbFpDJVvFExqUwq31CZKiaVqWJSmSqeVNx0WOuiw1oXHda66MOXVKaKSeUbKm+o/E0Vb6i8ofJEZap4UvFLh7UuOqx10WGtiz58qeJJxRsVb6g8qXii8qRiUnmj4o2KN1SeqLxR8Y3DWhcd1rrosNZFH76k8jdVTBWTyhsVT1TeqJhUvqEyVTxRmSomlV86rHXRYa2LDmtd9OGyiptU3qiYVJ5UTCpPKiaVJxWTyhsVN1X80mGtiw5rXXRY66IPP6byRsUbKlPFVDGpPKmYVJ5UPFGZKiaVSeUbFU9UnlR847DWRYe1LjqsddGH/7iKSeVJxTdUpopJZap4UvENlScqU8UvHda66LDWRYe1LvrwH6fyhspUMalMFU9UnqhMFd9QeaIyVTxRmSq+cVjrosNaFx3WuujDj1X8UsWk8obKE5Wp4knFpPJE5UnFk4o3VKaKmw5rXXRY66LDWhd9uEzlb1KZKiaVqWJSmSomlScVk8pUMam8oTJVTCpPKp6oTBXfOKx10WGtiw5rXWR/sNYlh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rro/wCCrkp/2OdKYAAAAABJRU5ErkJggg==','2025-02-10 14:11:06','2025-02-10 14:25:00','Cancelled'),
(96,24,'GEKM6YQAIIQ',NULL,2400.00,0.00,168.00,2568.00,NULL,'2025-02-10 14:25:14','2025-02-10 14:33:45','Cancelled'),
(97,24,'GEKM6YQLTJN',NULL,32500.00,0.00,2275.00,34775.00,NULL,'2025-02-10 14:34:02','2025-02-10 15:03:34','Cancelled'),
(98,28,'GEKM6YS7SJQ',NULL,25490.00,0.00,1784.30,27274.30,NULL,'2025-02-10 15:19:06','2025-02-10 15:20:59','Cancelled'),
(99,28,'GEKM6YSBBMN',NULL,42990.00,0.00,3009.30,45999.30,NULL,'2025-02-10 15:21:51','2025-02-10 15:21:51','Pending'),
(100,24,'GEKM6YTL6AN','TX-1739200423514',25490.00,0.00,1784.30,27274.30,'data:image/png;base64,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','2025-02-10 15:57:30','2025-02-10 22:13:43','Pending'),
(101,24,'GEKM6Z73PN0','TX-1739206147169',25490.00,0.00,1784.30,27274.30,'data:image/png;base64,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','2025-02-10 22:15:50','2025-02-10 23:49:07','Cancelled'),
(102,24,'GEKM6Z77IIB','TX-1739206742703',1900.00,0.00,133.00,2033.00,'data:image/png;base64,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','2025-02-10 22:18:48','2025-02-10 23:59:02','Pending'),
(103,24,'GEKM6Z7AMSG','TX-1739206611383',1900.00,0.00,133.00,2033.00,'data:image/png;base64,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','2025-02-10 22:21:13','2025-02-10 23:56:51','Cancelled'),
(104,24,'GEKM6ZA0GFI','TX-1739206624179',24700.00,0.00,1729.00,26429.00,'data:image/png;base64,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','2025-02-10 23:37:17','2025-02-10 23:57:04','Pending'),
(105,24,'GEKM6ZAJD45','TX-1739206577900',24700.00,0.00,1729.00,26429.00,'data:image/png;base64,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','2025-02-10 23:51:59','2025-02-10 23:56:17','Pending');
/*!40000 ALTER TABLE `ordersexample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `platforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `delivery_name` varchar(100) NOT NULL,
  `delivery_phone` varchar(20) NOT NULL,
  `delivery_address` text NOT NULL,
  `shipping_option` varchar(50) NOT NULL,
  `shipping_cost` decimal(10,2) NOT NULL,
  `total_items` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES
(1,'Payment','atm-card.png','พุทธชัย บดขุนทด','952517869','454/289 ซอยลาดพร้าว 87 แยก 22 แขวงคลองเจ้าคุณสิงห์ เขตวังทองหลาง กรุงเทพมหานคร 10310','Standard Delivery',29.00,1,166.00);
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `_id` varchar(255) DEFAULT NULL,
  `categories_id` int(10) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` float NOT NULL,
  `qty` int(10) NOT NULL DEFAULT 0,
  `image` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `badge` tinyint(1) NOT NULL DEFAULT 0,
  `cat` varchar(255) DEFAULT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `seller_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`categories_id`),
  KEY `fk_seller_id` (`seller_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`categories_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_seller_id` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,NULL,1,'001','MacBook Pro 15',2400,3,'mac15.webp','Description MacBook Pro',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(2,NULL,1,'002','MacBook Pro 13',1900,4,'mac13.webp','Description MacBook Pro 13',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(3,NULL,2,'003','Apple iPad Air 10.9-inch Wi-Fi 64GB Blue 2022 (5th Gen)',23900,150,'H6ddgbc71pl5dhaJbJZToWn5G3u6NEcd9BTEbuFU.jpg','iPad Air (5th Gen) รุ่นล่าสุดสำหรับ iPad Air อัพเกรดขึ้นไปอีกขั้นด้วยจอภาพที่ใหม่และกว้างขึ้น พร้อมชิปประมาลผลที่ทรงประสิทธิภาพ ให้การทำงานหรือเล่นเกมหนัก ๆ ตัดต่อคลิป วาดรูป กลายเป็นเรื่องง่าย ๆ  แต่ยังคงความเบาและบางไว้ได้อยู่',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(4,NULL,2,'004','Apple iPhone 15 Pro Max 256GB Blue Titanium',43000,90,'bAS8UHEQRNv7GmmpCZJL1mYFJD3RUNkxjhf5y0q1.jpg','iPhone 15 Pro Max เปลี่ยนวัสดุตัวเครื่องเป็นไทเทเนียมที่แข็งแกร่งและมีน้ำหนักเบาเกรดเดียวกับที่ใช้ในอุตสาหกรรมอวกาศ พร้อมกล้องระดับโปรที่อเนกประสงค์ยิ่งกว่าเดิม ถ่ายภาพระยะใกล้ได้คมชัดจากที่ที่ไกลกว่าเดิมด้วยกล้องเทเลโฟโต้ 5 เท่า ให้คุณได้ภาพจากระยะที่ชอบในมุมที่ใช่\r\n\r\nการเชื่อมต่อระดับโปร ด้วยช่องต่อ USB-C\r\nชิป A17 Pro GPU ระดับโปรให้เล่นเกมมือถือรู้สึกเต็มอิ่มสมจริงยิ่งขึ้น\r\nปุ่มแอ็คชั่นที่ปรับแต่งได้ตามต้องการทั้ง ปิดเสียง กล้อง บันทึกเสียง และอีกมากมาย',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(5,NULL,2,'005','Apple iPhone 14 128GB Purple',24700,90,'G23Hz8qpHsm0BNgjTfJmr8FGSs8WPhBvtH4agZHC.webp','iPhone 14 มาพร้อมระบบกล้องคู่ที่น่าประทับใจที่สุดเท่าที่เคยมีมาบน iPhone ซึ่งถ่ายภาพได้อย่างน่าทึ่งทั้งในที่ที่มีแสงน้อยและแสงจ้า  นอกจากนี้ยังมีการตรวจจับการชนกัน ซึ่งเป็นคุณสมบัติใหม่ด้านความปลอดภัย ที่พร้อมโทรขอความช่วยเหลือเมื่อคุณไม่สามารถ\r\n\r\nจอภาพ Super Retina XDR ขนาด 6.1 นิ้ว\r\n ระบบกล้องสุดล้ำเพื่อภาพถ่ายที่ดียิ่งขึ้นในทุกสภาพแสง\r\n โหมดภาพยนตร์ที่วันนี้มาในแบบ Dolby Vision ระดับ 4K สูงสุด 30 fps\r\n โหมดแอ็คชั่นเพื่อวิดีโอแบบถือถ่ายที่นิ่งและไหลลื่น\r\n แบตเตอรี่ที่ใช้งานได้ตลอดวันและเล่นวิดีโอได้นานสูงสุด 20 ชั่วโมง\r\n ชิป A15 Bionic พร้อม GPU แบบ 5-core เพื่อประสิทธิภาพที่เร็วสุดขั้ว',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(7,NULL,2,'006','iPhone 12 Pro Max 256GB',32500,140,'JiNu0801Sd2NzWZB6wgvSVA1x12RiyWN63zJsSzx.webp','iPhone 12 Pro Max มาพร้อมชิพที่เร็วที่สุดในสมาร์ทโฟนอย่าง A14 Bionic, ระบบกล้องระดับโปรเพื่อการถ่ายภาพในสภาวะแสงน้อยที่สวยเหลือเชื่อ และจอภาพ Super Retina XDR ที่ใหญ่ขึ้น บอกเลยว่า ก้าวหน้าอย่างก้าวกระโดด\r\n\r\nจอภาพ Super Retina XDR ขนาด 6.7 นิ้ว\r\nCeramic Shield ซึ่งแข็งแกร่งกว่ากระจกไหนๆ บนสมาร์ทโฟน\r\nรองรับ 5G\r\nชิพที่เร็วที่สุดเท่าที่เคยมีมาในสมาร์ทโฟนอย่างชิพ A14 Bionic\r\nระบบกล้องระดับโปรที่ประกอบด้วยกล้องอัลตร้าไวด์, ไวด์ และเทเลโฟโต้                                        ความละเอียด 12MP\r\nกล้องหน้า TrueDepth ความละเอียด 12MP',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(10,NULL,2,'007','Apple iPhone 13 Pro 128GB Sierra Blue',25900,120,'eLhGRo8tDV0OP3MSsBQSiTwCVr8OJf6awd8IZLvn.webp','iPhone 13 Pro การอัปเกรดระบบกล้องระดับโปรครั้งใหญ่ที่สุดเท่าที่เคยมีมา จอภาพ Super Retina XDR พร้อม ProMotion จึงทั้งเร็วขึ้นและรู้สึกได้ถึงการตอบสนองที่ฉับไวยิ่งขึ้น พร้อมชิป A15 Bionic ที่เร็วสุดขั้ว 5G ที่เร็วสุดแรง แถมยังมีดีไซน์ที่ทนทานและแบตเตอรี่ที่ใช้งานได้นานขึ้นแบบก้าวกระโดดครั้งใหญ่อีกด้วย\r\n\r\nจอภาพ Super Retina XDR ขนาด 6.1 นิ้ว  \r\nโหมดภาพยนตร์เพิ่มมิติความชัดตื้นและสลับจุดโฟกัสในวิดีโอของคุณโดยอัตโนมัติ\r\nระบบกล้องระดับโปรที่ประกอบด้วยกล้องเทเลโฟโต้, ไวด์ และอัลตร้าไวด์ ความละเอียด 12MP\r\nกล้องหน้า TrueDepth ความละเอียด 12MP  \r\nชิป A15 Bionic เพื่อประสิทธิภาพที่เร็วสุดขั้ว\r\nเล่นวิดีโอ นานสูงสุด 22 ชั่วโมง',NULL,'Apple ',0,0,'Uncategorized',NULL,NULL,NULL,24),
(35,NULL,3,'033','นาฬิกา Casio EF710D',1490,10,'NG4QpKZZyp2FRjKIIZxmrQs6fgsGhWwUaOCu26fF.jpg','Casio EF710D Description',NULL,'Casio ',0,0,NULL,NULL,NULL,NULL,24),
(36,NULL,3,'034','นาฬิกา CASIO GENERAL รุ่น LTP-V005D-4B2UDF',1300,16,'nXBzaPhktF7KZQxttOoZXyEYXyu1Uqe8jDcOM4tq.jpg','CASIO นาฬิกา GENERAL รุ่น LTP-V005D-4B2UDF สีชมพู',NULL,'Casio ',0,0,NULL,NULL,NULL,NULL,24),
(37,NULL,3,'035','นาฬิกา Casio รุ่น LTP-VT01D-1B',1600,24,'uS8oO9kWOBNBzZ0VHoLIf5aF1vi3PQW9di9pNgpU.jpg','ข้อมูลพื้นฐาน ขนาดตัวเรือน (ก x ย x ส) 40 × 34 × 7.9 mm น้ำหนัก 62 g สาย ตัวล็อกพับสามทบ, สายสเตนเลสสตีล ,กันน้ำ\r\nแหล่งจ่ายพลังงานและอายุการใช้งานแบตเตอรี่ อายุการใช้งานแบตเตอรี่ประมาณ: 3 ปีกับถ่านกระดุม SR626SW',NULL,'Casio ',0,0,NULL,NULL,NULL,NULL,24),
(38,NULL,4,'036','กล้องคอมแพค RX100 VII กับ AF ที่เหนือกว่า (DSC-RX100M7 ตัวกล้อง)',42990,50,'1ZRFuWx3hNe9kGKmhJtfP0geYQRzZhn1sTEzmTFE.jpg','overviewRX100M7 (ตัวกล้อง) คุณสมบัติมืออาชีพที่มาในขนาดกะทัดรัด คุณสมบัติระดับมืออาชีพ ทั้งภาพนิ่งและวีดีโอ เพื่อตอบโจทย์ความต้องการของช่างภาพมืออาชีพ, Content Creator, และ Vlogger',NULL,NULL,0,0,NULL,NULL,NULL,NULL,24),
(40,NULL,4,'038','กล้อง a7C II กล้องฟูลเฟรมขนาดกะทัดรัด Compact Full-Frame Camera with Lens Kit (ILCE-7CM2L)',76990,27,'AQ5sTzTo7YlkbGEojnHmNe04tJjoFcqj2gDOUHiB.jpg','การรับแสงและสีที่แม่นยำสม่ำเสมอ ระบบประมวลผลล่าสุดที่ทำงานร่วมกับอัลกอริทึม AE ขั้นสูง ช่วยให้ α7C II สามารถตรวจจับพื้นที่ผิวบนใบหน้าและปรับค่าการรับแสงอย่างสอดคล้องเมื่อถ่ายทั้งภาพนิ่งและภาพยนตร์ กล้องจึงสามารถควบคุมช่องรับแสงได้อย่างสม่ำเสมอแม้ในสภาวะการถ่ายที่ไม่เอื้ออำนวยเมื่อวัตถุย้อนแสง อยู่ในเงามืด หรือถูกแสงแดดโดยตรง หรือไม่ได้หันหน้าเข้าหากล้องโดยตรง',NULL,NULL,0,0,NULL,NULL,NULL,NULL,24),
(41,NULL,4,'039','Camera',3000,9,'xhu8QPveTQSBR0RZSG1s0uHi3SGzKZoiizmVCjwe.jpg','Camera',NULL,NULL,0,0,NULL,NULL,NULL,NULL,24),
(42,NULL,2,NULL,'sumsung galaxy s25 ultra',49600,5,'1738087826558.png','sumsung galaxy s25 ultra',NULL,'sumsung',0,0,NULL,NULL,NULL,NULL,24),
(69,NULL,1,NULL,'NOTEBOOK (โน้ตบุ๊ค) MSI THIN 15 B12VE-1424TH (COSMOS GRAY)',25490,15,'1738495431768.jpg','Brands MSI Model THIN 15 B12VE-1424TH Processors Intel® Core™ i5-12450H Processors (12th Gen) Processor Speed	2.0GHz up to 4.4GHz, 12MB Intel Smart Cache Video Graphics	NVIDIA® GeForce RTX™ 4050 Laptop GPU 6GB GDDR6 Screen Size	15.6\" Display	FHD (1920 x 1080) IPS, 144Hz, 45% NTSC Memory	16GB DDR4 3200MHz Storage	512GB PCIe® 4.0 x4 NVMe™ M.2 SSD w/o DRAM Operating System	Windows 11 Home',NULL,' MSI',0,0,NULL,NULL,NULL,NULL,24),
(70,'301',5,NULL,'Round Table Clock',44,10,'newArrOne.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Black',NULL,0,1,NULL,NULL,NULL,NULL,24),
(71,'302',5,NULL,'Smart Watch',250,10,'newArrTwo.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Black',NULL,0,1,NULL,NULL,NULL,NULL,24),
(72,'303',5,NULL,'Cloth Basket',80,10,'newArrThree.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Mixed',NULL,0,1,NULL,NULL,NULL,NULL,24),
(73,'304',5,NULL,'Funny Toys for Babies',60,10,'newArrFour.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Mixed',NULL,0,0,NULL,NULL,NULL,NULL,24),
(74,'305',5,NULL,'Funny Toys for Babies',600,10,'newArrFour.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Mixed',NULL,0,0,NULL,NULL,NULL,NULL,24),
(75,'306',5,NULL,'Funny Toys for Babies',666,10,'newArrFour.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Mixed',NULL,0,0,NULL,NULL,NULL,NULL,24),
(76,NULL,NULL,'008','imprimante',35,4,'imprimante1.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(77,NULL,NULL,'009','imprimante',180,5,'imprimante2.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(78,NULL,NULL,'010','imprimante',25,110,'imprimante4.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(79,NULL,NULL,'011','imprimante',220,60,'imprimante5.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(80,NULL,NULL,'012','imprimante',25,50,'imprimante6.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(81,NULL,NULL,'013','imprimante',220,44,'imprimante7.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(82,NULL,NULL,'014','imprimante',25,56,'imprimante8.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(83,NULL,NULL,'015','imprimante',220,65,'imprimante9.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'imprimante',NULL,NULL,NULL,24),
(84,NULL,NULL,'016','encre',25,45,'encre1.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'ancre',NULL,NULL,NULL,24),
(85,NULL,NULL,'017','encre',220,35,'encre2.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'ancre',NULL,NULL,NULL,24),
(86,NULL,NULL,'018','encre',25,54,'encre3.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'ancre',NULL,NULL,NULL,24),
(87,NULL,NULL,'019','encre',220,45,'encre4.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'ancre',NULL,NULL,NULL,24),
(88,NULL,NULL,'020','Ruban',25,36,'ruban1.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Ribbon',NULL,NULL,NULL,24),
(89,NULL,NULL,'021','Ruban',220,57,'ruban2.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Ribbon',NULL,NULL,NULL,24),
(90,NULL,NULL,'022','Ruban',25,45,'ruban3.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Ribbon',NULL,NULL,NULL,24),
(91,NULL,NULL,'023','Ruban',220,15,'ruban4.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Ribbon',NULL,NULL,NULL,24),
(92,NULL,NULL,'024','Bac de dechet',25,24,'bac1.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Bac',NULL,NULL,NULL,24),
(93,NULL,NULL,'026','Bac de dechet',220,35,'bac2.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Bac',NULL,NULL,NULL,24),
(94,NULL,NULL,'027','Bac de dechet',25,36,'bac3.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Bac',NULL,NULL,NULL,24),
(95,NULL,NULL,'028','Bac de dechet',220,17,'bac4.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.',NULL,NULL,0,1,'Bac',NULL,NULL,NULL,24),
(96,NULL,NULL,'029','Imprimante PANTUM CP2200DW',35,52,'IMPRIMANTE_PANTUM_CP2200DW.webp','Imprimante Laser PANTUM Couleur - Fonctions: Impression  - Technologie d\'impression: Laser...','Blanc','Pantum',0,1,'Imprimante','pdf1',NULL,NULL,24),
(97,NULL,NULL,'030','IMPRIMANTE PANTUM BM5100FDW',450,41,'IMPRIMANTE_PANTUM_BM5100FDW.webp','Pantum BM5100fdw Imprimante laser mono...','Blanc','Pantum',0,1,'Imprimante','pdf1',NULL,NULL,24),
(98,NULL,NULL,'031','IMPRIMANTE PANTUM BP5100DN',450,63,'IMPRIMANTE_PANTUM_BP5100DN.webp','Imprimante Monochrome Laser PANTUM BP5100DN...','Blanc','Pantum',0,1,'Imprimante','pdf1',NULL,NULL,24),
(99,NULL,NULL,'032','IMPRIMANTE PANTUM M6559N',450,6,'IMPRIMANTE_PANTUM_M6609N.webp','Imprimante Laser 3en1 à toner rechargeable PANTUM M6559N...','Blanc','Pantum',0,1,'Imprimante','pdf1',NULL,NULL,24),
(106,NULL,5,NULL,'Flower Base',35,8,'bestSellerOne.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Black and White',NULL,0,1,NULL,NULL,NULL,NULL,24),
(107,NULL,5,NULL,'New Backpack',180,18,'bestSellerTwo.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Gray',NULL,0,0,NULL,NULL,NULL,NULL,24),
(108,NULL,5,NULL,'Household materials',25,7,'bestSellerThree.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Mixed',NULL,0,1,NULL,NULL,NULL,NULL,24),
(109,NULL,5,NULL,'Travel Bag',220,14,'bestSellerFour.webp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.','Black',NULL,0,0,NULL,NULL,NULL,NULL,24);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellers`
--

DROP TABLE IF EXISTS `sellers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sellers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `seller_id` (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers`
--

LOCK TABLES `sellers` WRITE;
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
INSERT INTO `sellers` VALUES
(1,1,'Admin nagimarou_F','adminp@gmail.com','$2y$10$/QgcCfLhFQMW8r0meA8K5e46sBNpLg5eGQpVgeDujdsGwtsO4O3RO','2025-01-26 18:01:50'),
(2,24,'admin','admin@gmail.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86','2025-01-27 08:08:26');
/*!40000 ALTER TABLE `sellers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofiles`
--

DROP TABLE IF EXISTS `userprofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprofiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_userprofiles_user_id` (`user_id`),
  CONSTRAINT `fk_userprofiles_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofiles`
--

LOCK TABLES `userprofiles` WRITE;
/*!40000 ALTER TABLE `userprofiles` DISABLE KEYS */;
INSERT INTO `userprofiles` VALUES
(1,1,'John','Doe','0812345678','123/45 หมู่บ้านตัวอย่าง','กรุงเทพฯ','กรุงเทพมหานคร','10110','ไทย','2025-01-06 11:21:16','2025-01-06 11:21:16');
/*!40000 ALTER TABLE `userprofiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image_profile` text DEFAULT NULL COMMENT 'ImageProfile',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'adminP','puttachai bodkhuntod','adminp@gmail.com',NULL,NULL,NULL,NULL,'$2y$10$/QgcCfLhFQMW8r0meA8K5e46sBNpLg5eGQpVgeDujdsGwtsO4O3RO',NULL,'2024-09-05 09:38:52','2024-09-05 09:38:52','first.png'),
(2,'Mena','wichuda','Test@gmail.com','0956380635','Female','2005-03-24',NULL,'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff',NULL,NULL,NULL,'mena.png'),
(17,'adminps','admin product','admins@gmail.com',NULL,NULL,NULL,NULL,'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',NULL,NULL,NULL,NULL),
(24,'puttachai','puttachai','puttachai@gmail.com','0952517869','null','2025-03-01',NULL,'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',NULL,NULL,NULL,'first.png'),
(25,'first','first puttachai','first4869.2546@gmail.com','0957168225','Male','2003-03-01',NULL,'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff',NULL,NULL,NULL,'1733716350692.jpg'),
(26,'rbac','Rbac','rbac@ac.th','null','null','1969-12-31',NULL,'9f4448679b3bf61404583ea5a888d6008d6dcc25996ce723b1625f6f92a3f7dbea2b00c04062766940ac507d1ca3a3d415b4872d30cf9ea50c243874ffa3065b',NULL,NULL,NULL,'1736870358158.png'),
(27,'sellrbac','sellrbac','sellrbac@gmail.com',NULL,NULL,NULL,NULL,'3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',NULL,NULL,NULL,NULL),
(28,'customer1','customer1','customer1@gmail.com',NULL,NULL,NULL,NULL,'3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'laravel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-02-11  0:07:49
