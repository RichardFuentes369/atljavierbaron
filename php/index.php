<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Allow all origins for simplicity in development
header("Access-Control-Allow-Methods: POST, GET, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/src/Utils/Router.php';
require_once __DIR__ . '/src/Controllers/ContactController.php';

$database = new Database();
$db = $database->getConnection();

$contactController = new ContactController($db);
$router = new Router();

// Define routes
$router->addRoute('POST', 'contacts', [$contactController, 'create']);
$router->addRoute('GET', 'contacts', [$contactController, 'index']);
$router->addRoute('DELETE', 'contacts/{id}', [$contactController, 'delete']); // For deleting a specific contact by ID

// Get the request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Pre-flight OPTIONS request handling
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$router->dispatch($method, $uri);
?>