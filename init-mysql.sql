
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `open_id` (`open_id`),
  KEY `idx_nickName` (`nickName`),
  KEY `idx_city` (`city`),
  KEY `idx_country` (`country`),
  KEY `idx_gender` (`gender`),
  KEY `idx_language` (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE rent_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rent_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rent_id) REFERENCES rent_infos(id) ON DELETE CASCADE
);

CREATE TABLE `rent_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) NOT NULL,
  `month_rent_price` decimal(10,2) DEFAULT NULL,
  `rent_type` varchar(255) DEFAULT NULL,
  `rent_area` decimal(10,2) DEFAULT NULL,
  `rent_address` varchar(255) DEFAULT NULL,
  `room_structure` varchar(255) DEFAULT NULL,
  `location_longitude` decimal(10,6) DEFAULT NULL,
  `location_latitude` decimal(10,6) DEFAULT NULL,
  `contact_information` varchar(255) DEFAULT NULL,
  `cash_discount` decimal(10,2) DEFAULT NULL,
  `additional_details` text,
  `tags` varchar(255) DEFAULT NULL,
  `type` int(2) DEFAULT '0',
  `tip` varchar(255) DEFAULT '',
  `status` int(2) DEFAULT '0',
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_rent_type` (`rent_type`),
  KEY `idx_rent_address` (`rent_address`),
  KEY `idx_month_rent_price` (`month_rent_price`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_open_id` (`open_id`),
  KEY `idx_type` (`type`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;


CREATE TABLE `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) NOT NULL,
  `rent_id` int(11) NOT NULL,
  `type` int(2) DEFAULT '0',
  `status` int(2) DEFAULT '1',
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_favorite` (`open_id`,`rent_id`),
  KEY `idx_open_id` (`open_id`),
  KEY `idx_rent_id` (`rent_id`),
  KEY `idx_type` (`type`),
  KEY `idx_status` (`status`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`open_id`) REFERENCES `user_info` (`open_id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`rent_id`) REFERENCES `rent_infos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE share_counter (
  id int(11) NOT NULL AUTO_INCREMENT,
  news_id int(11) NOT NULL,
  share_id varchar(255) NOT NULL,
  open_id varchar(255) NOT NULL,
  chain_hash varchar(255) DEFAULT NULL, -- 链上hash
  chain_type varchar(255) DEFAULT NULL, -- 链上类型
  type int(2) DEFAULT '1',
  status int(2) DEFAULT '1',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_news_share (news_id, share_id, open_id, type), -- 添加唯一索引
  KEY idx_news_id (news_id),
  KEY idx_share_id (share_id),
  KEY idx_open_id (open_id),
  KEY idx_type (type),
  KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;