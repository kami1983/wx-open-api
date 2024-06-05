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

