/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/components/Game.js":
/*!**************************************!*\
  !*** ./resources/components/Game.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GAME_MODE: () => (/* binding */ GAME_MODE),
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./resources/components/utils.js");
/* harmony import */ var _graphicDebug_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphicDebug.js */ "./resources/components/graphicDebug.js");
/* harmony import */ var _mouseUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mouseUtils.js */ "./resources/components/mouseUtils.js");
/* harmony import */ var _ui_uiMenu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/uiMenu.js */ "./resources/components/ui/uiMenu.js");
/* harmony import */ var _ui_uiGameplay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/uiGameplay.js */ "./resources/components/ui/uiGameplay.js");
/* harmony import */ var _ui_uiPause_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/uiPause.js */ "./resources/components/ui/uiPause.js");
/* harmony import */ var _userInput_userInput_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./userInput/userInput.js */ "./resources/components/userInput/userInput.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var SHOW_FPS = false;
var SHOW_GRID = false;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 800;
var GAME_MODE = {
  GAMEPLAY: 'gameplay',
  MENU: 'menu',
  PAUSED: 'paused'
};
var Game = /*#__PURE__*/function () {
  function Game(canvas) {
    var _this = this;
    _classCallCheck(this, Game);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.frameData = {
      lastTime: 0,
      deltaTime: 0,
      fps: {
        accum: 0,
        frames: 0,
        avg: 0
      }
    };
    this.displayData = {
      gameWidth: GAME_WIDTH,
      gameHeight: GAME_HEIGHT,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      screenStartX: 0,
      screenStartY: 0,
      screenEndX: 0,
      screenEndY: 0
    };
    this.mode = GAME_MODE.MENU;
    this.gameObjects = {
      gameplay: [],
      menu: [],
      paused: []
    };
    this.gameFields = [];
    this.userInputs = [];
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fix_dpi)(this.canvas);
    window.addEventListener('resize', function () {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.resizeCanvas)(_this.ctx, _this.displayData);
    });
    canvas.addEventListener('click', function (event) {
      var mousePos = (0,_mouseUtils_js__WEBPACK_IMPORTED_MODULE_2__.getMousePos)(event, _this.displayData, _this.canvas);
      _this.userInputs.push({
        type: 'click',
        x: mousePos.x,
        y: mousePos.y
      });
    });
    this.state = {
      boardSize: 3,
      currentPlayer: 1
    };
    this.config = this.config();

    // Setup UI
    _ui_uiMenu_js__WEBPACK_IMPORTED_MODULE_3__.create(this);
    _ui_uiGameplay_js__WEBPACK_IMPORTED_MODULE_4__.create(this);
    _ui_uiPause_js__WEBPACK_IMPORTED_MODULE_5__.create(this);

    // Start the game
    _ui_uiGameplay_js__WEBPACK_IMPORTED_MODULE_4__.updateTurnSymbol(this);
    this.start();
  }
  return _createClass(Game, [{
    key: "config",
    value: function config() {
      var boardSize = this.state.boardSize;
      return {
        boardSize: boardSize,
        boardMargin: 60,
        cellWidth: (GAME_WIDTH - 120) / boardSize,
        cellHeight: (GAME_HEIGHT - 120) / boardSize,
        cellPadding: 20
      };
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.resizeCanvas)(this.ctx, this.displayData);
      window.requestAnimationFrame(function (timestamp) {
        return _this2.gameLoop(timestamp);
      });
    }
  }, {
    key: "gameLoop",
    value: function gameLoop(timestamp) {
      var _this3 = this;
      // Update game state
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.updateFrameData)(timestamp, this.frameData);
      (0,_userInput_userInput_js__WEBPACK_IMPORTED_MODULE_6__.handleUserInputs)(this);

      // Update animations
      this.gameObjects[this.mode].forEach(function (gameObject) {
        gameObject.update(_this3.frameData.deltaTime);
      });

      // Render the game state
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.clearCanvas)(this.ctx, this.displayData);
      if (SHOW_GRID) _graphicDebug_js__WEBPACK_IMPORTED_MODULE_1__.drawGrid(this.ctx, this.displayData);
      if (SHOW_FPS) _graphicDebug_js__WEBPACK_IMPORTED_MODULE_1__.drawFPS(this.ctx, this.frameData.fps.avg);

      // Draw game objects
      this.gameObjects[this.mode].forEach(function (gameObject) {
        gameObject.draw(_this3.ctx);
      });

      // Request the next frame
      window.requestAnimationFrame(function (timestamp) {
        return _this3.gameLoop(timestamp);
      });
    }
  }]);
}();

/***/ }),

/***/ "./resources/components/GameObject.js":
/*!********************************************!*\
  !*** ./resources/components/GameObject.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameObject)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GameObject = /*#__PURE__*/function () {
  function GameObject(config) {
    _classCallCheck(this, GameObject);
    this.config = config;
    this.shapes = [];
    this.state = {};
  }
  return _createClass(GameObject, [{
    key: "addShape",
    value: function addShape(shape) {
      this.shapes.push(shape);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.shapes.forEach(function (shape) {
        shape.update(deltaTime);
      });

      // Remove shapes with longer lifetime than ttl
      this.shapes = this.shapes.filter(function (shape) {
        if (shape.config.ttl) {
          return shape.lifetime < shape.config.ttl;
        }
        return true;
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (!this.shapes.length) return;
      ctx.save();
      ctx.translate(this.config.x, this.config.y);
      this.shapes.forEach(function (shape) {
        shape.draw(ctx);
      });
      ctx.restore();
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(x, y) {
      if (!this.config.outline) return false;
      if (x >= this.config.x - this.config.outline.left && x <= this.config.x + this.config.outline.right && y >= this.config.y - this.config.outline.top && y <= this.config.y + this.config.outline.bottom) {
        return true;
      }
      return false;
    }
  }]);
}();
_defineProperty(GameObject, "VARIANT", {
  BOARD: 1,
  BUTTON: 2,
  TEXT: 3,
  ILLUSTRATION: 4
});


/***/ }),

/***/ "./resources/components/GameShape.js":
/*!*******************************************!*\
  !*** ./resources/components/GameShape.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameShape)
/* harmony export */ });
/* harmony import */ var _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameShapeAnimation.js */ "./resources/components/GameShapeAnimation.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var GameShape = /*#__PURE__*/function () {
  function GameShape(type, config) {
    _classCallCheck(this, GameShape);
    this.type = type;
    this.config = config;
    this.animation = null;
    this.lifetime = 0;
  }
  return _createClass(GameShape, [{
    key: "addAnimation",
    value: function addAnimation(animation) {
      this.animation = animation;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.lifetime += deltaTime;
      if (this.animation) {
        this.animation.updateProgress(deltaTime);
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.strokeStyle = this.config.color || "red";
      ctx.lineWidth = this.config.lineWidth || 2;
      ctx.save();
      ctx.translate(this.config.x, this.config.y);
      var progress = 1;
      var direction = _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_0__["default"].FORWARD;
      if (this.animation) {
        progress = this.animation.getProgress();
        direction = this.animation.config.direction;
      }
      switch (this.type) {
        case 'rectangle':
          ctx.beginPath();
          if (direction === _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_0__["default"].FORWARD) {
            ctx.rect(0, 0, this.config.width * progress, this.config.height * progress);
          } else {
            ctx.rect(this.config.width * (1 - progress), this.config.height * (1 - progress), this.config.width * progress, this.config.height * progress);
          }
          ctx.stroke();
          if (this.config.fillColor) {
            ctx.fillStyle = this.config.fillColor;
            ctx.fill();
          }
          break;
        case 'circle':
          if (this.config.lineWidth) {
            ctx.lineWidth = this.config.lineWidth;
          }
          ctx.beginPath();
          if (direction === _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_0__["default"].FORWARD) {
            ctx.arc(0, 0, this.config.radius, 0, 2 * Math.PI * progress, false);
          } else {
            if (progress === 1) progress = 0; // To avoid full circle when finished
            ctx.arc(0, 0, this.config.radius, 2 * Math.PI * progress, 0, false);
          }
          ctx.stroke();
          break;
        case 'line':
          if (this.config.lineWidth) {
            ctx.lineWidth = this.config.lineWidth;
          }
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo((this.config.x2 - this.config.x) * progress, (this.config.y2 - this.config.y) * progress);
          ctx.stroke();
          break;
        case 'polygon':
          if (!this.config.points || this.config.points.length < 2) break;
          ctx.beginPath();
          ctx.moveTo(this.config.points[0].x, this.config.points[0].y);
          this.config.points.forEach(function (point, index) {
            ctx.lineTo(point.x, point.y);
          });
          ctx.closePath();
          ctx.stroke();
          if (this.config.fillColor) {
            ctx.fillStyle = this.config.fillColor;
            ctx.fill();
          }
          break;
        case 'text':
          ctx.font = this.config.font || "20px Arial";
          ctx.fillStyle = this.config.color || "black";
          ctx.fillText(this.config.text || "", 0, 0);
          break;
        default:
          console.warn("GameShape::draw - Unknown shape type: ".concat(this.type));
          break;
      }
      ctx.restore();
    }
  }]);
}();


/***/ }),

/***/ "./resources/components/GameShapeAnimation.js":
/*!****************************************************!*\
  !*** ./resources/components/GameShapeAnimation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameShapeAnimation)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GameShapeAnimation = /*#__PURE__*/function () {
  function GameShapeAnimation(config) {
    _classCallCheck(this, GameShapeAnimation);
    this.config = {};
    this.config.duration = config.duration || 1000;
    this.config.loop = config.loop || 0; // -1 inifinitely, 0 no loop, n times
    this.config.direction = config.direction || GameShapeAnimation.FORWARD;
    this.config.startDelay = config.startDelay || 0;
    this.progress = 0;
    this.lifetime = 0;
    this.loopCount = 1;
  }
  return _createClass(GameShapeAnimation, [{
    key: "updateProgress",
    value: function updateProgress(deltaTime) {
      this.progress += deltaTime;
      this.lifetime += deltaTime;

      // Not started yet
      if (this.lifetime < this.config.startDelay) {
        this.progress = 0;
      }

      // Looping logic
      if (this.progress > this.config.duration && (this.config.loop === GameShapeAnimation.INFINITE || this.loopCount < this.config.loop)) {
        this.loopCount++;
        this.progress = this.progress % this.config.duration;
      }

      // Stop at duration if not looping
      if (this.progress > this.config.duration && this.config.loop === 0) {
        this.progress = this.config.duration;
      }
    }
  }, {
    key: "getProgress",
    value: function getProgress() {
      return this.progress / this.config.duration;
    }
  }]);
}();
_defineProperty(GameShapeAnimation, "INFINITE", -1);
_defineProperty(GameShapeAnimation, "FORWARD", 1);
_defineProperty(GameShapeAnimation, "BACKWARD", 2);


/***/ }),

/***/ "./resources/components/gameBoard.js":
/*!*******************************************!*\
  !*** ./resources/components/gameBoard.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject.js */ "./resources/components/GameObject.js");
/* harmony import */ var _GameShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameShape.js */ "./resources/components/GameShape.js");


function create(game) {
  // Clear existing game board objects
  game.gameObjects.gameplay = game.gameObjects.gameplay.filter(function (obj) {
    return obj.config.variant !== _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.BOARD;
  });
  game.gameFields = [];

  // Initialize board cells
  for (var i = 0; i < game.config.boardSize; i++) {
    for (var j = 0; j < game.config.boardSize; j++) {
      var gameObject = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.BOARD,
        x: game.config.cellWidth / 2 + j * game.config.cellWidth + game.config.boardMargin,
        y: game.config.cellHeight / 2 + i * game.config.cellHeight + game.config.boardMargin,
        name: "board_".concat(i, "_").concat(j),
        outline: {
          top: game.config.cellHeight / 2,
          left: game.config.cellWidth / 2,
          bottom: game.config.cellHeight / 2,
          right: game.config.cellWidth / 2
        }
      });
      var shape = new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
        x: -game.config.cellWidth / 2,
        y: -game.config.cellHeight / 2,
        width: game.config.cellWidth,
        height: game.config.cellHeight,
        color: "gray"
      });
      gameObject.addShape(shape);
      game.gameObjects.gameplay.push(gameObject);
      game.gameFields.push(gameObject);
    }
  }
}

/***/ }),

/***/ "./resources/components/graphicDebug.js":
/*!**********************************************!*\
  !*** ./resources/components/graphicDebug.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawFPS: () => (/* binding */ drawFPS),
/* harmony export */   drawGrid: () => (/* binding */ drawGrid)
/* harmony export */ });
/**
 * Draw a grid on the canvas.
 * Helps to visualize the coordinate system and scaling.
 * @param CanvasRenderingContext2D ctx 
 * @param Object displayData 
 * @param number minor 
 * @param number major 
 * @param string stroke 
 * @param string fill 
 */
function drawGrid(ctx, displayData, minor, major, stroke, fill) {
  displayData = displayData || {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    width: 800,
    height: 800
  };
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.font = "16px Arial";

  // Draw vertical lines
  var startX = -(displayData.offsetX - displayData.offsetX % minor);
  var endX = Math.max(displayData.offsetX + displayData.gameWidth, displayData.gameWidth);
  var startY = -(displayData.offsetY - displayData.offsetY % minor);
  var endY = Math.max(displayData.offsetY + displayData.gameHeight, displayData.gameHeight);
  for (var x = startX; x < endX; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, endY);
    if (x % major == 0) {
      ctx.lineWidth = 0.5;
      ctx.fillText(x, x, 13);
    } else {
      ctx.lineWidth = 0.25;
    }
    ctx.stroke();
  }

  // Draw horizontal lines
  for (var y = startY; y < endY; y += minor) {
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    if (y % major == 0) {
      ctx.lineWidth = 0.5;
      ctx.fillText(y, 0, y + 13);
    } else {
      ctx.lineWidth = 0.25;
    }
    ctx.stroke();
  }

  // Draw arrow from viewport to left edge
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.lineWidth = 2;
  ctx.moveTo(0, displayData.gameHeight / 2);
  ctx.lineTo(-displayData.offsetX + 10, displayData.gameHeight / 2);
  ctx.lineTo(-displayData.offsetX + 10, displayData.gameHeight / 2 - 5);
  ctx.lineTo(-displayData.offsetX, displayData.gameHeight / 2);
  ctx.lineTo(-displayData.offsetX + 10, displayData.gameHeight / 2 + 5);
  ctx.lineTo(-displayData.offsetX + 10, displayData.gameHeight / 2);
  ctx.stroke();
  ctx.fill();

  // Draw arrow from viewport to right edge
  ctx.beginPath();
  ctx.moveTo(displayData.gameWidth, displayData.gameHeight / 2);
  ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, displayData.gameHeight / 2);
  ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, displayData.gameHeight / 2 - 5);
  ctx.lineTo(displayData.gameWidth + displayData.offsetX, displayData.gameHeight / 2);
  ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, displayData.gameHeight / 2 + 5);
  ctx.lineTo(displayData.gameWidth - 10 + displayData.offsetX, displayData.gameHeight / 2);
  ctx.stroke();
  ctx.fill();

  // Draw arrow from viewport to top edge
  ctx.beginPath();
  ctx.moveTo(displayData.gameWidth / 2, 0);
  ctx.lineTo(displayData.gameWidth / 2, -displayData.offsetY + 10);
  ctx.lineTo(displayData.gameWidth / 2 - 5, -displayData.offsetY + 10);
  ctx.lineTo(displayData.gameWidth / 2, -displayData.offsetY);
  ctx.lineTo(displayData.gameWidth / 2 + 5, -displayData.offsetY + 10);
  ctx.lineTo(displayData.gameWidth / 2, -displayData.offsetY + 10);
  ctx.stroke();
  ctx.fill();

  // Draw arrow from viewport to bottom edge
  ctx.beginPath();
  ctx.moveTo(displayData.gameWidth / 2, displayData.gameHeight);
  ctx.lineTo(displayData.gameWidth / 2, displayData.gameHeight + displayData.offsetY - 10);
  ctx.lineTo(displayData.gameWidth / 2 - 5, displayData.gameHeight + displayData.offsetY - 10);
  ctx.lineTo(displayData.gameWidth / 2, displayData.gameHeight + displayData.offsetY);
  ctx.lineTo(displayData.gameWidth / 2 + 5, displayData.gameHeight + displayData.offsetY - 10);
  ctx.lineTo(displayData.gameWidth / 2, displayData.gameHeight + displayData.offsetY - 10);
  ctx.stroke();
  ctx.fill();

  // Draw a red border around the game area
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.fillStyle = "red";
  ctx.strokeRect(20, 20, displayData.gameWidth - 40, displayData.gameHeight - 40);
  ctx.restore();
}

/** * Draw the current FPS in the upper left corner of the canvas.
 * @param CanvasRenderingContext2D ctx 
 * @param number fps 
 */
function drawFPS(ctx, fps) {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("FPS: " + fps, 30, 48);
  ctx.restore();
}

/***/ }),

/***/ "./resources/components/mouseUtils.js":
/*!********************************************!*\
  !*** ./resources/components/mouseUtils.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMousePos: () => (/* binding */ getMousePos)
/* harmony export */ });
function getMousePos(evt, displayData, canvas) {
  var rect = canvas.getBoundingClientRect();
  var x = (evt.clientX - rect.left) / displayData.scale - displayData.offsetX;
  var y = (evt.clientY - rect.top) / displayData.scale - displayData.offsetY;
  return {
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./resources/components/ui/uiGameplay.js":
/*!***********************************************!*\
  !*** ./resources/components/ui/uiGameplay.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   updateTurnSymbol: () => (/* binding */ updateTurnSymbol)
/* harmony export */ });
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject.js */ "./resources/components/GameObject.js");
/* harmony import */ var _GameShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameShape.js */ "./resources/components/GameShape.js");


function create(game) {
  // Menu button
  var menuButton = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.BUTTON,
    x: game.displayData.gameWidth - 30,
    y: 30,
    name: 'menu_button',
    outline: {
      top: 20,
      left: 20,
      bottom: 20,
      right: 20
    }
  });
  menuButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: -20,
    y: -20,
    width: 40,
    height: 40,
    color: "red"
  }));
  menuButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: -10,
    y: -10,
    width: 6,
    height: 20,
    color: "red",
    fillColor: "red"
  }));
  menuButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: 10,
    y: -10,
    width: -6,
    height: 20,
    color: "red",
    fillColor: "red"
  }));
  game.gameObjects.gameplay.push(menuButton);

  // Player turn indicator
  var turnIndicator = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.TEXT,
    x: 30,
    y: 37.5,
    name: 'turn_indicator'
  });
  turnIndicator.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('text', {
    x: 0,
    y: 0,
    text: "Player:",
    font: "30px Consolas",
    color: "white"
  }));
  game.gameObjects.gameplay.push(turnIndicator);
}
function updateTurnSymbol(game) {
  // Remove existing turn symbol
  game.gameObjects.gameplay = game.gameObjects.gameplay.filter(function (obj) {
    return obj.config.name !== 'turn_symbol';
  });

  // Add new turn symbol
  var turnSymbol = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.ILLUSTRATION,
    x: 165,
    y: 30,
    name: 'turn_symbol'
  });
  if (game.state.currentPlayer == 1) {
    turnSymbol.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('line', {
      x: -15,
      y: -15,
      x2: 15,
      y2: 15,
      color: "rgba(40, 151, 255, 1)",
      lineWidth: 4
    }));
    turnSymbol.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('line', {
      x: 15,
      y: -15,
      x2: -15,
      y2: 15,
      color: "rgba(40, 151, 255, 1)",
      lineWidth: 4
    }));
  } else {
    turnSymbol.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('circle', {
      x: 0,
      y: 0,
      radius: 15,
      color: "rgba(248, 66, 66, 1)",
      lineWidth: 4
    }));
  }
  game.gameObjects.gameplay.push(turnSymbol);
}

/***/ }),

/***/ "./resources/components/ui/uiMenu.js":
/*!*******************************************!*\
  !*** ./resources/components/ui/uiMenu.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject.js */ "./resources/components/GameObject.js");
/* harmony import */ var _GameShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameShape.js */ "./resources/components/GameShape.js");


function create(game) {
  var startButton = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.BUTTON,
    x: game.displayData.gameWidth / 2,
    y: game.displayData.gameHeight / 2,
    name: 'start_button',
    outline: {
      top: 60,
      left: 60,
      bottom: 60,
      right: 60
    }
  });
  startButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: -60,
    y: -60,
    width: 120,
    height: 120,
    color: "red"
  }));
  startButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('polygon', {
    x: -0,
    y: -0,
    points: [{
      x: -30,
      y: -40
    }, {
      x: 40,
      y: 0
    }, {
      x: -30,
      y: 40
    }],
    color: "red",
    fillColor: "red"
  }));
  game.gameObjects.menu.push(startButton);
}

/***/ }),

/***/ "./resources/components/ui/uiPause.js":
/*!********************************************!*\
  !*** ./resources/components/ui/uiPause.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameObject.js */ "./resources/components/GameObject.js");
/* harmony import */ var _GameShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameShape.js */ "./resources/components/GameShape.js");
/* harmony import */ var _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameShapeAnimation.js */ "./resources/components/GameShapeAnimation.js");



function create(game) {
  var continueButton = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.BUTTON,
    x: game.displayData.gameWidth - 30,
    y: 30,
    name: 'continue_button',
    outline: {
      top: 20,
      left: 20,
      bottom: 20,
      right: 20
    }
  });
  continueButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: -20,
    y: -20,
    width: 40,
    height: 40,
    color: "red"
  }));
  continueButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('polygon', {
    points: [{
      x: -10,
      y: -10
    }, {
      x: 10,
      y: 0
    }, {
      x: -10,
      y: 10
    }],
    color: "red",
    fillColor: "red"
  }));
  game.gameObjects.paused.push(continueButton);
  var stopButton = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.BUTTON,
    x: game.displayData.gameWidth - 80,
    y: 30,
    name: 'stop_button',
    outline: {
      top: 20,
      left: 20,
      bottom: 20,
      right: 20
    }
  });
  stopButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: -20,
    y: -20,
    width: 40,
    height: 40,
    color: "red"
  }));
  stopButton.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('rectangle', {
    x: -10,
    y: -10,
    width: 20,
    height: 20,
    color: "red",
    fillColor: "red"
  }));
  game.gameObjects.paused.push(stopButton);
  var pauseText = new _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    variant: _GameObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].VARIANT.TEXT,
    x: game.displayData.gameWidth / 2,
    y: game.displayData.gameHeight / 2,
    name: 'pause_text'
  });
  pauseText.addShape(new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('text', {
    x: -150,
    y: 0,
    text: "Game Paused",
    font: "50px Consolas",
    color: "white"
  }));
  var pauseLine = new _GameShape_js__WEBPACK_IMPORTED_MODULE_1__["default"]('line', {
    x: -150,
    y: 5,
    x2: 150,
    y2: 5,
    color: "white",
    lineWidth: 4
  });
  pauseLine.addAnimation(new _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    duration: 1000,
    loop: _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_2__["default"].INFINITE
  }));
  pauseText.addShape(pauseLine);
  game.gameObjects.paused.push(pauseText);
}

/***/ }),

/***/ "./resources/components/userInput/userInput.js":
/*!*****************************************************!*\
  !*** ./resources/components/userInput/userInput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleUserInputs: () => (/* binding */ handleUserInputs)
/* harmony export */ });
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game.js */ "./resources/components/Game.js");
/* harmony import */ var _userInputGameplay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userInputGameplay.js */ "./resources/components/userInput/userInputGameplay.js");
/* harmony import */ var _userInputPause_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userInputPause.js */ "./resources/components/userInput/userInputPause.js");
/* harmony import */ var _userInputMenu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userInputMenu.js */ "./resources/components/userInput/userInputMenu.js");




function handleUserInputs(game) {
  game.userInputs.forEach(function (input) {
    if (input.type == 'click') {
      switch (game.mode) {
        case _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.GAMEPLAY:
          (0,_userInputGameplay_js__WEBPACK_IMPORTED_MODULE_1__.handleUserInputsGameplay)(game, input);
          break;
        case _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.PAUSED:
          (0,_userInputPause_js__WEBPACK_IMPORTED_MODULE_2__.handleUserInputPause)(game, input);
          break;
        case _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.MENU:
          (0,_userInputMenu_js__WEBPACK_IMPORTED_MODULE_3__.handleUserInputMenu)(game, input);
          break;
        default:
          break;
      }
    }
  });
  game.userInputs = [];
}
;

/***/ }),

/***/ "./resources/components/userInput/userInputGameplay.js":
/*!*************************************************************!*\
  !*** ./resources/components/userInput/userInputGameplay.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleUserInputsGameplay: () => (/* binding */ handleUserInputsGameplay)
/* harmony export */ });
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game.js */ "./resources/components/Game.js");
/* harmony import */ var _ui_uiGameplay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/uiGameplay.js */ "./resources/components/ui/uiGameplay.js");
/* harmony import */ var _GameShape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameShape.js */ "./resources/components/GameShape.js");
/* harmony import */ var _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameShapeAnimation.js */ "./resources/components/GameShapeAnimation.js");
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameObject.js */ "./resources/components/GameObject.js");





function handleUserInputsGameplay(game, input) {
  game.gameObjects[_Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.GAMEPLAY].forEach(function (gameObject) {
    // Check clock on board cells
    if (gameObject.config.variant == _GameObject_js__WEBPACK_IMPORTED_MODULE_4__["default"].VARIANT.BOARD) {
      if (gameObject.checkCollision(input.x, input.y) && gameObject.state.occupiedBy == null) {
        gameObject.state.occupiedBy = game.state.currentPlayer;
        switch (game.state.currentPlayer) {
          case 1:
            addCrossShape(game, gameObject);
            game.state.currentPlayer = 2;
            break;
          case 2:
            addCircleShape(game, gameObject);
            game.state.currentPlayer = 1;
            break;
          default:
            break;
        }
        _ui_uiGameplay_js__WEBPACK_IMPORTED_MODULE_1__.updateTurnSymbol(game);
      }
    }

    // Check click on menu button
    if (gameObject.config.variant == _GameObject_js__WEBPACK_IMPORTED_MODULE_4__["default"].VARIANT.BUTTON) {
      if (gameObject.checkCollision(input.x, input.y)) {
        if (gameObject.config.name === 'menu_button') {
          game.mode = _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.PAUSED;
        }
      }
    }
  });
}
function addCrossShape(game, gameObject) {
  var line1 = new _GameShape_js__WEBPACK_IMPORTED_MODULE_2__["default"]('line', {
    x: game.config.cellPadding - game.config.cellWidth / 2,
    y: game.config.cellPadding - game.config.cellHeight / 2,
    x2: game.config.cellWidth / 2 - game.config.cellPadding,
    y2: game.config.cellHeight / 2 - game.config.cellPadding,
    color: "rgba(40, 151, 255, 1)",
    lineWidth: 4
  });
  line1.addAnimation(new _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
    duration: 150,
    direction: _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_3__["default"].BACKWARD
  }));
  gameObject.addShape(line1);
  var line2 = new _GameShape_js__WEBPACK_IMPORTED_MODULE_2__["default"]('line', {
    x: game.config.cellPadding - game.config.cellWidth / 2,
    y: game.config.cellHeight / 2 - game.config.cellPadding,
    x2: game.config.cellWidth / 2 - game.config.cellPadding,
    y2: -game.config.cellHeight / 2 + game.config.cellPadding,
    color: "rgba(40, 151, 255, 1)",
    lineWidth: 4
  });
  line2.addAnimation(new _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
    duration: 150,
    startDelay: 150
  }));
  gameObject.addShape(line2);
}
function addCircleShape(game, gameObject) {
  var circle = new _GameShape_js__WEBPACK_IMPORTED_MODULE_2__["default"]('circle', {
    x: 0,
    y: 0,
    radius: game.config.cellWidth / 2 - game.config.cellPadding,
    color: "rgba(248, 66, 66, 1)",
    lineWidth: 4
  });
  circle.addAnimation(new _GameShapeAnimation_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
    duration: 300
  }));
  gameObject.addShape(circle);
}

/***/ }),

/***/ "./resources/components/userInput/userInputMenu.js":
/*!*********************************************************!*\
  !*** ./resources/components/userInput/userInputMenu.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleUserInputMenu: () => (/* binding */ handleUserInputMenu)
/* harmony export */ });
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game.js */ "./resources/components/Game.js");
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameObject.js */ "./resources/components/GameObject.js");
/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gameBoard.js */ "./resources/components/gameBoard.js");



function handleUserInputMenu(game, input) {
  game.gameObjects[_Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.MENU].forEach(function (gameObject) {
    // Check click on start button
    if (gameObject.config.variant == _GameObject_js__WEBPACK_IMPORTED_MODULE_1__["default"].VARIANT.BUTTON) {
      if (gameObject.checkCollision(input.x, input.y)) {
        if (gameObject.config.name === 'start_button') {
          game.mode = _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.GAMEPLAY;
          _gameBoard_js__WEBPACK_IMPORTED_MODULE_2__.create(game);
        }
      }
    }
  });
}

/***/ }),

/***/ "./resources/components/userInput/userInputPause.js":
/*!**********************************************************!*\
  !*** ./resources/components/userInput/userInputPause.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleUserInputPause: () => (/* binding */ handleUserInputPause)
/* harmony export */ });
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game.js */ "./resources/components/Game.js");
/* harmony import */ var _GameObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GameObject.js */ "./resources/components/GameObject.js");


function handleUserInputPause(game, input) {
  game.gameObjects[_Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.PAUSED].forEach(function (gameObject) {
    // Check click on continue button
    if (gameObject.config.variant == _GameObject_js__WEBPACK_IMPORTED_MODULE_1__["default"].VARIANT.BUTTON) {
      if (gameObject.checkCollision(input.x, input.y)) {
        if (gameObject.config.name === 'continue_button') {
          game.mode = _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.GAMEPLAY;
        }
      }
    }
    // Check click on stop button
    if (gameObject.config.variant == _GameObject_js__WEBPACK_IMPORTED_MODULE_1__["default"].VARIANT.BUTTON) {
      if (gameObject.checkCollision(input.x, input.y)) {
        if (gameObject.config.name === 'stop_button') {
          game.mode = _Game_js__WEBPACK_IMPORTED_MODULE_0__.GAME_MODE.MENU;
        }
      }
    }
  });
}

/***/ }),

/***/ "./resources/components/utils.js":
/*!***************************************!*\
  !*** ./resources/components/utils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCanvas: () => (/* binding */ clearCanvas),
/* harmony export */   fix_dpi: () => (/* binding */ fix_dpi),
/* harmony export */   radian: () => (/* binding */ radian),
/* harmony export */   resizeCanvas: () => (/* binding */ resizeCanvas),
/* harmony export */   updateFrameData: () => (/* binding */ updateFrameData)
/* harmony export */ });
var radian = Math.PI / 180;
function resizeCanvas(ctx, displayData) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // Set scale to fit the game area within the canvas while maintaining aspect ratio
  displayData.scale = Math.min(ctx.canvas.width / displayData.gameWidth, ctx.canvas.height / displayData.gameHeight);
  ctx.scale(displayData.scale, displayData.scale);

  // Center the game area within the canvas
  displayData.offsetX = Math.floor((ctx.canvas.width / displayData.scale - displayData.gameWidth) / 2);
  displayData.offsetY = Math.floor((ctx.canvas.height / displayData.scale - displayData.gameHeight) / 2);
  ctx.translate(displayData.offsetX, displayData.offsetY);

  // Update screen bounds coordinates
  displayData.screenStartX = -displayData.offsetX;
  displayData.screenStartY = -displayData.offsetY;
  displayData.screenEndX = displayData.offsetX * 2 + displayData.gameWidth;
  displayData.screenEndY = displayData.offsetY * 2 + displayData.gameHeight;
}
function fix_dpi(canvas) {
  var dpi = window.devicePixelRatio;
  // Create a style object that returns width and height
  // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
  var style = {
    height: function height() {
      return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    },
    width: function width() {
      return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    }
  };
  // Set the correct attributes for a crystal clear image!
  canvas.setAttribute('width', style.width() * dpi);
  canvas.setAttribute('height', style.height() * dpi);
}
function clearCanvas(ctx, displayData) {
  ctx.clearRect(displayData.screenStartX, displayData.screenStartY, displayData.gameWidth + displayData.offsetX * 2,
  // width of clerar area
  displayData.gameHeight + displayData.offsetY * 2 // height of clear area
  );
}
function updateFrameData(timestamp, frameData) {
  frameData.deltaTime = timestamp - frameData.lastTime;
  frameData.lastTime = timestamp;
  frameData.fps.accum += Math.floor(1000 / frameData.deltaTime);
  frameData.fps.frames++;
  if (frameData.fps.frames >= 60) {
    frameData.fps.avg = Math.floor(frameData.fps.accum / frameData.fps.frames);
    frameData.fps.accum = 0;
    frameData.fps.frames = 0;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./resources/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Game.js */ "./resources/components/Game.js");

window.onload = function () {
  var canvas = document.getElementById('gameCanvas');
  var game = new _components_Game_js__WEBPACK_IMPORTED_MODULE_0__.Game(canvas);
};
})();

/******/ })()
;