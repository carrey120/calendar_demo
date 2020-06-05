<?php 
include('../db.php');
// echo 'abc';

// 用PDO連接到MYsql
try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",
    $db['username'], $db['password']);
} catch(PDOException $e){
    echo "Database connection failed.";
    exit;
}

// ASC = 递增排序
$sql = 'SELECT * FROM `todos` ORDER BY `order` ASC';
$statement = $pdo->prepare($sql);
$statement->execute();
$todos = $statement->fetchAll(PDO::FETCH_ASSOC);
?>


<script>
    var todos = <?= json_encode($todos,JSON_NUMERIC_CHECK) ?>
</script>