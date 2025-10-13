<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USW - canvas studies</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
    <h1>Advanced Internet and Mobile Computing</h1>
    <p>Individual research projects use to get hands-on experience with the HTML canvas element and its capabilities.</p>
    <ul>
        <?php
            $files = scandir(__DIR__);
            foreach ($files as $file) {
                // only list visible files, not directories and only files with the htm extension
                if (!is_dir($file) && substr($file, 0, 1) !== '.' && pathinfo($file, PATHINFO_EXTENSION) === 'htm') {
                    echo '<li><a href="' . $file . '">' . $file . '</a></li>';
                }
            }
        ?>
    </ul>
</body>
</html>
