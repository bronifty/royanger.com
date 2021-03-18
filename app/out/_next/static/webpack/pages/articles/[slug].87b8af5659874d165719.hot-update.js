webpackHotUpdate_N_E("pages/articles/[slug]",{

/***/ "./pages/articles/[slug].tsx":
/*!***********************************!*\
  !*** ./pages/articles/[slug].tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var F_websites_projects_royanger_com_app_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/client */ "./src/client.tsx");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_components_BaseBlockContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/components/BaseBlockContent */ "./src/components/BaseBlockContent.tsx");
/* harmony import */ var _src_components_Wrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../src/components/Wrapper */ "./src/components/Wrapper.tsx");
/* harmony import */ var _src_components_BlogArticleHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/components/BlogArticleHeader */ "./src/components/BlogArticleHeader.tsx");
/* harmony import */ var _src_components_BlogArticleFooter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../src/components/BlogArticleFooter */ "./src/components/BlogArticleFooter.tsx");



var _jsxFileName = "F:\\websites\\projects\\royanger.com\\app\\pages\\articles\\[slug].tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(F_websites_projects_royanger_com_app_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }









const Post = ({
  title,
  byline,
  publishedAt,
  name,
  imageUrl,
  categories,
  body
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("title", {
        children: ["Roy Anger - ", title]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 13
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 10
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_src_components_Wrapper__WEBPACK_IMPORTED_MODULE_6__["default"], {
      bgColor: "bg-gray-900",
      bgOpacity: 100,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_src_components_BlogArticleHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
        title: title,
        byline: byline,
        author: name,
        publishedAt: publishedAt
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
        src: imageUrl
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("article", {
        className: "w-full flex flex-row justify-center ",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_src_components_BaseBlockContent__WEBPACK_IMPORTED_MODULE_5__["default"], _objectSpread(_objectSpread({
          blocks: body,
          imageOptions: {
            w: 320,
            h: 240,
            fit: 'max'
          }
        }, _src_client__WEBPACK_IMPORTED_MODULE_3__["default"].config()), {}, {
          className: "text-gray-100 text-xl leading-relaxed w-2/3 mt-5 mb-7" // serializers={{ marks: { codeSerializer } }}

        }), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 16
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_src_components_BlogArticleFooter__WEBPACK_IMPORTED_MODULE_8__["default"], {
        author: name,
        publishedAt: publishedAt,
        categories: categories
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 13
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 10
    }, undefined)]
  }, void 0, true);
};

_c = Post;
const query = `*[_type == "post" && slug.current == $slug][0]{
   _id,
   title,
   byline,
   publishedAt,
   "name": author->name,
   "categories": categories[]->title,
   "slug": slug.current,
   "imageUrl": mainImage.asset->url,
   body
}`;

Post.getInitialProps = async function (context) {
  // default slug to empty string to prevent undefined error
  const {
    slug = ''
  } = context.query;
  return await _src_client__WEBPACK_IMPORTED_MODULE_3__["default"].fetch(query, {
    slug
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Post);

var _c;

$RefreshReg$(_c, "Post");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ }),

/***/ "./src/components/BlogArticleFooter.tsx":
/*!**********************************************!*\
  !*** ./src/components/BlogArticleFooter.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "F:\\websites\\projects\\royanger.com\\app\\src\\components\\BlogArticleFooter.tsx";


const BlogArticleHeader = ({
  publishedAt,
  author,
  authorId,
  categories
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: "py-3 px-5 border border-gray-300 bg-gray-100 text-gray-900 mt-5 mb-10",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      className: "text-gray-900 font-sans leading-loose text-xl",
      children: ["Written by: ", author]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 10
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      className: "text-gray-900 font-sans leading-loose text-xl",
      children: ["Date Published: ", publishedAt]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 10
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      className: "text-gray-900 font-sans leading-loose text-xl",
      children: [categories, /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
        children: categories.map(cat => cat)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 13
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 10
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 7
  }, undefined);
};

_c = BlogArticleHeader;
/* harmony default export */ __webpack_exports__["default"] = (BlogArticleHeader);

var _c;

$RefreshReg$(_c, "BlogArticleHeader");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYXJ0aWNsZXMvW3NsdWddLnRzeCIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQmxvZ0FydGljbGVGb290ZXIudHN4Il0sIm5hbWVzIjpbIlBvc3QiLCJ0aXRsZSIsImJ5bGluZSIsInB1Ymxpc2hlZEF0IiwibmFtZSIsImltYWdlVXJsIiwiY2F0ZWdvcmllcyIsImJvZHkiLCJ3IiwiaCIsImZpdCIsImNsaWVudCIsImNvbmZpZyIsInF1ZXJ5IiwiZ2V0SW5pdGlhbFByb3BzIiwiY29udGV4dCIsInNsdWciLCJmZXRjaCIsIkJsb2dBcnRpY2xlSGVhZGVyIiwiYXV0aG9yIiwiYXV0aG9ySWQiLCJtYXAiLCJjYXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsSUFBSSxHQUFHLENBQUM7QUFDWEMsT0FEVztBQUVYQyxRQUZXO0FBR1hDLGFBSFc7QUFJWEMsTUFKVztBQUtYQyxVQUxXO0FBTVhDLFlBTlc7QUFPWEM7QUFQVyxDQUFELEtBUVA7QUFDSCxzQkFDRztBQUFBLDRCQUNHLHFFQUFDLGdEQUFEO0FBQUEsOEJBQ0c7QUFBQSxtQ0FBb0JOLEtBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESCxlQUVHO0FBQ0csWUFBSSxFQUFDLFVBRFI7QUFFRyxlQUFPLEVBQUM7QUFGWDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFESCxlQVFHLHFFQUFDLCtEQUFEO0FBQVMsYUFBTyxFQUFDLGFBQWpCO0FBQStCLGVBQVMsRUFBRSxHQUExQztBQUFBLDhCQUNHLHFFQUFDLHlFQUFEO0FBQ0csYUFBSyxFQUFFQSxLQURWO0FBRUcsY0FBTSxFQUFFQyxNQUZYO0FBR0csY0FBTSxFQUFFRSxJQUhYO0FBSUcsbUJBQVcsRUFBRUQ7QUFKaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESCxlQVFHO0FBQUssV0FBRyxFQUFFRTtBQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBUkgsZUFVRztBQUFTLGlCQUFTLEVBQUMsc0NBQW5CO0FBQUEsK0JBQ0cscUVBQUMsd0VBQUQ7QUFDRyxnQkFBTSxFQUFFRSxJQURYO0FBRUcsc0JBQVksRUFBRTtBQUFFQyxhQUFDLEVBQUUsR0FBTDtBQUFVQyxhQUFDLEVBQUUsR0FBYjtBQUFrQkMsZUFBRyxFQUFFO0FBQXZCO0FBRmpCLFdBR09DLG1EQUFNLENBQUNDLE1BQVAsRUFIUDtBQUlHLG1CQUFTLEVBQUMsdURBSmIsQ0FLRzs7QUFMSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFWSCxlQW1CRyxxRUFBQyx5RUFBRDtBQUNHLGNBQU0sRUFBRVIsSUFEWDtBQUVHLG1CQUFXLEVBQUVELFdBRmhCO0FBR0csa0JBQVUsRUFBRUc7QUFIZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQW5CSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUkg7QUFBQSxrQkFESDtBQW9DRixDQTdDRDs7S0FBTU4sSTtBQStDTixNQUFNYSxLQUFLLEdBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQVZBOztBQVlBYixJQUFJLENBQUNjLGVBQUwsR0FBdUIsZ0JBQWdCQyxPQUFoQixFQUF5QjtBQUM3QztBQUNBLFFBQU07QUFBRUMsUUFBSSxHQUFHO0FBQVQsTUFBZ0JELE9BQU8sQ0FBQ0YsS0FBOUI7QUFDQSxTQUFPLE1BQU1GLG1EQUFNLENBQUNNLEtBQVAsQ0FBYUosS0FBYixFQUFvQjtBQUFFRztBQUFGLEdBQXBCLENBQWI7QUFDRixDQUpEOztBQU1laEIsbUVBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUVBOztBQVNBLE1BQU1rQixpQkFBaUIsR0FBRyxDQUFDO0FBQ3hCZixhQUR3QjtBQUV4QmdCLFFBRndCO0FBR3hCQyxVQUh3QjtBQUl4QmQ7QUFKd0IsQ0FBRCxLQUtiO0FBQ1Ysc0JBQ0c7QUFBSyxhQUFTLEVBQUMsdUVBQWY7QUFBQSw0QkFDRztBQUFHLGVBQVMsRUFBQywrQ0FBYjtBQUFBLGlDQUNnQmEsTUFEaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURILGVBSUc7QUFBRyxlQUFTLEVBQUMsK0NBQWI7QUFBQSxxQ0FDb0JoQixXQURwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSkgsZUFPRztBQUFHLGVBQVMsRUFBQywrQ0FBYjtBQUFBLGlCQUNJRyxVQURKLGVBRUc7QUFBQSxrQkFBSUEsVUFBVSxDQUFDZSxHQUFYLENBQWVDLEdBQUcsSUFBSUEsR0FBdEI7QUFBSjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFQSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESDtBQWNGLENBcEJEOztLQUFNSixpQjtBQXNCU0EsZ0ZBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvYXJ0aWNsZXMvW3NsdWddLjg3YjhhZjU2NTk4NzRkMTY1NzE5LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGllbnQgZnJvbSAnLi4vLi4vc3JjL2NsaWVudCdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBCbG9ja0NvbnRlbnQgZnJvbSAnQHNhbml0eS9ibG9jay1jb250ZW50LXRvLXJlYWN0J1xuaW1wb3J0IEJhc2VCbG9ja0NvbnRlbnQgZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvQmFzZUJsb2NrQ29udGVudCdcbmltcG9ydCBXcmFwcGVyIGZyb20gJy4uLy4uL3NyYy9jb21wb25lbnRzL1dyYXBwZXInXG5pbXBvcnQgQmxvZ0FydGljbGVIZWFkZXIgZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvQmxvZ0FydGljbGVIZWFkZXInXG5pbXBvcnQgQmxvZ0FydGljbGVGb290ZXIgZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvQmxvZ0FydGljbGVGb290ZXInXG5cbmNvbnN0IFBvc3QgPSAoe1xuICAgdGl0bGUsXG4gICBieWxpbmUsXG4gICBwdWJsaXNoZWRBdCxcbiAgIG5hbWUsXG4gICBpbWFnZVVybCxcbiAgIGNhdGVnb3JpZXMsXG4gICBib2R5LFxufSkgPT4ge1xuICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgIDx0aXRsZT5Sb3kgQW5nZXIgLSB7dGl0bGV9PC90aXRsZT5cbiAgICAgICAgICAgIDxtZXRhXG4gICAgICAgICAgICAgICBuYW1lPVwidmlld3BvcnRcIlxuICAgICAgICAgICAgICAgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICA8L0hlYWQ+XG4gICAgICAgICA8V3JhcHBlciBiZ0NvbG9yPVwiYmctZ3JheS05MDBcIiBiZ09wYWNpdHk9ezEwMH0+XG4gICAgICAgICAgICA8QmxvZ0FydGljbGVIZWFkZXJcbiAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgIGJ5bGluZT17YnlsaW5lfVxuICAgICAgICAgICAgICAgYXV0aG9yPXtuYW1lfVxuICAgICAgICAgICAgICAgcHVibGlzaGVkQXQ9e3B1Ymxpc2hlZEF0fVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPGltZyBzcmM9e2ltYWdlVXJsfSAvPlxuXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWNlbnRlciBcIj5cbiAgICAgICAgICAgICAgIDxCYXNlQmxvY2tDb250ZW50XG4gICAgICAgICAgICAgICAgICBibG9ja3M9e2JvZHl9XG4gICAgICAgICAgICAgICAgICBpbWFnZU9wdGlvbnM9e3sgdzogMzIwLCBoOiAyNDAsIGZpdDogJ21heCcgfX1cbiAgICAgICAgICAgICAgICAgIHsuLi5jbGllbnQuY29uZmlnKCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMTAwIHRleHQteGwgbGVhZGluZy1yZWxheGVkIHctMi8zIG10LTUgbWItN1wiXG4gICAgICAgICAgICAgICAgICAvLyBzZXJpYWxpemVycz17eyBtYXJrczogeyBjb2RlU2VyaWFsaXplciB9IH19XG4gICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgPEJsb2dBcnRpY2xlRm9vdGVyXG4gICAgICAgICAgICAgICBhdXRob3I9e25hbWV9XG4gICAgICAgICAgICAgICBwdWJsaXNoZWRBdD17cHVibGlzaGVkQXR9XG4gICAgICAgICAgICAgICBjYXRlZ29yaWVzPXtjYXRlZ29yaWVzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgIDwvV3JhcHBlcj5cbiAgICAgIDwvPlxuICAgKVxufVxuXG5jb25zdCBxdWVyeSA9IGAqW190eXBlID09IFwicG9zdFwiICYmIHNsdWcuY3VycmVudCA9PSAkc2x1Z11bMF17XG4gICBfaWQsXG4gICB0aXRsZSxcbiAgIGJ5bGluZSxcbiAgIHB1Ymxpc2hlZEF0LFxuICAgXCJuYW1lXCI6IGF1dGhvci0+bmFtZSxcbiAgIFwiY2F0ZWdvcmllc1wiOiBjYXRlZ29yaWVzW10tPnRpdGxlLFxuICAgXCJzbHVnXCI6IHNsdWcuY3VycmVudCxcbiAgIFwiaW1hZ2VVcmxcIjogbWFpbkltYWdlLmFzc2V0LT51cmwsXG4gICBib2R5XG59YFxuXG5Qb3N0LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAvLyBkZWZhdWx0IHNsdWcgdG8gZW1wdHkgc3RyaW5nIHRvIHByZXZlbnQgdW5kZWZpbmVkIGVycm9yXG4gICBjb25zdCB7IHNsdWcgPSAnJyB9ID0gY29udGV4dC5xdWVyeVxuICAgcmV0dXJuIGF3YWl0IGNsaWVudC5mZXRjaChxdWVyeSwgeyBzbHVnIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICAgcHVibGlzaGVkQXQ6IHN0cmluZ1xuICAgYXV0aG9yOiBzdHJpbmdcbiAgIGF1dGhvcklkPzogc3RyaW5nXG4gICBjYXRlZ29yaWVzOiBhbnlcbn1cblxuY29uc3QgQmxvZ0FydGljbGVIZWFkZXIgPSAoe1xuICAgcHVibGlzaGVkQXQsXG4gICBhdXRob3IsXG4gICBhdXRob3JJZCxcbiAgIGNhdGVnb3JpZXMsXG59OiBQcm9wcykgPT4ge1xuICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktMyBweC01IGJvcmRlciBib3JkZXItZ3JheS0zMDAgYmctZ3JheS0xMDAgdGV4dC1ncmF5LTkwMCBtdC01IG1iLTEwXCI+XG4gICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktOTAwIGZvbnQtc2FucyBsZWFkaW5nLWxvb3NlIHRleHQteGxcIj5cbiAgICAgICAgICAgIFdyaXR0ZW4gYnk6IHthdXRob3J9XG4gICAgICAgICA8L3A+XG4gICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktOTAwIGZvbnQtc2FucyBsZWFkaW5nLWxvb3NlIHRleHQteGxcIj5cbiAgICAgICAgICAgIERhdGUgUHVibGlzaGVkOiB7cHVibGlzaGVkQXR9XG4gICAgICAgICA8L3A+XG4gICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktOTAwIGZvbnQtc2FucyBsZWFkaW5nLWxvb3NlIHRleHQteGxcIj5cbiAgICAgICAgICAgIHtjYXRlZ29yaWVzfVxuICAgICAgICAgICAgPHA+e2NhdGVnb3JpZXMubWFwKGNhdCA9PiBjYXQpfTwvcD5cbiAgICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9nQXJ0aWNsZUhlYWRlclxuIl0sInNvdXJjZVJvb3QiOiIifQ==