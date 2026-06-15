-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: zephyr.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.4.0

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
  `meta_description` text,
  `meta_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'10 Amazing Benefits of Beetroot Powder for Daily Health','Vegetable Powders','Learn the top 10 health benefits of beetroot powder, including improved stamina, heart health, immunity, and natural detoxification. Discover why it deserves a place in your daily diet.','Introduction\n\nIn recent years, beetroot powder has become one of the most popular superfood ingredients among health-conscious consumers. Made from carefully dehydrated and finely ground beetroots, this vibrant red powder offers a convenient way to enjoy the nutritional benefits of fresh beetroot throughout the year.\n\nWhether added to smoothies, juices, soups, or baked goods, beetroot powder provides essential nutrients that support overall health and wellness.\n\n1. Rich Source of Antioxidants\n\nBeetroot powder contains powerful antioxidants such as betalains, which help protect the body from oxidative stress caused by free radicals. These antioxidants support healthy aging and overall cellular health.\n\n2. Supports Heart Health\n\nNatural nitrates present in beetroot powder may help improve blood circulation and support healthy blood pressure levels. Better circulation allows oxygen and nutrients to reach different parts of the body more efficiently.\n\n3. Boosts Energy and Stamina\n\nAthletes and fitness enthusiasts often use beetroot powder as a natural performance enhancer. The nitrates in beetroot help improve oxygen utilization, which may enhance endurance during physical activities.\n\n4. Promotes Natural Detoxification\n\nBeetroot supports liver function and assists the body\'s natural detoxification processes. Regular consumption can help the body eliminate toxins more effectively.\n\n5. Supports Healthy Digestion\n\nBeetroot powder contains dietary fiber that helps maintain digestive health. A healthy digestive system contributes to better nutrient absorption and overall wellness.\n\n6. Strengthens Immunity\n\nPacked with vitamins, minerals, and antioxidants, beetroot powder helps strengthen the immune system and supports the body\'s natural defense mechanisms.\n\n7. Improves Skin Health\n\nThe antioxidants and nutrients found in beetroot powder may contribute to healthier, glowing skin by reducing oxidative damage and supporting collagen production.\n\n8. Supports Brain Function\n\nImproved blood circulation may also benefit brain health by ensuring adequate oxygen supply to brain tissues, supporting focus and cognitive performance.\n\n9. Helps Maintain Healthy Weight\n\nBeetroot powder is naturally low in calories while being nutrient-dense, making it an excellent addition to a balanced diet and healthy lifestyle.\n\n10. Easy to Include in Daily Diet\n\nOne of the biggest advantages of beetroot powder is its versatility. It can be mixed into smoothies, juices, yogurt, soups, and even baking recipes without much effort.\n\nConclusion\n\nBeetroot powder is a simple yet powerful superfood that offers numerous health benefits. From supporting heart health and energy levels to boosting immunity and promoting healthy skin, it can be a valuable addition to your daily wellness routine.\n\nAt Farm2Flake, we are committed to providing premium-quality vegetable powders that help you enjoy nature\'s goodness in a convenient and nutritious form.','https://farm2flake-backend.onrender.com/uploads/blogs/1780313956533.png','published','2026-06-01 11:39:26','','10 Amazing Benefits of Beetroot Powder for Daily Health'),(3,'7 Powerful Benefits of Amla Powder for Daily Health','Fruit Powders','Discover how Amla Powder supports immunity, digestion, skin health, and overall wellness. Learn why this nutrient-rich superfood deserves a place in your daily routine.','# 7 Powerful Benefits of Amla Powder for Daily Health\n\nAmla, also known as Indian Gooseberry, has been valued in traditional wellness practices for centuries. Rich in Vitamin C, antioxidants, and essential nutrients, Amla Powder is a simple yet powerful addition to a healthy lifestyle.\n\n## 1. Supports Natural Immunity\n\nAmla is naturally rich in Vitamin C and antioxidants that help support the body\'s natural defense system. Regular consumption may help maintain overall wellness throughout the year.\n\n## 2. Promotes Healthy Digestion\n\nAmla Powder contains dietary fiber and natural compounds that support digestive health. It can be easily mixed into water, smoothies, or juices as part of a balanced diet.\n\n## 3. Supports Healthy Skin\n\nThe antioxidants present in Amla help protect cells from oxidative stress. Many people include Amla in their daily routine to support healthy-looking skin and a natural glow.\n\n## 4. Helps Maintain Hair Health\n\nAmla has traditionally been used to support healthy hair. Its nutrient profile makes it a popular ingredient in wellness and beauty routines.\n\n## 5. Rich Source of Antioxidants\n\nAntioxidants play an important role in protecting the body from free radicals. Amla Powder is packed with natural antioxidant compounds that support overall well-being.\n\n## 6. Easy to Add to Everyday Meals\n\nOne of the biggest advantages of Amla Powder is its versatility. It can be mixed into:\n\n* Smoothies\n* Juices\n* Yogurt\n* Herbal drinks\n* Health shakes\n\nThis makes it easy to include in a daily nutrition plan.\n\n## 7. Supports an Active Lifestyle\n\nAmla Powder provides valuable nutrients that complement an active and health-conscious lifestyle. Combined with a balanced diet and regular exercise, it can be a beneficial addition to your wellness journey.\n\n## How to Use Amla Powder\n\nA simple way to enjoy Amla Powder is to mix one teaspoon into a glass of water or your favorite smoothie. You can also add it to juices and health drinks.\n\n## Why Choose Farm2Flake Amla Powder?\n\nAt Farm2Flake, we focus on delivering premium-quality ingredients made from carefully selected fruits. Our Amla Powder is processed to preserve its natural goodness, ensuring you receive a product you can trust.\n\n### Final Thoughts\n\nAmla Powder is a convenient and nutrient-rich superfood that supports daily wellness. Whether you\'re looking to improve your nutrition routine or add more natural ingredients to your diet, Amla Powder is an excellent choice.\n','https://i.imgur.com/ZF3H9Qr.jpeg','published','2026-06-10 09:07:39','Explore the top health benefits of Amla Powder including immunity support, digestion, skin health, and natural nutrition. Learn how to use it daily.','7 Benefits of Amla Powder | Natural Superfood for Daily Wellness');
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (41,'F2F-1780057524102','Banana Powder',1,399.00,'https://farm2flake-backend.onrender.com/uploads/products/banana.jpeg'),(42,'F2F-1780140105870','Beetroot Powder',1,499.00,'https://farm2flake-backend.onrender.com/uploads/products/beetroot.jpeg'),(43,'F2F-1780556420751','Amla Powder',1,1378.00,'https://farm2flake-backend.onrender.com/uploads/products/amla.jpeg'),(44,'F2F-1780556420751','Guava Powder',1,1148.00,'https://farm2flake-backend.onrender.com/uploads/blogs/1779354438278.jpeg');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (37,'F2F-1780057524102','Aashka Somani','6359225925','aashkasomani1611@gmail.com','Subhanpura ','Samta','Vadodara','390023',399.00,'delivered','2026-05-29 12:25:24'),(38,'F2F-1780140105870','Aashka Somani','6359225925','aashkasomani1611@gmail.com','Samta Rd','','Vadodara','390023',499.00,'delivered','2026-05-30 11:21:46'),(39,'F2F-1780556420751','Aashka Somani','06359225925','aashkasomani1611@gmail.com','Samta Rd','','Vadodara','390023',2526.00,'delivered','2026-06-04 07:00:20');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Banana Powder','Fruit Powders',399.00,'100g',120,'Natural banana powder rich in energy and fiber.','Banana Powder is made from premium bananas using dehydration technology to preserve nutrients and flavor naturally.','Energy,Digestion,Immunity','https://farm2flake-backend.onrender.com/uploads/products/banana.jpeg',128,1,'published','2026-05-20 18:22:59'),(2,'Beetroot Powder','Vegetable Powders',499.00,'200g',90,'Rich in antioxidants and natural detox support.','Beetroot Powder supports healthy blood flow and natural stamina.','Detox,Immunity','https://farm2flake-backend.onrender.com/uploads/products/beetroot.jpeg',96,1,'published','2026-05-20 18:22:59'),(3,'Amla Powder','Herbs Powders',599.00,'100g',80,'Vitamin C rich superfood powder.','Amla Powder supports immunity, digestion, skin and hair health naturally.','Immunity,Antioxidants','https://farm2flake-backend.onrender.com/uploads/products/amla.jpeg',89,1,'published','2026-05-20 18:22:59'),(4,'Guava Powder','Fruit Powders',699.00,'500g',70,'Naturally sweet and nutrient rich fruit powder.','Guava Powder contains natural fiber and antioxidants for healthy digestion.','Gut,Immunity','https://farm2flake-backend.onrender.com/uploads/products/guava.jpeg',72,0,'published','2026-05-21 10:41:42'),(5,'Carrot Powder','Vegetable Powders',799.00,'1kg',60,'Healthy vegetable powder packed with nutrients.','Carrot Powder supports eye health and daily nutrition.','Detox,Antioxidants','https://farm2flake-backend.onrender.com/uploads/products/carrot.jpeg',64,0,'published','2026-05-20 18:22:59'),(6,'Guava Powder','Fruit Powders',499.00,'100g',49,'Very helpful','','Detox','https://farm2flake-backend.onrender.com/uploads/blogs/1779354438278.jpeg',0,1,'published','2026-05-21 09:07:20'),(7,'Turmeric Powder','Spices ',299.00,'100g',50,'Premium freeze-dried turmeric powder made from carefully selected turmeric roots.','Farm2Flake Turmeric Powder is made from high-quality turmeric roots and processed to retain its natural color, aroma, and nutritional value. Perfect for cooking, beverages, health drinks, and daily wellness routines.','Immunity,Anti-inflammatory,Antioxidant,Digestion','https://i.imgur.com/1nLsbD3.jpeg',0,1,'published','2026-06-10 09:33:29');
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
  `product_id` int NOT NULL,
  `admin_reply` text,
  PRIMARY KEY (`id`),
  KEY `fk_reviews_product` (`product_id`),
  CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,'Aashkaaaa',5,'Good product ','approved','2026-05-28 09:32:30',3,'Thank you for your feedback.');
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

-- Dump completed on 2026-06-11 13:10:57
