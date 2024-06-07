-- id: 111, 
-- open_id: '', 
-- avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
-- city: ""
-- country: ""
-- gender: 0
-- language: ""
-- nickName: "微信用户"

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


-- 创建一个优惠信息的表 discount_info
-- id 为自增主键
-- title 限制为14个字的描述
-- explain 限制为255个字的描述
-- type int(2) 索引 【反现｜让租期】
-- status int(2) 索引 
-- created_at 时间戳 timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- updated_at 时间戳 timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,


-- 创建一个联系信息的数据表 contact_info
-- id 为自增主键
-- open_id 为用户的唯一标识, 一个用户可以发布多个联系信息, 也就是发布人的唯一标识 索引
-- phone_number 限制为11位的电话号码 索引
-- is_check_phone int(2) 是否验证电话号码
-- wechat_number 限制为255个字的微信号 索引
-- is_check_wechat int(2) 是否验证微信号
-- qq_number 限制为255个字的qq号 索引
-- is_check_qq int(2) 是否验证qq号
-- email 限制为255个字的邮箱 索引
-- is_check_email int(2) 是否验证邮箱
-- type int(2) 索引
-- status int(2) 索引
-- created_at 时间戳 timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- updated_at 时间戳 timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,


-- 创建一个租房信息的数据表  rent_info
-- id 为自增主键
-- discount_id 这是一个优惠信息的 外键
-- contact_id 这是一个联系信息的 外键
-- open_id 为用户的唯一标识, 一个用户可以发布多个租房信息, 也就是发布人的唯一标识 索引
-- title 限制为14个字的描述 索引 【输入，必选】
-- detail text 【输入，可选】
-- month_rent_price 限制为10位数的价格 float 索引 【月租金，必选】
-- rent_area 限制为10位数的面积 float 索引， 平米数 【租赁面积，必须】
-- address 限制为255个字的地址 索引 【输入，必选】
-- map 限制为500个字的地图地址 索引 【选择，可选】
-- map_type int(2) 索引 【地图类型，可选，百度、高德】
-- rent_type 限制为255个字的地址 索引 【必选：整租、合租、转租】
-- payment_method 限制为255个字的支付方式 索引 【必选：月付、季付、半年付、年付】
-- bedroom_count int(2) 卧室数量 索引 【必选】
-- bathroom_count int(2) 卫生间数量 索引 【必选】
-- livingroom_count int(2) 客厅数量 索引 【必选】
-- tags 限制为500个字的描述 索引 【可选】
-- type int(2) 索引 
-- status int(2) 索引
-- created_at 时间戳 timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- updated_at 时间戳 timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,




-- -- 创建优惠信息表 discount_info
-- CREATE TABLE `discount_info` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `title` varchar(14) NOT NULL,
--   `explain` varchar(255) NOT NULL,
--   `type` int(2) NOT NULL,
--   `status` int(2) NOT NULL,
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   INDEX `type_index` (`type`),
--   INDEX `status_index` (`status`)
-- );

-- -- 创建联系信息表 contact_info
-- CREATE TABLE `contact_info` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `open_id` varchar(255) NOT NULL,
--   `phone_number` varchar(11),
--   `is_check_phone` int(2) NOT NULL,
--   `wechat_number` varchar(255),
--   `is_check_wechat` int(2) NOT NULL,
--   `qq_number` varchar(255),
--   `is_check_qq` int(2) NOT NULL,
--   `email` varchar(255),
--   `is_check_email` int(2) NOT NULL,
--   `type` int(2) NOT NULL,
--   `status` int(2) NOT NULL,
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   INDEX `open_id_index` (`open_id`),
--   INDEX `phone_number_index` (`phone_number`),
--   INDEX `wechat_number_index` (`wechat_number`),
--   INDEX `qq_number_index` (`qq_number`),
--   INDEX `email_index` (`email`),
--   INDEX `type_index` (`type`),
--   INDEX `status_index` (`status`)
-- );

-- 房屋信息表单
-- rent_form_title 14字内的公告描述
-- rent_form_detail 500字内的描述
-- rent_form_month_rent_price 月租价格
-- rent_form_rent_area 租赁面积
-- rent_form_address 租赁地址
-- rent_form_map 地图地址
-- rent_form_map_type 地图类型
-- rent_form_rent_type 租赁类型，整租、合租、转租
-- rent_form_payment_method 支付方式，月付、季付、半年付、年付
-- rent_form_bedroom_count 卧室数量
-- rent_form_bathroom_count 卫生间数量
-- rent_form_livingroom_count 客厅数量
-- rent_form_pictures 上传图片最多9张

-- 联系信息表单



-- -- 创建租房信息表 rent_info
-- CREATE TABLE `rent_info` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `discount_id` int(11),
--   `contact_id` int(11),
--   `open_id` varchar(255) NOT NULL,
--   `title` varchar(14) NOT NULL,
--   `detail` text,
--   `month_rent_price` float NOT NULL,
--   `rent_area` float NOT NULL,
--   `address` varchar(255) NOT NULL,
--   `map` varchar(500),
--   `map_type` int(2),
--   `rent_type` varchar(255) NOT NULL,
--   `payment_method` varchar(255) NOT NULL,
--   `bedroom_count` int(2) NOT NULL,
--   `bathroom_count` int(2) NOT NULL,
--   `livingroom_count` int(2) NOT NULL,
--   `tags` varchar(500),
--   `type` int(2) NOT NULL,
--   `status` int(2) NOT NULL,
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   FOREIGN KEY (`discount_id`) REFERENCES `discount_info` (`id`),
--   FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`id`),
--   INDEX `open_id_index` (`open_id`),
--   INDEX `month_rent_price_index` (`month_rent_price`),
--   INDEX `rent_area_index` (`rent_area`),
--   INDEX `address_index` (`address`),
--   INDEX `map_index` (`map`),
--   INDEX `rent_type_index` (`rent_type`),
--   INDEX `payment_method_index` (`payment_method`),
--   INDEX `bedroom_count_index` (`bedroom_count`),
--   INDEX `bathroom_count_index` (`bathroom_count`),
--   INDEX `livingroom_count_index` (`livingroom_count`),
--   INDEX `tags_index` (`tags`),
--   INDEX `type_index` (`type`),
--   INDEX `status_index` (`status`)
-- );


CREATE TABLE rent_infos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    open_id VARCHAR(255) NOT NULL,
    month_rent_price DECIMAL(10, 2),
    rent_type VARCHAR(255),
    rent_area DECIMAL(10, 2),
    rent_address VARCHAR(255),
    room_structure VARCHAR(255),
    location_longitude DECIMAL(10, 6),
    location_latitude DECIMAL(10, 6),
    contact_information VARCHAR(255),
    cash_discount DECIMAL(10, 2),
    additional_details TEXT,
    tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_rent_type (rent_type),
    INDEX idx_rent_address (rent_address),
    INDEX idx_month_rent_price (month_rent_price),
    INDEX idx_created_at (created_at),
    INDEX idx_open_id (open_id)  -- 添加索引以优化基于 open_id 的查询
);

CREATE TABLE rent_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rent_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rent_id) REFERENCES rent_infos(id) ON DELETE CASCADE
);