<?php
require_once __DIR__ . '/../DataAccess/ContactDAO.php';
require_once __DIR__ . '/../Utils/Validator.php';

class ContactController {
    private $contactDAO;

    public function __construct($db) {
        $this->contactDAO = new ContactDAO($db);
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);

        $validationErrors = Validator::validateContactData($data);
        if (!empty($validationErrors)) {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Validation errors", "errors" => $validationErrors]);
            return;
        }

        $phoneNumbers = $data['phone_numbers'] ?? [];
        $phoneValidationErrors = Validator::validatePhoneNumbers($phoneNumbers);
        if (!empty($phoneValidationErrors)) {
            http_response_code(400); // Bad Request
            echo json_encode(["message" => "Phone number validation errors", "errors" => $phoneValidationErrors]);
            return;
        }

        $result = $this->contactDAO->createContact(
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $phoneNumbers
        );

        if ($result['status'] === 'success') {
            http_response_code(201); // Created
            echo json_encode(["message" => "Contact created successfully.", "id" => $result['contact_id']]);
        } else {
            http_response_code(409); // Conflict
            echo json_encode(["message" => $result['message']]);
        }
    }

    public function index() {
        $contacts = $this->contactDAO->getAllContacts();
        http_response_code(200); // OK
        echo json_encode($contacts);
    }

    public function delete($id) {
        $result = $this->contactDAO->deleteContact($id);

        if ($result['status'] === 'success') {
            http_response_code(200); // OK
            echo json_encode(["message" => $result['message']]);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(["message" => $result['message']]);
        }
    }
}
?>