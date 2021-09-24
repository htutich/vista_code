<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тестовое задание</title>
    <link rel="stylesheet" href="style.css?<?php echo time(); ?>">
</head>
<body>

    <div class="container">
        <div class="userinfo">
            <div class="header">Информация о пациенте</div>
            <div class="mainblock">
                <div class="inputgroup">
                    <div class="title">ФИО</div>
                    <input type="text" name="fio">
                </div>
                <div class="inputgroup">
                    <div class="title">Возраст</div>
                    <input type="text" name="age">
                </div>
                <div class="inputgroup">
                    <div class="title">Диагноз</div>
                    <input type="text" name="diagnosis">
                </div>
            </div>
        </div>
        <div class="userlist">
            <div class="header">
                <div class="routebtn active" data-route="present">Присутствуют(<span>0</span>)</div>
                <div class="routebtn" data-route="quitting">Выбывшие(<span>0</span>)</div>
            </div>
            <div class="mainblock">
                <table class="datalist">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="jquery-3.6.0.min.js"></script>
    <script src="scripts.js?<?php echo time(); ?>"></script>
</body>
</html>