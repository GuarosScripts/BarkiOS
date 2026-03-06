<?php
/**
 * HelpController.php
 * Controlador simple para la página de ayuda
 */

require_once __DIR__ . '/LoginController.php';
checkAuth(); // Esto ya maneja la autenticación y el session_start

function index() {
    $paths = [
        __DIR__ . '/../../views/admin/help-admin.php',
        dirname(__DIR__, 2) . '/views/admin/help-admin.php'
    ];

    foreach ($paths as $path) {
        if (file_exists($path)) {
            require $path;
            return;
        }
    }

    die("Vista de ayuda no encontrada");
}