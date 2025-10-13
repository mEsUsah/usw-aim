// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/index.js', 'dist')
    .setPublicPath('dist');