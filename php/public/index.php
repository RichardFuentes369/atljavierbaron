<?php

require_once __DIR__ . '/../src/config/database.php';
require_once __DIR__ . '/../src/models/Contact.php';
require_once __DIR__ . '/../src/controllers/ContactController.php';
require_once __DIR__ . '/../src/views/json_view.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

$base_path_segments = 0; // Si DocumentRoot apunta directamente a public

$resource = isset($request_uri[$base_path_segments]) ? $request_uri[$base_path_segments] : '';
$id = isset($request_uri[$base_path_segments + 1]) ? $request_uri[$base_path_segments + 1] : null;

$db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($db->connect_error) {
    http_response_code(500);
    echo json_encode(['message' => 'Base de datos conectada: ' . $db->connect_error]);
    exit();
}

$contactModel = new Contact($db);
$contactController = new ContactController($contactModel);

switch ($resource) {
    case 'contacts':
        switch ($method) {
            case 'GET':
                if ($id) {
                    $contactController->getContact($id);
                } else {
                    $contactController->listContacts();
                }
                break;
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true);
                $contactController->addContact($data);
                break;
            case 'DELETE':
                if ($id) {
                    $contactController->deleteContact($id);
                } else {
                    json_response(['message' => 'El id del contacto es requerido para realizar esta acción.'], 400);
                }
                break;
            default:
                json_response(['message' => 'Metodo no permitido por /contacts'], 405);
                break;
        }
        break;
    default:
        json_response(['message' => 'Recurso no encontrado'], 404);
        break;
}

$db->close();
?>