-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: farm2flake
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `admins`
--

CREATE DATABASE IF NOT EXISTS railway;

USE railway;

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','staff') DEFAULT 'staff',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin@farm2flake.com','$2b$10$bxxOBNWMl1TmBBZIjSWUeuWlPEFn0RltwULTIsysJMUpJsV0epGPq','super_admin','2026-05-22 08:21:58'),(2,'abc@gmail.com','$2b$10$rv1/.3R/DJPAGG90DmT30uRquMCcaNPoTKaa5GA7IR4bCbX3O4CzW','staff','2026-05-22 08:58:52');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `short_description` text,
  `content` longtext,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('draft','published','hidden') DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Fruit Powders','Natural fruit powder supplements','https://via.placeholder.com/200?text=Fruit','2026-05-20 18:22:59'),(2,'Vegetable Powders','Organic vegetable powders','https://via.placeholder.com/200?text=Vegetable','2026-05-20 18:22:59'),(3,'Smoothie Mixes','Ready smoothie blends','https://via.placeholder.com/200?text=Smoothie','2026-05-20 18:22:59'),(4,'Cooking Ingredients','Culinary powders','https://via.placeholder.com/200?text=Cooking','2026-05-20 18:22:59');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `status` enum('pending','resolved','deleted') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'Aashka Somani','aashkasomani1611@gmail.com','6359225925','Product not recieved','My products are not recieved yet .','deleted','2026-05-22 07:46:59');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(100) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,'F2F-1779378013101','Banana Powder',1,399.00,'https://farm2flake-backend.onrender.com/uploads/products/banana.jpeg'),(2,'F2F-1779379353922','Banana Powder',1,399.00,'https://farm2flake-backend.onrender.com/uploads/products/banana.jpeg'),(3,'F2F-1779379353922','Beetroot Powder',1,499.00,'https://farm2flake-backend.onrender.com/uploads/products/beetroot.jpeg'),(4,'F2F-1779379353922','Amla Powder',1,599.00,'https://farm2flake-backend.onrender.com/uploads/products/amla.jpeg'),(5,'F2F-1779379358682','Banana Powder',1,399.00,'https://farm2flake-backend.onrender.com/uploads/products/banana.jpeg'),(6,'F2F-1779379358682','Beetroot Powder',1,499.00,'https://farm2flake-backend.onrender.com/uploads/products/beetroot.jpeg'),(7,'F2F-1779379358682','Amla Powder',1,599.00,'https://farm2flake-backend.onrender.com/uploads/products/amla.jpeg');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(100) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','delivered') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'F2F-1779378013101','Aashka Somani','6359225925','aashkasomani1611@gmail.com','Samta Rd','','Vadodara','390023',399.00,'delivered','2026-05-21 15:40:13'),(2,'F2F-1779379353922','Aaesha Shah','6359225925','aashkasomani1909@gmail.com','Samta Rd','','Vadodara','390023',1497.00,'delivered','2026-05-21 16:02:33'),(3,'F2F-1779379358682','Aaesha Shah','6359225925','aashkasomani1909@gmail.com','Samta Rd','','Vadodara','390023',1497.00,'delivered','2026-05-21 16:02:38');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `short_description` text,
  `full_description` longtext,
  `benefits` text,
  `image` varchar(255) DEFAULT NULL,
  `reviews` int DEFAULT '0',
  `is_best_seller` tinyint(1) DEFAULT '0',
  `status` enum('draft','published') DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Banana Powder','Fruit Powders',399.00,'100g',120,'Natural banana powder rich in energy and fiber.','Banana Powder is made from premium bananas using dehydration technology to preserve nutrients and flavor naturally.','Energy,Digestion,Immunity','https://farm2flake-backend.onrender.com/uploads/products/banana.jpeg',128,1,'published','2026-05-20 18:22:59'),(2,'Beetroot Powder','Vegetable Powders',499.00,'200g',90,'Rich in antioxidants and natural detox support.','Beetroot Powder supports healthy blood flow and natural stamina.','Detox,Immunity','https://farm2flake-backend.onrender.com/uploads/products/beetroot.jpeg',96,1,'published','2026-05-20 18:22:59'),(3,'Amla Powder','Herbs Powders',599.00,'100g',80,'Vitamin C rich superfood powder.','Amla Powder supports immunity, digestion, skin and hair health naturally.','Immunity,Antioxidants','https://farm2flake-backend.onrender.com/uploads/products/amla.jpeg',88,1,'published','2026-05-20 18:22:59'),(4,'Guava Powder','Fruit Powders',699.00,'500g',70,'Naturally sweet and nutrient rich fruit powder.','Guava Powder contains natural fiber and antioxidants for healthy digestion.','Gut,Immunity','https://farm2flake-backend.onrender.com/uploads/products/guava.jpeg',72,0,'published','2026-05-21 10:41:42'),(5,'Carrot Powder','Vegetable Powders',799.00,'1kg',60,'Healthy vegetable powder packed with nutrients.','Carrot Powder supports eye health and daily nutrition.','Detox,Antioxidants','https://farm2flake-backend.onrender.com/uploads/products/carrot.jpeg',64,0,'published','2026-05-20 18:22:59'),(6,'Guava Powder','Fruit Powders',499.00,'100g',49,'Very helpful','','Detox','https://farm2flake-backend.onrender.com/uploads/blogs/1779354438278.jpeg',0,1,'published','2026-05-21 09:07:20');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `review` text NOT NULL,
  `status` enum('pending','approved') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Aashka',5,'Very good ','approved','2026-05-21 10:43:47');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-26 17:05:04
