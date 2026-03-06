<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($pageTitle) ? $pageTitle : 'Panel Admin - Garage Barki' ?></title>
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="/public/assets/icons/Logo - Garage Barki.webp" type="image/x-icon">
    
    <!-- Bootstrap CSS (local) -->
    <link href="/public/assets/libs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="/public/assets/libs/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
    
    <!-- DataTables CSS -->
    <link href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    
    <!-- DataTables Buttons CSS  ← ESTO FALTABA -->
    <link href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.bootstrap5.min.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/public/assets/css/skeleton.css">
    <link rel="stylesheet" href="/public/assets/css/admin-styles.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700&display=swap" rel="stylesheet">
    
    <!-- AOS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>