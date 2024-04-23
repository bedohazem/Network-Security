-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2024 at 07:35 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
CREATE DATABASE IF NOT EXISTS `lms-app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lms-app`;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `code`) VALUES
(2, 'SW-2', 'IS331'),
(3, 'system analysis', 'IS1234'),
(11, ' computer graphics', 'IS1234'),
(12, 'internet application', 'IS1235'),
(14, 'Artificial Intelligence ', 'AI 101');

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
(6, 18, 2),
(7, 20, 3);

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
  `token` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 3 COMMENT '-admin\r\n-instructor\r\n-student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `token`, `role`) VALUES
(18, 'test', 'test@gmail.com', '$2b$10$KE7HM7iNYckm1hRO67umoOy8zZUu4HoF9xZUNE8eaC/zNZKB5i1RO', '12345678', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJzdGF0dXMiOjEsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzEzODkwNDM5fQ.JlosrtTnc8xBPZixoZgwPSlWnh6m4r1B3IGAOH8CLp4', 2),
(19, 'admitest', 'admintest@gmail.com', '$2b$10$rdXCe3mtwv9p5/bYF22Z0.fo368hE6M9/dQ4ndh2DWwcWvMtZe2P6', '12345678', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaXRlc3QiLCJlbWFpbCI6ImFkbWludGVzdEBnbWFpbC5jb20iLCJzdGF0dXMiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMzg5MDQ4Mn0.C88Y1AfT_4vqnP_eg9V5AW9t_WlDb7aB4yIjjMWgaTA', 1),
(20, 'test2', 'test2@gmail.com', '$2b$10$ZY5KYp4rYw8jRW/tOiVNaOD1BT67w9/oxwNBC9aHy.w4SJW.XSaIq', '12345678', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHNldDIiLCJlbWFpbCI6InRzZXQyQGdtYWlsLmNvbSIsInN0YXR1cyI6MSwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE3MTM4OTA1NDh9.Y8YcIk0RjF3gLkkyd5-SarLl22oig_1iM4Cj5M1o7kU', 2),
(21, 'studentTest', 'studentTest@studentTest.com', '$2b$10$NbhYOB/TnrY2fn5ZDyfRLuroPPXLMD9UGprJ2g0H0YDgJuN/li6E.', '12345678', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3R1ZGVudFRlc3QiLCJlbWFpbCI6InN0dWRlbnRUZXN0QHN0dWRlbnRUZXN0LmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzEzODkyNDcxfQ.1-dhfVahwm-krSYzKFtfAoJqTO9daQo4tT0lk1Antoo', 3);

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
(11, 21, 2, 55),
(12, 21, 12, 0),
(13, 21, 3, 3);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `instructor_course`
--
ALTER TABLE `instructor_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
