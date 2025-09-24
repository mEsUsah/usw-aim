<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Directory Listing</h1>
    <ul>
        <?php
            // list all directories
            $files = scandir(__DIR__);
            foreach ($files as $file) {
                if (is_dir($file)) {
                    echo '<li><a href="' . $file . '">' . $file . '</a></li>';
                }
            }
        ?>
    </ul>
</body>
</html>
