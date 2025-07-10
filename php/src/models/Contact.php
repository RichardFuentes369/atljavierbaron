<?php

class Contact
{
    private $conn;
    private $table_name = "contacts";
    private $phones_table_name = "phones";

    public $id;
    public $name;
    public $lastname;
    public $email;
    public $phones = [];

    public function __construct($db)
    {
        $this->conn = $db;
    }

    private function validateContactData($data, $is_update = false)
    {
        if (empty($data['name']) || empty($data['lastname']) || empty($data['email'])) {
            return ['status' => false, 'message' => 'Nombres, apellidos, y correo son requeridos.'];
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return ['status' => false, 'message' => 'Correo invalido.'];
        }

        if (!$is_update || (isset($data['email']) && $data['email'] != $this->email)) {
            $query = "SELECT id FROM " . $this->table_name . " WHERE email = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("s", $data['email']);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                return ['status' => false, 'message' => 'Correo ya existe.'];
            }
        }

        if (isset($data['phones']) && !is_array($data['phones'])) {
            return ['status' => false, 'message' => 'Phones debe ser un arreglo.'];
        }

        if (isset($data['phones'])) {
            foreach ($data['phones'] as $phone) {
                if (empty($phone)) {
                    return ['status' => false, 'message' => 'Phone  numero no puede estar vacio.'];
                }
            }
        }

        return ['status' => true];
    }


    // Método para agregar un contacto
    public function create($data)
    {
        $validation = $this->validateContactData($data);
        if (!$validation['status']) {
            return $validation;
        }

        $query = "INSERT INTO " . $this->table_name . " (name, lastname, email) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);

        if ($stmt === false) {
            return ['status' => false, 'message' => 'Preparacion fallida: ' . $this->conn->error];
        }

        $this->name = htmlspecialchars(strip_tags($data['name']));
        $this->lastname = htmlspecialchars(strip_tags($data['lastname']));
        $this->email = htmlspecialchars(strip_tags($data['email']));

        $stmt->bind_param("sss", $this->name, $this->lastname, $this->email);

        if ($stmt->execute()) {
            $this->id = $stmt->insert_id;
            if (isset($data['phones']) && is_array($data['phones'])) {
                foreach ($data['phones'] as $phone_number) {
                    $this->addPhone($this->id, $phone_number);
                }
            }
            return ['status' => true, 'id' => $this->id];
        } else {
            return ['status' => false, 'message' => 'Error de ejecución: ' . $stmt->error];
        }
    }

    // Método para listar contactos
    public function read()
    {
        $query = "SELECT c.id, c.name, c.lastname, c.email, GROUP_CONCAT(p.phone_number) as phones
                  FROM " . $this->table_name . " c
                  LEFT JOIN " . $this->phones_table_name . " p ON c.id = p.contact_id
                  GROUP BY c.id
                  ORDER BY c.created_at DESC";

        $result = $this->conn->query($query);
        if ($result === false) {
            return ['status' => false, 'message' => 'Consulta fallida: ' . $this->conn->error];
        }

        $contacts_arr = array();
        while ($row = $result->fetch_assoc()) {
            $contact_item = array(
                "id" => $row['id'],
                "name" => $row['name'],
                "lastname" => $row['lastname'],
                "email" => $row['email'],
                "phones" => $row['phones'] ? explode(',', $row['phones']) : []
            );
            array_push($contacts_arr, $contact_item);
        }
        return ['status' => true, 'data' => $contacts_arr];
    }

    // Método para obtener un solo contacto
    public function readOne($id)
    {
        $query = "SELECT c.id, c.name, c.lastname, c.email, GROUP_CONCAT(p.phone_number) as phones
                  FROM " . $this->table_name . " c
                  LEFT JOIN " . $this->phones_table_name . " p ON c.id = p.contact_id
                  WHERE c.id = ?
                  GROUP BY c.id
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        if ($stmt === false) {
            return ['status' => false, 'message' => 'Preparacion fallida: ' . $this->conn->error];
        }

        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->lastname = $row['lastname'];
            $this->email = $row['email'];
            $this->phones = $row['phones'] ? explode(',', $row['phones']) : [];
            return ['status' => true, 'data' => $this];
        } else {
            return ['status' => false, 'message' => 'Contacto no encontrado.'];
        }
    }


    // Método para eliminar un contacto
    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        if ($stmt === false) {
            return ['status' => false, 'message' => 'Preparacion fallida: ' . $this->conn->error];
        }

        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                return ['status' => true, 'message' => 'Contacto eliminado.'];
            } else {
                return ['status' => false, 'message' => 'Contacto no encontrado.'];
            }
        } else {
            return ['status' => false, 'message' => 'Error de ejecución: ' . $stmt->error];
        }
    }

    // Método para agregar un número de teléfono a un contacto
    public function addPhone($contact_id, $phone_number)
    {
        if (empty($phone_number)) {
            return ['status' => false, 'message' => 'Numero de telefono no puede ir vacio.'];
        }

        $check_query = "SELECT id FROM " . $this->phones_table_name . " WHERE contact_id = ? AND phone_number = ?";
        $check_stmt = $this->conn->prepare($check_query);
        $check_stmt->bind_param("is", $contact_id, $phone_number);
        $check_stmt->execute();
        $check_stmt->store_result();
        if ($check_stmt->num_rows > 0) {
            return ['status' => false, 'message' => 'El numero de teléfono ya existe para este contacto.'];
        }


        $query = "INSERT INTO " . $this->phones_table_name . " (contact_id, phone_number) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);

        if ($stmt === false) {
            return ['status' => false, 'message' => 'Preparación fallida: ' . $this->conn->error];
        }

        $clean_phone = htmlspecialchars(strip_tags($phone_number));
        $stmt->bind_param("is", $contact_id, $clean_phone);

        if ($stmt->execute()) {
            return ['status' => true, 'message' => 'Teléfono agregado.'];
        } else {
            return ['status' => false, 'message' => 'Error de ejecución: ' . $stmt->error];
        }
    }

    // Método para obtener los teléfonos de un contacto 
    public function getPhones($contact_id)
    {
        $query = "SELECT phone_number FROM " . $this->phones_table_name . " WHERE contact_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $contact_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $phones = [];
        while ($row = $result->fetch_assoc()) {
            $phones[] = $row['phone_number'];
        }
        return $phones;
    }
}
?>