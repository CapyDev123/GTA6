<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Recebe os dados JSON enviados pelo React
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $x = $data['x'];
    $y = $data['y'];
    $z = $data['z'];

    // Aqui você conectaria com o banco de dados (MySQL) para salvar as coordenadas
    // Exemplo: UPDATE jogadores SET pos_x = $x, pos_y = $y, pos_z = $z WHERE id = 1;

    echo json_encode([
        "status" => "success",
        "message" => "Posição salva com sucesso!",
        "coords" => ["x" => $x, "y" => $y, "z" => $z]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Dados inválidos."
    ]);
}
?>
