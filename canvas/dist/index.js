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
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./resources/components/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Game = /*#__PURE__*/function () {
  function Game(canvas) {
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
    this.showFPS = true;
    this.showGrid = true;
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fix_dpi)(this.canvas);
    this.start();
  }
  return _createClass(Game, [{
    key: "start",
    value: function start() {
      var _this = this;
      window.requestAnimationFrame(function (timestamp) {
        return _this.gameLoop(timestamp);
      });
    }
  }, {
    key: "gameLoop",
    value: function gameLoop(timestamp) {
      var _this2 = this;
      // Update game state
      this.frameData.deltaTime = timestamp - this.frameData.lastTime;
      this.frameData.lastTime = timestamp;
      this.frameData.fps.accum += Math.floor(1000 / this.frameData.deltaTime);
      this.frameData.fps.frames++;
      if (this.frameData.fps.frames >= 60) {
        this.frameData.fps.avg = Math.floor(this.frameData.fps.accum / this.frameData.fps.frames);
        this.frameData.fps.accum = 0;
        this.frameData.fps.frames = 0;
      }

      // Render the game state
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.clearCanvas)(this.ctx);
      if (this.showGrid) (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.drawGrid)(this.ctx);
      if (this.showFPS) (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.drawFPS)(this.ctx, this.frameData.fps.avg);

      // Request the next frame
      window.requestAnimationFrame(function (timestamp) {
        return _this2.gameLoop(timestamp);
      });
    }
  }]);
}();

/***/ }),

/***/ "./resources/components/utils.js":
/*!***************************************!*\
  !*** ./resources/components/utils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCanvas: () => (/* binding */ clearCanvas),
/* harmony export */   drawFPS: () => (/* binding */ drawFPS),
/* harmony export */   drawGrid: () => (/* binding */ drawGrid),
/* harmony export */   fix_dpi: () => (/* binding */ fix_dpi),
/* harmony export */   radian: () => (/* binding */ radian),
/* harmony export */   resizeCanvas: () => (/* binding */ resizeCanvas)
/* harmony export */ });
var radian = Math.PI / 180;
function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function drawGrid(ctx, minor, major, stroke, fill) {
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.save(); // save the current state of the context before doing something to it.

  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.font = "16px Arial";
  for (var x = 0; x < ctx.canvas.width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    if (x % major == 0) {
      ctx.lineWidth = 0.5;
      ctx.fillText(x, x, 13);
    } else {
      ctx.lineWidth = 0.25;
    }
    ctx.stroke();
  }
  for (var y = 0; y < ctx.canvas.height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    if (y % major == 0) {
      ctx.lineWidth = 0.5;
      ctx.fillText(y, 0, y + 13);
    } else {
      ctx.lineWidth = 0.25;
    }
    ctx.stroke();
  }
  ctx.restore(); //Load the saved state of the canvas from before we did something to it.
}
function drawFPS(ctx, fps) {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("FPS: " + fps, ctx.canvas.width - 100, 40);
  ctx.restore();
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
/* harmony import */ var _components_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/utils.js */ "./resources/components/utils.js");
/* harmony import */ var _components_Game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Game.js */ "./resources/components/Game.js");


window.onload = function () {
  var canvas = document.getElementById('gameCanvas');
  (0,_components_utils_js__WEBPACK_IMPORTED_MODULE_0__.resizeCanvas)(canvas);
  var game = new _components_Game_js__WEBPACK_IMPORTED_MODULE_1__.Game(canvas);
  window.addEventListener('resize', function () {
    (0,_components_utils_js__WEBPACK_IMPORTED_MODULE_0__.resizeCanvas)(canvas);
    (0,_components_utils_js__WEBPACK_IMPORTED_MODULE_0__.drawGrid)(ctx);
  });
};
})();

/******/ })()
;