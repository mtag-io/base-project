CREATE DATABASE IF NOT EXISTS devdb;

USE devdb;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `role` varchar(255) NOT NULL DEFAULT 'ANONYMOUS',
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `refreshHash` varchar(255) DEFAULT NULL,
  'refreshExp' datetime(6),
  PRIMARY KEY (`_id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  KEY `IDX_cace4a159ff9f2512dd4237376` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
LOCK TABLES `user` WRITE;
UNLOCK TABLES;
INSERT INTO USER (_id, id, email, active, verified, password, salt, createdAt, lastLogin, refreshToken, role) values (1, '601310ee007dab0a51fc4bd9', 'robot@admin.com', 1, 0, '$2b$10$bqxeolI.GPrgB/D2.ekn3eHjsJLZss97SaTDDeU3zyE33AGJfZW42', '$2b$10$bqxeolI.GPrgB/D2.ekn3e', str_to_date('2021-01-28 21:30:54', '%Y-%m-%d %T'), str_to_date('2021-01-28 23:30:54', '%Y-%m-%d %T'), '$2b$10$phrT6DrX92HDNykTVnsXIO8Ngtdk1cMBILHny7HO43ivmkP1bNVFS', 'ADMIN');