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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/client */ "./src/client.tsx");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_components_Wrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/components/Wrapper */ "./src/components/Wrapper.tsx");


var _jsxFileName = "F:\\websites\\projects\\royanger.com\\app\\pages\\articles\\[slug].tsx";





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
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
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
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_src_components_Wrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
      bgColor: "bg-gray-900",
      bgOpacity: 100,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
        src: imageUrl
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 13
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("article", {
        className: "w-full flex flex-row justify-center "
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
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
  return await _src_client__WEBPACK_IMPORTED_MODULE_2__["default"].fetch(query, {
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
false

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYXJ0aWNsZXMvW3NsdWddLnRzeCJdLCJuYW1lcyI6WyJQb3N0IiwidGl0bGUiLCJieWxpbmUiLCJwdWJsaXNoZWRBdCIsIm5hbWUiLCJpbWFnZVVybCIsImNhdGVnb3JpZXMiLCJib2R5IiwicXVlcnkiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0Iiwic2x1ZyIsImNsaWVudCIsImZldGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBR0E7O0FBSUEsTUFBTUEsSUFBSSxHQUFHLENBQUM7QUFDWEMsT0FEVztBQUVYQyxRQUZXO0FBR1hDLGFBSFc7QUFJWEMsTUFKVztBQUtYQyxVQUxXO0FBTVhDLFlBTlc7QUFPWEM7QUFQVyxDQUFELEtBUVA7QUFDSCxzQkFDRztBQUFBLDRCQUNHLHFFQUFDLGdEQUFEO0FBQUEsOEJBQ0c7QUFBQSxtQ0FBb0JOLEtBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESCxlQUVHO0FBQ0csWUFBSSxFQUFDLFVBRFI7QUFFRyxlQUFPLEVBQUM7QUFGWDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFESCxlQVFHLHFFQUFDLCtEQUFEO0FBQVMsYUFBTyxFQUFDLGFBQWpCO0FBQStCLGVBQVMsRUFBRSxHQUExQztBQUFBLDhCQVFHO0FBQUssV0FBRyxFQUFFSTtBQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBUkgsZUFVRztBQUFTLGlCQUFTLEVBQUM7QUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFWSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUkg7QUFBQSxrQkFESDtBQW9DRixDQTdDRDs7S0FBTUwsSTtBQStDTixNQUFNUSxLQUFLLEdBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQVZBOztBQVlBUixJQUFJLENBQUNTLGVBQUwsR0FBdUIsZ0JBQWdCQyxPQUFoQixFQUF5QjtBQUM3QztBQUNBLFFBQU07QUFBRUMsUUFBSSxHQUFHO0FBQVQsTUFBZ0JELE9BQU8sQ0FBQ0YsS0FBOUI7QUFDQSxTQUFPLE1BQU1JLG1EQUFNLENBQUNDLEtBQVAsQ0FBYUwsS0FBYixFQUFvQjtBQUFFRztBQUFGLEdBQXBCLENBQWI7QUFDRixDQUpEOztBQU1lWCxtRUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9hcnRpY2xlcy9bc2x1Z10uMGUxZmVjODY5ODUwZmQyY2MxOTguaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsaWVudCBmcm9tICcuLi8uLi9zcmMvY2xpZW50J1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IEJsb2NrQ29udGVudCBmcm9tICdAc2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8tcmVhY3QnXG5pbXBvcnQgQmFzZUJsb2NrQ29udGVudCBmcm9tICcuLi8uLi9zcmMvY29tcG9uZW50cy9CYXNlQmxvY2tDb250ZW50J1xuaW1wb3J0IFdyYXBwZXIgZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvV3JhcHBlcidcbmltcG9ydCBCbG9nQXJ0aWNsZUhlYWRlciBmcm9tICcuLi8uLi9zcmMvY29tcG9uZW50cy9CbG9nQXJ0aWNsZUhlYWRlcidcbmltcG9ydCBCbG9nQXJ0aWNsZUZvb3RlciBmcm9tICcuLi8uLi9zcmMvY29tcG9uZW50cy9CbG9nQXJ0aWNsZUZvb3RlcidcblxuY29uc3QgUG9zdCA9ICh7XG4gICB0aXRsZSxcbiAgIGJ5bGluZSxcbiAgIHB1Ymxpc2hlZEF0LFxuICAgbmFtZSxcbiAgIGltYWdlVXJsLFxuICAgY2F0ZWdvcmllcyxcbiAgIGJvZHksXG59KSA9PiB7XG4gICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgPHRpdGxlPlJveSBBbmdlciAtIHt0aXRsZX08L3RpdGxlPlxuICAgICAgICAgICAgPG1ldGFcbiAgICAgICAgICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgICAgICAgICBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgIDwvSGVhZD5cbiAgICAgICAgIDxXcmFwcGVyIGJnQ29sb3I9XCJiZy1ncmF5LTkwMFwiIGJnT3BhY2l0eT17MTAwfT5cbiAgICAgICAgICAgIHsvKiA8QmxvZ0FydGljbGVIZWFkZXJcbiAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgIGJ5bGluZT17YnlsaW5lfVxuICAgICAgICAgICAgICAgYXV0aG9yPXtuYW1lfVxuICAgICAgICAgICAgICAgcHVibGlzaGVkQXQ9e3B1Ymxpc2hlZEF0fVxuICAgICAgICAgICAgLz4gKi99XG5cbiAgICAgICAgICAgIDxpbWcgc3JjPXtpbWFnZVVybH0gLz5cblxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggZmxleC1yb3cganVzdGlmeS1jZW50ZXIgXCI+XG4gICAgICAgICAgICAgICB7LyogPEJhc2VCbG9ja0NvbnRlbnRcbiAgICAgICAgICAgICAgICAgIGJsb2Nrcz17Ym9keX1cbiAgICAgICAgICAgICAgICAgIGltYWdlT3B0aW9ucz17eyB3OiAzMjAsIGg6IDI0MCwgZml0OiAnbWF4JyB9fVxuICAgICAgICAgICAgICAgICAgey4uLmNsaWVudC5jb25maWcoKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JheS0xMDAgdGV4dC14bCBsZWFkaW5nLXJlbGF4ZWQgdy0yLzMgbXQtNSBtYi03XCJcbiAgICAgICAgICAgICAgICAgIC8vIHNlcmlhbGl6ZXJzPXt7IG1hcmtzOiB7IGNvZGVTZXJpYWxpemVyIH0gfX1cbiAgICAgICAgICAgICAgIC8+ICovfVxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgey8qIDxCbG9nQXJ0aWNsZUZvb3RlclxuICAgICAgICAgICAgICAgYXV0aG9yPXtuYW1lfVxuICAgICAgICAgICAgICAgcHVibGlzaGVkQXQ9e3B1Ymxpc2hlZEF0fVxuICAgICAgICAgICAgICAgY2F0ZWdvcmllcz17Y2F0ZWdvcmllc31cbiAgICAgICAgICAgIC8+ICovfVxuICAgICAgICAgPC9XcmFwcGVyPlxuICAgICAgPC8+XG4gICApXG59XG5cbmNvbnN0IHF1ZXJ5ID0gYCpbX3R5cGUgPT0gXCJwb3N0XCIgJiYgc2x1Zy5jdXJyZW50ID09ICRzbHVnXVswXXtcbiAgIF9pZCxcbiAgIHRpdGxlLFxuICAgYnlsaW5lLFxuICAgcHVibGlzaGVkQXQsXG4gICBcIm5hbWVcIjogYXV0aG9yLT5uYW1lLFxuICAgXCJjYXRlZ29yaWVzXCI6IGNhdGVnb3JpZXNbXS0+dGl0bGUsXG4gICBcInNsdWdcIjogc2x1Zy5jdXJyZW50LFxuICAgXCJpbWFnZVVybFwiOiBtYWluSW1hZ2UuYXNzZXQtPnVybCxcbiAgIGJvZHlcbn1gXG5cblBvc3QuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgIC8vIGRlZmF1bHQgc2x1ZyB0byBlbXB0eSBzdHJpbmcgdG8gcHJldmVudCB1bmRlZmluZWQgZXJyb3JcbiAgIGNvbnN0IHsgc2x1ZyA9ICcnIH0gPSBjb250ZXh0LnF1ZXJ5XG4gICByZXR1cm4gYXdhaXQgY2xpZW50LmZldGNoKHF1ZXJ5LCB7IHNsdWcgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9zdFxuIl0sInNvdXJjZVJvb3QiOiIifQ==