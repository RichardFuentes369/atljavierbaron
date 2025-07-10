  <?php

  class ContactController
  {
      private $contactModel;

      public function __construct($contactModel)
      {
          $this->contactModel = $contactModel;
      }

      public function addContact($data)
      {
          $result = $this->contactModel->create($data);
          if ($result['status']) {
              json_response(['message' => 'Contacto creado', 'id' => $result['id']], 201);
          } else {
              json_response(['message' => $result['message']], 400);
          }
      }

      public function listContacts()
      {
          $result = $this->contactModel->read();
          if ($result['status']) {
              json_response($result['data'], 200);
          } else {
              json_response(['message' => $result['message']], 500);
          }
      }

      public function getContact($id)
      {
          $result = $this->contactModel->readOne($id);
          if ($result['status']) {
              json_response($result['data'], 200);
          } else {
              json_response(['message' => $result['message']], 404);
          }
      }

      public function deleteContact($id)
      {
          $result = $this->contactModel->delete($id);
          if ($result['status']) {
              json_response(['message' => $result['message']], 200);
          } else {
              json_response(['message' => $result['message']], 404);
          }
      }
  }
  ?>