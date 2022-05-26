-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: shared-mysql:3306
-- Tempo de geração: 19-Maio-2022 às 14:54
-- Versão do servidor: 5.6.51
-- versão do PHP: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `node_satc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Alunos`
--

DROP TABLE IF EXISTS `Alunos`;
CREATE TABLE `Alunos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `cursoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Alunos`
--

INSERT INTO `Alunos` (`id`, `name`, `email`, `createdAt`, `updatedAt`, `avatar`, `cursoId`) VALUES
(1, 'Jonas Geremias', 'jonas@gmail.com', '2022-05-12 00:13:47', '2022-05-18 21:49:41', NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Cursos`
--

DROP TABLE IF EXISTS `Cursos`;
CREATE TABLE `Cursos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Cursos`
--

INSERT INTO `Cursos` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Eng. Comp.', '2022-05-18 20:37:44', '2022-05-18 20:37:44'),
(2, 'Eng. Software', '2022-05-18 20:37:44', '2022-05-18 20:37:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20220511234928-create-aluno.js'),
('20220512234928-add-cursoId-to-aluno.js'),
('20220513234928-create-curso.js'),
('20220514234928-add-avatar-to-aluno.js'),
('20220518235146-create-usuario.js');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `name`, `email`, `password`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Lucas Ferreira', 'lucas.ferreira@satc.edu.br', '123456', 'admin', '2022-05-18 23:56:51', '2022-05-18 23:56:51');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Alunos`
--
ALTER TABLE `Alunos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Cursos`
--
ALTER TABLE `Cursos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Alunos`
--
ALTER TABLE `Alunos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `Cursos`
--
ALTER TABLE `Cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
