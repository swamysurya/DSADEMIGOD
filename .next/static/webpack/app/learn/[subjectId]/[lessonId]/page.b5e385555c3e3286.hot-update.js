"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/learn/[subjectId]/[lessonId]/page",{

/***/ "(app-pages-browser)/./src/infrastructure/data/lessons/fundamentals/variables.json":
/*!*********************************************************************!*\
  !*** ./src/infrastructure/data/lessons/fundamentals/variables.json ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = /*#__PURE__*/JSON.parse('{"id":"variables","title":"Variables & Scoping","subjectId":"fundamentals","nextLessonId":"data-types","prevLessonId":"intro-to-programming","content":[{"type":"paragraph","text":"In programming, a variable is a named storage location in memory that holds a value. However, a variable is not accessible everywhere. Its accessibility is governed by scoping rules."},{"type":"heading","id":"understanding-scopes","level":2,"text":"Understanding Scope Levels"},{"type":"paragraph","text":"Scope defines the region of a program where a variable can be referenced. In modern languages, we typically distinguish between two main categories: Global Scope and Local Scope."},{"type":"callout","style":"tip","text":"Tip: Always declare variables in the narrowest scope possible. This minimizes side-effects and makes it easier for compiler engines to clean up memory."},{"type":"heading","id":"block-vs-function","level":2,"text":"Block Scope vs Function Scope"},{"type":"paragraph","text":"Function scope limits accessibility to the boundaries of the containing function. Block scope limits accessibility to any block enclosed by curly braces, such as loops or conditional blocks."},{"type":"code","language":"javascript","code":"function scopeDemo() {\\n  var functionScoped = \'accessible anywhere in function\';\\n  if (true) {\\n    let blockScoped = \'only accessible inside this block\';\\n    console.log(blockScoped);\\n  }\\n  // console.log(blockScoped); // ReferenceError!\\n  console.log(functionScoped);\\n}"},{"type":"callout","style":"important","text":"Important: In JavaScript, declaring a variable with \'var\' hoists it to the top of the function scope, which can lead to subtle logic bugs. Always prefer \'let\' or \'const\' which obey block-level scoping rules."},{"type":"heading","id":"scoping-mcq","level":2,"text":"Review Exercise"},{"type":"mcq","question":"What happens if you reference a variable declared with \'let\' outside of its containing block?","options":["It returns \'undefined\'.","It throws a ReferenceError.","It searches the parent function scope and returns the value.","The code compiles but warns at runtime."],"correctAnswerIndex":1}]}');

/***/ })

});