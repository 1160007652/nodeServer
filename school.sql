/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : school

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 19/05/2019 21:19:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, '22');
INSERT INTO `article` VALUES (2, '333');
INSERT INTO `article` VALUES (3, '7654');
INSERT INTO `article` VALUES (4, '7654');
INSERT INTO `article` VALUES (5, '5555');
INSERT INTO `article` VALUES (6, '5555');
INSERT INTO `article` VALUES (7, '');
INSERT INTO `article` VALUES (12, '<script>alert(1);</script>');
COMMIT;

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id` int(255) NOT NULL,
  `name` varchar(10) NOT NULL,
  `math` int(255) NOT NULL,
  `chinese` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of score
-- ----------------------------
BEGIN;
INSERT INTO `score` VALUES (0, '张三', 10, 10);
INSERT INTO `score` VALUES (1, '李四', 99, 99);
INSERT INTO `score` VALUES (2, '王五', 100, 100);
INSERT INTO `score` VALUES (3, '侯六', 88, 88);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `admin` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (0, 'admin', '123456');
INSERT INTO `user` VALUES (1, 'guest', '678910');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
