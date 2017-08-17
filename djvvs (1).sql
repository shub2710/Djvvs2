-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2017 at 08:56 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `djvvs`
--

-- --------------------------------------------------------

--
-- Table structure for table `class_list`
--

CREATE TABLE `class_list` (
  `class_id` int(11) NOT NULL,
  `class_batch` int(11) DEFAULT NULL,
  `class_section` varchar(255) DEFAULT NULL,
  `timetable_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class_list`
--

INSERT INTO `class_list` (`class_id`, `class_batch`, `class_section`, `timetable_id`) VALUES
(10, 1, 'B', 100),
(11, 1, 'C', 102);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `event_timestamp` datetime DEFAULT NULL,
  `event_description` varchar(255) DEFAULT NULL,
  `event_image` varbinary(8000) DEFAULT NULL,
  `notification_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event_gallery`
--

CREATE TABLE `event_gallery` (
  `event_gallery_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `event_image` varbinary(8000) DEFAULT NULL,
  `event_remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `test_id` int(11) NOT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `exam_name` varchar(255) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `exam_timestamp` datetime DEFAULT NULL,
  `class_batch` int(11) DEFAULT NULL,
  `class_section` varchar(255) DEFAULT NULL,
  `school` int(11) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`test_id`, `exam_id`, `exam_name`, `subject_id`, `created_timestamp`, `exam_timestamp`, `class_batch`, `class_section`, `school`, `created_by`) VALUES
(2000, 4001, 'maths', 12, '2017-03-03 10:01:01', '2017-03-05 10:01:01', 4, '6', 1, '250'),
(8000, 4000, 'round test', 100, '2017-07-13 10:00:00', '2017-07-15 11:00:00', 1, '2', 0, '200');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `notified_day_timestamp` datetime DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `recipient` int(11) DEFAULT NULL,
  `event_exam_id` int(11) DEFAULT NULL,
  `img_docs` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `created_timestamp`, `notified_day_timestamp`, `message`, `recipient`, `event_exam_id`, `img_docs`, `created_by`, `status`) VALUES
(1, '2017-07-05 08:00:00', '2017-07-22 06:00:00', 'School Day', 1, 12, 'img/U1.png', 23, 'active'),
(2, '2017-07-05 11:00:00', '2017-07-12 05:00:00', 'Hackathon', 1, 13, 'ff.jpg', 21, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `student_attendance`
--

CREATE TABLE `student_attendance` (
  `att_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `attendance_month` varchar(255) DEFAULT NULL,
  `day_1` int(11) DEFAULT NULL,
  `day_2` int(11) DEFAULT NULL,
  `day_3` int(11) DEFAULT NULL,
  `day_4` int(11) DEFAULT NULL,
  `day_5` int(11) DEFAULT NULL,
  `day_6` int(11) DEFAULT NULL,
  `day_7` int(11) DEFAULT NULL,
  `day_8` int(11) DEFAULT NULL,
  `day_9` int(11) DEFAULT NULL,
  `day_10` int(11) DEFAULT NULL,
  `day_11` int(11) DEFAULT NULL,
  `day_12` int(11) DEFAULT NULL,
  `day_13` int(11) DEFAULT NULL,
  `day_14` int(11) DEFAULT NULL,
  `day_15` int(11) DEFAULT NULL,
  `day_16` int(11) DEFAULT NULL,
  `day_17` int(11) DEFAULT NULL,
  `day_18` int(11) DEFAULT NULL,
  `day_19` int(11) DEFAULT NULL,
  `day_20` int(11) DEFAULT NULL,
  `day_21` int(11) DEFAULT NULL,
  `day_22` int(11) DEFAULT NULL,
  `day_23` int(11) DEFAULT NULL,
  `day_24` int(11) DEFAULT NULL,
  `day_25` int(11) DEFAULT NULL,
  `day_26` int(11) DEFAULT NULL,
  `day_27` int(11) DEFAULT NULL,
  `day_28` int(11) DEFAULT NULL,
  `day_29` int(11) DEFAULT NULL,
  `day_30` int(11) DEFAULT NULL,
  `day_31` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `student_gender` varchar(255) DEFAULT NULL,
  `student_dob` date DEFAULT NULL,
  `student_address` varchar(255) DEFAULT NULL,
  `student_father_name` varchar(255) DEFAULT NULL,
  `student_mother_name` varchar(255) DEFAULT NULL,
  `student_blood_group` varchar(3) DEFAULT NULL,
  `student_profile_picture` varchar(255) DEFAULT NULL,
  `parent_username` varchar(255) DEFAULT NULL,
  `parent_password` varchar(255) DEFAULT NULL,
  `parent_phone` varchar(255) DEFAULT NULL,
  `parent_phone_alt` varchar(255) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`student_id`, `student_name`, `student_gender`, `student_dob`, `student_address`, `student_father_name`, `student_mother_name`, `student_blood_group`, `student_profile_picture`, `parent_username`, `parent_password`, `parent_phone`, `parent_phone_alt`, `class_id`) VALUES
(1000, 'shubham', 'male', '2017-07-26', 'jalahalli cross ', 'Maruthi', 'prathima', 'B+', 'img/adam.jpg', 'shubham', 'shubhamMaruthi', '86767565656', '76567567565', 10),
(1001, 'shreesha', 'male', '1995-01-21', 'chikkabommasandra', 'R.S Sudhakar', 'R Padmavathi', 'B+', 'ben.png', 'shreesha', 'shreesha', '9876543222', '987654325', 11);

-- --------------------------------------------------------

--
-- Table structure for table `student_result`
--

CREATE TABLE `student_result` (
  `result_id` int(11) NOT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `exam_name` varchar(255) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `marks_scored` int(11) DEFAULT NULL,
  `max_marks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subject_list`
--

CREATE TABLE `subject_list` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subject_teacher`
--

CREATE TABLE `subject_teacher` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `teacher_name` varchar(255) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_details`
--

CREATE TABLE `teacher_details` (
  `teacher_id` int(11) NOT NULL,
  `teacher_name` varchar(255) DEFAULT NULL,
  `teacher_gender` varchar(255) DEFAULT NULL,
  `teacher_dob` date DEFAULT NULL,
  `teacher_address` varchar(255) DEFAULT NULL,
  `teacher_blood_group` varchar(3) DEFAULT NULL,
  `teacher_join_date` date DEFAULT NULL,
  `teacher_document1` varbinary(8000) DEFAULT NULL,
  `teacher_document2` varbinary(8000) DEFAULT NULL,
  `teacher_profile_picture` varbinary(8000) DEFAULT NULL,
  `teacher_username` varchar(255) DEFAULT NULL,
  `teacher_password` varchar(255) DEFAULT NULL,
  `teacher_phone` varchar(255) DEFAULT NULL,
  `teacher_phone_alt` varchar(255) DEFAULT NULL,
  `timetable_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `time_table`
--

CREATE TABLE `time_table` (
  `table_id` int(11) NOT NULL,
  `timetable_id` int(11) DEFAULT NULL,
  `period` varchar(255) DEFAULT NULL,
  `monday` varchar(255) DEFAULT NULL,
  `tuesday` varchar(255) DEFAULT NULL,
  `wednesday` varchar(3) DEFAULT NULL,
  `thursday` varchar(255) DEFAULT NULL,
  `friday` varchar(255) DEFAULT NULL,
  `saturday` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class_list`
--
ALTER TABLE `class_list`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `event_gallery`
--
ALTER TABLE `event_gallery`
  ADD PRIMARY KEY (`event_gallery_id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`test_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD PRIMARY KEY (`att_id`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `student_result`
--
ALTER TABLE `student_result`
  ADD PRIMARY KEY (`result_id`);

--
-- Indexes for table `subject_list`
--
ALTER TABLE `subject_list`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `subject_teacher`
--
ALTER TABLE `subject_teacher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher_details`
--
ALTER TABLE `teacher_details`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `time_table`
--
ALTER TABLE `time_table`
  ADD PRIMARY KEY (`table_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class_list`
--
ALTER TABLE `class_list`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `event_gallery`
--
ALTER TABLE `event_gallery`
  MODIFY `event_gallery_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8001;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `student_attendance`
--
ALTER TABLE `student_attendance`
  MODIFY `att_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `student_details`
--
ALTER TABLE `student_details`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;
--
-- AUTO_INCREMENT for table `student_result`
--
ALTER TABLE `student_result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `subject_list`
--
ALTER TABLE `subject_list`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `subject_teacher`
--
ALTER TABLE `subject_teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `teacher_details`
--
ALTER TABLE `teacher_details`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `time_table`
--
ALTER TABLE `time_table`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
