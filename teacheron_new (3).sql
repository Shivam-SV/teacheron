-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 22, 2024 at 04:56 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teacheron_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('__otp72bmKoP0SpzmovM3oLda9DK022uQdUlgjBK2cela', 'i:6;', 1724514496),
('__otp72bmKoP0SpzmovM3oLda9DK022uQdUlgjBK2celafor-phone:9752114555', 'i:909376;', 1724514899);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci,
  `teacher_id` bigint UNSIGNED NOT NULL,
  `student_id` bigint UNSIGNED NOT NULL,
  `post_purchases_id` bigint UNSIGNED DEFAULT NULL,
  `status` enum('initial','active','expired','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initial',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `name`, `teacher_id`, `student_id`, `post_purchases_id`, `status`, `created_at`, `updated_at`) VALUES
(4, 'Need a python developer', 3, 1, NULL, 'initial', '2024-09-28 07:07:15', '2024-09-28 07:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `currency`, `code`, `symbol`, `created_at`, `updated_at`) VALUES
(1, 'Albania', 'Leke', 'ALL', 'Lek', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(2, 'America', 'Dollars', 'USD', '$', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(3, 'Afghanistan', 'Afghanis', 'AF', '؋', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(4, 'Argentina', 'Pesos', 'ARS', '$', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(5, 'Aruba', 'Guilders', 'AWG', 'ƒ', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(6, 'Australia', 'Dollars', 'AUD', '$', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(7, 'Azerbaijan', 'New Manats', 'AZ', 'ман', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(8, 'Bahamas', 'Dollars', 'BSD', '$', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(9, 'Barbados', 'Dollars', 'BBD', '$', '2024-08-07 12:05:02', '2024-08-07 12:05:02'),
(10, 'Belarus', 'Rubles', 'BYR', 'p.', '2024-08-07 12:05:03', '2024-08-07 12:05:03'),
(11, 'Belgium', 'Euro', 'EUR', '€', '2024-08-07 12:05:03', '2024-08-07 12:05:03'),
(12, 'Beliz', 'Dollars', 'BZD', 'BZ$', '2024-08-07 12:05:03', '2024-08-07 12:05:03'),
(13, 'Bermuda', 'Dollars', 'BMD', '$', '2024-08-07 12:05:03', '2024-08-07 12:05:03'),
(14, 'Bolivia', 'Bolivianos', 'BOB', '$b', '2024-08-07 12:05:03', '2024-08-07 12:05:03'),
(15, 'Bosnia and Herzegovina', 'Convertible Marka', 'BAM', 'KM', '2024-08-07 12:05:04', '2024-08-07 12:05:04'),
(16, 'Botswana', 'Pula\'s', 'BWP', 'P', '2024-08-07 12:05:04', '2024-08-07 12:05:04'),
(17, 'Bulgaria', 'Leva', 'BG', 'лв', '2024-08-07 12:05:04', '2024-08-07 12:05:04'),
(18, 'Brazil', 'Reais', 'BRL', 'R$', '2024-08-07 12:05:04', '2024-08-07 12:05:04'),
(19, 'Britain (United Kingdom)', 'Pounds', 'GBP', '£', '2024-08-07 12:05:04', '2024-08-07 12:05:04'),
(20, 'Brunei Darussalam', 'Dollars', 'BND', '$', '2024-08-07 12:05:04', '2024-08-07 12:05:04'),
(21, 'Cambodia', 'Riels', 'KHR', '៛', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(22, 'Canada', 'Dollars', 'CAD', '$', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(23, 'Cayman Islands', 'Dollars', 'KYD', '$', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(24, 'Chile', 'Pesos', 'CLP', '$', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(25, 'China', 'Yuan Renminbi', 'CNY', '¥', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(26, 'Colombia', 'Pesos', 'COP', '$', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(27, 'Costa Rica', 'Colón', 'CRC', '₡', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(28, 'Croatia', 'Kuna', 'HRK', 'kn', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(29, 'Cuba', 'Pesos', 'CUP', '₱', '2024-08-07 12:05:05', '2024-08-07 12:05:05'),
(30, 'Cyprus', 'Euro', 'EUR', '€', '2024-08-07 12:05:06', '2024-08-07 12:05:06'),
(31, 'Czech Republic', 'Koruny', 'CZK', 'Kč', '2024-08-07 12:05:06', '2024-08-07 12:05:06'),
(32, 'Denmark', 'Kroner', 'DKK', 'kr', '2024-08-07 12:05:06', '2024-08-07 12:05:06'),
(33, 'Dominican Republic', 'Pesos', 'DOP ', 'RD$', '2024-08-07 12:05:06', '2024-08-07 12:05:06'),
(34, 'East Caribbean', 'Dollars', 'XCD', '$', '2024-08-07 12:05:06', '2024-08-07 12:05:06'),
(35, 'Egypt', 'Pounds', 'EGP', '£', '2024-08-07 12:05:07', '2024-08-07 12:05:07'),
(36, 'El Salvador', 'Colones', 'SVC', '$', '2024-08-07 12:05:07', '2024-08-07 12:05:07'),
(37, 'England (United Kingdom)', 'Pounds', 'GBP', '£', '2024-08-07 12:05:07', '2024-08-07 12:05:07'),
(38, 'Euro', 'Euro', 'EUR', '€', '2024-08-07 12:05:07', '2024-08-07 12:05:07'),
(39, 'Falkland Islands', 'Pounds', 'FKP', '£', '2024-08-07 12:05:07', '2024-08-07 12:05:07'),
(40, 'Fiji', 'Dollars', 'FJD', '$', '2024-08-07 12:05:07', '2024-08-07 12:05:07'),
(41, 'France', 'Euro', 'EUR', '€', '2024-08-07 12:05:08', '2024-08-07 12:05:08'),
(42, 'Ghana', 'Cedis', 'GHC', '¢', '2024-08-07 12:05:08', '2024-08-07 12:05:08'),
(43, 'Gibraltar', 'Pounds', 'GIP', '£', '2024-08-07 12:05:08', '2024-08-07 12:05:08'),
(44, 'Greece', 'Euro', 'EUR', '€', '2024-08-07 12:05:08', '2024-08-07 12:05:08'),
(45, 'Guatemala', 'Quetzales', 'GTQ', 'Q', '2024-08-07 12:05:08', '2024-08-07 12:05:08'),
(46, 'Guernsey', 'Pounds', 'GGP', '£', '2024-08-07 12:05:08', '2024-08-07 12:05:08'),
(47, 'Guyana', 'Dollars', 'GYD', '$', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(48, 'Holland (Netherlands)', 'Euro', 'EUR', '€', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(49, 'Honduras', 'Lempiras', 'HNL', 'L', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(50, 'Hong Kong', 'Dollars', 'HKD', '$', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(51, 'Hungary', 'Forint', 'HUF', 'Ft', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(52, 'Iceland', 'Kronur', 'ISK', 'kr', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(53, 'India', 'Rupees', 'INR', '₹', '2024-08-07 12:05:09', '2024-08-07 12:05:09'),
(54, 'Indonesia', 'Rupiahs', 'IDR', 'Rp', '2024-08-07 12:05:10', '2024-08-07 12:05:10'),
(55, 'Iran', 'Rials', 'IRR', '﷼', '2024-08-07 12:05:10', '2024-08-07 12:05:10'),
(56, 'Ireland', 'Euro', 'EUR', '€', '2024-08-07 12:05:10', '2024-08-07 12:05:10'),
(57, 'Isle of Man', 'Pounds', 'IMP', '£', '2024-08-07 12:05:10', '2024-08-07 12:05:10'),
(58, 'Israel', 'New Shekels', 'ILS', '₪', '2024-08-07 12:05:10', '2024-08-07 12:05:10'),
(59, 'Italy', 'Euro', 'EUR', '€', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(60, 'Jamaica', 'Dollars', 'JMD', 'J$', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(61, 'Japan', 'Yen', 'JPY', '¥', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(62, 'Jersey', 'Pounds', 'JEP', '£', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(63, 'Kazakhstan', 'Tenge', 'KZT', 'лв', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(64, 'Korea (North)', 'Won', 'KPW', '₩', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(65, 'Korea (South)', 'Won', 'KRW', '₩', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(66, 'Kyrgyzstan', 'Soms', 'KGS', 'лв', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(67, 'Laos', 'Kips', 'LAK', '₭', '2024-08-07 12:05:11', '2024-08-07 12:05:11'),
(68, 'Latvia', 'Lati', 'LVL', 'Ls', '2024-08-07 12:05:12', '2024-08-07 12:05:12'),
(69, 'Lebanon', 'Pounds', 'LBP', '£', '2024-08-07 12:05:12', '2024-08-07 12:05:12'),
(70, 'Liberia', 'Dollars', 'LRD', '$', '2024-08-07 12:05:12', '2024-08-07 12:05:12'),
(71, 'Liechtenstein', 'Switzerland Francs', 'CHF', 'CHF', '2024-08-07 12:05:12', '2024-08-07 12:05:12'),
(72, 'Lithuania', 'Litai', 'LTL', 'Lt', '2024-08-07 12:05:12', '2024-08-07 12:05:12'),
(73, 'Luxembourg', 'Euro', 'EUR', '€', '2024-08-07 12:05:12', '2024-08-07 12:05:12'),
(74, 'Macedonia', 'Denars', 'MKD', 'ден', '2024-08-07 12:05:13', '2024-08-07 12:05:13'),
(75, 'Malaysia', 'Ringgits', 'MYR', 'RM', '2024-08-07 12:05:13', '2024-08-07 12:05:13'),
(76, 'Malta', 'Euro', 'EUR', '€', '2024-08-07 12:05:13', '2024-08-07 12:05:13'),
(77, 'Mauritius', 'Rupees', 'MUR', '₨', '2024-08-07 12:05:13', '2024-08-07 12:05:13'),
(78, 'Mexico', 'Pesos', 'MX', '$', '2024-08-07 12:05:13', '2024-08-07 12:05:13'),
(79, 'Mongolia', 'Tugriks', 'MNT', '₮', '2024-08-07 12:05:13', '2024-08-07 12:05:13'),
(80, 'Mozambique', 'Meticais', 'MZ', 'MT', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(81, 'Namibia', 'Dollars', 'NAD', '$', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(82, 'Nepal', 'Rupees', 'NPR', '₨', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(83, 'Netherlands Antilles', 'Guilders', 'ANG', 'ƒ', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(84, 'Netherlands', 'Euro', 'EUR', '€', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(85, 'New Zealand', 'Dollars', 'NZD', '$', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(86, 'Nicaragua', 'Cordobas', 'NIO', 'C$', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(87, 'Nigeria', 'Nairas', 'NG', '₦', '2024-08-07 12:05:14', '2024-08-07 12:05:14'),
(88, 'North Korea', 'Won', 'KPW', '₩', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(89, 'Norway', 'Krone', 'NOK', 'kr', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(90, 'Oman', 'Rials', 'OMR', '﷼', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(91, 'Pakistan', 'Rupees', 'PKR', '₨', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(92, 'Panama', 'Balboa', 'PAB', 'B/.', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(93, 'Paraguay', 'Guarani', 'PYG', 'Gs', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(94, 'Peru', 'Nuevos Soles', 'PE', 'S/.', '2024-08-07 12:05:15', '2024-08-07 12:05:15'),
(95, 'Philippines', 'Pesos', 'PHP', 'Php', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(96, 'Poland', 'Zlotych', 'PL', 'zł', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(97, 'Qatar', 'Rials', 'QAR', '﷼', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(98, 'Romania', 'New Lei', 'RO', 'lei', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(99, 'Russia', 'Rubles', 'RUB', 'руб', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(100, 'Saint Helena', 'Pounds', 'SHP', '£', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(101, 'Saudi Arabia', 'Riyals', 'SAR', '﷼', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(102, 'Serbia', 'Dinars', 'RSD', 'Дин.', '2024-08-07 12:05:16', '2024-08-07 12:05:16'),
(103, 'Seychelles', 'Rupees', 'SCR', '₨', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(104, 'Singapore', 'Dollars', 'SGD', '$', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(105, 'Slovenia', 'Euro', 'EUR', '€', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(106, 'Solomon Islands', 'Dollars', 'SBD', '$', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(107, 'Somalia', 'Shillings', 'SOS', 'S', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(108, 'South Africa', 'Rand', 'ZAR', 'R', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(109, 'South Korea', 'Won', 'KRW', '₩', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(110, 'Spain', 'Euro', 'EUR', '€', '2024-08-07 12:05:17', '2024-08-07 12:05:17'),
(111, 'Sri Lanka', 'Rupees', 'LKR', '₨', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(112, 'Sweden', 'Kronor', 'SEK', 'kr', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(113, 'Switzerland', 'Francs', 'CHF', 'CHF', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(114, 'Suriname', 'Dollars', 'SRD', '$', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(115, 'Syria', 'Pounds', 'SYP', '£', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(116, 'Taiwan', 'New Dollars', 'TWD', 'NT$', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(117, 'Thailand', 'Baht', 'THB', '฿', '2024-08-07 12:05:18', '2024-08-07 12:05:18'),
(118, 'Trinidad and Tobago', 'Dollars', 'TTD', 'TT$', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(119, 'Turkey', 'Lira', 'TRY', 'TL', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(120, 'Turkey', 'Liras', 'TRL', '£', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(121, 'Tuvalu', 'Dollars', 'TVD', '$', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(122, 'Ukraine', 'Hryvnia', 'UAH', '₴', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(123, 'United Kingdom', 'Pounds', 'GBP', '£', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(124, 'United States of America', 'Dollars', 'USD', '$', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(125, 'Uruguay', 'Pesos', 'UYU', '$U', '2024-08-07 12:05:19', '2024-08-07 12:05:19'),
(126, 'Uzbekistan', 'Sums', 'UZS', 'лв', '2024-08-07 12:05:20', '2024-08-07 12:05:20'),
(127, 'Vatican City', 'Euro', 'EUR', '€', '2024-08-07 12:05:20', '2024-08-07 12:05:20'),
(128, 'Venezuela', 'Bolivares Fuertes', 'VEF', 'Bs', '2024-08-07 12:05:20', '2024-08-07 12:05:20'),
(129, 'Vietnam', 'Dong', 'VND', '₫', '2024-08-07 12:05:20', '2024-08-07 12:05:20'),
(130, 'Yemen', 'Rials', 'YER', '﷼', '2024-08-07 12:05:20', '2024-08-07 12:05:20'),
(131, 'Zimbabwe', 'Zimbabwe Dollars', 'ZWD', 'Z$', '2024-08-07 12:05:20', '2024-08-07 12:05:20');

-- --------------------------------------------------------

--
-- Table structure for table `document_types`
--

CREATE TABLE `document_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_required` tinyint(1) NOT NULL DEFAULT '0',
  `needs_verification` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `document_types`
--

INSERT INTO `document_types` (`id`, `name`, `is_required`, `needs_verification`, `created_at`, `updated_at`) VALUES
(1, 'Adhaar card', 1, 1, '2024-10-22 09:53:22', '2024-10-22 09:53:22'),
(2, 'Pan card', 0, 1, '2024-10-22 09:53:22', '2024-10-22 09:53:22'),
(3, 'Passport', 0, 0, '2024-10-22 09:53:22', '2024-10-22 09:53:22'),
(4, 'Driving license', 0, 1, '2024-10-22 09:53:22', '2024-10-22 09:53:22'),
(5, 'Voter ID card', 0, 1, '2024-10-22 09:53:22', '2024-10-22 09:53:22'),
(6, 'Matriculation certificate', 1, 1, '2024-10-22 09:53:23', '2024-10-22 09:53:23'),
(7, 'Highest degree certificate', 1, 1, '2024-10-22 09:53:23', '2024-10-22 09:53:23');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"36ec6fad-699f-4702-8c82-f0217f9f7a8c\",\"displayName\":\"App\\\\Events\\\\MessageEvent\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\MessageEvent\\\":1:{s:10:\\\"\\u0000*\\u0000message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Message\\\";s:2:\\\"id\\\";i:5;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1727532465, 1727532465),
(2, 'default', '{\"uuid\":\"ae8dcaf4-1229-4d08-a25b-c5cd646d09f1\",\"displayName\":\"App\\\\Events\\\\MessageEvent\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\MessageEvent\\\":1:{s:10:\\\"\\u0000*\\u0000message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Message\\\";s:2:\\\"id\\\";i:6;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1727532497, 1727532497),
(3, 'default', '{\"uuid\":\"df297cd5-64b7-4111-8189-38e1f7aaaaf8\",\"displayName\":\"App\\\\Events\\\\MessageEvent\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\MessageEvent\\\":1:{s:10:\\\"\\u0000*\\u0000message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Message\\\";s:2:\\\"id\\\";i:7;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1727535928, 1727535928),
(4, 'default', '{\"uuid\":\"dd4cf1a9-6b95-49f4-9098-338cec222951\",\"displayName\":\"App\\\\Events\\\\MessageEvent\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\MessageEvent\\\":1:{s:10:\\\"\\u0000*\\u0000message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Message\\\";s:2:\\\"id\\\";i:8;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1727536455, 1727536455),
(5, 'default', '{\"uuid\":\"cefa52d2-9164-480c-9af2-b289d626cd5a\",\"displayName\":\"App\\\\Events\\\\MessageEvent\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:23:\\\"App\\\\Events\\\\MessageEvent\\\":1:{s:10:\\\"\\u0000*\\u0000message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:18:\\\"App\\\\Models\\\\Message\\\";s:2:\\\"id\\\";i:9;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1727536475, 1727536475);

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint UNSIGNED NOT NULL,
  `name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iso_code` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `iso_code`, `created_at`, `updated_at`) VALUES
(1, 'English', 'en', '2024-08-07 12:05:20', '2024-08-07 12:05:20'),
(2, 'Afar', 'aa', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(3, 'Abkhazian', 'ab', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(4, 'Afrikaans', 'af', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(5, 'Amharic', 'am', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(6, 'Arabic', 'ar', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(7, 'Assamese', 'as', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(8, 'Aymara', 'ay', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(9, 'Azerbaijani', 'az', '2024-08-07 12:05:21', '2024-08-07 12:05:21'),
(10, 'Bashkir', 'ba', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(11, 'Belarusian', 'be', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(12, 'Bulgarian', 'bg', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(13, 'Bihari', 'bh', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(14, 'Bislama', 'bi', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(15, 'Bengali/Bangla', 'bn', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(16, 'Tibetan', 'bo', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(17, 'Breton', 'br', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(18, 'Catalan', 'ca', '2024-08-07 12:05:22', '2024-08-07 12:05:22'),
(19, 'Corsican', 'co', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(20, 'Czech', 'cs', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(21, 'Welsh', 'cy', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(22, 'Danish', 'da', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(23, 'German', 'de', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(24, 'Bhutani', 'dz', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(25, 'Greek', 'el', '2024-08-07 12:05:23', '2024-08-07 12:05:23'),
(26, 'Esperanto', 'eo', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(27, 'Spanish', 'es', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(28, 'Estonian', 'et', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(29, 'Basque', 'eu', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(30, 'Persian', 'fa', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(31, 'Finnish', 'fi', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(32, 'Fiji', 'fj', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(33, 'Faeroese', 'fo', '2024-08-07 12:05:24', '2024-08-07 12:05:24'),
(34, 'French', 'fr', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(35, 'Frisian', 'fy', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(36, 'Irish', 'ga', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(37, 'Scots/Gaelic', 'gd', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(38, 'Galician', 'gl', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(39, 'Guarani', 'gn', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(40, 'Gujarati', 'gu', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(41, 'Hausa', 'ha', '2024-08-07 12:05:25', '2024-08-07 12:05:25'),
(42, 'Hindi', 'hi', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(43, 'Croatian', 'hr', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(44, 'Hungarian', 'hu', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(45, 'Armenian', 'hy', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(46, 'Interlingua', 'ia', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(47, 'Interlingue', 'ie', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(48, 'Inupiak', 'ik', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(49, 'Indonesian', 'in', '2024-08-07 12:05:26', '2024-08-07 12:05:26'),
(50, 'Icelandic', 'is', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(51, 'Italian', 'it', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(52, 'Hebrew', 'iw', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(53, 'Japanese', 'ja', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(54, 'Yiddish', 'ji', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(55, 'Javanese', 'jw', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(56, 'Georgian', 'ka', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(57, 'Kazakh', 'kk', '2024-08-07 12:05:27', '2024-08-07 12:05:27'),
(58, 'Greenlandic', 'kl', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(59, 'Cambodian', 'km', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(60, 'Kannada', 'kn', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(61, 'Korean', 'ko', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(62, 'Kashmiri', 'ks', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(63, 'Kurdish', 'ku', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(64, 'Kirghiz', 'ky', '2024-08-07 12:05:28', '2024-08-07 12:05:28'),
(65, 'Latin', 'la', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(66, 'Lingala', 'ln', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(67, 'Laothian', 'lo', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(68, 'Lithuanian', 'lt', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(69, 'Latvian/Lettish', 'lv', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(70, 'Malagasy', 'mg', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(71, 'Maori', 'mi', '2024-08-07 12:05:29', '2024-08-07 12:05:29'),
(72, 'Macedonian', 'mk', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(73, 'Malayalam', 'ml', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(74, 'Mongolian', 'mn', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(75, 'Moldavian', 'mo', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(76, 'Marathi', 'mr', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(77, 'Malay', 'ms', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(78, 'Maltese', 'mt', '2024-08-07 12:05:30', '2024-08-07 12:05:30'),
(79, 'Burmese', 'my', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(80, 'Nauru', 'na', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(81, 'Nepali', 'ne', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(82, 'Dutch', 'nl', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(83, 'Norwegian', 'no', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(84, 'Occitan', 'oc', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(85, '(Afan)/Oromoor/Oriya', 'om', '2024-08-07 12:05:31', '2024-08-07 12:05:31'),
(86, 'Punjabi', 'pa', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(87, 'Polish', 'pl', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(88, 'Pashto/Pushto', 'ps', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(89, 'Portuguese', 'pt', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(90, 'Quechua', 'qu', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(91, 'Rhaeto-Romance', 'rm', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(92, 'Kirundi', 'rn', '2024-08-07 12:05:32', '2024-08-07 12:05:32'),
(93, 'Romanian', 'ro', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(94, 'Russian', 'ru', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(95, 'Kinyarwanda', 'rw', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(96, 'Sanskrit', 'sa', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(97, 'Sindhi', 'sd', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(98, 'Sangro', 'sg', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(99, 'Serbo-Croatian', 'sh', '2024-08-07 12:05:33', '2024-08-07 12:05:33'),
(100, 'Singhalese', 'si', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(101, 'Slovak', 'sk', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(102, 'Slovenian', 'sl', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(103, 'Samoan', 'sm', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(104, 'Shona', 'sn', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(105, 'Somali', 'so', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(106, 'Albanian', 'sq', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(107, 'Serbian', 'sr', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(108, 'Siswati', 'ss', '2024-08-07 12:05:34', '2024-08-07 12:05:34'),
(109, 'Sesotho', 'st', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(110, 'Sundanese', 'su', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(111, 'Swedish', 'sv', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(112, 'Swahili', 'sw', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(113, 'Tamil', 'ta', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(114, 'Telugu', 'te', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(115, 'Tajik', 'tg', '2024-08-07 12:05:35', '2024-08-07 12:05:35'),
(116, 'Thai', 'th', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(117, 'Tigrinya', 'ti', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(118, 'Turkmen', 'tk', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(119, 'Tagalog', 'tl', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(120, 'Setswana', 'tn', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(121, 'Tonga', 'to', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(122, 'Turkish', 'tr', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(123, 'Tsonga', 'ts', '2024-08-07 12:05:36', '2024-08-07 12:05:36'),
(124, 'Tatar', 'tt', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(125, 'Twi', 'tw', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(126, 'Ukrainian', 'uk', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(127, 'Urdu', 'ur', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(128, 'Uzbek', 'uz', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(129, 'Vietnamese', 'vi', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(130, 'Volapuk', 'vo', '2024-08-07 12:05:37', '2024-08-07 12:05:37'),
(131, 'Wolof', 'wo', '2024-08-07 12:05:38', '2024-08-07 12:05:38'),
(132, 'Xhosa', 'xh', '2024-08-07 12:05:38', '2024-08-07 12:05:38'),
(133, 'Yoruba', 'yo', '2024-08-07 12:05:38', '2024-08-07 12:05:38'),
(134, 'Chinese', 'zh', '2024-08-07 12:05:38', '2024-08-07 12:05:38'),
(135, 'Zulu', 'zu', '2024-08-07 12:05:38', '2024-08-07 12:05:38');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `name`, `slug`, `group_name`, `tags`, `created_by_user_id`, `created_at`, `updated_at`) VALUES
(1, 'Senior Studies', 'senior-studies', 'Standards', '[\"Beginner\", \"Intermediate\"]', 2, '2024-08-16 11:57:00', '2024-08-16 12:40:16');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint UNSIGNED NOT NULL,
  `model_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  `model_column` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` enum('storage','web') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'storage',
  `original_file_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_path` text COLLATE utf8mb4_unicode_ci,
  `file_extension` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_mime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `model_name`, `model_id`, `model_column`, `file_name`, `source`, `original_file_name`, `file_path`, `file_extension`, `file_mime`, `created_at`, `updated_at`) VALUES
(1, 'users', 4, 'profile', 'savage_svProfile', 'web', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLP7F2ZC7QQSCVZOVIpPEgGL6PiWRdvToQbR2qKviLP4wmLgkC7Qg=s96-c', NULL, NULL, '2024-09-03 11:01:50', '2024-09-03 11:01:50');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint UNSIGNED NOT NULL,
  `conversation_id` bigint UNSIGNED NOT NULL,
  `sender_id` bigint UNSIGNED NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `message`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 4, 3, 'hello', '2024-09-28 08:07:26', '2024-09-28 08:07:26', NULL),
(2, 4, 3, 'How are you', '2024-09-28 08:19:02', '2024-09-28 08:19:02', NULL),
(3, 4, 1, 'Hey', '2024-09-28 08:27:11', '2024-09-28 08:27:11', NULL),
(4, 4, 1, 'I\'m fine how about you', '2024-09-28 08:29:04', '2024-09-28 08:29:04', NULL),
(5, 4, 3, 'I\'m fine, just checking about the post you posted', '2024-09-28 08:37:44', '2024-09-28 08:37:44', NULL),
(6, 4, 1, 'Got it', '2024-09-28 08:38:16', '2024-09-28 08:38:16', NULL),
(7, 4, 1, 'Okay', '2024-09-28 09:35:27', '2024-09-28 09:35:27', NULL),
(8, 4, 3, 'hello', '2024-09-28 09:44:14', '2024-09-28 09:44:14', NULL),
(9, 4, 1, 'hey', '2024-09-28 09:44:35', '2024-09-28 09:44:35', NULL),
(10, 4, 1, 'Anything', '2024-09-28 09:56:37', '2024-09-28 09:56:37', NULL),
(11, 4, 3, 'so whats up', '2024-09-28 09:57:54', '2024-09-28 09:57:54', NULL),
(12, 4, 1, 'Can you tell me a thing', '2024-09-28 10:04:05', '2024-09-28 10:04:05', NULL),
(13, 4, 3, 'hello', '2024-10-16 10:30:01', '2024-10-16 10:30:01', NULL),
(14, 4, 1, 'Hello', '2024-10-16 10:30:28', '2024-10-16 10:30:28', NULL),
(15, 4, 1, 'Hello', '2024-10-16 10:44:39', '2024-10-16 10:44:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_countries_table', 1),
(2, '0001_01_01_000000_create_users_table', 1),
(3, '0001_01_01_000001_create_cache_table', 1),
(4, '0001_01_01_000002_create_jobs_table', 1),
(5, '2024_06_22_070733_create_roles_table', 1),
(6, '2024_06_22_070758_create_permissions_table', 1),
(7, '2024_06_22_070830_create_role_have_permissions_table', 1),
(8, '2024_06_22_071318_create_user_have_roles_table', 1),
(9, '2024_06_22_071342_create_user_login_logs_table', 1),
(10, '2024_06_22_085640_create_subjects_table', 1),
(11, '2024_06_22_085723_create_levels_table', 1),
(14, '2024_06_22_085926_create_user_qualifications_table', 1),
(15, '2024_06_22_090026_create_user_tutoring_details_table', 1),
(16, '2024_06_26_172402_create_media_table', 1),
(17, '2024_08_02_164448_create_user_contacts_table', 1),
(18, '2024_08_02_164932_create_post_purposes_table', 1),
(19, '2024_08_03_091544_create_posts_table', 1),
(20, '2024_08_04_074713_create_languages_table', 1),
(21, '2024_08_07_151833_create_post_have_subjects_table', 1),
(22, '2024_08_07_151853_create_post_have_language_preferences_table', 1),
(23, '2024_08_07_170526_create_user_knows_languages_table', 1),
(24, '2024_08_24_155523_add_verified_at_column_in_user_contacts_table', 2),
(26, '2024_06_22_085759_create_user_have_subjects_table', 3),
(28, '2024_09_01_104034_alter_post_table_add_price_column', 4),
(29, '2024_06_22_085842_create_user_have_experiences_table', 5),
(38, '2024_09_14_101202_create_payment_methods_table', 6),
(39, '2024_09_14_101955_create_payments_table', 6),
(40, '2024_09_14_105713_create_post_saves_table', 6),
(41, '2024_09_14_110015_create_post_purchases_table', 6),
(42, '2024_09_14_110630_create_post_activities_table', 6),
(43, '2024_09_14_111650_create_post_impressions_table', 6),
(44, '2024_09_17_153118_create_wallets_table', 6),
(45, '2024_09_24_162054_create_conversations_table', 7),
(46, '2024_09_24_164715_create_messages_table', 7),
(55, '2024_10_20_094032_create_wishlist_users_table', 8),
(56, '2024_10_20_094040_create_user_prices_table', 8),
(57, '2024_10_20_094112_create_user_purchases_table', 8),
(58, '2024_10_20_094120_create_user_impressions_table', 8),
(59, '2024_10_21_151237_create_document_types_table', 9),
(60, '2024_10_22_151212_create_user_documents_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `payment_method_id` bigint UNSIGNED DEFAULT NULL,
  `transaction_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '3 digits currency codes',
  `status` enum('initiated','pending','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `payment_method_id`, `transaction_id`, `amount`, `currency_code`, `status`, `status_updated_at`, `description`, `created_at`, `updated_at`) VALUES
(4, 3, 4, NULL, 5.00, 'USD', 'completed', '2024-09-17 12:47:44', 'Payment added by the admin', '2024-09-17 12:47:44', '2024-09-17 12:47:44');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_discoverable` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`, `slug`, `is_discoverable`, `created_at`, `updated_at`) VALUES
(1, 'RazorPay', 'razorpay', 1, '2024-09-17 11:24:35', '2024-09-17 11:24:35'),
(2, 'Stripe', 'stripe', 1, '2024-09-17 11:24:35', '2024-09-17 11:24:35'),
(3, 'PayPal', 'paypal', 1, '2024-09-17 11:24:35', '2024-09-17 11:24:35'),
(4, 'Admin', 'admin', 0, '2024-09-17 11:24:35', '2024-09-17 11:24:35');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Details about the permission made for',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `address` text COLLATE utf8mb4_unicode_ci,
  `country_id` bigint UNSIGNED DEFAULT NULL,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `user_phone_id` bigint UNSIGNED DEFAULT NULL,
  `purpose_id` bigint UNSIGNED DEFAULT NULL,
  `level_id` bigint UNSIGNED DEFAULT NULL,
  `gender_preference` enum('male','female','any') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'any',
  `status` enum('open','on-hold','fulfilled','cancel','in-progress') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `min_budget` decimal(7,2) NOT NULL DEFAULT '0.00',
  `max_budget` decimal(7,2) NOT NULL DEFAULT '0.00',
  `price` decimal(8,2) DEFAULT NULL,
  `budget_currency_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `address`, `country_id`, `created_by_user_id`, `user_phone_id`, `purpose_id`, `level_id`, `gender_preference`, `status`, `min_budget`, `max_budget`, `price`, `budget_currency_code`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'Need a python developer', 'I need a python developer for my project work', '#25/8,bazar boriyan, I/s lahori gate', 53, 1, 1, 2, 1, 'any', 'fulfilled', 500.00, 1500.00, 145.00, 'INR', '2024-08-18 12:05:37', '2024-10-16 09:47:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_activities`
--

CREATE TABLE `post_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `column_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `previous_value` text COLLATE utf8mb4_unicode_ci,
  `updated_value` text COLLATE utf8mb4_unicode_ci,
  `reason` text COLLATE utf8mb4_unicode_ci COMMENT 'Reason or description to update the field',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_activities`
--

INSERT INTO `post_activities` (`id`, `post_id`, `user_id`, `column_name`, `previous_value`, `updated_value`, `reason`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 'status', 'fulfilled', 'cancel', NULL, '2024-10-16 08:14:02', '2024-10-16 08:14:02'),
(2, 2, 2, 'status', 'cancel', 'on-hold', NULL, '2024-10-16 08:28:32', '2024-10-16 08:28:32'),
(7, 2, 2, 'price', '130.00', '150.00', NULL, '2024-10-16 09:32:36', '2024-10-16 09:32:36'),
(8, 2, 2, 'price', '130.00', '150.00', NULL, '2024-10-16 09:37:26', '2024-10-16 09:37:26'),
(9, 2, 2, 'price', '150.00', '145.00', NULL, '2024-10-16 09:45:46', '2024-10-16 09:45:46'),
(10, 2, 2, 'status', 'on-hold', 'in-progress', NULL, '2024-10-16 09:45:57', '2024-10-16 09:45:57'),
(11, 2, 2, 'status', 'in-progress', 'fulfilled', NULL, '2024-10-16 09:47:27', '2024-10-16 09:47:27');

-- --------------------------------------------------------

--
-- Table structure for table `post_have_language_preference`
--

CREATE TABLE `post_have_language_preference` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `language_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_have_language_preference`
--

INSERT INTO `post_have_language_preference` (`id`, `post_id`, `language_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2024-08-18 17:36:55', '2024-08-18 17:36:55');

-- --------------------------------------------------------

--
-- Table structure for table `post_have_subjects`
--

CREATE TABLE `post_have_subjects` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `subject_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_have_subjects`
--

INSERT INTO `post_have_subjects` (`id`, `post_id`, `subject_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2024-08-18 12:05:37', '2024-08-18 12:05:37');

-- --------------------------------------------------------

--
-- Table structure for table `post_impressions`
--

CREATE TABLE `post_impressions` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `last_viewed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_impressions`
--

INSERT INTO `post_impressions` (`id`, `post_id`, `user_id`, `last_viewed_at`) VALUES
(1, 2, 1, '2024-10-15 18:06:28');

-- --------------------------------------------------------

--
-- Table structure for table `post_purchases`
--

CREATE TABLE `post_purchases` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('initiated','active','expired','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initiated',
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_purchases`
--

INSERT INTO `post_purchases` (`id`, `user_id`, `post_id`, `price`, `status`, `purchase_date`, `created_at`, `updated_at`) VALUES
(4, 3, 2, 130.00, 'initiated', '2024-09-28 12:37:15', '2024-09-28 07:07:15', '2024-09-28 07:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `post_purposes`
--

CREATE TABLE `post_purposes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_purposes`
--

INSERT INTO `post_purposes` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Assignment help', 'assignment-help', 'Need help in your assignment work', '2024-08-18 11:35:41', '2024-08-18 11:35:41'),
(3, 'Homework Help', 'homework-help', 'Need help in your school/college homework', '2024-08-18 11:36:36', '2024-08-18 11:36:36'),
(4, 'Tuitions purposes', 'tuitions-purposes', 'Need a tutor for your studies', '2024-08-18 11:37:34', '2024-08-18 11:37:34'),
(5, 'Guidance', 'guidance', 'Need some guidance for your personal work', '2024-08-18 11:38:03', '2024-08-18 11:38:03');

-- --------------------------------------------------------

--
-- Table structure for table `post_saves`
--

CREATE TABLE `post_saves` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `saved_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Detail about the role',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `meta`, `created_at`, `updated_at`) VALUES
(1, 'student', 'Can post own requirement to get a teacher', '2024-08-07 12:05:01', '2024-08-07 12:05:01'),
(2, 'teacher', 'Fullfill the requirements of the students, according to their needs', '2024-08-07 12:05:01', '2024-08-07 12:05:01'),
(3, 'admin', 'Controls the system, operates the events and others', '2024-08-07 12:05:01', '2024-08-07 12:05:01');

-- --------------------------------------------------------

--
-- Table structure for table `role_have_permissions`
--

CREATE TABLE `role_have_permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `permission_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1CC1S4zXF9KRKadJ8TFfnxMgZOcCRk1Ka88Hqcn8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiekk3THBiQWUwWGoyY3h4Zk5NbXA1bkZ3SDREblF0dFhURGpQZGpJeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729407119),
('71kc4W1uqWbkbVYtnE6qSRIFdMMs1zd469IvY4e7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0JITlM0QVBEZXpTZ3ZpajRDZ0lWemc5d05RVklPR0tieUtsdERJUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC90dXRvcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1729431176),
('8CGfQQVBTw82atsPK5N9G7SSJDETu0HaaU4wQy4T', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiMm16M1Q4Mm53M3RZM3RpT2NXeTE0MERzeE1WNExNOTRaWWZpMUlRVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGktdjEvbGV2ZWxzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mzt9', 1729616182),
('eQmr8UTDD88k0N0Z6nTmed9bYS4CI591gTh0fvJn', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTEpKek9TREFBVTdVTXY4TENkVnQzTGFNQkthR2tTUUh2enpCcnNnUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGktdjEvbGV2ZWxzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mzt9', 1729533474),
('JRBz9fUtNOY2pSG61qn88SM74upFUcr9kKtZTKcD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS3EyVXNYMlVjV0llV3JCbG9yOXVEcXBFd2xuYzMxcVFaQmxkS2xsTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729599933),
('pFP1gXSamRJjQuM2Bx83eIgg2p6zDGiunGbnVpDa', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZzRYWmRUM3JUS0NFREVEeVQ2dzRJQmM2bTEycFRnQk9ZanFQeE5jYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdXBhZG1pbi9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729434978),
('pPlHabMrRcO7hQFJy6jRCpw2w89srGNJOAyq9uVv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUUhuNVAwNzNMaXZnSmRVQnZ2cWRvUDFDTHhFeEg3bkNOUVVibU1XSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC90dXRvcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1729437820),
('qdFpRp9G8IPxrtf3BujQIZ1pyipRklIwDPIV9DBU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieVRic21IVGJhM0VhWk5NMUtsNlBQcXV2RzNFcVV4alN5TWJXVEszTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC90dXRvcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1729419795),
('rG8XEAvKWPhYBCDo1MP1its23gfPup3i3K6B9UtF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWHl2dzI3bVZoVWJtRnlPWDREVktMc1l0ODlUZnkwamhzM0pqY0R3VyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdXBhZG1pbi9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729415824),
('xbj43A1rMauAN3oTUSajxfKOgoLmZHDH0rswu7bp', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTW9sQkNncWpBT2cwdDU3RE43NTZFSDQwcHpBNDVBSUFrUWR6ZTFsZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdXBhZG1pbi90ZWFjaGVyL013PT0iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=', 1729407727);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `meta`, `created_by_user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Python', 'A general programming language for allrounder purpose programmers', 2, '2024-08-07 12:24:28', '2024-08-16 11:25:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` bigint UNSIGNED DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_id` text COLLATE utf8mb4_unicode_ci,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `gender` enum('male','female','not specified') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'not specified',
  `date_of_birth` date DEFAULT NULL,
  `status` enum('deactive','active','suspended','banned') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `status_updated_at` datetime DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `verified_by` bigint UNSIGNED DEFAULT NULL,
  `have_password` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 for social login, guest, 1 for general web login',
  `user_login_type` enum('web','social','guest') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `bio`, `address`, `country_id`, `email`, `password`, `google_id`, `email_verified_at`, `gender`, `date_of_birth`, `status`, `status_updated_at`, `verified_at`, `verified_by`, `have_password`, `user_login_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Shivam', NULL, NULL, 124, 'shivam.tempmail@yopmail.com', '$2y$12$xY7XbcYcEf57AwLGGCDbyOmo4wW.PPeS6cABKcjjOk9dczBUNog6a', NULL, '2024-08-07 12:19:18', 'male', NULL, 'active', NULL, NULL, NULL, 1, 'web', NULL, '2024-08-07 12:16:46', '2024-08-07 12:19:18'),
(2, 'Admin', NULL, NULL, NULL, 'admin@teacheron.info', '$2y$12$kxtdSV9bRBIt4jUMGu246.68PuLKDy8GRB1waW6NFBer2EzozYtFm', NULL, '2024-08-07 17:50:43', 'male', NULL, 'active', '2024-08-07 23:20:43', '2024-08-07 23:20:43', NULL, 1, 'web', NULL, '2024-08-07 17:50:43', '2024-08-07 17:50:43'),
(3, 'Aman Sandhu', 'Hi, I\'m a professional web developer/ enginner', NULL, 53, 'aman.sandhu@yopmail.com', '$2y$12$n.JoJ7T8RHgq0d48N3c/seSLFTLbaCkndMzbhzcOQZVTUQ02/mJmu', NULL, '2024-08-21 10:21:15', 'not specified', NULL, 'active', NULL, NULL, NULL, 1, 'web', NULL, '2024-08-21 10:00:39', '2024-09-03 11:10:11'),
(4, 'Savage Sv', NULL, NULL, 124, 'shivam.vastav33@gmail.com', NULL, NULL, '2024-09-03 11:01:50', 'not specified', NULL, 'active', '2024-09-03 16:31:50', NULL, NULL, 0, 'social', NULL, '2024-09-03 11:01:50', '2024-09-03 11:01:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_contacts`
--

CREATE TABLE `user_contacts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `country_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_contacts`
--

INSERT INTO `user_contacts` (`id`, `user_id`, `email`, `phone`, `address`, `country_id`, `created_at`, `updated_at`, `verified_at`) VALUES
(1, 1, NULL, '9781020528', NULL, NULL, '2024-08-18 11:41:07', '2024-08-18 11:41:07', NULL),
(2, 3, NULL, '9752114555', NULL, NULL, '2024-08-24 10:21:04', '2024-08-24 10:21:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_documents`
--

CREATE TABLE `user_documents` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `document_type_id` bigint UNSIGNED NOT NULL,
  `status` enum('uploaded','in-review','verified','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'uploaded',
  `status_updated_at` timestamp NULL DEFAULT NULL,
  `status_updated_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_have_experiences`
--

CREATE TABLE `user_have_experiences` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `organisation_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organisation_type` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Type of the organisation, like textile, IT',
  `designation` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `started_at` date DEFAULT NULL,
  `ended_at` date DEFAULT NULL,
  `description_about_role` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_have_experiences`
--

INSERT INTO `user_have_experiences` (`id`, `user_id`, `organisation_name`, `organisation_type`, `designation`, `started_at`, `ended_at`, `description_about_role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 'Netweb Technologies', 'IT', 'PHP developer', '2021-10-01', NULL, 'Work as PHP developer', '2024-10-21 12:08:05', '2024-10-21 12:08:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_have_roles`
--

CREATE TABLE `user_have_roles` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_have_roles`
--

INSERT INTO `user_have_roles` (`id`, `role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-08-07 12:16:46', '2024-08-07 12:16:46'),
(2, 3, 2, '2024-08-07 17:52:53', '2024-08-07 17:52:53'),
(3, 2, 3, '2024-08-21 10:00:39', '2024-08-21 10:00:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_have_subjects`
--

CREATE TABLE `user_have_subjects` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `subject_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_have_subjects`
--

INSERT INTO `user_have_subjects` (`id`, `user_id`, `subject_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(7, 3, 1, '2024-08-29 10:27:30', '2024-08-29 10:27:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_impressions`
--

CREATE TABLE `user_impressions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `viewed_by` bigint UNSIGNED DEFAULT NULL,
  `last_viewed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_knows_languages`
--

CREATE TABLE `user_knows_languages` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `language_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_login_logs`
--

CREATE TABLE `user_login_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `login_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `device_IP` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `system_info` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_login_logs`
--

INSERT INTO `user_login_logs` (`id`, `user_id`, `login_at`, `device_IP`, `system_info`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-08-07 12:19:27', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-07 12:19:27', '2024-08-07 12:19:27'),
(2, 2, '2024-08-07 12:23:37', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-07 12:23:37', '2024-08-07 12:23:37'),
(3, 2, '2024-08-11 00:47:39', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-11 00:47:39', '2024-08-11 00:47:39'),
(4, 2, '2024-08-13 11:19:13', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-13 11:19:13', '2024-08-13 11:19:13'),
(5, 2, '2024-08-16 09:14:34', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-16 09:14:34', '2024-08-16 09:14:34'),
(6, 2, '2024-08-18 09:16:45', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-18 09:16:45', '2024-08-18 09:16:45'),
(7, 1, '2024-08-18 10:16:50', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-18 10:16:50', '2024-08-18 10:16:50'),
(8, 1, '2024-08-18 10:20:21', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-18 10:20:21', '2024-08-18 10:20:21'),
(9, 2, '2024-08-21 09:33:20', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-21 09:33:20', '2024-08-21 09:33:20'),
(10, 1, '2024-08-21 09:41:39', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-21 09:41:39', '2024-08-21 09:41:39'),
(11, 3, '2024-08-21 10:22:20', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-21 10:22:20', '2024-08-21 10:22:20'),
(12, 3, '2024-08-24 08:36:52', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-24 08:36:52', '2024-08-24 08:36:52'),
(13, 2, '2024-08-24 10:36:51', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-24 10:36:51', '2024-08-24 10:36:51'),
(14, 3, '2024-08-28 11:23:34', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-28 11:23:34', '2024-08-28 11:23:34'),
(15, 2, '2024-08-28 11:28:25', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', '2024-08-28 11:28:25', '2024-08-28 11:28:25'),
(16, 3, '2024-08-29 09:36:16', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-08-29 09:36:16', '2024-08-29 09:36:16'),
(17, 3, '2024-08-31 00:53:01', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-08-31 00:53:01', '2024-08-31 00:53:01'),
(18, 2, '2024-09-01 02:30:18', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-01 02:30:18', '2024-09-01 02:30:18'),
(19, 3, '2024-09-01 02:45:50', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-01 02:45:50', '2024-09-01 02:45:50'),
(20, 4, '2024-09-03 11:01:51', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-03 11:01:51', '2024-09-03 11:01:51'),
(21, 3, '2024-09-03 11:09:25', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-03 11:09:25', '2024-09-03 11:09:25'),
(22, 3, '2024-09-04 10:23:27', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-04 10:23:27', '2024-09-04 10:23:27'),
(23, 3, '2024-09-17 10:16:35', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-17 10:16:35', '2024-09-17 10:16:35'),
(24, 2, '2024-09-17 10:16:54', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-17 10:16:54', '2024-09-17 10:16:54'),
(25, 3, '2024-09-22 03:47:36', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-22 03:47:36', '2024-09-22 03:47:36'),
(26, 3, '2024-09-24 09:26:05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '2024-09-24 09:26:05', '2024-09-24 09:26:05'),
(27, 3, '2024-09-26 08:54:58', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-09-26 08:54:58', '2024-09-26 08:54:58'),
(28, 3, '2024-09-28 06:39:58', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-09-28 06:39:58', '2024-09-28 06:39:58'),
(29, 1, '2024-09-28 08:26:30', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-09-28 08:26:30', '2024-09-28 08:26:30'),
(30, 1, '2024-09-28 09:32:58', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-09-28 09:32:58', '2024-09-28 09:32:58'),
(31, 1, '2024-09-28 09:56:14', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-09-28 09:56:14', '2024-09-28 09:56:14'),
(32, 1, '2024-10-15 11:12:53', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-15 11:12:53', '2024-10-15 11:12:53'),
(33, 1, '2024-10-15 11:18:06', '192.168.1.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-15 11:18:06', '2024-10-15 11:18:06'),
(34, 2, '2024-10-16 06:19:46', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-16 06:19:46', '2024-10-16 06:19:46'),
(35, 1, '2024-10-16 10:08:31', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-16 10:08:31', '2024-10-16 10:08:31'),
(36, 3, '2024-10-16 10:28:44', '192.168.1.9', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2024-10-16 10:28:44', '2024-10-16 10:28:44'),
(37, 2, '2024-10-18 08:21:44', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-18 08:21:44', '2024-10-18 08:21:44'),
(38, 2, '2024-10-18 23:47:00', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-18 23:47:00', '2024-10-18 23:47:00'),
(39, 2, '2024-10-20 01:22:27', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-20 01:22:27', '2024-10-20 01:22:27'),
(40, 3, '2024-10-21 11:15:05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-21 11:15:05', '2024-10-21 11:15:05'),
(41, 3, '2024-10-22 07:38:56', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', '2024-10-22 07:38:56', '2024-10-22 07:38:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_prices`
--

CREATE TABLE `user_prices` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_prices`
--

INSERT INTO `user_prices` (`id`, `user_id`, `price`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 3, 130.00, 1, '2024-08-07 17:50:43', '2024-08-18 17:36:55');

-- --------------------------------------------------------

--
-- Table structure for table `user_purchases`
--

CREATE TABLE `user_purchases` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `purchase_by` bigint UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('initiated','active','expired','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initiated',
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_qualifications`
--

CREATE TABLE `user_qualifications` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `started_at` date DEFAULT NULL,
  `ended_at` date DEFAULT NULL,
  `institute_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `obtained_score` int DEFAULT NULL,
  `max_score` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_qualifications`
--

INSERT INTO `user_qualifications` (`id`, `user_id`, `name`, `started_at`, `ended_at`, `institute_name`, `obtained_score`, `max_score`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 'Bachelor of Computer Application', '2017-06-01', '2020-06-01', 'Guru Nanak Dev University', 1580, 2200, '2024-09-04 11:13:24', '2024-09-04 11:13:24', NULL),
(2, 3, 'Senior Studies', '2016-03-01', '2017-03-01', 'Amrit Sen. Sec. School', 670, 800, '2024-09-04 11:13:24', '2024-09-04 11:13:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_subject_has_levels`
--

CREATE TABLE `user_subject_has_levels` (
  `id` bigint UNSIGNED NOT NULL,
  `user_have_subject_id` bigint UNSIGNED NOT NULL,
  `level_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_subject_has_levels`
--

INSERT INTO `user_subject_has_levels` (`id`, `user_have_subject_id`, `level_id`, `created_at`, `updated_at`) VALUES
(1, 7, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_tutoring_details`
--

CREATE TABLE `user_tutoring_details` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `duration_period` enum('hourly','daily','monthly','quaterly','yearly') COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_price` decimal(10,2) DEFAULT NULL,
  `max_price` decimal(10,2) DEFAULT NULL,
  `prive_varing_description` text COLLATE utf8mb4_unicode_ci,
  `total_experience` decimal(3,1) NOT NULL DEFAULT '0.0',
  `online_experience` decimal(3,1) NOT NULL DEFAULT '0.0',
  `offline_experience` decimal(3,1) NOT NULL DEFAULT '0.0',
  `can_travel` tinyint(1) NOT NULL DEFAULT '0',
  `travel_kms` decimal(7,2) NOT NULL DEFAULT '0.00',
  `can_teach_online` tinyint(1) NOT NULL DEFAULT '0',
  `have_digital_pen` tinyint(1) NOT NULL DEFAULT '0',
  `can_help_with_homework` tinyint(1) NOT NULL DEFAULT '0',
  `currently_working` tinyint(1) NOT NULL DEFAULT '0',
  `looking_for_duration` enum('part-time','full-time','both') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'full-time',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` enum('credit','debit') COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_purchase_id` bigint UNSIGNED DEFAULT NULL,
  `payment_id` bigint UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `user_id`, `amount`, `transaction_type`, `post_purchase_id`, `payment_id`, `description`, `created_at`, `updated_at`) VALUES
(4, 3, 138.89, 'credit', NULL, 4, NULL, '2024-09-17 12:47:44', '2024-09-17 12:47:44'),
(16, 3, 130.00, 'debit', NULL, NULL, NULL, '2024-09-28 07:07:15', '2024-09-28 07:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_users`
--

CREATE TABLE `wishlist_users` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `saved_by` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversations_teacher_id_foreign` (`teacher_id`),
  ADD KEY `conversations_student_id_foreign` (`student_id`),
  ADD KEY `conversations_post_purchases_id_foreign` (`post_purchases_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document_types`
--
ALTER TABLE `document_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `levels_slug_unique` (`slug`),
  ADD KEY `levels_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_conversation_id_foreign` (`conversation_id`),
  ADD KEY `messages_sender_id_foreign` (`sender_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_user_id_foreign` (`user_id`),
  ADD KEY `payments_payment_method_id_foreign` (`payment_method_id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_country_id_foreign` (`country_id`),
  ADD KEY `posts_created_by_user_id_foreign` (`created_by_user_id`),
  ADD KEY `posts_user_phone_id_foreign` (`user_phone_id`),
  ADD KEY `posts_purpose_id_foreign` (`purpose_id`),
  ADD KEY `posts_level_id_foreign` (`level_id`);

--
-- Indexes for table `post_activities`
--
ALTER TABLE `post_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_activities_post_id_foreign` (`post_id`),
  ADD KEY `post_activities_user_id_foreign` (`user_id`);

--
-- Indexes for table `post_have_language_preference`
--
ALTER TABLE `post_have_language_preference`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_have_language_preference_post_id_foreign` (`post_id`),
  ADD KEY `post_have_language_preference_language_id_foreign` (`language_id`);

--
-- Indexes for table `post_have_subjects`
--
ALTER TABLE `post_have_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_have_subjects_post_id_foreign` (`post_id`),
  ADD KEY `post_have_subjects_subject_id_foreign` (`subject_id`);

--
-- Indexes for table `post_impressions`
--
ALTER TABLE `post_impressions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_impressions_post_id_foreign` (`post_id`),
  ADD KEY `post_impressions_user_id_foreign` (`user_id`);

--
-- Indexes for table `post_purchases`
--
ALTER TABLE `post_purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_purchases_user_id_foreign` (`user_id`),
  ADD KEY `post_purchases_post_id_foreign` (`post_id`);

--
-- Indexes for table `post_purposes`
--
ALTER TABLE `post_purposes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_purposes_slug_unique` (`slug`);

--
-- Indexes for table `post_saves`
--
ALTER TABLE `post_saves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_saves_post_id_foreign` (`post_id`),
  ADD KEY `post_saves_user_id_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_have_permissions`
--
ALTER TABLE `role_have_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_have_permissions_role_id_foreign` (`role_id`),
  ADD KEY `role_have_permissions_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjects_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_country_id_foreign` (`country_id`),
  ADD KEY `users_verified_by_foreign` (`verified_by`);

--
-- Indexes for table `user_contacts`
--
ALTER TABLE `user_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_contacts_user_id_foreign` (`user_id`),
  ADD KEY `user_contacts_country_id_foreign` (`country_id`);

--
-- Indexes for table `user_documents`
--
ALTER TABLE `user_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_documents_user_id_foreign` (`user_id`),
  ADD KEY `user_documents_document_type_id_foreign` (`document_type_id`),
  ADD KEY `user_documents_status_updated_by_foreign` (`status_updated_by`);

--
-- Indexes for table `user_have_experiences`
--
ALTER TABLE `user_have_experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_have_experiences_user_id_foreign` (`user_id`);

--
-- Indexes for table `user_have_roles`
--
ALTER TABLE `user_have_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_have_roles_role_id_foreign` (`role_id`),
  ADD KEY `user_have_roles_user_id_foreign` (`user_id`);

--
-- Indexes for table `user_have_subjects`
--
ALTER TABLE `user_have_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_have_subjects_user_id_foreign` (`user_id`),
  ADD KEY `user_have_subjects_subject_id_foreign` (`subject_id`);

--
-- Indexes for table `user_impressions`
--
ALTER TABLE `user_impressions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_impressions_user_id_foreign` (`user_id`),
  ADD KEY `user_impressions_viewed_by_foreign` (`viewed_by`);

--
-- Indexes for table `user_knows_languages`
--
ALTER TABLE `user_knows_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_knows_languages_user_id_foreign` (`user_id`),
  ADD KEY `user_knows_languages_language_id_foreign` (`language_id`);

--
-- Indexes for table `user_login_logs`
--
ALTER TABLE `user_login_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_login_logs_user_id_foreign` (`user_id`);

--
-- Indexes for table `user_prices`
--
ALTER TABLE `user_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_prices_user_id_foreign` (`user_id`),
  ADD KEY `user_prices_updated_by_foreign` (`updated_by`);

--
-- Indexes for table `user_purchases`
--
ALTER TABLE `user_purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_purchases_user_id_foreign` (`user_id`),
  ADD KEY `user_purchases_purchase_by_foreign` (`purchase_by`);

--
-- Indexes for table `user_qualifications`
--
ALTER TABLE `user_qualifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_qualifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `user_subject_has_levels`
--
ALTER TABLE `user_subject_has_levels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_subject_has_levels_user_have_subject_id_foreign` (`user_have_subject_id`),
  ADD KEY `user_subject_has_levels_level_id_foreign` (`level_id`);

--
-- Indexes for table `user_tutoring_details`
--
ALTER TABLE `user_tutoring_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_tutoring_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wallets_user_id_foreign` (`user_id`),
  ADD KEY `wallets_post_purchase_id_foreign` (`post_purchase_id`),
  ADD KEY `wallets_payment_id_foreign` (`payment_id`);

--
-- Indexes for table `wishlist_users`
--
ALTER TABLE `wishlist_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishlist_users_user_id_foreign` (`user_id`),
  ADD KEY `wishlist_users_saved_by_foreign` (`saved_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `document_types`
--
ALTER TABLE `document_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `post_activities`
--
ALTER TABLE `post_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `post_have_language_preference`
--
ALTER TABLE `post_have_language_preference`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post_have_subjects`
--
ALTER TABLE `post_have_subjects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post_impressions`
--
ALTER TABLE `post_impressions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post_purchases`
--
ALTER TABLE `post_purchases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `post_purposes`
--
ALTER TABLE `post_purposes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `post_saves`
--
ALTER TABLE `post_saves`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role_have_permissions`
--
ALTER TABLE `role_have_permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_contacts`
--
ALTER TABLE `user_contacts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_documents`
--
ALTER TABLE `user_documents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_have_experiences`
--
ALTER TABLE `user_have_experiences`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_have_roles`
--
ALTER TABLE `user_have_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_have_subjects`
--
ALTER TABLE `user_have_subjects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_impressions`
--
ALTER TABLE `user_impressions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_knows_languages`
--
ALTER TABLE `user_knows_languages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_login_logs`
--
ALTER TABLE `user_login_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `user_prices`
--
ALTER TABLE `user_prices`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_purchases`
--
ALTER TABLE `user_purchases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_qualifications`
--
ALTER TABLE `user_qualifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_subject_has_levels`
--
ALTER TABLE `user_subject_has_levels`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_tutoring_details`
--
ALTER TABLE `user_tutoring_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `wishlist_users`
--
ALTER TABLE `wishlist_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_post_purchases_id_foreign` FOREIGN KEY (`post_purchases_id`) REFERENCES `post_purchases` (`id`),
  ADD CONSTRAINT `conversations_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `conversations_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `levels_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_level_id_foreign` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_purpose_id_foreign` FOREIGN KEY (`purpose_id`) REFERENCES `post_purposes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_user_phone_id_foreign` FOREIGN KEY (`user_phone_id`) REFERENCES `user_contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `post_activities`
--
ALTER TABLE `post_activities`
  ADD CONSTRAINT `post_activities_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_activities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_have_language_preference`
--
ALTER TABLE `post_have_language_preference`
  ADD CONSTRAINT `post_have_language_preference_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_have_language_preference_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_have_subjects`
--
ALTER TABLE `post_have_subjects`
  ADD CONSTRAINT `post_have_subjects_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_have_subjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_impressions`
--
ALTER TABLE `post_impressions`
  ADD CONSTRAINT `post_impressions_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_impressions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_purchases`
--
ALTER TABLE `post_purchases`
  ADD CONSTRAINT `post_purchases_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_purchases_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_saves`
--
ALTER TABLE `post_saves`
  ADD CONSTRAINT `post_saves_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_saves_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_have_permissions`
--
ALTER TABLE `role_have_permissions`
  ADD CONSTRAINT `role_have_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_have_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `users_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_contacts`
--
ALTER TABLE `user_contacts`
  ADD CONSTRAINT `user_contacts_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `user_contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_documents`
--
ALTER TABLE `user_documents`
  ADD CONSTRAINT `user_documents_document_type_id_foreign` FOREIGN KEY (`document_type_id`) REFERENCES `document_types` (`id`),
  ADD CONSTRAINT `user_documents_status_updated_by_foreign` FOREIGN KEY (`status_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `user_documents_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_have_experiences`
--
ALTER TABLE `user_have_experiences`
  ADD CONSTRAINT `user_have_experiences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_have_roles`
--
ALTER TABLE `user_have_roles`
  ADD CONSTRAINT `user_have_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_have_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_have_subjects`
--
ALTER TABLE `user_have_subjects`
  ADD CONSTRAINT `user_have_subjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_have_subjects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_impressions`
--
ALTER TABLE `user_impressions`
  ADD CONSTRAINT `user_impressions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_impressions_viewed_by_foreign` FOREIGN KEY (`viewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_knows_languages`
--
ALTER TABLE `user_knows_languages`
  ADD CONSTRAINT `user_knows_languages_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_knows_languages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_login_logs`
--
ALTER TABLE `user_login_logs`
  ADD CONSTRAINT `user_login_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_prices`
--
ALTER TABLE `user_prices`
  ADD CONSTRAINT `user_prices_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_prices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_purchases`
--
ALTER TABLE `user_purchases`
  ADD CONSTRAINT `user_purchases_purchase_by_foreign` FOREIGN KEY (`purchase_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_purchases_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_qualifications`
--
ALTER TABLE `user_qualifications`
  ADD CONSTRAINT `user_qualifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_subject_has_levels`
--
ALTER TABLE `user_subject_has_levels`
  ADD CONSTRAINT `user_subject_has_levels_level_id_foreign` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_subject_has_levels_user_have_subject_id_foreign` FOREIGN KEY (`user_have_subject_id`) REFERENCES `user_have_subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_tutoring_details`
--
ALTER TABLE `user_tutoring_details`
  ADD CONSTRAINT `user_tutoring_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `wallets_post_purchase_id_foreign` FOREIGN KEY (`post_purchase_id`) REFERENCES `post_purchases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist_users`
--
ALTER TABLE `wishlist_users`
  ADD CONSTRAINT `wishlist_users_saved_by_foreign` FOREIGN KEY (`saved_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
