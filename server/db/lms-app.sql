-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 03:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'active/in-active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `code`, `status`) VALUES
(2, 'SW-2', 'IS331', 1),
(3, 'system analysis', 'IS1234', 1),
(11, ' computer graphics', 'IS1234', 1),
(12, 'internet application', 'IS1235', 2),
(13, ' database one', 'IS1235', 1);

-- --------------------------------------------------------

--
-- Table structure for table `instructor_course`
--

CREATE TABLE `instructor_course` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `instructor_course`
--

INSERT INTO `instructor_course` (`id`, `userId`, `courseId`) VALUES
(1, 11, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'active/in-active',
  `token` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 3 COMMENT 'admin -> 1\r\ninstructor -> 2\r\nstudent -> 3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `token`, `role`) VALUES
(1, 'menna ahmed', 'menna@gamil.com', '$2b$10$IufuLcFewXqjhw1LGF2UOeYnx8i4Pl5jWueRrJx2BZBXEKKB7lc7i', '12345678', 1, '84d36022aca0d7b390a863812db214cd', 3),
(3, 'amina nasser', 'amina@gamil.com', '$2b$10$lcwYlUZfaYNIGJTaR0vdM.TCmwR25SydFTguMuNA77youBZ8VlXfW', '12345679', 1, '658463e14744121a11554867234069b4', 1),
(5, 'fatma ashraf', 'fatma@gamil.com', '$2b$10$NWwWAZAcgwuoHUa0W/G3t.0xB7hIr.2Wb1f0klKBzNFlgBaPfvej2', '12345679', 1, '0ccae8eec55715ed04a41a867643596a', 3),
(6, 'admin admin', 'admin@gamil.com', '$2b$10$AGM3YsYgI0fd4DPGT.B.1uIWoO3jZJWA.H66ggz1WTuj.fJ3U/Pja', '12345679', 1, '43fbf621e4ea5aaf5d1717e1cac5a665', 1),
(8, 'student student', 'student@gamil.com', '$2b$10$h0EiENe4.JfiQuKnEZY8FOlSD9umSoIuwCLoF0gKCOHBHVPhh0YRu', '12345679', 1, 'ef4f81ec92df4665cb667d8beb03cd6d', 3),
(10, 'student student', 'student@gamil.com', '$2b$10$T0IPimDxVDUg0zxD5NpNJ.gjMADCfys5dL8FUQ.SriZNC.T2OXF0i', '12345679', 1, '3b0df2f06b02b6cc8d884b978f430b3c', 3),
(11, 'instructor', 'instructor@gamil.com', '$2b$10$bgdX.N6H0lsUDhMwM3vYROgj3MWpy7wcQVq59whHFRrl0wdo04QuC', '12345679', 1, 'd1a838af6175e69d87ca58f74cbc815b', 2),
(12, 'ahmed mahmoud', 'ahmed@gamil.com', '$2b$10$kpiHsijsCdqpnVX2yxPY3ualsY41Tg7aRSpKNCoQvc42CDebOZUCu', '12345679', 1, '11e6dce9cb1b0be27d4ae3aa600c3231', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `grade` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`id`, `userId`, `courseId`, `grade`) VALUES
(5, 8, 12, 70),
(6, 1, 13, 82),
(7, 1, 2, 0),
(8, 1, 3, 0),
(9, 8, 3, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructor_course`
--
ALTER TABLE `instructor_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_Id` (`courseId`),
  ADD KEY `user_Id` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `instructor_course`
--
ALTER TABLE `instructor_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `instructor_course`
--
ALTER TABLE `instructor_course`
  ADD CONSTRAINT `instructor_course_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instructor_course_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
