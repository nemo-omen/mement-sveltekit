CREATE DATABASE IF NOT EXISTS 'mement';

USE 'mement';

CREATE USER IF NOT EXISTS 'mement'@'localhost' IDENTIFIED BY 'mement123!';

GRANT ALL ON `mement`.* TO 'mement'@'localhost' IDENTIFIED BY 'mement123!';

CREATE TABLE IF NOT EXISTS 'users'