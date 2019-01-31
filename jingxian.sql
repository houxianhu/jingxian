/*
 Navicat MySQL Data Transfer

 Source Server         : myhou
 Source Server Type    : MySQL
 Source Server Version : 50528
 Source Host           : localhost:3306
 Source Schema         : jingxian

 Target Server Type    : MySQL
 Target Server Version : 50528
 File Encoding         : 65001

 Date: 31/01/2019 14:21:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for branch_school
-- ----------------------------
DROP TABLE IF EXISTS `branch_school`;
CREATE TABLE `branch_school`  (
  `branch_name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '分校名称',
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `address` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '分校地址',
  `parent_school_id` int(255) NULL DEFAULT NULL,
  `parent_school` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of branch_school
-- ----------------------------
INSERT INTO `branch_school` VALUES ('分校1', 6, '小马路', 64, '南京大学', '2019-01-09 17:04:36');
INSERT INTO `branch_school` VALUES ('广州分校', 7, '越秀区', 64, '南京大学', '2019-01-10 14:12:26');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `work_content` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for school_list
-- ----------------------------
DROP TABLE IF EXISTS `school_list`;
CREATE TABLE `school_list`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `school_name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `school_logo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `school_address` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `provinceid` int(11) NULL DEFAULT NULL,
  `cityid` int(11) NULL DEFAULT NULL,
  `areaid` int(11) NULL DEFAULT NULL,
  `creater_id` int(11) NULL DEFAULT NULL,
  `creater` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of school_list
-- ----------------------------
INSERT INTO `school_list` VALUES (64, '南京大学', 'https://www.alibaba.com', '南京路', NULL, NULL, NULL, 2, '', '2019-01-09 16:42:46');

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `user_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `purview` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '权限',
  `branch_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '分校',
  `position` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '职位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (3, '马化腾', 20, NULL, 7, NULL);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_class_hours` int(255) NULL DEFAULT NULL COMMENT '总课时',
  `one_class_time` int(255) NULL DEFAULT NULL COMMENT '每节课时长',
  `price` int(11) NULL DEFAULT NULL COMMENT '课程费',
  `branch_id` int(11) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES (1, '数学小班', 16, 60, 3200, 6, '');
INSERT INTO `subject` VALUES (2, '英语六人班', 16, 60, 3200, 6, '');
INSERT INTO `subject` VALUES (4, '英语二人班', 15, 60, 4500, 7, '');
INSERT INTO `subject` VALUES (5, '作文班', 10, 60, 2000, 7, '');
INSERT INTO `subject` VALUES (6, '数学精英版', 10, 45, 2000, 7, '');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(10) NULL DEFAULT NULL,
  `project` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `branch_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `purview` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, 'mayun', 23, '数学', 7, '老师', '1,2,3', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `branch_school` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `branch_id` int(11) NULL DEFAULT NULL,
  `school_name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `school_id` int(11) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `entry_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, NULL, '18565246748', '123456', '', NULL, NULL, '', NULL, '2019-01-03 15:40:50', NULL);
INSERT INTO `user` VALUES (2, NULL, '15091895901', '123456', 'schoolmaster', '', NULL, '南京大学', 64, '2019-01-03 15:40:58', NULL);
INSERT INTO `user` VALUES (20, '马化腾', '13600017788', '123456', 'staff', '广州分校', 7, '南京大学', 64, '2019-01-10 15:57:38', '2010-09-03');
INSERT INTO `user` VALUES (23, 'mayun', '13600013333', '123456', 'teacher', '分校1', 7, '南京大学', 64, '2019-01-10 16:18:30', '2010-09-03');

SET FOREIGN_KEY_CHECKS = 1;
