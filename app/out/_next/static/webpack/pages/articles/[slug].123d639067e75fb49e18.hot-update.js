webpackHotUpdate_N_E("pages/articles/[slug]",{

/***/ "./node_modules/@sanity/block-content-to-hyperscript/internals.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/internals.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/internals */ "./node_modules/@sanity/block-content-to-hyperscript/lib/internals.js")


/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/blocksToNodes.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/blocksToNodes.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");

var buildMarksTree = __webpack_require__(/*! ./buildMarksTree */ "./node_modules/@sanity/block-content-to-hyperscript/lib/buildMarksTree.js");

var nestLists = __webpack_require__(/*! ./nestLists */ "./node_modules/@sanity/block-content-to-hyperscript/lib/nestLists.js");

var generateKeys = __webpack_require__(/*! ./generateKeys */ "./node_modules/@sanity/block-content-to-hyperscript/lib/generateKeys.js");

var mergeSerializers = __webpack_require__(/*! ./mergeSerializers */ "./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js"); // Properties to extract from props and pass to serializers as options


var optionProps = ['projectId', 'dataset', 'imageOptions'];

var isDefined = function isDefined(val) {
  return typeof val !== 'undefined';
};

var defaults = {
  imageOptions: {}
};

function blocksToNodes(h, properties, defaultSerializers, serializeSpan) {
  var props = objectAssign({}, defaults, properties);
  var rawBlocks = Array.isArray(props.blocks) ? props.blocks : [props.blocks];
  var keyedBlocks = generateKeys(rawBlocks);
  var blocks = nestLists(keyedBlocks, props.listNestMode);
  var serializers = mergeSerializers(defaultSerializers, props.serializers || {});
  var options = optionProps.reduce(function (opts, key) {
    var value = props[key];

    if (isDefined(value)) {
      opts[key] = value;
    }

    return opts;
  }, {});

  function serializeNode(node, index, siblings, isInline) {
    if (isList(node)) {
      return serializeList(node);
    }

    if (isListItem(node)) {
      return serializeListItem(node, findListItemIndex(node, siblings));
    }

    if (isSpan(node)) {
      return serializeSpan(node, serializers, index, {
        serializeNode: serializeNode
      });
    }

    return serializeBlock(node, index, isInline);
  }

  function findListItemIndex(node, siblings) {
    var index = 0;

    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === node) {
        return index;
      }

      if (!isListItem(siblings[i])) {
        continue;
      }

      index++;
    }

    return index;
  }

  function serializeBlock(block, index, isInline) {
    var tree = buildMarksTree(block);
    var children = tree.map(function (node, i, siblings) {
      return serializeNode(node, i, siblings, true);
    });
    var blockProps = {
      key: block._key || "block-".concat(index),
      node: block,
      isInline: isInline,
      serializers: serializers,
      options: options
    };
    return h(serializers.block, blockProps, children);
  }

  function serializeListItem(block, index) {
    var key = block._key;
    var tree = buildMarksTree(block);
    var children = tree.map(serializeNode);
    return h(serializers.listItem, {
      node: block,
      serializers: serializers,
      index: index,
      key: key,
      options: options
    }, children);
  }

  function serializeList(list) {
    var type = list.listItem;
    var level = list.level;
    var key = list._key;
    var children = list.children.map(serializeNode);
    return h(serializers.list, {
      key: key,
      level: level,
      type: type,
      options: options
    }, children);
  } // Default to false, so `undefined` will evaluate to the default here


  var renderContainerOnSingleChild = Boolean(props.renderContainerOnSingleChild);
  var nodes = blocks.map(serializeNode);

  if (renderContainerOnSingleChild || nodes.length > 1) {
    var containerProps = props.className ? {
      className: props.className
    } : {};
    return h(serializers.container, containerProps, nodes);
  }

  if (nodes[0]) {
    return nodes[0];
  }

  return typeof serializers.empty === 'function' ? h(serializers.empty) : serializers.empty;
}

function isList(block) {
  return block._type === 'list' && block.listItem;
}

function isListItem(block) {
  return block._type === 'block' && block.listItem;
}

function isSpan(block) {
  return typeof block === 'string' || block.marks || block._type === 'span';
}

module.exports = blocksToNodes;
//# sourceMappingURL=blocksToNodes.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/buildMarksTree.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/buildMarksTree.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultMarks = ['strong', 'em', 'code', 'underline', 'strike-through'];

var buildMarksTree = function buildMarksTree(block) {
  var children = block.children,
      markDefs = block.markDefs;

  if (!children || !children.length) {
    return [];
  }

  var sortedMarks = children.map(sortMarksByOccurences);
  var rootNode = {
    _type: 'span',
    children: []
  };
  var nodeStack = [rootNode];
  children.forEach(function (span, i) {
    var marksNeeded = sortedMarks[i];

    if (!marksNeeded) {
      var lastNode = nodeStack[nodeStack.length - 1];
      lastNode.children.push(span);
      return;
    }

    var pos = 1; // Start at position one. Root is always plain and should never be removed. (?)

    if (nodeStack.length > 1) {
      for (pos; pos < nodeStack.length; pos++) {
        var mark = nodeStack[pos].markKey;
        var index = marksNeeded.indexOf(mark); // eslint-disable-next-line max-depth

        if (index === -1) {
          break;
        }

        marksNeeded.splice(index, 1);
      }
    } // Keep from beginning to first miss


    nodeStack = nodeStack.slice(0, pos); // Add needed nodes

    var currentNode = findLastParentNode(nodeStack);
    marksNeeded.forEach(function (mark) {
      var node = {
        _type: 'span',
        _key: span._key,
        children: [],
        mark: markDefs.find(function (def) {
          return def._key === mark;
        }) || mark,
        markKey: mark
      };
      currentNode.children.push(node);
      nodeStack.push(node);
      currentNode = node;
    }); // Split at newlines to make individual line chunks, but keep newline
    // characters as individual elements in the array. We use these characters
    // in the span serializer to trigger hard-break rendering

    if (isTextSpan(span)) {
      var lines = span.text.split('\n');

      for (var line = lines.length; line-- > 1;) {
        lines.splice(line, 0, '\n');
      }

      currentNode.children = currentNode.children.concat(lines);
    } else {
      currentNode.children = currentNode.children.concat(span);
    }
  });
  return rootNode.children;
}; // We want to sort all the marks of all the spans in the following order:
// 1. Marks that are shared amongst the most adjacent siblings
// 2. Non-default marks (links, custom metadata)
// 3. Built-in, plain marks (bold, emphasis, code etc)


function sortMarksByOccurences(span, i, spans) {
  if (!span.marks || span.marks.length === 0) {
    return span.marks || [];
  }

  var markOccurences = span.marks.reduce(function (occurences, mark) {
    occurences[mark] = occurences[mark] ? occurences[mark] + 1 : 1;

    for (var siblingIndex = i + 1; siblingIndex < spans.length; siblingIndex++) {
      var sibling = spans[siblingIndex];

      if (sibling.marks && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) {
        occurences[mark]++;
      } else {
        break;
      }
    }

    return occurences;
  }, {});
  var sortByOccurence = sortMarks.bind(null, markOccurences); // Slicing because sort() mutates the input

  return span.marks.slice().sort(sortByOccurence);
}

function sortMarks(occurences, markA, markB) {
  var aOccurences = occurences[markA] || 0;
  var bOccurences = occurences[markB] || 0;

  if (aOccurences !== bOccurences) {
    return bOccurences - aOccurences;
  }

  var aDefaultPos = defaultMarks.indexOf(markA);
  var bDefaultPos = defaultMarks.indexOf(markB); // Sort default marks last

  if (aDefaultPos !== bDefaultPos) {
    return aDefaultPos - bDefaultPos;
  } // Sort other marks simply by key


  if (markA < markB) {
    return -1;
  } else if (markA > markB) {
    return 1;
  }

  return 0;
}

function isTextSpan(node) {
  return node._type === 'span' && typeof node.text === 'string' && (Array.isArray(node.marks) || typeof node.marks === 'undefined');
}

function findLastParentNode(nodes) {
  for (var i = nodes.length - 1; i >= 0; i--) {
    var node = nodes[i];

    if (node._type === 'span' && node.children) {
      return node;
    }
  }

  return undefined;
}

module.exports = buildMarksTree;
//# sourceMappingURL=buildMarksTree.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/generateKeys.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/generateKeys.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");

module.exports = function (blocks) {
  return blocks.map(function (block) {
    if (block._key) {
      return block;
    }

    return objectAssign({
      _key: getStaticKey(block)
    }, block);
  });
};

function getStaticKey(item) {
  return checksum(JSON.stringify(item)).toString(36).replace(/[^A-Za-z0-9]/g, '');
}
/* eslint-disable no-bitwise */


function checksum(str) {
  var hash = 0;
  var strlen = str.length;

  if (strlen === 0) {
    return hash;
  }

  for (var i = 0; i < strlen; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
}
/* eslint-enable no-bitwise */
//# sourceMappingURL=generateKeys.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateHelpUrl = __webpack_require__(/*! @sanity/generate-help-url */ "./node_modules/@sanity/block-content-to-hyperscript/node_modules/@sanity/generate-help-url/index.js");

var urlBuilder = __webpack_require__(/*! @sanity/image-url */ "./node_modules/@sanity/image-url/lib/browser/image-url.umd.js");

var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");

var enc = encodeURIComponent;
var materializeError = "You must either:\n  - Pass `projectId` and `dataset` to the block renderer\n  - Materialize images to include the `url` field.\n\nFor more information, see ".concat(generateHelpUrl('block-content-image-materializing'));

var getQueryString = function getQueryString(options) {
  var query = options.imageOptions;
  var keys = Object.keys(query);

  if (!keys.length) {
    return '';
  }

  var params = keys.map(function (key) {
    return "".concat(enc(key), "=").concat(enc(query[key]));
  });
  return "?".concat(params.join('&'));
};

var buildUrl = function buildUrl(props) {
  var node = props.node,
      options = props.options;
  var projectId = options.projectId,
      dataset = options.dataset;
  var asset = node.asset;

  if (!asset) {
    throw new Error('Image does not have required `asset` property');
  }

  if (asset.url) {
    return asset.url + getQueryString(options);
  }

  if (!projectId || !dataset) {
    throw new Error(materializeError);
  }

  var ref = asset._ref;

  if (!ref) {
    throw new Error('Invalid image reference in block, no `_ref` found on `asset`');
  }

  return urlBuilder(objectAssign({
    projectId: projectId,
    dataset: dataset
  }, options.imageOptions || {})).image(node).toString();
};

module.exports = buildUrl;
//# sourceMappingURL=getImageUrl.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/internals.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/internals.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getSerializers = __webpack_require__(/*! ./serializers */ "./node_modules/@sanity/block-content-to-hyperscript/lib/serializers.js");

var _blocksToNodes = __webpack_require__(/*! ./blocksToNodes */ "./node_modules/@sanity/block-content-to-hyperscript/lib/blocksToNodes.js");

var getImageUrl = __webpack_require__(/*! ./getImageUrl */ "./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js");

var mergeSerializers = __webpack_require__(/*! ./mergeSerializers */ "./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js");

module.exports = {
  blocksToNodes: function blocksToNodes(renderNode, props, defaultSerializers, serializeSpan) {
    if (defaultSerializers) {
      return _blocksToNodes(renderNode, props, defaultSerializers, serializeSpan);
    } // Backwards-compatibility


    var serializers = getSerializers(renderNode);
    return _blocksToNodes(renderNode, props, serializers.defaultSerializers, serializers.serializeSpan);
  },
  getSerializers: getSerializers,
  getImageUrl: getImageUrl,
  mergeSerializers: mergeSerializers
};
//# sourceMappingURL=internals.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");

var isDefined = function isDefined(val) {
  return typeof val !== 'undefined';
}; // Recursively merge/replace default serializers with user-specified serializers


module.exports = function mergeSerializers(defaultSerializers, userSerializers) {
  return Object.keys(defaultSerializers).reduce(function (acc, key) {
    var type = _typeof(defaultSerializers[key]);

    if (type === 'function') {
      acc[key] = isDefined(userSerializers[key]) ? userSerializers[key] : defaultSerializers[key];
    } else if (type === 'object') {
      acc[key] = objectAssign({}, defaultSerializers[key], userSerializers[key]);
    } else {
      acc[key] = typeof userSerializers[key] === 'undefined' ? defaultSerializers[key] : userSerializers[key];
    }

    return acc;
  }, {});
};
//# sourceMappingURL=mergeSerializers.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/nestLists.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/nestLists.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* eslint-disable max-depth, complexity */


function nestLists(blocks) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';
  var tree = [];
  var currentList;

  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];

    if (!isListBlock(block)) {
      tree.push(block);
      currentList = null;
      continue;
    } // Start of a new list?


    if (!currentList) {
      currentList = listFromBlock(block);
      tree.push(currentList);
      continue;
    } // New list item within same list?


    if (blockMatchesList(block, currentList)) {
      currentList.children.push(block);
      continue;
    } // Different list props, are we going deeper?


    if (block.level > currentList.level) {
      var newList = listFromBlock(block);

      if (mode === 'html') {
        // Because HTML is kinda weird, nested lists needs to be nested within list items
        // So while you would think that we could populate the parent list with a new sub-list,
        // We actually have to target the last list element (child) of the parent.
        // However, at this point we need to be very careful - simply pushing to the list of children
        // will mutate the input, and we don't want to blindly clone the entire tree.
        // Clone the last child while adding our new list as the last child of it
        var lastListItem = lastChild(currentList);
        var newLastChild = objectAssign({}, lastListItem, {
          children: lastListItem.children.concat(newList)
        }); // Swap the last child

        currentList.children[currentList.children.length - 1] = newLastChild;
      } else {
        currentList.children.push(newList);
      } // Set the newly created, deeper list as the current


      currentList = newList;
      continue;
    } // Different list props, are we going back up the tree?


    if (block.level < currentList.level) {
      // Current list has ended, and we need to hook up with a parent of the same level and type
      var match = findListMatching(tree[tree.length - 1], block);

      if (match) {
        currentList = match;
        currentList.children.push(block);
        continue;
      } // Similar parent can't be found, assume new list


      currentList = listFromBlock(block);
      tree.push(currentList);
      continue;
    } // Different list props, different list style?


    if (block.listItem !== currentList.listItem) {
      var _match = findListMatching(tree[tree.length - 1], {
        level: block.level
      });

      if (_match && _match.listItem === block.listItem) {
        currentList = _match;
        currentList.children.push(block);
        continue;
      } else {
        currentList = listFromBlock(block);
        tree.push(currentList);
        continue;
      }
    } // eslint-disable-next-line no-console


    console.warn('Unknown state encountered for block', block);
    tree.push(block);
  }

  return tree;
}

function isListBlock(block) {
  return Boolean(block.listItem);
}

function blockMatchesList(block, list) {
  return block.level === list.level && block.listItem === list.listItem;
}

function listFromBlock(block) {
  return {
    _type: 'list',
    _key: "".concat(block._key, "-parent"),
    level: block.level,
    listItem: block.listItem,
    children: [block]
  };
}

function lastChild(block) {
  return block.children && block.children[block.children.length - 1];
}

function findListMatching(rootNode, matching) {
  var filterOnType = typeof matching.listItem === 'string';

  if (rootNode._type === 'list' && rootNode.level === matching.level && filterOnType && rootNode.listItem === matching.listItem) {
    return rootNode;
  }

  var node = lastChild(rootNode);

  if (!node) {
    return false;
  }

  return findListMatching(node, matching);
}

module.exports = nestLists;
//# sourceMappingURL=nestLists.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/serializers.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/serializers.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");

var getImageUrl = __webpack_require__(/*! ./getImageUrl */ "./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js");

module.exports = function (h, serializerOpts) {
  var serializeOptions = serializerOpts || {
    useDashedStyles: false // Low-level block serializer

  };

  function BlockSerializer(props) {
    var node = props.node,
        serializers = props.serializers,
        options = props.options,
        isInline = props.isInline,
        children = props.children;
    var blockType = node._type;
    var serializer = serializers.types[blockType];

    if (!serializer) {
      throw new Error("Unknown block type \"".concat(blockType, "\", please specify a serializer for it in the `serializers.types` prop"));
    }

    return h(serializer, {
      node: node,
      options: options,
      isInline: isInline
    }, children);
  } // Low-level span serializer


  function SpanSerializer(props) {
    var _props$node = props.node,
        mark = _props$node.mark,
        children = _props$node.children;
    var isPlain = typeof mark === 'string';
    var markType = isPlain ? mark : mark._type;
    var serializer = props.serializers.marks[markType];

    if (!serializer) {
      // @todo Revert back to throwing errors?
      // eslint-disable-next-line no-console
      console.warn("Unknown mark type \"".concat(markType, "\", please specify a serializer for it in the `serializers.marks` prop"));
      return h(props.serializers.markFallback, null, children);
    }

    return h(serializer, props.node, children);
  } // Low-level list serializer


  function ListSerializer(props) {
    var tag = props.type === 'bullet' ? 'ul' : 'ol';
    return h(tag, null, props.children);
  } // Low-level list item serializer


  function ListItemSerializer(props) {
    var children = !props.node.style || props.node.style === 'normal' ? // Don't wrap plain text in paragraphs inside of a list item
    props.children : // But wrap any other style in whatever the block serializer says to use
    h(props.serializers.types.block, props, props.children);
    return h('li', null, children);
  } // Renderer of an actual block of type `block`. Confusing, we know.


  function BlockTypeSerializer(props) {
    var style = props.node.style || 'normal';

    if (/^h\d/.test(style)) {
      return h(style, null, props.children);
    }

    return style === 'blockquote' ? h('blockquote', null, props.children) : h('p', null, props.children);
  } // Serializers for things that can be directly attributed to a tag without any props
  // We use partial application to do this, passing the tag name as the first argument


  function RawMarkSerializer(tag, props) {
    return h(tag, null, props.children);
  }

  function UnderlineSerializer(props) {
    var style = serializeOptions.useDashedStyles ? {
      'text-decoration': 'underline'
    } : {
      textDecoration: 'underline'
    };
    return h('span', {
      style: style
    }, props.children);
  }

  function StrikeThroughSerializer(props) {
    return h('del', null, props.children);
  }

  function LinkSerializer(props) {
    return h('a', {
      href: props.mark.href
    }, props.children);
  }

  function ImageSerializer(props) {
    if (!props.node.asset) {
      return null;
    }

    var img = h('img', {
      src: getImageUrl(props)
    });
    return props.isInline ? img : h('figure', null, img);
  } // Serializer that recursively calls itself, producing a hyperscript tree of spans


  function serializeSpan(span, serializers, index, options) {
    if (span === '\n' && serializers.hardBreak) {
      return h(serializers.hardBreak, {
        key: "hb-".concat(index)
      });
    }

    if (typeof span === 'string') {
      return serializers.text ? h(serializers.text, {
        key: "text-".concat(index)
      }, span) : span;
    }

    var children;

    if (span.children) {
      children = {
        children: span.children.map(function (child, i) {
          return options.serializeNode(child, i, span.children, true);
        })
      };
    }

    var serializedNode = objectAssign({}, span, children);
    return h(serializers.span, {
      key: span._key || "span-".concat(index),
      node: serializedNode,
      serializers: serializers
    });
  }

  var HardBreakSerializer = function HardBreakSerializer() {
    return h('br');
  };

  var defaultMarkSerializers = {
    strong: RawMarkSerializer.bind(null, 'strong'),
    em: RawMarkSerializer.bind(null, 'em'),
    code: RawMarkSerializer.bind(null, 'code'),
    underline: UnderlineSerializer,
    'strike-through': StrikeThroughSerializer,
    link: LinkSerializer
  };
  var defaultSerializers = {
    // Common overrides
    types: {
      block: BlockTypeSerializer,
      image: ImageSerializer
    },
    marks: defaultMarkSerializers,
    // Less common overrides
    list: ListSerializer,
    listItem: ListItemSerializer,
    block: BlockSerializer,
    span: SpanSerializer,
    hardBreak: HardBreakSerializer,
    // Container element
    container: 'div',
    // When we can't resolve the mark properly, use this renderer as the container
    markFallback: 'span',
    // Allow overriding text renderer, but leave undefined to just use plain strings by default
    text: undefined,
    // Empty nodes (React uses null, hyperscript with empty strings)
    empty: ''
  };
  return {
    defaultSerializers: defaultSerializers,
    serializeSpan: serializeSpan
  };
};
//# sourceMappingURL=serializers.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/node_modules/@sanity/generate-help-url/index.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/node_modules/@sanity/generate-help-url/index.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var baseUrl = 'https://docs.sanity.io/help/'

module.exports = function generateHelpUrl(slug) {
  return baseUrl + slug
}


/***/ }),

/***/ "./node_modules/@sanity/block-content-to-react/lib/BlockContent.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-react/lib/BlockContent.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var PropTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
var internals = __webpack_require__(/*! @sanity/block-content-to-hyperscript/internals */ "./node_modules/@sanity/block-content-to-hyperscript/internals.js");

var _require = __webpack_require__(/*! ./targets/dom */ "./node_modules/@sanity/block-content-to-react/lib/targets/dom.js"),
    serializers = _require.serializers,
    serializeSpan = _require.serializeSpan,
    renderProps = _require.renderProps;

var getImageUrl = internals.getImageUrl,
    blocksToNodes = internals.blocksToNodes,
    mergeSerializers = internals.mergeSerializers;

var renderNode = React.createElement;

var SanityBlockContent = function SanityBlockContent(props) {
  var customSerializers = mergeSerializers(SanityBlockContent.defaultSerializers, props.serializers);

  var blockProps = Object.assign({}, renderProps, props, {
    serializers: customSerializers,
    blocks: props.blocks || []
  });

  return blocksToNodes(renderNode, blockProps, serializers, serializeSpan);
};

// Expose default serializers to the user
SanityBlockContent.defaultSerializers = serializers;

// Expose logic for building image URLs from an image reference/node
SanityBlockContent.getImageUrl = getImageUrl;

SanityBlockContent.propTypes = {
  className: PropTypes.string,
  renderContainerOnSingleChild: PropTypes.bool,

  // When rendering images, we need project id and dataset, unless images are materialized
  projectId: PropTypes.string,
  dataset: PropTypes.string,
  imageOptions: PropTypes.object,

  serializers: PropTypes.shape({
    // Common overrides
    types: PropTypes.object,
    marks: PropTypes.object,

    // Less common overrides
    list: PropTypes.func,
    listItem: PropTypes.func,

    // Low-level serializers
    block: PropTypes.func,
    span: PropTypes.func
  }),

  blocks: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    _type: PropTypes.string.isRequired
  })), PropTypes.shape({
    _type: PropTypes.string.isRequired
  })]).isRequired
};

SanityBlockContent.defaultProps = {
  renderContainerOnSingleChild: false,
  serializers: {},
  imageOptions: {}
};

module.exports = SanityBlockContent;
//# sourceMappingURL=BlockContent.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-react/lib/targets/dom.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-react/lib/targets/dom.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _require = __webpack_require__(/*! @sanity/block-content-to-hyperscript/internals */ "./node_modules/@sanity/block-content-to-hyperscript/internals.js"),
    getSerializers = _require.getSerializers;

var renderNode = React.createElement;

var _getSerializers = getSerializers(renderNode),
    defaultSerializers = _getSerializers.defaultSerializers,
    serializeSpan = _getSerializers.serializeSpan;

module.exports = {
  serializeSpan: serializeSpan,
  serializers: defaultSerializers,
  renderProps: { nestMarks: true }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/@sanity/image-url/lib/browser/image-url.umd.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@sanity/image-url/lib/browser/image-url.umd.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () {
  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o) {
    var i = 0;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    i = o[Symbol.iterator]();
    return i.next.bind(i);
  }

  var example = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
  function parseAssetId(ref) {
    var _ref$split = ref.split('-'),
        id = _ref$split[1],
        dimensionString = _ref$split[2],
        format = _ref$split[3];

    if (!id || !dimensionString || !format) {
      throw new Error("Malformed asset _ref '" + ref + "'. Expected an id like \"" + example + "\".");
    }

    var _dimensionString$spli = dimensionString.split('x'),
        imgWidthStr = _dimensionString$spli[0],
        imgHeightStr = _dimensionString$spli[1];

    var width = +imgWidthStr;
    var height = +imgHeightStr;
    var isValidAssetId = isFinite(width) && isFinite(height);

    if (!isValidAssetId) {
      throw new Error("Malformed asset _ref '" + ref + "'. Expected an id like \"" + example + "\".");
    }

    return {
      id: id,
      width: width,
      height: height,
      format: format
    };
  }

  var isRef = function isRef(src) {
    var source = src;
    return source ? typeof source._ref === 'string' : false;
  };

  var isAsset = function isAsset(src) {
    var source = src;
    return source ? typeof source._id === 'string' : false;
  };

  var isAssetStub = function isAssetStub(src) {
    var source = src;
    return source && source.asset ? typeof source.asset.url === 'string' : false;
  };

  function parseSource(source) {
    if (!source) {
      return null;
    }

    var image;

    if (typeof source === 'string' && isUrl(source)) {
      image = {
        asset: {
          _ref: urlToId(source)
        }
      };
    } else if (typeof source === 'string') {
      image = {
        asset: {
          _ref: source
        }
      };
    } else if (isRef(source)) {
      image = {
        asset: source
      };
    } else if (isAsset(source)) {
      image = {
        asset: {
          _ref: source._id || ''
        }
      };
    } else if (isAssetStub(source)) {
      image = {
        asset: {
          _ref: urlToId(source.asset.url)
        }
      };
    } else if (typeof source.asset === 'object') {
      image = source;
    } else {
      return null;
    }

    var img = source;

    if (img.crop) {
      image.crop = img.crop;
    }

    if (img.hotspot) {
      image.hotspot = img.hotspot;
    }

    return applyDefaults(image);
  }

  function isUrl(url) {
    return /^https?:\/\//.test("" + url);
  }

  function urlToId(url) {
    var parts = url.split('/').slice(-1);
    return ("image-" + parts[0]).replace(/\.([a-z]+)$/, '-$1');
  }

  function applyDefaults(image) {
    if (image.crop && image.hotspot) {
      return image;
    }

    var result = _extends({}, image);

    if (!result.crop) {
      result.crop = {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      };
    }

    if (!result.hotspot) {
      result.hotspot = {
        x: 0.5,
        y: 0.5,
        height: 1.0,
        width: 1.0
      };
    }

    return result;
  }

  var SPEC_NAME_TO_URL_NAME_MAPPINGS = [['width', 'w'], ['height', 'h'], ['format', 'fm'], ['download', 'dl'], ['blur', 'blur'], ['sharpen', 'sharp'], ['invert', 'invert'], ['orientation', 'or'], ['minHeight', 'min-h'], ['maxHeight', 'max-h'], ['minWidth', 'min-w'], ['maxWidth', 'max-w'], ['quality', 'q'], ['fit', 'fit'], ['crop', 'crop'], ['saturation', 'sat'], ['auto', 'auto'], ['dpr', 'dpr'], ['pad', 'pad']];
  function urlForImage(options) {
    var spec = _extends({}, options || {});

    var source = spec.source;
    delete spec.source;
    var image = parseSource(source);

    if (!image) {
      return null;
    }

    var id = image.asset._ref || image.asset._id || '';
    var asset = parseAssetId(id);
    var cropLeft = Math.round(image.crop.left * asset.width);
    var cropTop = Math.round(image.crop.top * asset.height);
    var crop = {
      left: cropLeft,
      top: cropTop,
      width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
      height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop)
    };
    var hotSpotVerticalRadius = image.hotspot.height * asset.height / 2;
    var hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2;
    var hotSpotCenterX = image.hotspot.x * asset.width;
    var hotSpotCenterY = image.hotspot.y * asset.height;
    var hotspot = {
      left: hotSpotCenterX - hotSpotHorizontalRadius,
      top: hotSpotCenterY - hotSpotVerticalRadius,
      right: hotSpotCenterX + hotSpotHorizontalRadius,
      bottom: hotSpotCenterY + hotSpotVerticalRadius
    };

    if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
      spec = _extends(_extends({}, spec), fit({
        crop: crop,
        hotspot: hotspot
      }, spec));
    }

    return specToImageUrl(_extends(_extends({}, spec), {}, {
      asset: asset
    }));
  }

  function specToImageUrl(spec) {
    var cdnUrl = spec.baseUrl || 'https://cdn.sanity.io';
    var filename = spec.asset.id + "-" + spec.asset.width + "x" + spec.asset.height + "." + spec.asset.format;
    var baseUrl = cdnUrl + "/images/" + spec.projectId + "/" + spec.dataset + "/" + filename;
    var params = [];

    if (spec.rect) {
      var _spec$rect = spec.rect,
          left = _spec$rect.left,
          top = _spec$rect.top,
          width = _spec$rect.width,
          height = _spec$rect.height;
      var isEffectiveCrop = left !== 0 || top !== 0 || height !== spec.asset.height || width !== spec.asset.width;

      if (isEffectiveCrop) {
        params.push("rect=" + left + "," + top + "," + width + "," + height);
      }
    }

    if (spec.bg) {
      params.push("bg=" + spec.bg);
    }

    if (spec.focalPoint) {
      params.push("fp-x=" + spec.focalPoint.x);
      params.push("fp-y=" + spec.focalPoint.y);
    }

    var flip = [spec.flipHorizontal && 'h', spec.flipVertical && 'v'].filter(Boolean).join('');

    if (flip) {
      params.push("flip=" + flip);
    }

    SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function (mapping) {
      var specName = mapping[0],
          param = mapping[1];

      if (typeof spec[specName] !== 'undefined') {
        params.push(param + "=" + encodeURIComponent(spec[specName]));
      } else if (typeof spec[param] !== 'undefined') {
        params.push(param + "=" + encodeURIComponent(spec[param]));
      }
    });

    if (params.length === 0) {
      return baseUrl;
    }

    return baseUrl + "?" + params.join('&');
  }

  function fit(source, spec) {
    var cropRect;
    var imgWidth = spec.width;
    var imgHeight = spec.height;

    if (!(imgWidth && imgHeight)) {
      return {
        width: imgWidth,
        height: imgHeight,
        rect: source.crop
      };
    }

    var crop = source.crop;
    var hotspot = source.hotspot;
    var desiredAspectRatio = imgWidth / imgHeight;
    var cropAspectRatio = crop.width / crop.height;

    if (cropAspectRatio > desiredAspectRatio) {
      var height = crop.height;
      var width = height * desiredAspectRatio;
      var top = crop.top;
      var hotspotXCenter = (hotspot.right - hotspot.left) / 2 + hotspot.left;
      var left = hotspotXCenter - width / 2;

      if (left < crop.left) {
        left = crop.left;
      } else if (left + width > crop.left + crop.width) {
        left = crop.left + crop.width - width;
      }

      cropRect = {
        left: Math.round(left),
        top: Math.round(top),
        width: Math.round(width),
        height: Math.round(height)
      };
    } else {
      var _width = crop.width;

      var _height = _width / desiredAspectRatio;

      var _left = crop.left;
      var hotspotYCenter = (hotspot.bottom - hotspot.top) / 2 + hotspot.top;

      var _top = hotspotYCenter - _height / 2;

      if (_top < crop.top) {
        _top = crop.top;
      } else if (_top + _height > crop.top + crop.height) {
        _top = crop.top + crop.height - _height;
      }

      cropRect = {
        left: Math.max(0, Math.floor(_left)),
        top: Math.max(0, Math.floor(_top)),
        width: Math.round(_width),
        height: Math.round(_height)
      };
    }

    return {
      width: imgWidth,
      height: imgHeight,
      rect: cropRect
    };
  }

  var validFits = ['clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min'];
  var validCrops = ['top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy'];
  var validAutoModes = ['format'];

  function isSanityClientLike(client) {
    return client ? typeof client.clientConfig === 'object' : false;
  }

  function rewriteSpecName(key) {
    var specs = SPEC_NAME_TO_URL_NAME_MAPPINGS;

    for (var _iterator = _createForOfIteratorHelperLoose(specs), _step; !(_step = _iterator()).done;) {
      var entry = _step.value;
      var specName = entry[0],
          param = entry[1];

      if (key === specName || key === param) {
        return specName;
      }
    }

    return key;
  }

  function urlBuilder(options) {
    var client = options;

    if (isSanityClientLike(client)) {
      var _client$clientConfig = client.clientConfig,
          apiUrl = _client$clientConfig.apiHost,
          projectId = _client$clientConfig.projectId,
          dataset = _client$clientConfig.dataset;
      var apiHost = apiUrl || 'https://api.sanity.io';
      return new ImageUrlBuilder(null, {
        baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
        projectId: projectId,
        dataset: dataset
      });
    }

    return new ImageUrlBuilder(null, options);
  }
  var ImageUrlBuilder = /*#__PURE__*/function () {
    function ImageUrlBuilder(parent, options) {
      this.options = parent ? _extends(_extends({}, parent.options || {}), options || {}) : _extends({}, options || {});
    }

    var _proto = ImageUrlBuilder.prototype;

    _proto.withOptions = function withOptions(options) {
      var baseUrl = options.baseUrl || this.options.baseUrl;
      var newOptions = {
        baseUrl: baseUrl
      };

      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          var specKey = rewriteSpecName(key);
          newOptions[specKey] = options[key];
        }
      }

      return new ImageUrlBuilder(this, _extends({
        baseUrl: baseUrl
      }, newOptions));
    };

    _proto.image = function image(source) {
      return this.withOptions({
        source: source
      });
    };

    _proto.dataset = function dataset(_dataset) {
      return this.withOptions({
        dataset: _dataset
      });
    };

    _proto.projectId = function projectId(_projectId) {
      return this.withOptions({
        projectId: _projectId
      });
    };

    _proto.bg = function bg(_bg) {
      return this.withOptions({
        bg: _bg
      });
    };

    _proto.dpr = function dpr(_dpr) {
      return this.withOptions({
        dpr: _dpr
      });
    };

    _proto.width = function width(_width) {
      return this.withOptions({
        width: _width
      });
    };

    _proto.height = function height(_height) {
      return this.withOptions({
        height: _height
      });
    };

    _proto.focalPoint = function focalPoint(x, y) {
      return this.withOptions({
        focalPoint: {
          x: x,
          y: y
        }
      });
    };

    _proto.maxWidth = function maxWidth(_maxWidth) {
      return this.withOptions({
        maxWidth: _maxWidth
      });
    };

    _proto.minWidth = function minWidth(_minWidth) {
      return this.withOptions({
        minWidth: _minWidth
      });
    };

    _proto.maxHeight = function maxHeight(_maxHeight) {
      return this.withOptions({
        maxHeight: _maxHeight
      });
    };

    _proto.minHeight = function minHeight(_minHeight) {
      return this.withOptions({
        minHeight: _minHeight
      });
    };

    _proto.size = function size(width, height) {
      return this.withOptions({
        width: width,
        height: height
      });
    };

    _proto.blur = function blur(_blur) {
      return this.withOptions({
        blur: _blur
      });
    };

    _proto.sharpen = function sharpen(_sharpen) {
      return this.withOptions({
        sharpen: _sharpen
      });
    };

    _proto.rect = function rect(left, top, width, height) {
      return this.withOptions({
        rect: {
          left: left,
          top: top,
          width: width,
          height: height
        }
      });
    };

    _proto.format = function format(_format) {
      return this.withOptions({
        format: _format
      });
    };

    _proto.invert = function invert(_invert) {
      return this.withOptions({
        invert: _invert
      });
    };

    _proto.orientation = function orientation(_orientation) {
      return this.withOptions({
        orientation: _orientation
      });
    };

    _proto.quality = function quality(_quality) {
      return this.withOptions({
        quality: _quality
      });
    };

    _proto.forceDownload = function forceDownload(download) {
      return this.withOptions({
        download: download
      });
    };

    _proto.flipHorizontal = function flipHorizontal() {
      return this.withOptions({
        flipHorizontal: true
      });
    };

    _proto.flipVertical = function flipVertical() {
      return this.withOptions({
        flipVertical: true
      });
    };

    _proto.ignoreImageParams = function ignoreImageParams() {
      return this.withOptions({
        ignoreImageParams: true
      });
    };

    _proto.fit = function fit(value) {
      if (validFits.indexOf(value) === -1) {
        throw new Error("Invalid fit mode \"" + value + "\"");
      }

      return this.withOptions({
        fit: value
      });
    };

    _proto.crop = function crop(value) {
      if (validCrops.indexOf(value) === -1) {
        throw new Error("Invalid crop mode \"" + value + "\"");
      }

      return this.withOptions({
        crop: value
      });
    };

    _proto.saturation = function saturation(_saturation) {
      return this.withOptions({
        saturation: _saturation
      });
    };

    _proto.auto = function auto(value) {
      if (validAutoModes.indexOf(value) === -1) {
        throw new Error("Invalid auto mode \"" + value + "\"");
      }

      return this.withOptions({
        auto: value
      });
    };

    _proto.pad = function pad(_pad) {
      return this.withOptions({
        pad: _pad
      });
    };

    _proto.url = function url() {
      return urlForImage(this.options);
    };

    _proto.toString = function toString() {
      return this.url();
    };

    return ImageUrlBuilder;
  }();

  return urlBuilder;

})));
//# sourceMappingURL=image-url.umd.js.map


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

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

/***/ "./src/components/BaseBlockContent.tsx":
/*!*********************************************!*\
  !*** ./src/components/BaseBlockContent.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var F_websites_projects_royanger_com_app_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/client */ "./src/client.tsx");
/* harmony import */ var _sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sanity/block-content-to-react */ "./node_modules/@sanity/block-content-to-react/lib/BlockContent.js");
/* harmony import */ var _sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _serializer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./serializer */ "./src/components/serializer.tsx");


var _jsxFileName = "F:\\websites\\projects\\royanger.com\\app\\src\\components\\BaseBlockContent.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(F_websites_projects_royanger_com_app_node_modules_next_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




 //import blockContent from '../../../sanity/schemas/blockContent'

const BaseBlockContent = ({
  blocks,
  className
}) => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])(_sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_4___default.a, _objectSpread({
  blocks: blocks,
  className: className,
  serializers: _serializer__WEBPACK_IMPORTED_MODULE_5__["default"]
}, _src_client__WEBPACK_IMPORTED_MODULE_3__["default"]), void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 13,
  columnNumber: 4
}, undefined);

_c = BaseBlockContent;
/* harmony default export */ __webpack_exports__["default"] = (BaseBlockContent);

var _c;

$RefreshReg$(_c, "BaseBlockContent");

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

/***/ "./src/components/BlogArticleHeader.tsx":
/*!**********************************************!*\
  !*** ./src/components/BlogArticleHeader.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "F:\\websites\\projects\\royanger.com\\app\\src\\components\\BlogArticleHeader.tsx";


const BlogArticleHeader = ({
  title,
  publishedAt,
  byline,
  author,
  authorId
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: "py-3 px-5 text-gray-90 mt-5 mb-10",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("h1", {
      className: "text-gray-200 font-title text-5xl",
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 10
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      className: "text-gray-200 font-sans leading-loose text-xl",
      children: byline
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 10
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      className: "text-gray-200 font-sans leading-loose text-xl",
      children: ["Written by: ", author]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 10
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("p", {
      className: "text-gray-200 font-sans leading-loose text-xl",
      children: ["Date Published: ", publishedAt]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 10
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 19,
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

/***/ }),

/***/ "./src/components/serializer.tsx":
/*!***************************************!*\
  !*** ./src/components/serializer.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "F:\\websites\\projects\\royanger.com\\app\\src\\components\\serializer.tsx";

const serializers = {
  types: {
    Code: ({
      node = {
        code: 'javascript'
      }
    }) => {
      const {
        code,
        language
      } = node;

      if (!code) {
        return null;
      }

      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("pre", {
        "data-language": language,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("code", {
          className: `language-${language}`,
          children: code
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 16
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 13
      }, undefined);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (serializers);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvYmxvY2stY29udGVudC10by1oeXBlcnNjcmlwdC9pbnRlcm5hbHMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8taHlwZXJzY3JpcHQvbGliL2Jsb2Nrc1RvTm9kZXMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8taHlwZXJzY3JpcHQvbGliL2J1aWxkTWFya3NUcmVlLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHNhbml0eS9ibG9jay1jb250ZW50LXRvLWh5cGVyc2NyaXB0L2xpYi9nZW5lcmF0ZUtleXMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8taHlwZXJzY3JpcHQvbGliL2dldEltYWdlVXJsLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHNhbml0eS9ibG9jay1jb250ZW50LXRvLWh5cGVyc2NyaXB0L2xpYi9pbnRlcm5hbHMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8taHlwZXJzY3JpcHQvbGliL21lcmdlU2VyaWFsaXplcnMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8taHlwZXJzY3JpcHQvbGliL25lc3RMaXN0cy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvYmxvY2stY29udGVudC10by1oeXBlcnNjcmlwdC9saWIvc2VyaWFsaXplcnMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8taHlwZXJzY3JpcHQvbm9kZV9tb2R1bGVzL0BzYW5pdHkvZ2VuZXJhdGUtaGVscC11cmwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8tcmVhY3QvbGliL0Jsb2NrQ29udGVudC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvYmxvY2stY29udGVudC10by1yZWFjdC9saWIvdGFyZ2V0cy9kb20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2ltYWdlLXVybC9saWIvYnJvd3Nlci9pbWFnZS11cmwudW1kLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYXJ0aWNsZXMvW3NsdWddLnRzeCIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQmFzZUJsb2NrQ29udGVudC50c3giLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0Jsb2dBcnRpY2xlSGVhZGVyLnRzeCIsIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvc2VyaWFsaXplci50c3giXSwibmFtZXMiOlsiUG9zdCIsInRpdGxlIiwiYnlsaW5lIiwicHVibGlzaGVkQXQiLCJuYW1lIiwiaW1hZ2VVcmwiLCJjYXRlZ29yaWVzIiwiYm9keSIsInciLCJoIiwiZml0IiwiY2xpZW50IiwiY29uZmlnIiwicXVlcnkiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0Iiwic2x1ZyIsImZldGNoIiwiQmFzZUJsb2NrQ29udGVudCIsImJsb2NrcyIsImNsYXNzTmFtZSIsInNlcmlhbGl6ZXJzIiwiQmxvZ0FydGljbGVIZWFkZXIiLCJhdXRob3IiLCJhdXRob3JJZCIsInR5cGVzIiwiQ29kZSIsIm5vZGUiLCJjb2RlIiwibGFuZ3VhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGlCQUFpQixtQkFBTyxDQUFDLDZGQUFpQjs7Ozs7Ozs7Ozs7OztBQ0E3Qjs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxnRkFBZTs7QUFFMUMscUJBQXFCLG1CQUFPLENBQUMsbUdBQWtCOztBQUUvQyxnQkFBZ0IsbUJBQU8sQ0FBQyx5RkFBYTs7QUFFckMsbUJBQW1CLG1CQUFPLENBQUMsK0ZBQWdCOztBQUUzQyx1QkFBdUIsbUJBQU8sQ0FBQyx1R0FBb0IsRUFBRTs7O0FBR3JEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRyxJQUFJOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMENBQTBDLFNBQVM7O0FBRW5EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGVBQWU7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLDhDQUE4QyxXQUFXO0FBQ3pEO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVFQUF1RSw2QkFBNkI7QUFDcEc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxzQkFBc0IsZ0JBQWdCLGVBQWUsZUFBZTtBQUN0SDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxLQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLElBQXFDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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RGhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFMSCxlQVFHO0FBQUcsZUFBUyxFQUFDLCtDQUFiO0FBQUEscUNBQ29CcEIsV0FEcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVJIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURIO0FBY0YsQ0FyQkQ7O0tBQU1tQixpQjtBQXVCU0EsZ0ZBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBU0EsTUFBTUQsV0FBVyxHQUFHO0FBQ2pCSSxPQUFLLEVBQUU7QUFDSkMsUUFBSSxFQUFFLENBQUM7QUFBRUMsVUFBSSxHQUFHO0FBQUVDLFlBQUksRUFBRTtBQUFSO0FBQVQsS0FBRCxLQUFtRDtBQUN0RCxZQUFNO0FBQUVBLFlBQUY7QUFBUUM7QUFBUixVQUFxQkYsSUFBM0I7O0FBQ0EsVUFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDUixlQUFPLElBQVA7QUFDRjs7QUFDRCwwQkFDRztBQUFLLHlCQUFlQyxRQUFwQjtBQUFBLCtCQUNHO0FBQU0sbUJBQVMsRUFBRyxZQUFXQSxRQUFTLEVBQXRDO0FBQUEsb0JBQTBDRDtBQUExQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESDtBQUtGO0FBWEc7QUFEVSxDQUFwQjtBQWdCZVAsMEVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvYXJ0aWNsZXMvW3NsdWddLjEyM2Q2MzkwNjdlNzVmYjQ5ZTE4LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2ludGVybmFscycpXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIGJ1aWxkTWFya3NUcmVlID0gcmVxdWlyZSgnLi9idWlsZE1hcmtzVHJlZScpO1xuXG52YXIgbmVzdExpc3RzID0gcmVxdWlyZSgnLi9uZXN0TGlzdHMnKTtcblxudmFyIGdlbmVyYXRlS2V5cyA9IHJlcXVpcmUoJy4vZ2VuZXJhdGVLZXlzJyk7XG5cbnZhciBtZXJnZVNlcmlhbGl6ZXJzID0gcmVxdWlyZSgnLi9tZXJnZVNlcmlhbGl6ZXJzJyk7IC8vIFByb3BlcnRpZXMgdG8gZXh0cmFjdCBmcm9tIHByb3BzIGFuZCBwYXNzIHRvIHNlcmlhbGl6ZXJzIGFzIG9wdGlvbnNcblxuXG52YXIgb3B0aW9uUHJvcHMgPSBbJ3Byb2plY3RJZCcsICdkYXRhc2V0JywgJ2ltYWdlT3B0aW9ucyddO1xuXG52YXIgaXNEZWZpbmVkID0gZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGltYWdlT3B0aW9uczoge31cbn07XG5cbmZ1bmN0aW9uIGJsb2Nrc1RvTm9kZXMoaCwgcHJvcGVydGllcywgZGVmYXVsdFNlcmlhbGl6ZXJzLCBzZXJpYWxpemVTcGFuKSB7XG4gIHZhciBwcm9wcyA9IG9iamVjdEFzc2lnbih7fSwgZGVmYXVsdHMsIHByb3BlcnRpZXMpO1xuICB2YXIgcmF3QmxvY2tzID0gQXJyYXkuaXNBcnJheShwcm9wcy5ibG9ja3MpID8gcHJvcHMuYmxvY2tzIDogW3Byb3BzLmJsb2Nrc107XG4gIHZhciBrZXllZEJsb2NrcyA9IGdlbmVyYXRlS2V5cyhyYXdCbG9ja3MpO1xuICB2YXIgYmxvY2tzID0gbmVzdExpc3RzKGtleWVkQmxvY2tzLCBwcm9wcy5saXN0TmVzdE1vZGUpO1xuICB2YXIgc2VyaWFsaXplcnMgPSBtZXJnZVNlcmlhbGl6ZXJzKGRlZmF1bHRTZXJpYWxpemVycywgcHJvcHMuc2VyaWFsaXplcnMgfHwge30pO1xuICB2YXIgb3B0aW9ucyA9IG9wdGlvblByb3BzLnJlZHVjZShmdW5jdGlvbiAob3B0cywga2V5KSB7XG4gICAgdmFyIHZhbHVlID0gcHJvcHNba2V5XTtcblxuICAgIGlmIChpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICBvcHRzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0cztcbiAgfSwge30pO1xuXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZU5vZGUobm9kZSwgaW5kZXgsIHNpYmxpbmdzLCBpc0lubGluZSkge1xuICAgIGlmIChpc0xpc3Qobm9kZSkpIHtcbiAgICAgIHJldHVybiBzZXJpYWxpemVMaXN0KG5vZGUpO1xuICAgIH1cblxuICAgIGlmIChpc0xpc3RJdGVtKG5vZGUpKSB7XG4gICAgICByZXR1cm4gc2VyaWFsaXplTGlzdEl0ZW0obm9kZSwgZmluZExpc3RJdGVtSW5kZXgobm9kZSwgc2libGluZ3MpKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTcGFuKG5vZGUpKSB7XG4gICAgICByZXR1cm4gc2VyaWFsaXplU3Bhbihub2RlLCBzZXJpYWxpemVycywgaW5kZXgsIHtcbiAgICAgICAgc2VyaWFsaXplTm9kZTogc2VyaWFsaXplTm9kZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZUJsb2NrKG5vZGUsIGluZGV4LCBpc0lubGluZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kTGlzdEl0ZW1JbmRleChub2RlLCBzaWJsaW5ncykge1xuICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpYmxpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2libGluZ3NbaV0gPT09IG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTGlzdEl0ZW0oc2libGluZ3NbaV0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZUJsb2NrKGJsb2NrLCBpbmRleCwgaXNJbmxpbmUpIHtcbiAgICB2YXIgdHJlZSA9IGJ1aWxkTWFya3NUcmVlKGJsb2NrKTtcbiAgICB2YXIgY2hpbGRyZW4gPSB0cmVlLm1hcChmdW5jdGlvbiAobm9kZSwgaSwgc2libGluZ3MpIHtcbiAgICAgIHJldHVybiBzZXJpYWxpemVOb2RlKG5vZGUsIGksIHNpYmxpbmdzLCB0cnVlKTtcbiAgICB9KTtcbiAgICB2YXIgYmxvY2tQcm9wcyA9IHtcbiAgICAgIGtleTogYmxvY2suX2tleSB8fCBcImJsb2NrLVwiLmNvbmNhdChpbmRleCksXG4gICAgICBub2RlOiBibG9jayxcbiAgICAgIGlzSW5saW5lOiBpc0lubGluZSxcbiAgICAgIHNlcmlhbGl6ZXJzOiBzZXJpYWxpemVycyxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9O1xuICAgIHJldHVybiBoKHNlcmlhbGl6ZXJzLmJsb2NrLCBibG9ja1Byb3BzLCBjaGlsZHJlbik7XG4gIH1cblxuICBmdW5jdGlvbiBzZXJpYWxpemVMaXN0SXRlbShibG9jaywgaW5kZXgpIHtcbiAgICB2YXIga2V5ID0gYmxvY2suX2tleTtcbiAgICB2YXIgdHJlZSA9IGJ1aWxkTWFya3NUcmVlKGJsb2NrKTtcbiAgICB2YXIgY2hpbGRyZW4gPSB0cmVlLm1hcChzZXJpYWxpemVOb2RlKTtcbiAgICByZXR1cm4gaChzZXJpYWxpemVycy5saXN0SXRlbSwge1xuICAgICAgbm9kZTogYmxvY2ssXG4gICAgICBzZXJpYWxpemVyczogc2VyaWFsaXplcnMsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBrZXk6IGtleSxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9LCBjaGlsZHJlbik7XG4gIH1cblxuICBmdW5jdGlvbiBzZXJpYWxpemVMaXN0KGxpc3QpIHtcbiAgICB2YXIgdHlwZSA9IGxpc3QubGlzdEl0ZW07XG4gICAgdmFyIGxldmVsID0gbGlzdC5sZXZlbDtcbiAgICB2YXIga2V5ID0gbGlzdC5fa2V5O1xuICAgIHZhciBjaGlsZHJlbiA9IGxpc3QuY2hpbGRyZW4ubWFwKHNlcmlhbGl6ZU5vZGUpO1xuICAgIHJldHVybiBoKHNlcmlhbGl6ZXJzLmxpc3QsIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgbGV2ZWw6IGxldmVsLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9LCBjaGlsZHJlbik7XG4gIH0gLy8gRGVmYXVsdCB0byBmYWxzZSwgc28gYHVuZGVmaW5lZGAgd2lsbCBldmFsdWF0ZSB0byB0aGUgZGVmYXVsdCBoZXJlXG5cblxuICB2YXIgcmVuZGVyQ29udGFpbmVyT25TaW5nbGVDaGlsZCA9IEJvb2xlYW4ocHJvcHMucmVuZGVyQ29udGFpbmVyT25TaW5nbGVDaGlsZCk7XG4gIHZhciBub2RlcyA9IGJsb2Nrcy5tYXAoc2VyaWFsaXplTm9kZSk7XG5cbiAgaWYgKHJlbmRlckNvbnRhaW5lck9uU2luZ2xlQ2hpbGQgfHwgbm9kZXMubGVuZ3RoID4gMSkge1xuICAgIHZhciBjb250YWluZXJQcm9wcyA9IHByb3BzLmNsYXNzTmFtZSA/IHtcbiAgICAgIGNsYXNzTmFtZTogcHJvcHMuY2xhc3NOYW1lXG4gICAgfSA6IHt9O1xuICAgIHJldHVybiBoKHNlcmlhbGl6ZXJzLmNvbnRhaW5lciwgY29udGFpbmVyUHJvcHMsIG5vZGVzKTtcbiAgfVxuXG4gIGlmIChub2Rlc1swXSkge1xuICAgIHJldHVybiBub2Rlc1swXTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygc2VyaWFsaXplcnMuZW1wdHkgPT09ICdmdW5jdGlvbicgPyBoKHNlcmlhbGl6ZXJzLmVtcHR5KSA6IHNlcmlhbGl6ZXJzLmVtcHR5O1xufVxuXG5mdW5jdGlvbiBpc0xpc3QoYmxvY2spIHtcbiAgcmV0dXJuIGJsb2NrLl90eXBlID09PSAnbGlzdCcgJiYgYmxvY2subGlzdEl0ZW07XG59XG5cbmZ1bmN0aW9uIGlzTGlzdEl0ZW0oYmxvY2spIHtcbiAgcmV0dXJuIGJsb2NrLl90eXBlID09PSAnYmxvY2snICYmIGJsb2NrLmxpc3RJdGVtO1xufVxuXG5mdW5jdGlvbiBpc1NwYW4oYmxvY2spIHtcbiAgcmV0dXJuIHR5cGVvZiBibG9jayA9PT0gJ3N0cmluZycgfHwgYmxvY2subWFya3MgfHwgYmxvY2suX3R5cGUgPT09ICdzcGFuJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9ja3NUb05vZGVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmxvY2tzVG9Ob2Rlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGRlZmF1bHRNYXJrcyA9IFsnc3Ryb25nJywgJ2VtJywgJ2NvZGUnLCAndW5kZXJsaW5lJywgJ3N0cmlrZS10aHJvdWdoJ107XG5cbnZhciBidWlsZE1hcmtzVHJlZSA9IGZ1bmN0aW9uIGJ1aWxkTWFya3NUcmVlKGJsb2NrKSB7XG4gIHZhciBjaGlsZHJlbiA9IGJsb2NrLmNoaWxkcmVuLFxuICAgICAgbWFya0RlZnMgPSBibG9jay5tYXJrRGVmcztcblxuICBpZiAoIWNoaWxkcmVuIHx8ICFjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgc29ydGVkTWFya3MgPSBjaGlsZHJlbi5tYXAoc29ydE1hcmtzQnlPY2N1cmVuY2VzKTtcbiAgdmFyIHJvb3ROb2RlID0ge1xuICAgIF90eXBlOiAnc3BhbicsXG4gICAgY2hpbGRyZW46IFtdXG4gIH07XG4gIHZhciBub2RlU3RhY2sgPSBbcm9vdE5vZGVdO1xuICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChzcGFuLCBpKSB7XG4gICAgdmFyIG1hcmtzTmVlZGVkID0gc29ydGVkTWFya3NbaV07XG5cbiAgICBpZiAoIW1hcmtzTmVlZGVkKSB7XG4gICAgICB2YXIgbGFzdE5vZGUgPSBub2RlU3RhY2tbbm9kZVN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgbGFzdE5vZGUuY2hpbGRyZW4ucHVzaChzcGFuKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcG9zID0gMTsgLy8gU3RhcnQgYXQgcG9zaXRpb24gb25lLiBSb290IGlzIGFsd2F5cyBwbGFpbiBhbmQgc2hvdWxkIG5ldmVyIGJlIHJlbW92ZWQuICg/KVxuXG4gICAgaWYgKG5vZGVTdGFjay5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKHBvczsgcG9zIDwgbm9kZVN0YWNrLmxlbmd0aDsgcG9zKyspIHtcbiAgICAgICAgdmFyIG1hcmsgPSBub2RlU3RhY2tbcG9zXS5tYXJrS2V5O1xuICAgICAgICB2YXIgaW5kZXggPSBtYXJrc05lZWRlZC5pbmRleE9mKG1hcmspOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWRlcHRoXG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFya3NOZWVkZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9IC8vIEtlZXAgZnJvbSBiZWdpbm5pbmcgdG8gZmlyc3QgbWlzc1xuXG5cbiAgICBub2RlU3RhY2sgPSBub2RlU3RhY2suc2xpY2UoMCwgcG9zKTsgLy8gQWRkIG5lZWRlZCBub2Rlc1xuXG4gICAgdmFyIGN1cnJlbnROb2RlID0gZmluZExhc3RQYXJlbnROb2RlKG5vZGVTdGFjayk7XG4gICAgbWFya3NOZWVkZWQuZm9yRWFjaChmdW5jdGlvbiAobWFyaykge1xuICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgIF90eXBlOiAnc3BhbicsXG4gICAgICAgIF9rZXk6IHNwYW4uX2tleSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBtYXJrOiBtYXJrRGVmcy5maW5kKGZ1bmN0aW9uIChkZWYpIHtcbiAgICAgICAgICByZXR1cm4gZGVmLl9rZXkgPT09IG1hcms7XG4gICAgICAgIH0pIHx8IG1hcmssXG4gICAgICAgIG1hcmtLZXk6IG1hcmtcbiAgICAgIH07XG4gICAgICBjdXJyZW50Tm9kZS5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgICAgbm9kZVN0YWNrLnB1c2gobm9kZSk7XG4gICAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgfSk7IC8vIFNwbGl0IGF0IG5ld2xpbmVzIHRvIG1ha2UgaW5kaXZpZHVhbCBsaW5lIGNodW5rcywgYnV0IGtlZXAgbmV3bGluZVxuICAgIC8vIGNoYXJhY3RlcnMgYXMgaW5kaXZpZHVhbCBlbGVtZW50cyBpbiB0aGUgYXJyYXkuIFdlIHVzZSB0aGVzZSBjaGFyYWN0ZXJzXG4gICAgLy8gaW4gdGhlIHNwYW4gc2VyaWFsaXplciB0byB0cmlnZ2VyIGhhcmQtYnJlYWsgcmVuZGVyaW5nXG5cbiAgICBpZiAoaXNUZXh0U3BhbihzcGFuKSkge1xuICAgICAgdmFyIGxpbmVzID0gc3Bhbi50ZXh0LnNwbGl0KCdcXG4nKTtcblxuICAgICAgZm9yICh2YXIgbGluZSA9IGxpbmVzLmxlbmd0aDsgbGluZS0tID4gMTspIHtcbiAgICAgICAgbGluZXMuc3BsaWNlKGxpbmUsIDAsICdcXG4nKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudE5vZGUuY2hpbGRyZW4gPSBjdXJyZW50Tm9kZS5jaGlsZHJlbi5jb25jYXQobGluZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50Tm9kZS5jaGlsZHJlbiA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmNvbmNhdChzcGFuKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcm9vdE5vZGUuY2hpbGRyZW47XG59OyAvLyBXZSB3YW50IHRvIHNvcnQgYWxsIHRoZSBtYXJrcyBvZiBhbGwgdGhlIHNwYW5zIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6XG4vLyAxLiBNYXJrcyB0aGF0IGFyZSBzaGFyZWQgYW1vbmdzdCB0aGUgbW9zdCBhZGphY2VudCBzaWJsaW5nc1xuLy8gMi4gTm9uLWRlZmF1bHQgbWFya3MgKGxpbmtzLCBjdXN0b20gbWV0YWRhdGEpXG4vLyAzLiBCdWlsdC1pbiwgcGxhaW4gbWFya3MgKGJvbGQsIGVtcGhhc2lzLCBjb2RlIGV0YylcblxuXG5mdW5jdGlvbiBzb3J0TWFya3NCeU9jY3VyZW5jZXMoc3BhbiwgaSwgc3BhbnMpIHtcbiAgaWYgKCFzcGFuLm1hcmtzIHx8IHNwYW4ubWFya3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHNwYW4ubWFya3MgfHwgW107XG4gIH1cblxuICB2YXIgbWFya09jY3VyZW5jZXMgPSBzcGFuLm1hcmtzLnJlZHVjZShmdW5jdGlvbiAob2NjdXJlbmNlcywgbWFyaykge1xuICAgIG9jY3VyZW5jZXNbbWFya10gPSBvY2N1cmVuY2VzW21hcmtdID8gb2NjdXJlbmNlc1ttYXJrXSArIDEgOiAxO1xuXG4gICAgZm9yICh2YXIgc2libGluZ0luZGV4ID0gaSArIDE7IHNpYmxpbmdJbmRleCA8IHNwYW5zLmxlbmd0aDsgc2libGluZ0luZGV4KyspIHtcbiAgICAgIHZhciBzaWJsaW5nID0gc3BhbnNbc2libGluZ0luZGV4XTtcblxuICAgICAgaWYgKHNpYmxpbmcubWFya3MgJiYgQXJyYXkuaXNBcnJheShzaWJsaW5nLm1hcmtzKSAmJiBzaWJsaW5nLm1hcmtzLmluZGV4T2YobWFyaykgIT09IC0xKSB7XG4gICAgICAgIG9jY3VyZW5jZXNbbWFya10rKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvY2N1cmVuY2VzO1xuICB9LCB7fSk7XG4gIHZhciBzb3J0QnlPY2N1cmVuY2UgPSBzb3J0TWFya3MuYmluZChudWxsLCBtYXJrT2NjdXJlbmNlcyk7IC8vIFNsaWNpbmcgYmVjYXVzZSBzb3J0KCkgbXV0YXRlcyB0aGUgaW5wdXRcblxuICByZXR1cm4gc3Bhbi5tYXJrcy5zbGljZSgpLnNvcnQoc29ydEJ5T2NjdXJlbmNlKTtcbn1cblxuZnVuY3Rpb24gc29ydE1hcmtzKG9jY3VyZW5jZXMsIG1hcmtBLCBtYXJrQikge1xuICB2YXIgYU9jY3VyZW5jZXMgPSBvY2N1cmVuY2VzW21hcmtBXSB8fCAwO1xuICB2YXIgYk9jY3VyZW5jZXMgPSBvY2N1cmVuY2VzW21hcmtCXSB8fCAwO1xuXG4gIGlmIChhT2NjdXJlbmNlcyAhPT0gYk9jY3VyZW5jZXMpIHtcbiAgICByZXR1cm4gYk9jY3VyZW5jZXMgLSBhT2NjdXJlbmNlcztcbiAgfVxuXG4gIHZhciBhRGVmYXVsdFBvcyA9IGRlZmF1bHRNYXJrcy5pbmRleE9mKG1hcmtBKTtcbiAgdmFyIGJEZWZhdWx0UG9zID0gZGVmYXVsdE1hcmtzLmluZGV4T2YobWFya0IpOyAvLyBTb3J0IGRlZmF1bHQgbWFya3MgbGFzdFxuXG4gIGlmIChhRGVmYXVsdFBvcyAhPT0gYkRlZmF1bHRQb3MpIHtcbiAgICByZXR1cm4gYURlZmF1bHRQb3MgLSBiRGVmYXVsdFBvcztcbiAgfSAvLyBTb3J0IG90aGVyIG1hcmtzIHNpbXBseSBieSBrZXlcblxuXG4gIGlmIChtYXJrQSA8IG1hcmtCKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKG1hcmtBID4gbWFya0IpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBpc1RleHRTcGFuKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuX3R5cGUgPT09ICdzcGFuJyAmJiB0eXBlb2Ygbm9kZS50ZXh0ID09PSAnc3RyaW5nJyAmJiAoQXJyYXkuaXNBcnJheShub2RlLm1hcmtzKSB8fCB0eXBlb2Ygbm9kZS5tYXJrcyA9PT0gJ3VuZGVmaW5lZCcpO1xufVxuXG5mdW5jdGlvbiBmaW5kTGFzdFBhcmVudE5vZGUobm9kZXMpIHtcbiAgZm9yICh2YXIgaSA9IG5vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcblxuICAgIGlmIChub2RlLl90eXBlID09PSAnc3BhbicgJiYgbm9kZS5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZE1hcmtzVHJlZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1aWxkTWFya3NUcmVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChibG9ja3MpIHtcbiAgcmV0dXJuIGJsb2Nrcy5tYXAoZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgaWYgKGJsb2NrLl9rZXkpIHtcbiAgICAgIHJldHVybiBibG9jaztcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0QXNzaWduKHtcbiAgICAgIF9rZXk6IGdldFN0YXRpY0tleShibG9jaylcbiAgICB9LCBibG9jayk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0U3RhdGljS2V5KGl0ZW0pIHtcbiAgcmV0dXJuIGNoZWNrc3VtKEpTT04uc3RyaW5naWZ5KGl0ZW0pKS50b1N0cmluZygzNikucmVwbGFjZSgvW15BLVphLXowLTldL2csICcnKTtcbn1cbi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblxuXG5mdW5jdGlvbiBjaGVja3N1bShzdHIpIHtcbiAgdmFyIGhhc2ggPSAwO1xuICB2YXIgc3RybGVuID0gc3RyLmxlbmd0aDtcblxuICBpZiAoc3RybGVuID09PSAwKSB7XG4gICAgcmV0dXJuIGhhc2g7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmxlbjsgaSsrKSB7XG4gICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggJj0gaGFzaDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gaGFzaDtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2VuZXJhdGVLZXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2VuZXJhdGVIZWxwVXJsID0gcmVxdWlyZSgnQHNhbml0eS9nZW5lcmF0ZS1oZWxwLXVybCcpO1xuXG52YXIgdXJsQnVpbGRlciA9IHJlcXVpcmUoJ0BzYW5pdHkvaW1hZ2UtdXJsJyk7XG5cbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBlbmMgPSBlbmNvZGVVUklDb21wb25lbnQ7XG52YXIgbWF0ZXJpYWxpemVFcnJvciA9IFwiWW91IG11c3QgZWl0aGVyOlxcbiAgLSBQYXNzIGBwcm9qZWN0SWRgIGFuZCBgZGF0YXNldGAgdG8gdGhlIGJsb2NrIHJlbmRlcmVyXFxuICAtIE1hdGVyaWFsaXplIGltYWdlcyB0byBpbmNsdWRlIHRoZSBgdXJsYCBmaWVsZC5cXG5cXG5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIFwiLmNvbmNhdChnZW5lcmF0ZUhlbHBVcmwoJ2Jsb2NrLWNvbnRlbnQtaW1hZ2UtbWF0ZXJpYWxpemluZycpKTtcblxudmFyIGdldFF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gZ2V0UXVlcnlTdHJpbmcob3B0aW9ucykge1xuICB2YXIgcXVlcnkgPSBvcHRpb25zLmltYWdlT3B0aW9ucztcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG5cbiAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHZhciBwYXJhbXMgPSBrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGVuYyhrZXkpLCBcIj1cIikuY29uY2F0KGVuYyhxdWVyeVtrZXldKSk7XG4gIH0pO1xuICByZXR1cm4gXCI/XCIuY29uY2F0KHBhcmFtcy5qb2luKCcmJykpO1xufTtcblxudmFyIGJ1aWxkVXJsID0gZnVuY3Rpb24gYnVpbGRVcmwocHJvcHMpIHtcbiAgdmFyIG5vZGUgPSBwcm9wcy5ub2RlLFxuICAgICAgb3B0aW9ucyA9IHByb3BzLm9wdGlvbnM7XG4gIHZhciBwcm9qZWN0SWQgPSBvcHRpb25zLnByb2plY3RJZCxcbiAgICAgIGRhdGFzZXQgPSBvcHRpb25zLmRhdGFzZXQ7XG4gIHZhciBhc3NldCA9IG5vZGUuYXNzZXQ7XG5cbiAgaWYgKCFhc3NldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgZG9lcyBub3QgaGF2ZSByZXF1aXJlZCBgYXNzZXRgIHByb3BlcnR5Jyk7XG4gIH1cblxuICBpZiAoYXNzZXQudXJsKSB7XG4gICAgcmV0dXJuIGFzc2V0LnVybCArIGdldFF1ZXJ5U3RyaW5nKG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKCFwcm9qZWN0SWQgfHwgIWRhdGFzZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWF0ZXJpYWxpemVFcnJvcik7XG4gIH1cblxuICB2YXIgcmVmID0gYXNzZXQuX3JlZjtcblxuICBpZiAoIXJlZikge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbWFnZSByZWZlcmVuY2UgaW4gYmxvY2ssIG5vIGBfcmVmYCBmb3VuZCBvbiBgYXNzZXRgJyk7XG4gIH1cblxuICByZXR1cm4gdXJsQnVpbGRlcihvYmplY3RBc3NpZ24oe1xuICAgIHByb2plY3RJZDogcHJvamVjdElkLFxuICAgIGRhdGFzZXQ6IGRhdGFzZXRcbiAgfSwgb3B0aW9ucy5pbWFnZU9wdGlvbnMgfHwge30pKS5pbWFnZShub2RlKS50b1N0cmluZygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZFVybDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldEltYWdlVXJsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2V0U2VyaWFsaXplcnMgPSByZXF1aXJlKCcuL3NlcmlhbGl6ZXJzJyk7XG5cbnZhciBfYmxvY2tzVG9Ob2RlcyA9IHJlcXVpcmUoJy4vYmxvY2tzVG9Ob2RlcycpO1xuXG52YXIgZ2V0SW1hZ2VVcmwgPSByZXF1aXJlKCcuL2dldEltYWdlVXJsJyk7XG5cbnZhciBtZXJnZVNlcmlhbGl6ZXJzID0gcmVxdWlyZSgnLi9tZXJnZVNlcmlhbGl6ZXJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBibG9ja3NUb05vZGVzOiBmdW5jdGlvbiBibG9ja3NUb05vZGVzKHJlbmRlck5vZGUsIHByb3BzLCBkZWZhdWx0U2VyaWFsaXplcnMsIHNlcmlhbGl6ZVNwYW4pIHtcbiAgICBpZiAoZGVmYXVsdFNlcmlhbGl6ZXJzKSB7XG4gICAgICByZXR1cm4gX2Jsb2Nrc1RvTm9kZXMocmVuZGVyTm9kZSwgcHJvcHMsIGRlZmF1bHRTZXJpYWxpemVycywgc2VyaWFsaXplU3Bhbik7XG4gICAgfSAvLyBCYWNrd2FyZHMtY29tcGF0aWJpbGl0eVxuXG5cbiAgICB2YXIgc2VyaWFsaXplcnMgPSBnZXRTZXJpYWxpemVycyhyZW5kZXJOb2RlKTtcbiAgICByZXR1cm4gX2Jsb2Nrc1RvTm9kZXMocmVuZGVyTm9kZSwgcHJvcHMsIHNlcmlhbGl6ZXJzLmRlZmF1bHRTZXJpYWxpemVycywgc2VyaWFsaXplcnMuc2VyaWFsaXplU3Bhbik7XG4gIH0sXG4gIGdldFNlcmlhbGl6ZXJzOiBnZXRTZXJpYWxpemVycyxcbiAgZ2V0SW1hZ2VVcmw6IGdldEltYWdlVXJsLFxuICBtZXJnZVNlcmlhbGl6ZXJzOiBtZXJnZVNlcmlhbGl6ZXJzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJuYWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgaXNEZWZpbmVkID0gZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59OyAvLyBSZWN1cnNpdmVseSBtZXJnZS9yZXBsYWNlIGRlZmF1bHQgc2VyaWFsaXplcnMgd2l0aCB1c2VyLXNwZWNpZmllZCBzZXJpYWxpemVyc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VTZXJpYWxpemVycyhkZWZhdWx0U2VyaWFsaXplcnMsIHVzZXJTZXJpYWxpemVycykge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZGVmYXVsdFNlcmlhbGl6ZXJzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgdmFyIHR5cGUgPSBfdHlwZW9mKGRlZmF1bHRTZXJpYWxpemVyc1trZXldKTtcblxuICAgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhY2Nba2V5XSA9IGlzRGVmaW5lZCh1c2VyU2VyaWFsaXplcnNba2V5XSkgPyB1c2VyU2VyaWFsaXplcnNba2V5XSA6IGRlZmF1bHRTZXJpYWxpemVyc1trZXldO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGFjY1trZXldID0gb2JqZWN0QXNzaWduKHt9LCBkZWZhdWx0U2VyaWFsaXplcnNba2V5XSwgdXNlclNlcmlhbGl6ZXJzW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY2Nba2V5XSA9IHR5cGVvZiB1c2VyU2VyaWFsaXplcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0U2VyaWFsaXplcnNba2V5XSA6IHVzZXJTZXJpYWxpemVyc1trZXldO1xuICAgIH1cblxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZVNlcmlhbGl6ZXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWRlcHRoLCBjb21wbGV4aXR5ICovXG5cblxuZnVuY3Rpb24gbmVzdExpc3RzKGJsb2Nrcykge1xuICB2YXIgbW9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2h0bWwnO1xuICB2YXIgdHJlZSA9IFtdO1xuICB2YXIgY3VycmVudExpc3Q7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYmxvY2sgPSBibG9ja3NbaV07XG5cbiAgICBpZiAoIWlzTGlzdEJsb2NrKGJsb2NrKSkge1xuICAgICAgdHJlZS5wdXNoKGJsb2NrKTtcbiAgICAgIGN1cnJlbnRMaXN0ID0gbnVsbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gLy8gU3RhcnQgb2YgYSBuZXcgbGlzdD9cblxuXG4gICAgaWYgKCFjdXJyZW50TGlzdCkge1xuICAgICAgY3VycmVudExpc3QgPSBsaXN0RnJvbUJsb2NrKGJsb2NrKTtcbiAgICAgIHRyZWUucHVzaChjdXJyZW50TGlzdCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9IC8vIE5ldyBsaXN0IGl0ZW0gd2l0aGluIHNhbWUgbGlzdD9cblxuXG4gICAgaWYgKGJsb2NrTWF0Y2hlc0xpc3QoYmxvY2ssIGN1cnJlbnRMaXN0KSkge1xuICAgICAgY3VycmVudExpc3QuY2hpbGRyZW4ucHVzaChibG9jayk7XG4gICAgICBjb250aW51ZTtcbiAgICB9IC8vIERpZmZlcmVudCBsaXN0IHByb3BzLCBhcmUgd2UgZ29pbmcgZGVlcGVyP1xuXG5cbiAgICBpZiAoYmxvY2subGV2ZWwgPiBjdXJyZW50TGlzdC5sZXZlbCkge1xuICAgICAgdmFyIG5ld0xpc3QgPSBsaXN0RnJvbUJsb2NrKGJsb2NrKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdodG1sJykge1xuICAgICAgICAvLyBCZWNhdXNlIEhUTUwgaXMga2luZGEgd2VpcmQsIG5lc3RlZCBsaXN0cyBuZWVkcyB0byBiZSBuZXN0ZWQgd2l0aGluIGxpc3QgaXRlbXNcbiAgICAgICAgLy8gU28gd2hpbGUgeW91IHdvdWxkIHRoaW5rIHRoYXQgd2UgY291bGQgcG9wdWxhdGUgdGhlIHBhcmVudCBsaXN0IHdpdGggYSBuZXcgc3ViLWxpc3QsXG4gICAgICAgIC8vIFdlIGFjdHVhbGx5IGhhdmUgdG8gdGFyZ2V0IHRoZSBsYXN0IGxpc3QgZWxlbWVudCAoY2hpbGQpIG9mIHRoZSBwYXJlbnQuXG4gICAgICAgIC8vIEhvd2V2ZXIsIGF0IHRoaXMgcG9pbnQgd2UgbmVlZCB0byBiZSB2ZXJ5IGNhcmVmdWwgLSBzaW1wbHkgcHVzaGluZyB0byB0aGUgbGlzdCBvZiBjaGlsZHJlblxuICAgICAgICAvLyB3aWxsIG11dGF0ZSB0aGUgaW5wdXQsIGFuZCB3ZSBkb24ndCB3YW50IHRvIGJsaW5kbHkgY2xvbmUgdGhlIGVudGlyZSB0cmVlLlxuICAgICAgICAvLyBDbG9uZSB0aGUgbGFzdCBjaGlsZCB3aGlsZSBhZGRpbmcgb3VyIG5ldyBsaXN0IGFzIHRoZSBsYXN0IGNoaWxkIG9mIGl0XG4gICAgICAgIHZhciBsYXN0TGlzdEl0ZW0gPSBsYXN0Q2hpbGQoY3VycmVudExpc3QpO1xuICAgICAgICB2YXIgbmV3TGFzdENoaWxkID0gb2JqZWN0QXNzaWduKHt9LCBsYXN0TGlzdEl0ZW0sIHtcbiAgICAgICAgICBjaGlsZHJlbjogbGFzdExpc3RJdGVtLmNoaWxkcmVuLmNvbmNhdChuZXdMaXN0KVxuICAgICAgICB9KTsgLy8gU3dhcCB0aGUgbGFzdCBjaGlsZFxuXG4gICAgICAgIGN1cnJlbnRMaXN0LmNoaWxkcmVuW2N1cnJlbnRMaXN0LmNoaWxkcmVuLmxlbmd0aCAtIDFdID0gbmV3TGFzdENoaWxkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudExpc3QuY2hpbGRyZW4ucHVzaChuZXdMaXN0KTtcbiAgICAgIH0gLy8gU2V0IHRoZSBuZXdseSBjcmVhdGVkLCBkZWVwZXIgbGlzdCBhcyB0aGUgY3VycmVudFxuXG5cbiAgICAgIGN1cnJlbnRMaXN0ID0gbmV3TGlzdDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gLy8gRGlmZmVyZW50IGxpc3QgcHJvcHMsIGFyZSB3ZSBnb2luZyBiYWNrIHVwIHRoZSB0cmVlP1xuXG5cbiAgICBpZiAoYmxvY2subGV2ZWwgPCBjdXJyZW50TGlzdC5sZXZlbCkge1xuICAgICAgLy8gQ3VycmVudCBsaXN0IGhhcyBlbmRlZCwgYW5kIHdlIG5lZWQgdG8gaG9vayB1cCB3aXRoIGEgcGFyZW50IG9mIHRoZSBzYW1lIGxldmVsIGFuZCB0eXBlXG4gICAgICB2YXIgbWF0Y2ggPSBmaW5kTGlzdE1hdGNoaW5nKHRyZWVbdHJlZS5sZW5ndGggLSAxXSwgYmxvY2spO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY3VycmVudExpc3QgPSBtYXRjaDtcbiAgICAgICAgY3VycmVudExpc3QuY2hpbGRyZW4ucHVzaChibG9jayk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSAvLyBTaW1pbGFyIHBhcmVudCBjYW4ndCBiZSBmb3VuZCwgYXNzdW1lIG5ldyBsaXN0XG5cblxuICAgICAgY3VycmVudExpc3QgPSBsaXN0RnJvbUJsb2NrKGJsb2NrKTtcbiAgICAgIHRyZWUucHVzaChjdXJyZW50TGlzdCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9IC8vIERpZmZlcmVudCBsaXN0IHByb3BzLCBkaWZmZXJlbnQgbGlzdCBzdHlsZT9cblxuXG4gICAgaWYgKGJsb2NrLmxpc3RJdGVtICE9PSBjdXJyZW50TGlzdC5saXN0SXRlbSkge1xuICAgICAgdmFyIF9tYXRjaCA9IGZpbmRMaXN0TWF0Y2hpbmcodHJlZVt0cmVlLmxlbmd0aCAtIDFdLCB7XG4gICAgICAgIGxldmVsOiBibG9jay5sZXZlbFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChfbWF0Y2ggJiYgX21hdGNoLmxpc3RJdGVtID09PSBibG9jay5saXN0SXRlbSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IF9tYXRjaDtcbiAgICAgICAgY3VycmVudExpc3QuY2hpbGRyZW4ucHVzaChibG9jayk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudExpc3QgPSBsaXN0RnJvbUJsb2NrKGJsb2NrKTtcbiAgICAgICAgdHJlZS5wdXNoKGN1cnJlbnRMaXN0KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG5cbiAgICBjb25zb2xlLndhcm4oJ1Vua25vd24gc3RhdGUgZW5jb3VudGVyZWQgZm9yIGJsb2NrJywgYmxvY2spO1xuICAgIHRyZWUucHVzaChibG9jayk7XG4gIH1cblxuICByZXR1cm4gdHJlZTtcbn1cblxuZnVuY3Rpb24gaXNMaXN0QmxvY2soYmxvY2spIHtcbiAgcmV0dXJuIEJvb2xlYW4oYmxvY2subGlzdEl0ZW0pO1xufVxuXG5mdW5jdGlvbiBibG9ja01hdGNoZXNMaXN0KGJsb2NrLCBsaXN0KSB7XG4gIHJldHVybiBibG9jay5sZXZlbCA9PT0gbGlzdC5sZXZlbCAmJiBibG9jay5saXN0SXRlbSA9PT0gbGlzdC5saXN0SXRlbTtcbn1cblxuZnVuY3Rpb24gbGlzdEZyb21CbG9jayhibG9jaykge1xuICByZXR1cm4ge1xuICAgIF90eXBlOiAnbGlzdCcsXG4gICAgX2tleTogXCJcIi5jb25jYXQoYmxvY2suX2tleSwgXCItcGFyZW50XCIpLFxuICAgIGxldmVsOiBibG9jay5sZXZlbCxcbiAgICBsaXN0SXRlbTogYmxvY2subGlzdEl0ZW0sXG4gICAgY2hpbGRyZW46IFtibG9ja11cbiAgfTtcbn1cblxuZnVuY3Rpb24gbGFzdENoaWxkKGJsb2NrKSB7XG4gIHJldHVybiBibG9jay5jaGlsZHJlbiAmJiBibG9jay5jaGlsZHJlbltibG9jay5jaGlsZHJlbi5sZW5ndGggLSAxXTtcbn1cblxuZnVuY3Rpb24gZmluZExpc3RNYXRjaGluZyhyb290Tm9kZSwgbWF0Y2hpbmcpIHtcbiAgdmFyIGZpbHRlck9uVHlwZSA9IHR5cGVvZiBtYXRjaGluZy5saXN0SXRlbSA9PT0gJ3N0cmluZyc7XG5cbiAgaWYgKHJvb3ROb2RlLl90eXBlID09PSAnbGlzdCcgJiYgcm9vdE5vZGUubGV2ZWwgPT09IG1hdGNoaW5nLmxldmVsICYmIGZpbHRlck9uVHlwZSAmJiByb290Tm9kZS5saXN0SXRlbSA9PT0gbWF0Y2hpbmcubGlzdEl0ZW0pIHtcbiAgICByZXR1cm4gcm9vdE5vZGU7XG4gIH1cblxuICB2YXIgbm9kZSA9IGxhc3RDaGlsZChyb290Tm9kZSk7XG5cbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGZpbmRMaXN0TWF0Y2hpbmcobm9kZSwgbWF0Y2hpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5lc3RMaXN0cztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5lc3RMaXN0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIGdldEltYWdlVXJsID0gcmVxdWlyZSgnLi9nZXRJbWFnZVVybCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoLCBzZXJpYWxpemVyT3B0cykge1xuICB2YXIgc2VyaWFsaXplT3B0aW9ucyA9IHNlcmlhbGl6ZXJPcHRzIHx8IHtcbiAgICB1c2VEYXNoZWRTdHlsZXM6IGZhbHNlIC8vIExvdy1sZXZlbCBibG9jayBzZXJpYWxpemVyXG5cbiAgfTtcblxuICBmdW5jdGlvbiBCbG9ja1NlcmlhbGl6ZXIocHJvcHMpIHtcbiAgICB2YXIgbm9kZSA9IHByb3BzLm5vZGUsXG4gICAgICAgIHNlcmlhbGl6ZXJzID0gcHJvcHMuc2VyaWFsaXplcnMsXG4gICAgICAgIG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zLFxuICAgICAgICBpc0lubGluZSA9IHByb3BzLmlzSW5saW5lLFxuICAgICAgICBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuO1xuICAgIHZhciBibG9ja1R5cGUgPSBub2RlLl90eXBlO1xuICAgIHZhciBzZXJpYWxpemVyID0gc2VyaWFsaXplcnMudHlwZXNbYmxvY2tUeXBlXTtcblxuICAgIGlmICghc2VyaWFsaXplcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBibG9jayB0eXBlIFxcXCJcIi5jb25jYXQoYmxvY2tUeXBlLCBcIlxcXCIsIHBsZWFzZSBzcGVjaWZ5IGEgc2VyaWFsaXplciBmb3IgaXQgaW4gdGhlIGBzZXJpYWxpemVycy50eXBlc2AgcHJvcFwiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGgoc2VyaWFsaXplciwge1xuICAgICAgbm9kZTogbm9kZSxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICBpc0lubGluZTogaXNJbmxpbmVcbiAgICB9LCBjaGlsZHJlbik7XG4gIH0gLy8gTG93LWxldmVsIHNwYW4gc2VyaWFsaXplclxuXG5cbiAgZnVuY3Rpb24gU3BhblNlcmlhbGl6ZXIocHJvcHMpIHtcbiAgICB2YXIgX3Byb3BzJG5vZGUgPSBwcm9wcy5ub2RlLFxuICAgICAgICBtYXJrID0gX3Byb3BzJG5vZGUubWFyayxcbiAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMkbm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgaXNQbGFpbiA9IHR5cGVvZiBtYXJrID09PSAnc3RyaW5nJztcbiAgICB2YXIgbWFya1R5cGUgPSBpc1BsYWluID8gbWFyayA6IG1hcmsuX3R5cGU7XG4gICAgdmFyIHNlcmlhbGl6ZXIgPSBwcm9wcy5zZXJpYWxpemVycy5tYXJrc1ttYXJrVHlwZV07XG5cbiAgICBpZiAoIXNlcmlhbGl6ZXIpIHtcbiAgICAgIC8vIEB0b2RvIFJldmVydCBiYWNrIHRvIHRocm93aW5nIGVycm9ycz9cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIG1hcmsgdHlwZSBcXFwiXCIuY29uY2F0KG1hcmtUeXBlLCBcIlxcXCIsIHBsZWFzZSBzcGVjaWZ5IGEgc2VyaWFsaXplciBmb3IgaXQgaW4gdGhlIGBzZXJpYWxpemVycy5tYXJrc2AgcHJvcFwiKSk7XG4gICAgICByZXR1cm4gaChwcm9wcy5zZXJpYWxpemVycy5tYXJrRmFsbGJhY2ssIG51bGwsIGNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaChzZXJpYWxpemVyLCBwcm9wcy5ub2RlLCBjaGlsZHJlbik7XG4gIH0gLy8gTG93LWxldmVsIGxpc3Qgc2VyaWFsaXplclxuXG5cbiAgZnVuY3Rpb24gTGlzdFNlcmlhbGl6ZXIocHJvcHMpIHtcbiAgICB2YXIgdGFnID0gcHJvcHMudHlwZSA9PT0gJ2J1bGxldCcgPyAndWwnIDogJ29sJztcbiAgICByZXR1cm4gaCh0YWcsIG51bGwsIHByb3BzLmNoaWxkcmVuKTtcbiAgfSAvLyBMb3ctbGV2ZWwgbGlzdCBpdGVtIHNlcmlhbGl6ZXJcblxuXG4gIGZ1bmN0aW9uIExpc3RJdGVtU2VyaWFsaXplcihwcm9wcykge1xuICAgIHZhciBjaGlsZHJlbiA9ICFwcm9wcy5ub2RlLnN0eWxlIHx8IHByb3BzLm5vZGUuc3R5bGUgPT09ICdub3JtYWwnID8gLy8gRG9uJ3Qgd3JhcCBwbGFpbiB0ZXh0IGluIHBhcmFncmFwaHMgaW5zaWRlIG9mIGEgbGlzdCBpdGVtXG4gICAgcHJvcHMuY2hpbGRyZW4gOiAvLyBCdXQgd3JhcCBhbnkgb3RoZXIgc3R5bGUgaW4gd2hhdGV2ZXIgdGhlIGJsb2NrIHNlcmlhbGl6ZXIgc2F5cyB0byB1c2VcbiAgICBoKHByb3BzLnNlcmlhbGl6ZXJzLnR5cGVzLmJsb2NrLCBwcm9wcywgcHJvcHMuY2hpbGRyZW4pO1xuICAgIHJldHVybiBoKCdsaScsIG51bGwsIGNoaWxkcmVuKTtcbiAgfSAvLyBSZW5kZXJlciBvZiBhbiBhY3R1YWwgYmxvY2sgb2YgdHlwZSBgYmxvY2tgLiBDb25mdXNpbmcsIHdlIGtub3cuXG5cblxuICBmdW5jdGlvbiBCbG9ja1R5cGVTZXJpYWxpemVyKHByb3BzKSB7XG4gICAgdmFyIHN0eWxlID0gcHJvcHMubm9kZS5zdHlsZSB8fCAnbm9ybWFsJztcblxuICAgIGlmICgvXmhcXGQvLnRlc3Qoc3R5bGUpKSB7XG4gICAgICByZXR1cm4gaChzdHlsZSwgbnVsbCwgcHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZSA9PT0gJ2Jsb2NrcXVvdGUnID8gaCgnYmxvY2txdW90ZScsIG51bGwsIHByb3BzLmNoaWxkcmVuKSA6IGgoJ3AnLCBudWxsLCBwcm9wcy5jaGlsZHJlbik7XG4gIH0gLy8gU2VyaWFsaXplcnMgZm9yIHRoaW5ncyB0aGF0IGNhbiBiZSBkaXJlY3RseSBhdHRyaWJ1dGVkIHRvIGEgdGFnIHdpdGhvdXQgYW55IHByb3BzXG4gIC8vIFdlIHVzZSBwYXJ0aWFsIGFwcGxpY2F0aW9uIHRvIGRvIHRoaXMsIHBhc3NpbmcgdGhlIHRhZyBuYW1lIGFzIHRoZSBmaXJzdCBhcmd1bWVudFxuXG5cbiAgZnVuY3Rpb24gUmF3TWFya1NlcmlhbGl6ZXIodGFnLCBwcm9wcykge1xuICAgIHJldHVybiBoKHRhZywgbnVsbCwgcHJvcHMuY2hpbGRyZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gVW5kZXJsaW5lU2VyaWFsaXplcihwcm9wcykge1xuICAgIHZhciBzdHlsZSA9IHNlcmlhbGl6ZU9wdGlvbnMudXNlRGFzaGVkU3R5bGVzID8ge1xuICAgICAgJ3RleHQtZGVjb3JhdGlvbic6ICd1bmRlcmxpbmUnXG4gICAgfSA6IHtcbiAgICAgIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJ1xuICAgIH07XG4gICAgcmV0dXJuIGgoJ3NwYW4nLCB7XG4gICAgICBzdHlsZTogc3R5bGVcbiAgICB9LCBwcm9wcy5jaGlsZHJlbik7XG4gIH1cblxuICBmdW5jdGlvbiBTdHJpa2VUaHJvdWdoU2VyaWFsaXplcihwcm9wcykge1xuICAgIHJldHVybiBoKCdkZWwnLCBudWxsLCBwcm9wcy5jaGlsZHJlbik7XG4gIH1cblxuICBmdW5jdGlvbiBMaW5rU2VyaWFsaXplcihwcm9wcykge1xuICAgIHJldHVybiBoKCdhJywge1xuICAgICAgaHJlZjogcHJvcHMubWFyay5ocmVmXG4gICAgfSwgcHJvcHMuY2hpbGRyZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gSW1hZ2VTZXJpYWxpemVyKHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcy5ub2RlLmFzc2V0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgaW1nID0gaCgnaW1nJywge1xuICAgICAgc3JjOiBnZXRJbWFnZVVybChwcm9wcylcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvcHMuaXNJbmxpbmUgPyBpbWcgOiBoKCdmaWd1cmUnLCBudWxsLCBpbWcpO1xuICB9IC8vIFNlcmlhbGl6ZXIgdGhhdCByZWN1cnNpdmVseSBjYWxscyBpdHNlbGYsIHByb2R1Y2luZyBhIGh5cGVyc2NyaXB0IHRyZWUgb2Ygc3BhbnNcblxuXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZVNwYW4oc3Bhbiwgc2VyaWFsaXplcnMsIGluZGV4LCBvcHRpb25zKSB7XG4gICAgaWYgKHNwYW4gPT09ICdcXG4nICYmIHNlcmlhbGl6ZXJzLmhhcmRCcmVhaykge1xuICAgICAgcmV0dXJuIGgoc2VyaWFsaXplcnMuaGFyZEJyZWFrLCB7XG4gICAgICAgIGtleTogXCJoYi1cIi5jb25jYXQoaW5kZXgpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNwYW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc2VyaWFsaXplcnMudGV4dCA/IGgoc2VyaWFsaXplcnMudGV4dCwge1xuICAgICAgICBrZXk6IFwidGV4dC1cIi5jb25jYXQoaW5kZXgpXG4gICAgICB9LCBzcGFuKSA6IHNwYW47XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkcmVuO1xuXG4gICAgaWYgKHNwYW4uY2hpbGRyZW4pIHtcbiAgICAgIGNoaWxkcmVuID0ge1xuICAgICAgICBjaGlsZHJlbjogc3Bhbi5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VyaWFsaXplTm9kZShjaGlsZCwgaSwgc3Bhbi5jaGlsZHJlbiwgdHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBzZXJpYWxpemVkTm9kZSA9IG9iamVjdEFzc2lnbih7fSwgc3BhbiwgY2hpbGRyZW4pO1xuICAgIHJldHVybiBoKHNlcmlhbGl6ZXJzLnNwYW4sIHtcbiAgICAgIGtleTogc3Bhbi5fa2V5IHx8IFwic3Bhbi1cIi5jb25jYXQoaW5kZXgpLFxuICAgICAgbm9kZTogc2VyaWFsaXplZE5vZGUsXG4gICAgICBzZXJpYWxpemVyczogc2VyaWFsaXplcnNcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBIYXJkQnJlYWtTZXJpYWxpemVyID0gZnVuY3Rpb24gSGFyZEJyZWFrU2VyaWFsaXplcigpIHtcbiAgICByZXR1cm4gaCgnYnInKTtcbiAgfTtcblxuICB2YXIgZGVmYXVsdE1hcmtTZXJpYWxpemVycyA9IHtcbiAgICBzdHJvbmc6IFJhd01hcmtTZXJpYWxpemVyLmJpbmQobnVsbCwgJ3N0cm9uZycpLFxuICAgIGVtOiBSYXdNYXJrU2VyaWFsaXplci5iaW5kKG51bGwsICdlbScpLFxuICAgIGNvZGU6IFJhd01hcmtTZXJpYWxpemVyLmJpbmQobnVsbCwgJ2NvZGUnKSxcbiAgICB1bmRlcmxpbmU6IFVuZGVybGluZVNlcmlhbGl6ZXIsXG4gICAgJ3N0cmlrZS10aHJvdWdoJzogU3RyaWtlVGhyb3VnaFNlcmlhbGl6ZXIsXG4gICAgbGluazogTGlua1NlcmlhbGl6ZXJcbiAgfTtcbiAgdmFyIGRlZmF1bHRTZXJpYWxpemVycyA9IHtcbiAgICAvLyBDb21tb24gb3ZlcnJpZGVzXG4gICAgdHlwZXM6IHtcbiAgICAgIGJsb2NrOiBCbG9ja1R5cGVTZXJpYWxpemVyLFxuICAgICAgaW1hZ2U6IEltYWdlU2VyaWFsaXplclxuICAgIH0sXG4gICAgbWFya3M6IGRlZmF1bHRNYXJrU2VyaWFsaXplcnMsXG4gICAgLy8gTGVzcyBjb21tb24gb3ZlcnJpZGVzXG4gICAgbGlzdDogTGlzdFNlcmlhbGl6ZXIsXG4gICAgbGlzdEl0ZW06IExpc3RJdGVtU2VyaWFsaXplcixcbiAgICBibG9jazogQmxvY2tTZXJpYWxpemVyLFxuICAgIHNwYW46IFNwYW5TZXJpYWxpemVyLFxuICAgIGhhcmRCcmVhazogSGFyZEJyZWFrU2VyaWFsaXplcixcbiAgICAvLyBDb250YWluZXIgZWxlbWVudFxuICAgIGNvbnRhaW5lcjogJ2RpdicsXG4gICAgLy8gV2hlbiB3ZSBjYW4ndCByZXNvbHZlIHRoZSBtYXJrIHByb3Blcmx5LCB1c2UgdGhpcyByZW5kZXJlciBhcyB0aGUgY29udGFpbmVyXG4gICAgbWFya0ZhbGxiYWNrOiAnc3BhbicsXG4gICAgLy8gQWxsb3cgb3ZlcnJpZGluZyB0ZXh0IHJlbmRlcmVyLCBidXQgbGVhdmUgdW5kZWZpbmVkIHRvIGp1c3QgdXNlIHBsYWluIHN0cmluZ3MgYnkgZGVmYXVsdFxuICAgIHRleHQ6IHVuZGVmaW5lZCxcbiAgICAvLyBFbXB0eSBub2RlcyAoUmVhY3QgdXNlcyBudWxsLCBoeXBlcnNjcmlwdCB3aXRoIGVtcHR5IHN0cmluZ3MpXG4gICAgZW1wdHk6ICcnXG4gIH07XG4gIHJldHVybiB7XG4gICAgZGVmYXVsdFNlcmlhbGl6ZXJzOiBkZWZhdWx0U2VyaWFsaXplcnMsXG4gICAgc2VyaWFsaXplU3Bhbjogc2VyaWFsaXplU3BhblxuICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcmlhbGl6ZXJzLmpzLm1hcCIsInZhciBiYXNlVXJsID0gJ2h0dHBzOi8vZG9jcy5zYW5pdHkuaW8vaGVscC8nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2VuZXJhdGVIZWxwVXJsKHNsdWcpIHtcbiAgcmV0dXJuIGJhc2VVcmwgKyBzbHVnXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xudmFyIGludGVybmFscyA9IHJlcXVpcmUoJ0BzYW5pdHkvYmxvY2stY29udGVudC10by1oeXBlcnNjcmlwdC9pbnRlcm5hbHMnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi90YXJnZXRzL2RvbScpLFxuICAgIHNlcmlhbGl6ZXJzID0gX3JlcXVpcmUuc2VyaWFsaXplcnMsXG4gICAgc2VyaWFsaXplU3BhbiA9IF9yZXF1aXJlLnNlcmlhbGl6ZVNwYW4sXG4gICAgcmVuZGVyUHJvcHMgPSBfcmVxdWlyZS5yZW5kZXJQcm9wcztcblxudmFyIGdldEltYWdlVXJsID0gaW50ZXJuYWxzLmdldEltYWdlVXJsLFxuICAgIGJsb2Nrc1RvTm9kZXMgPSBpbnRlcm5hbHMuYmxvY2tzVG9Ob2RlcyxcbiAgICBtZXJnZVNlcmlhbGl6ZXJzID0gaW50ZXJuYWxzLm1lcmdlU2VyaWFsaXplcnM7XG5cbnZhciByZW5kZXJOb2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudDtcblxudmFyIFNhbml0eUJsb2NrQ29udGVudCA9IGZ1bmN0aW9uIFNhbml0eUJsb2NrQ29udGVudChwcm9wcykge1xuICB2YXIgY3VzdG9tU2VyaWFsaXplcnMgPSBtZXJnZVNlcmlhbGl6ZXJzKFNhbml0eUJsb2NrQ29udGVudC5kZWZhdWx0U2VyaWFsaXplcnMsIHByb3BzLnNlcmlhbGl6ZXJzKTtcblxuICB2YXIgYmxvY2tQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHJlbmRlclByb3BzLCBwcm9wcywge1xuICAgIHNlcmlhbGl6ZXJzOiBjdXN0b21TZXJpYWxpemVycyxcbiAgICBibG9ja3M6IHByb3BzLmJsb2NrcyB8fCBbXVxuICB9KTtcblxuICByZXR1cm4gYmxvY2tzVG9Ob2RlcyhyZW5kZXJOb2RlLCBibG9ja1Byb3BzLCBzZXJpYWxpemVycywgc2VyaWFsaXplU3Bhbik7XG59O1xuXG4vLyBFeHBvc2UgZGVmYXVsdCBzZXJpYWxpemVycyB0byB0aGUgdXNlclxuU2FuaXR5QmxvY2tDb250ZW50LmRlZmF1bHRTZXJpYWxpemVycyA9IHNlcmlhbGl6ZXJzO1xuXG4vLyBFeHBvc2UgbG9naWMgZm9yIGJ1aWxkaW5nIGltYWdlIFVSTHMgZnJvbSBhbiBpbWFnZSByZWZlcmVuY2Uvbm9kZVxuU2FuaXR5QmxvY2tDb250ZW50LmdldEltYWdlVXJsID0gZ2V0SW1hZ2VVcmw7XG5cblNhbml0eUJsb2NrQ29udGVudC5wcm9wVHlwZXMgPSB7XG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcmVuZGVyQ29udGFpbmVyT25TaW5nbGVDaGlsZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLy8gV2hlbiByZW5kZXJpbmcgaW1hZ2VzLCB3ZSBuZWVkIHByb2plY3QgaWQgYW5kIGRhdGFzZXQsIHVubGVzcyBpbWFnZXMgYXJlIG1hdGVyaWFsaXplZFxuICBwcm9qZWN0SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGFzZXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGltYWdlT3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcblxuICBzZXJpYWxpemVyczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAvLyBDb21tb24gb3ZlcnJpZGVzXG4gICAgdHlwZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbWFya3M6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgICAvLyBMZXNzIGNvbW1vbiBvdmVycmlkZXNcbiAgICBsaXN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsaXN0SXRlbTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvLyBMb3ctbGV2ZWwgc2VyaWFsaXplcnNcbiAgICBibG9jazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3BhbjogUHJvcFR5cGVzLmZ1bmNcbiAgfSksXG5cbiAgYmxvY2tzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIF90eXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSkpLCBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIF90eXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSldKS5pc1JlcXVpcmVkXG59O1xuXG5TYW5pdHlCbG9ja0NvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICByZW5kZXJDb250YWluZXJPblNpbmdsZUNoaWxkOiBmYWxzZSxcbiAgc2VyaWFsaXplcnM6IHt9LFxuICBpbWFnZU9wdGlvbnM6IHt9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbml0eUJsb2NrQ29udGVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJsb2NrQ29udGVudC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ0BzYW5pdHkvYmxvY2stY29udGVudC10by1oeXBlcnNjcmlwdC9pbnRlcm5hbHMnKSxcbiAgICBnZXRTZXJpYWxpemVycyA9IF9yZXF1aXJlLmdldFNlcmlhbGl6ZXJzO1xuXG52YXIgcmVuZGVyTm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQ7XG5cbnZhciBfZ2V0U2VyaWFsaXplcnMgPSBnZXRTZXJpYWxpemVycyhyZW5kZXJOb2RlKSxcbiAgICBkZWZhdWx0U2VyaWFsaXplcnMgPSBfZ2V0U2VyaWFsaXplcnMuZGVmYXVsdFNlcmlhbGl6ZXJzLFxuICAgIHNlcmlhbGl6ZVNwYW4gPSBfZ2V0U2VyaWFsaXplcnMuc2VyaWFsaXplU3BhbjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlcmlhbGl6ZVNwYW46IHNlcmlhbGl6ZVNwYW4sXG4gIHNlcmlhbGl6ZXJzOiBkZWZhdWx0U2VyaWFsaXplcnMsXG4gIHJlbmRlclByb3BzOiB7IG5lc3RNYXJrczogdHJ1ZSB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9tLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuU2FuaXR5SW1hZ2VVcmxCdWlsZGVyID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gICAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG5cbiAgICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgICBpZiAoIW8pIHJldHVybjtcbiAgICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICAgIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICAgIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gICAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2Uobykge1xuICAgIHZhciBpID0gMDtcblxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAobyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkpIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4ge1xuICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgICB2YWx1ZTogb1tpKytdXG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xuICAgIH1cblxuICAgIGkgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICByZXR1cm4gaS5uZXh0LmJpbmQoaSk7XG4gIH1cblxuICB2YXIgZXhhbXBsZSA9ICdpbWFnZS1UYjlFdzhDWEl3YVk2UjFrak12STB1UlItMjAwMHgzMDAwLWpwZyc7XG4gIGZ1bmN0aW9uIHBhcnNlQXNzZXRJZChyZWYpIHtcbiAgICB2YXIgX3JlZiRzcGxpdCA9IHJlZi5zcGxpdCgnLScpLFxuICAgICAgICBpZCA9IF9yZWYkc3BsaXRbMV0sXG4gICAgICAgIGRpbWVuc2lvblN0cmluZyA9IF9yZWYkc3BsaXRbMl0sXG4gICAgICAgIGZvcm1hdCA9IF9yZWYkc3BsaXRbM107XG5cbiAgICBpZiAoIWlkIHx8ICFkaW1lbnNpb25TdHJpbmcgfHwgIWZvcm1hdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFsZm9ybWVkIGFzc2V0IF9yZWYgJ1wiICsgcmVmICsgXCInLiBFeHBlY3RlZCBhbiBpZCBsaWtlIFxcXCJcIiArIGV4YW1wbGUgKyBcIlxcXCIuXCIpO1xuICAgIH1cblxuICAgIHZhciBfZGltZW5zaW9uU3RyaW5nJHNwbGkgPSBkaW1lbnNpb25TdHJpbmcuc3BsaXQoJ3gnKSxcbiAgICAgICAgaW1nV2lkdGhTdHIgPSBfZGltZW5zaW9uU3RyaW5nJHNwbGlbMF0sXG4gICAgICAgIGltZ0hlaWdodFN0ciA9IF9kaW1lbnNpb25TdHJpbmckc3BsaVsxXTtcblxuICAgIHZhciB3aWR0aCA9ICtpbWdXaWR0aFN0cjtcbiAgICB2YXIgaGVpZ2h0ID0gK2ltZ0hlaWdodFN0cjtcbiAgICB2YXIgaXNWYWxpZEFzc2V0SWQgPSBpc0Zpbml0ZSh3aWR0aCkgJiYgaXNGaW5pdGUoaGVpZ2h0KTtcblxuICAgIGlmICghaXNWYWxpZEFzc2V0SWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hbGZvcm1lZCBhc3NldCBfcmVmICdcIiArIHJlZiArIFwiJy4gRXhwZWN0ZWQgYW4gaWQgbGlrZSBcXFwiXCIgKyBleGFtcGxlICsgXCJcXFwiLlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICBmb3JtYXQ6IGZvcm1hdFxuICAgIH07XG4gIH1cblxuICB2YXIgaXNSZWYgPSBmdW5jdGlvbiBpc1JlZihzcmMpIHtcbiAgICB2YXIgc291cmNlID0gc3JjO1xuICAgIHJldHVybiBzb3VyY2UgPyB0eXBlb2Ygc291cmNlLl9yZWYgPT09ICdzdHJpbmcnIDogZmFsc2U7XG4gIH07XG5cbiAgdmFyIGlzQXNzZXQgPSBmdW5jdGlvbiBpc0Fzc2V0KHNyYykge1xuICAgIHZhciBzb3VyY2UgPSBzcmM7XG4gICAgcmV0dXJuIHNvdXJjZSA/IHR5cGVvZiBzb3VyY2UuX2lkID09PSAnc3RyaW5nJyA6IGZhbHNlO1xuICB9O1xuXG4gIHZhciBpc0Fzc2V0U3R1YiA9IGZ1bmN0aW9uIGlzQXNzZXRTdHViKHNyYykge1xuICAgIHZhciBzb3VyY2UgPSBzcmM7XG4gICAgcmV0dXJuIHNvdXJjZSAmJiBzb3VyY2UuYXNzZXQgPyB0eXBlb2Ygc291cmNlLmFzc2V0LnVybCA9PT0gJ3N0cmluZycgOiBmYWxzZTtcbiAgfTtcblxuICBmdW5jdGlvbiBwYXJzZVNvdXJjZShzb3VyY2UpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGltYWdlO1xuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnICYmIGlzVXJsKHNvdXJjZSkpIHtcbiAgICAgIGltYWdlID0ge1xuICAgICAgICBhc3NldDoge1xuICAgICAgICAgIF9yZWY6IHVybFRvSWQoc291cmNlKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGltYWdlID0ge1xuICAgICAgICBhc3NldDoge1xuICAgICAgICAgIF9yZWY6IHNvdXJjZVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNSZWYoc291cmNlKSkge1xuICAgICAgaW1hZ2UgPSB7XG4gICAgICAgIGFzc2V0OiBzb3VyY2VcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc0Fzc2V0KHNvdXJjZSkpIHtcbiAgICAgIGltYWdlID0ge1xuICAgICAgICBhc3NldDoge1xuICAgICAgICAgIF9yZWY6IHNvdXJjZS5faWQgfHwgJydcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzQXNzZXRTdHViKHNvdXJjZSkpIHtcbiAgICAgIGltYWdlID0ge1xuICAgICAgICBhc3NldDoge1xuICAgICAgICAgIF9yZWY6IHVybFRvSWQoc291cmNlLmFzc2V0LnVybClcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UuYXNzZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpbWFnZSA9IHNvdXJjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGltZyA9IHNvdXJjZTtcblxuICAgIGlmIChpbWcuY3JvcCkge1xuICAgICAgaW1hZ2UuY3JvcCA9IGltZy5jcm9wO1xuICAgIH1cblxuICAgIGlmIChpbWcuaG90c3BvdCkge1xuICAgICAgaW1hZ2UuaG90c3BvdCA9IGltZy5ob3RzcG90O1xuICAgIH1cblxuICAgIHJldHVybiBhcHBseURlZmF1bHRzKGltYWdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVXJsKHVybCkge1xuICAgIHJldHVybiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QoXCJcIiArIHVybCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cmxUb0lkKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnLycpLnNsaWNlKC0xKTtcbiAgICByZXR1cm4gKFwiaW1hZ2UtXCIgKyBwYXJ0c1swXSkucmVwbGFjZSgvXFwuKFthLXpdKykkLywgJy0kMScpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlEZWZhdWx0cyhpbWFnZSkge1xuICAgIGlmIChpbWFnZS5jcm9wICYmIGltYWdlLmhvdHNwb3QpIHtcbiAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gX2V4dGVuZHMoe30sIGltYWdlKTtcblxuICAgIGlmICghcmVzdWx0LmNyb3ApIHtcbiAgICAgIHJlc3VsdC5jcm9wID0ge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgcmlnaHQ6IDBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFyZXN1bHQuaG90c3BvdCkge1xuICAgICAgcmVzdWx0LmhvdHNwb3QgPSB7XG4gICAgICAgIHg6IDAuNSxcbiAgICAgICAgeTogMC41LFxuICAgICAgICBoZWlnaHQ6IDEuMCxcbiAgICAgICAgd2lkdGg6IDEuMFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIFNQRUNfTkFNRV9UT19VUkxfTkFNRV9NQVBQSU5HUyA9IFtbJ3dpZHRoJywgJ3cnXSwgWydoZWlnaHQnLCAnaCddLCBbJ2Zvcm1hdCcsICdmbSddLCBbJ2Rvd25sb2FkJywgJ2RsJ10sIFsnYmx1cicsICdibHVyJ10sIFsnc2hhcnBlbicsICdzaGFycCddLCBbJ2ludmVydCcsICdpbnZlcnQnXSwgWydvcmllbnRhdGlvbicsICdvciddLCBbJ21pbkhlaWdodCcsICdtaW4taCddLCBbJ21heEhlaWdodCcsICdtYXgtaCddLCBbJ21pbldpZHRoJywgJ21pbi13J10sIFsnbWF4V2lkdGgnLCAnbWF4LXcnXSwgWydxdWFsaXR5JywgJ3EnXSwgWydmaXQnLCAnZml0J10sIFsnY3JvcCcsICdjcm9wJ10sIFsnc2F0dXJhdGlvbicsICdzYXQnXSwgWydhdXRvJywgJ2F1dG8nXSwgWydkcHInLCAnZHByJ10sIFsncGFkJywgJ3BhZCddXTtcbiAgZnVuY3Rpb24gdXJsRm9ySW1hZ2Uob3B0aW9ucykge1xuICAgIHZhciBzcGVjID0gX2V4dGVuZHMoe30sIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdmFyIHNvdXJjZSA9IHNwZWMuc291cmNlO1xuICAgIGRlbGV0ZSBzcGVjLnNvdXJjZTtcbiAgICB2YXIgaW1hZ2UgPSBwYXJzZVNvdXJjZShzb3VyY2UpO1xuXG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGlkID0gaW1hZ2UuYXNzZXQuX3JlZiB8fCBpbWFnZS5hc3NldC5faWQgfHwgJyc7XG4gICAgdmFyIGFzc2V0ID0gcGFyc2VBc3NldElkKGlkKTtcbiAgICB2YXIgY3JvcExlZnQgPSBNYXRoLnJvdW5kKGltYWdlLmNyb3AubGVmdCAqIGFzc2V0LndpZHRoKTtcbiAgICB2YXIgY3JvcFRvcCA9IE1hdGgucm91bmQoaW1hZ2UuY3JvcC50b3AgKiBhc3NldC5oZWlnaHQpO1xuICAgIHZhciBjcm9wID0ge1xuICAgICAgbGVmdDogY3JvcExlZnQsXG4gICAgICB0b3A6IGNyb3BUb3AsXG4gICAgICB3aWR0aDogTWF0aC5yb3VuZChhc3NldC53aWR0aCAtIGltYWdlLmNyb3AucmlnaHQgKiBhc3NldC53aWR0aCAtIGNyb3BMZWZ0KSxcbiAgICAgIGhlaWdodDogTWF0aC5yb3VuZChhc3NldC5oZWlnaHQgLSBpbWFnZS5jcm9wLmJvdHRvbSAqIGFzc2V0LmhlaWdodCAtIGNyb3BUb3ApXG4gICAgfTtcbiAgICB2YXIgaG90U3BvdFZlcnRpY2FsUmFkaXVzID0gaW1hZ2UuaG90c3BvdC5oZWlnaHQgKiBhc3NldC5oZWlnaHQgLyAyO1xuICAgIHZhciBob3RTcG90SG9yaXpvbnRhbFJhZGl1cyA9IGltYWdlLmhvdHNwb3Qud2lkdGggKiBhc3NldC53aWR0aCAvIDI7XG4gICAgdmFyIGhvdFNwb3RDZW50ZXJYID0gaW1hZ2UuaG90c3BvdC54ICogYXNzZXQud2lkdGg7XG4gICAgdmFyIGhvdFNwb3RDZW50ZXJZID0gaW1hZ2UuaG90c3BvdC55ICogYXNzZXQuaGVpZ2h0O1xuICAgIHZhciBob3RzcG90ID0ge1xuICAgICAgbGVmdDogaG90U3BvdENlbnRlclggLSBob3RTcG90SG9yaXpvbnRhbFJhZGl1cyxcbiAgICAgIHRvcDogaG90U3BvdENlbnRlclkgLSBob3RTcG90VmVydGljYWxSYWRpdXMsXG4gICAgICByaWdodDogaG90U3BvdENlbnRlclggKyBob3RTcG90SG9yaXpvbnRhbFJhZGl1cyxcbiAgICAgIGJvdHRvbTogaG90U3BvdENlbnRlclkgKyBob3RTcG90VmVydGljYWxSYWRpdXNcbiAgICB9O1xuXG4gICAgaWYgKCEoc3BlYy5yZWN0IHx8IHNwZWMuZm9jYWxQb2ludCB8fCBzcGVjLmlnbm9yZUltYWdlUGFyYW1zIHx8IHNwZWMuY3JvcCkpIHtcbiAgICAgIHNwZWMgPSBfZXh0ZW5kcyhfZXh0ZW5kcyh7fSwgc3BlYyksIGZpdCh7XG4gICAgICAgIGNyb3A6IGNyb3AsXG4gICAgICAgIGhvdHNwb3Q6IGhvdHNwb3RcbiAgICAgIH0sIHNwZWMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BlY1RvSW1hZ2VVcmwoX2V4dGVuZHMoX2V4dGVuZHMoe30sIHNwZWMpLCB7fSwge1xuICAgICAgYXNzZXQ6IGFzc2V0XG4gICAgfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3BlY1RvSW1hZ2VVcmwoc3BlYykge1xuICAgIHZhciBjZG5VcmwgPSBzcGVjLmJhc2VVcmwgfHwgJ2h0dHBzOi8vY2RuLnNhbml0eS5pbyc7XG4gICAgdmFyIGZpbGVuYW1lID0gc3BlYy5hc3NldC5pZCArIFwiLVwiICsgc3BlYy5hc3NldC53aWR0aCArIFwieFwiICsgc3BlYy5hc3NldC5oZWlnaHQgKyBcIi5cIiArIHNwZWMuYXNzZXQuZm9ybWF0O1xuICAgIHZhciBiYXNlVXJsID0gY2RuVXJsICsgXCIvaW1hZ2VzL1wiICsgc3BlYy5wcm9qZWN0SWQgKyBcIi9cIiArIHNwZWMuZGF0YXNldCArIFwiL1wiICsgZmlsZW5hbWU7XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuXG4gICAgaWYgKHNwZWMucmVjdCkge1xuICAgICAgdmFyIF9zcGVjJHJlY3QgPSBzcGVjLnJlY3QsXG4gICAgICAgICAgbGVmdCA9IF9zcGVjJHJlY3QubGVmdCxcbiAgICAgICAgICB0b3AgPSBfc3BlYyRyZWN0LnRvcCxcbiAgICAgICAgICB3aWR0aCA9IF9zcGVjJHJlY3Qud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0ID0gX3NwZWMkcmVjdC5oZWlnaHQ7XG4gICAgICB2YXIgaXNFZmZlY3RpdmVDcm9wID0gbGVmdCAhPT0gMCB8fCB0b3AgIT09IDAgfHwgaGVpZ2h0ICE9PSBzcGVjLmFzc2V0LmhlaWdodCB8fCB3aWR0aCAhPT0gc3BlYy5hc3NldC53aWR0aDtcblxuICAgICAgaWYgKGlzRWZmZWN0aXZlQ3JvcCkge1xuICAgICAgICBwYXJhbXMucHVzaChcInJlY3Q9XCIgKyBsZWZ0ICsgXCIsXCIgKyB0b3AgKyBcIixcIiArIHdpZHRoICsgXCIsXCIgKyBoZWlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzcGVjLmJnKSB7XG4gICAgICBwYXJhbXMucHVzaChcImJnPVwiICsgc3BlYy5iZyk7XG4gICAgfVxuXG4gICAgaWYgKHNwZWMuZm9jYWxQb2ludCkge1xuICAgICAgcGFyYW1zLnB1c2goXCJmcC14PVwiICsgc3BlYy5mb2NhbFBvaW50LngpO1xuICAgICAgcGFyYW1zLnB1c2goXCJmcC15PVwiICsgc3BlYy5mb2NhbFBvaW50LnkpO1xuICAgIH1cblxuICAgIHZhciBmbGlwID0gW3NwZWMuZmxpcEhvcml6b250YWwgJiYgJ2gnLCBzcGVjLmZsaXBWZXJ0aWNhbCAmJiAndiddLmZpbHRlcihCb29sZWFuKS5qb2luKCcnKTtcblxuICAgIGlmIChmbGlwKSB7XG4gICAgICBwYXJhbXMucHVzaChcImZsaXA9XCIgKyBmbGlwKTtcbiAgICB9XG5cbiAgICBTUEVDX05BTUVfVE9fVVJMX05BTUVfTUFQUElOR1MuZm9yRWFjaChmdW5jdGlvbiAobWFwcGluZykge1xuICAgICAgdmFyIHNwZWNOYW1lID0gbWFwcGluZ1swXSxcbiAgICAgICAgICBwYXJhbSA9IG1hcHBpbmdbMV07XG5cbiAgICAgIGlmICh0eXBlb2Ygc3BlY1tzcGVjTmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHBhcmFtICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoc3BlY1tzcGVjTmFtZV0pKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNwZWNbcGFyYW1dICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMucHVzaChwYXJhbSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHNwZWNbcGFyYW1dKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJhc2VVcmw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2VVcmwgKyBcIj9cIiArIHBhcmFtcy5qb2luKCcmJyk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXQoc291cmNlLCBzcGVjKSB7XG4gICAgdmFyIGNyb3BSZWN0O1xuICAgIHZhciBpbWdXaWR0aCA9IHNwZWMud2lkdGg7XG4gICAgdmFyIGltZ0hlaWdodCA9IHNwZWMuaGVpZ2h0O1xuXG4gICAgaWYgKCEoaW1nV2lkdGggJiYgaW1nSGVpZ2h0KSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IGltZ1dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGltZ0hlaWdodCxcbiAgICAgICAgcmVjdDogc291cmNlLmNyb3BcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGNyb3AgPSBzb3VyY2UuY3JvcDtcbiAgICB2YXIgaG90c3BvdCA9IHNvdXJjZS5ob3RzcG90O1xuICAgIHZhciBkZXNpcmVkQXNwZWN0UmF0aW8gPSBpbWdXaWR0aCAvIGltZ0hlaWdodDtcbiAgICB2YXIgY3JvcEFzcGVjdFJhdGlvID0gY3JvcC53aWR0aCAvIGNyb3AuaGVpZ2h0O1xuXG4gICAgaWYgKGNyb3BBc3BlY3RSYXRpbyA+IGRlc2lyZWRBc3BlY3RSYXRpbykge1xuICAgICAgdmFyIGhlaWdodCA9IGNyb3AuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gaGVpZ2h0ICogZGVzaXJlZEFzcGVjdFJhdGlvO1xuICAgICAgdmFyIHRvcCA9IGNyb3AudG9wO1xuICAgICAgdmFyIGhvdHNwb3RYQ2VudGVyID0gKGhvdHNwb3QucmlnaHQgLSBob3RzcG90LmxlZnQpIC8gMiArIGhvdHNwb3QubGVmdDtcbiAgICAgIHZhciBsZWZ0ID0gaG90c3BvdFhDZW50ZXIgLSB3aWR0aCAvIDI7XG5cbiAgICAgIGlmIChsZWZ0IDwgY3JvcC5sZWZ0KSB7XG4gICAgICAgIGxlZnQgPSBjcm9wLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGxlZnQgKyB3aWR0aCA+IGNyb3AubGVmdCArIGNyb3Aud2lkdGgpIHtcbiAgICAgICAgbGVmdCA9IGNyb3AubGVmdCArIGNyb3Aud2lkdGggLSB3aWR0aDtcbiAgICAgIH1cblxuICAgICAgY3JvcFJlY3QgPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgICB3aWR0aDogTWF0aC5yb3VuZCh3aWR0aCksXG4gICAgICAgIGhlaWdodDogTWF0aC5yb3VuZChoZWlnaHQpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3dpZHRoID0gY3JvcC53aWR0aDtcblxuICAgICAgdmFyIF9oZWlnaHQgPSBfd2lkdGggLyBkZXNpcmVkQXNwZWN0UmF0aW87XG5cbiAgICAgIHZhciBfbGVmdCA9IGNyb3AubGVmdDtcbiAgICAgIHZhciBob3RzcG90WUNlbnRlciA9IChob3RzcG90LmJvdHRvbSAtIGhvdHNwb3QudG9wKSAvIDIgKyBob3RzcG90LnRvcDtcblxuICAgICAgdmFyIF90b3AgPSBob3RzcG90WUNlbnRlciAtIF9oZWlnaHQgLyAyO1xuXG4gICAgICBpZiAoX3RvcCA8IGNyb3AudG9wKSB7XG4gICAgICAgIF90b3AgPSBjcm9wLnRvcDtcbiAgICAgIH0gZWxzZSBpZiAoX3RvcCArIF9oZWlnaHQgPiBjcm9wLnRvcCArIGNyb3AuaGVpZ2h0KSB7XG4gICAgICAgIF90b3AgPSBjcm9wLnRvcCArIGNyb3AuaGVpZ2h0IC0gX2hlaWdodDtcbiAgICAgIH1cblxuICAgICAgY3JvcFJlY3QgPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoX2xlZnQpKSxcbiAgICAgICAgdG9wOiBNYXRoLm1heCgwLCBNYXRoLmZsb29yKF90b3ApKSxcbiAgICAgICAgd2lkdGg6IE1hdGgucm91bmQoX3dpZHRoKSxcbiAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kKF9oZWlnaHQpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogaW1nV2lkdGgsXG4gICAgICBoZWlnaHQ6IGltZ0hlaWdodCxcbiAgICAgIHJlY3Q6IGNyb3BSZWN0XG4gICAgfTtcbiAgfVxuXG4gIHZhciB2YWxpZEZpdHMgPSBbJ2NsaXAnLCAnY3JvcCcsICdmaWxsJywgJ2ZpbGxtYXgnLCAnbWF4JywgJ3NjYWxlJywgJ21pbiddO1xuICB2YXIgdmFsaWRDcm9wcyA9IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JywgJ2NlbnRlcicsICdmb2NhbHBvaW50JywgJ2VudHJvcHknXTtcbiAgdmFyIHZhbGlkQXV0b01vZGVzID0gWydmb3JtYXQnXTtcblxuICBmdW5jdGlvbiBpc1Nhbml0eUNsaWVudExpa2UoY2xpZW50KSB7XG4gICAgcmV0dXJuIGNsaWVudCA/IHR5cGVvZiBjbGllbnQuY2xpZW50Q29uZmlnID09PSAnb2JqZWN0JyA6IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV3cml0ZVNwZWNOYW1lKGtleSkge1xuICAgIHZhciBzcGVjcyA9IFNQRUNfTkFNRV9UT19VUkxfTkFNRV9NQVBQSU5HUztcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2Uoc3BlY3MpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgdmFyIGVudHJ5ID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgc3BlY05hbWUgPSBlbnRyeVswXSxcbiAgICAgICAgICBwYXJhbSA9IGVudHJ5WzFdO1xuXG4gICAgICBpZiAoa2V5ID09PSBzcGVjTmFtZSB8fCBrZXkgPT09IHBhcmFtKSB7XG4gICAgICAgIHJldHVybiBzcGVjTmFtZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgZnVuY3Rpb24gdXJsQnVpbGRlcihvcHRpb25zKSB7XG4gICAgdmFyIGNsaWVudCA9IG9wdGlvbnM7XG5cbiAgICBpZiAoaXNTYW5pdHlDbGllbnRMaWtlKGNsaWVudCkpIHtcbiAgICAgIHZhciBfY2xpZW50JGNsaWVudENvbmZpZyA9IGNsaWVudC5jbGllbnRDb25maWcsXG4gICAgICAgICAgYXBpVXJsID0gX2NsaWVudCRjbGllbnRDb25maWcuYXBpSG9zdCxcbiAgICAgICAgICBwcm9qZWN0SWQgPSBfY2xpZW50JGNsaWVudENvbmZpZy5wcm9qZWN0SWQsXG4gICAgICAgICAgZGF0YXNldCA9IF9jbGllbnQkY2xpZW50Q29uZmlnLmRhdGFzZXQ7XG4gICAgICB2YXIgYXBpSG9zdCA9IGFwaVVybCB8fCAnaHR0cHM6Ly9hcGkuc2FuaXR5LmlvJztcbiAgICAgIHJldHVybiBuZXcgSW1hZ2VVcmxCdWlsZGVyKG51bGwsIHtcbiAgICAgICAgYmFzZVVybDogYXBpSG9zdC5yZXBsYWNlKC9eaHR0cHM6XFwvXFwvYXBpXFwuLywgJ2h0dHBzOi8vY2RuLicpLFxuICAgICAgICBwcm9qZWN0SWQ6IHByb2plY3RJZCxcbiAgICAgICAgZGF0YXNldDogZGF0YXNldFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBJbWFnZVVybEJ1aWxkZXIobnVsbCwgb3B0aW9ucyk7XG4gIH1cbiAgdmFyIEltYWdlVXJsQnVpbGRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW1hZ2VVcmxCdWlsZGVyKHBhcmVudCwgb3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zID0gcGFyZW50ID8gX2V4dGVuZHMoX2V4dGVuZHMoe30sIHBhcmVudC5vcHRpb25zIHx8IHt9KSwgb3B0aW9ucyB8fCB7fSkgOiBfZXh0ZW5kcyh7fSwgb3B0aW9ucyB8fCB7fSk7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90byA9IEltYWdlVXJsQnVpbGRlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8ud2l0aE9wdGlvbnMgPSBmdW5jdGlvbiB3aXRoT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICB2YXIgYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybCB8fCB0aGlzLm9wdGlvbnMuYmFzZVVybDtcbiAgICAgIHZhciBuZXdPcHRpb25zID0ge1xuICAgICAgICBiYXNlVXJsOiBiYXNlVXJsXG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIHNwZWNLZXkgPSByZXdyaXRlU3BlY05hbWUoa2V5KTtcbiAgICAgICAgICBuZXdPcHRpb25zW3NwZWNLZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgSW1hZ2VVcmxCdWlsZGVyKHRoaXMsIF9leHRlbmRzKHtcbiAgICAgICAgYmFzZVVybDogYmFzZVVybFxuICAgICAgfSwgbmV3T3B0aW9ucykpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uaW1hZ2UgPSBmdW5jdGlvbiBpbWFnZShzb3VyY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8uZGF0YXNldCA9IGZ1bmN0aW9uIGRhdGFzZXQoX2RhdGFzZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgZGF0YXNldDogX2RhdGFzZXRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8ucHJvamVjdElkID0gZnVuY3Rpb24gcHJvamVjdElkKF9wcm9qZWN0SWQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgcHJvamVjdElkOiBfcHJvamVjdElkXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmJnID0gZnVuY3Rpb24gYmcoX2JnKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIGJnOiBfYmdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8uZHByID0gZnVuY3Rpb24gZHByKF9kcHIpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgZHByOiBfZHByXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLndpZHRoID0gZnVuY3Rpb24gd2lkdGgoX3dpZHRoKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIHdpZHRoOiBfd2lkdGhcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8uaGVpZ2h0ID0gZnVuY3Rpb24gaGVpZ2h0KF9oZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgaGVpZ2h0OiBfaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmZvY2FsUG9pbnQgPSBmdW5jdGlvbiBmb2NhbFBvaW50KHgsIHkpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgZm9jYWxQb2ludDoge1xuICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgeTogeVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLm1heFdpZHRoID0gZnVuY3Rpb24gbWF4V2lkdGgoX21heFdpZHRoKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIG1heFdpZHRoOiBfbWF4V2lkdGhcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8ubWluV2lkdGggPSBmdW5jdGlvbiBtaW5XaWR0aChfbWluV2lkdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgbWluV2lkdGg6IF9taW5XaWR0aFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5tYXhIZWlnaHQgPSBmdW5jdGlvbiBtYXhIZWlnaHQoX21heEhlaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMud2l0aE9wdGlvbnMoe1xuICAgICAgICBtYXhIZWlnaHQ6IF9tYXhIZWlnaHRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8ubWluSGVpZ2h0ID0gZnVuY3Rpb24gbWluSGVpZ2h0KF9taW5IZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgbWluSGVpZ2h0OiBfbWluSGVpZ2h0XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnNpemUgPSBmdW5jdGlvbiBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5ibHVyID0gZnVuY3Rpb24gYmx1cihfYmx1cikge1xuICAgICAgcmV0dXJuIHRoaXMud2l0aE9wdGlvbnMoe1xuICAgICAgICBibHVyOiBfYmx1clxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5zaGFycGVuID0gZnVuY3Rpb24gc2hhcnBlbihfc2hhcnBlbikge1xuICAgICAgcmV0dXJuIHRoaXMud2l0aE9wdGlvbnMoe1xuICAgICAgICBzaGFycGVuOiBfc2hhcnBlblxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5yZWN0ID0gZnVuY3Rpb24gcmVjdChsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgcmVjdDoge1xuICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8uZm9ybWF0ID0gZnVuY3Rpb24gZm9ybWF0KF9mb3JtYXQpIHtcbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgZm9ybWF0OiBfZm9ybWF0XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmludmVydCA9IGZ1bmN0aW9uIGludmVydChfaW52ZXJ0KSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIGludmVydDogX2ludmVydFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5vcmllbnRhdGlvbiA9IGZ1bmN0aW9uIG9yaWVudGF0aW9uKF9vcmllbnRhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMud2l0aE9wdGlvbnMoe1xuICAgICAgICBvcmllbnRhdGlvbjogX29yaWVudGF0aW9uXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnF1YWxpdHkgPSBmdW5jdGlvbiBxdWFsaXR5KF9xdWFsaXR5KSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIHF1YWxpdHk6IF9xdWFsaXR5XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmZvcmNlRG93bmxvYWQgPSBmdW5jdGlvbiBmb3JjZURvd25sb2FkKGRvd25sb2FkKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIGRvd25sb2FkOiBkb3dubG9hZFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5mbGlwSG9yaXpvbnRhbCA9IGZ1bmN0aW9uIGZsaXBIb3Jpem9udGFsKCkge1xuICAgICAgcmV0dXJuIHRoaXMud2l0aE9wdGlvbnMoe1xuICAgICAgICBmbGlwSG9yaXpvbnRhbDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5mbGlwVmVydGljYWwgPSBmdW5jdGlvbiBmbGlwVmVydGljYWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIGZsaXBWZXJ0aWNhbDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5pZ25vcmVJbWFnZVBhcmFtcyA9IGZ1bmN0aW9uIGlnbm9yZUltYWdlUGFyYW1zKCkge1xuICAgICAgcmV0dXJuIHRoaXMud2l0aE9wdGlvbnMoe1xuICAgICAgICBpZ25vcmVJbWFnZVBhcmFtczogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5maXQgPSBmdW5jdGlvbiBmaXQodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZEZpdHMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZml0IG1vZGUgXFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLndpdGhPcHRpb25zKHtcbiAgICAgICAgZml0OiB2YWx1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by5jcm9wID0gZnVuY3Rpb24gY3JvcCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkQ3JvcHMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY3JvcCBtb2RlIFxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIGNyb3A6IHZhbHVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnNhdHVyYXRpb24gPSBmdW5jdGlvbiBzYXR1cmF0aW9uKF9zYXR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIHNhdHVyYXRpb246IF9zYXR1cmF0aW9uXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmF1dG8gPSBmdW5jdGlvbiBhdXRvKHZhbHVlKSB7XG4gICAgICBpZiAodmFsaWRBdXRvTW9kZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXV0byBtb2RlIFxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIGF1dG86IHZhbHVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnBhZCA9IGZ1bmN0aW9uIHBhZChfcGFkKSB7XG4gICAgICByZXR1cm4gdGhpcy53aXRoT3B0aW9ucyh7XG4gICAgICAgIHBhZDogX3BhZFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90by51cmwgPSBmdW5jdGlvbiB1cmwoKSB7XG4gICAgICByZXR1cm4gdXJsRm9ySW1hZ2UodGhpcy5vcHRpb25zKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy51cmwoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEltYWdlVXJsQnVpbGRlcjtcbiAgfSgpO1xuXG4gIHJldHVybiB1cmxCdWlsZGVyO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW1hZ2UtdXJsLnVtZC5qcy5tYXBcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEzLjFcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTsgLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4vLyAodW5zdGFibGUpIEFQSXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZC4gQ2FuIHdlIHJlbW92ZSB0aGUgc3ltYm9scz9cblxudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1NDT1BFX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQkxPQ0tfVFlQRSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSAvLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG5cbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlOyAvLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7IC8vIFVzaW5nIGNvbnNvbGVbJ3dhcm4nXSB0byBldmFkZSBCYWJlbCBhbmQgRVNMaW50XG5cbiAgICAgIGNvbnNvbGVbJ3dhcm4nXSgnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xpZW50IGZyb20gJy4uLy4uL3NyYy9jbGllbnQnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgQmxvY2tDb250ZW50IGZyb20gJ0BzYW5pdHkvYmxvY2stY29udGVudC10by1yZWFjdCdcbmltcG9ydCBCYXNlQmxvY2tDb250ZW50IGZyb20gJy4uLy4uL3NyYy9jb21wb25lbnRzL0Jhc2VCbG9ja0NvbnRlbnQnXG5pbXBvcnQgV3JhcHBlciBmcm9tICcuLi8uLi9zcmMvY29tcG9uZW50cy9XcmFwcGVyJ1xuaW1wb3J0IEJsb2dBcnRpY2xlSGVhZGVyIGZyb20gJy4uLy4uL3NyYy9jb21wb25lbnRzL0Jsb2dBcnRpY2xlSGVhZGVyJ1xuaW1wb3J0IEJsb2dBcnRpY2xlRm9vdGVyIGZyb20gJy4uLy4uL3NyYy9jb21wb25lbnRzL0Jsb2dBcnRpY2xlRm9vdGVyJ1xuXG5jb25zdCBQb3N0ID0gKHtcbiAgIHRpdGxlLFxuICAgYnlsaW5lLFxuICAgcHVibGlzaGVkQXQsXG4gICBuYW1lLFxuICAgaW1hZ2VVcmwsXG4gICBjYXRlZ29yaWVzLFxuICAgYm9keSxcbn0pID0+IHtcbiAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICA8dGl0bGU+Um95IEFuZ2VyIC0ge3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgICA8bWV0YVxuICAgICAgICAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgPFdyYXBwZXIgYmdDb2xvcj1cImJnLWdyYXktOTAwXCIgYmdPcGFjaXR5PXsxMDB9PlxuICAgICAgICAgICAgPEJsb2dBcnRpY2xlSGVhZGVyXG4gICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICBieWxpbmU9e2J5bGluZX1cbiAgICAgICAgICAgICAgIGF1dGhvcj17bmFtZX1cbiAgICAgICAgICAgICAgIHB1Ymxpc2hlZEF0PXtwdWJsaXNoZWRBdH1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxpbWcgc3JjPXtpbWFnZVVybH0gLz5cblxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggZmxleC1yb3cganVzdGlmeS1jZW50ZXIgXCI+XG4gICAgICAgICAgICAgICA8QmFzZUJsb2NrQ29udGVudFxuICAgICAgICAgICAgICAgICAgYmxvY2tzPXtib2R5fVxuICAgICAgICAgICAgICAgICAgaW1hZ2VPcHRpb25zPXt7IHc6IDMyMCwgaDogMjQwLCBmaXQ6ICdtYXgnIH19XG4gICAgICAgICAgICAgICAgICB7Li4uY2xpZW50LmNvbmZpZygpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTEwMCB0ZXh0LXhsIGxlYWRpbmctcmVsYXhlZCB3LTIvMyBtdC01IG1iLTdcIlxuICAgICAgICAgICAgICAgICAgLy8gc2VyaWFsaXplcnM9e3sgbWFya3M6IHsgY29kZVNlcmlhbGl6ZXIgfSB9fVxuICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgIHsvKiA8QmxvZ0FydGljbGVGb290ZXJcbiAgICAgICAgICAgICAgIGF1dGhvcj17bmFtZX1cbiAgICAgICAgICAgICAgIHB1Ymxpc2hlZEF0PXtwdWJsaXNoZWRBdH1cbiAgICAgICAgICAgICAgIGNhdGVnb3JpZXM9e2NhdGVnb3JpZXN9XG4gICAgICAgICAgICAvPiAqL31cbiAgICAgICAgIDwvV3JhcHBlcj5cbiAgICAgIDwvPlxuICAgKVxufVxuXG5jb25zdCBxdWVyeSA9IGAqW190eXBlID09IFwicG9zdFwiICYmIHNsdWcuY3VycmVudCA9PSAkc2x1Z11bMF17XG4gICBfaWQsXG4gICB0aXRsZSxcbiAgIGJ5bGluZSxcbiAgIHB1Ymxpc2hlZEF0LFxuICAgXCJuYW1lXCI6IGF1dGhvci0+bmFtZSxcbiAgIFwiY2F0ZWdvcmllc1wiOiBjYXRlZ29yaWVzW10tPnRpdGxlLFxuICAgXCJzbHVnXCI6IHNsdWcuY3VycmVudCxcbiAgIFwiaW1hZ2VVcmxcIjogbWFpbkltYWdlLmFzc2V0LT51cmwsXG4gICBib2R5XG59YFxuXG5Qb3N0LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAvLyBkZWZhdWx0IHNsdWcgdG8gZW1wdHkgc3RyaW5nIHRvIHByZXZlbnQgdW5kZWZpbmVkIGVycm9yXG4gICBjb25zdCB7IHNsdWcgPSAnJyB9ID0gY29udGV4dC5xdWVyeVxuICAgcmV0dXJuIGF3YWl0IGNsaWVudC5mZXRjaChxdWVyeSwgeyBzbHVnIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsaWVudCBmcm9tICcuLi8uLi9zcmMvY2xpZW50J1xuaW1wb3J0IEJsb2NrQ29udGVudCBmcm9tICdAc2FuaXR5L2Jsb2NrLWNvbnRlbnQtdG8tcmVhY3QnXG5pbXBvcnQgc2VyaWFsaXplcnMgZnJvbSAnLi9zZXJpYWxpemVyJ1xuLy9pbXBvcnQgYmxvY2tDb250ZW50IGZyb20gJy4uLy4uLy4uL3Nhbml0eS9zY2hlbWFzL2Jsb2NrQ29udGVudCdcblxuaW50ZXJmYWNlIEJhc2VCbG9ja0NvbnRlbnQge1xuICAgYmxvY2tzOiBzdHJpbmdcbiAgIGNsYXNzTmFtZTogc3RyaW5nXG59XG5cbmNvbnN0IEJhc2VCbG9ja0NvbnRlbnQgPSAoeyBibG9ja3MsIGNsYXNzTmFtZSB9OiBCYXNlQmxvY2tDb250ZW50KSA9PiAoXG4gICA8QmxvY2tDb250ZW50XG4gICAgICBibG9ja3M9e2Jsb2Nrc31cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgc2VyaWFsaXplcnM9e3NlcmlhbGl6ZXJzfVxuICAgICAgey4uLmNsaWVudH1cbiAgIC8+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VCbG9ja0NvbnRlbnRcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICAgdGl0bGU6IHN0cmluZ1xuICAgcHVibGlzaGVkQXQ6IHN0cmluZ1xuICAgYnlsaW5lOiBzdHJpbmdcbiAgIGF1dGhvcjogc3RyaW5nXG4gICBhdXRob3JJZD86IHN0cmluZ1xufVxuXG5jb25zdCBCbG9nQXJ0aWNsZUhlYWRlciA9ICh7XG4gICB0aXRsZSxcbiAgIHB1Ymxpc2hlZEF0LFxuICAgYnlsaW5lLFxuICAgYXV0aG9yLFxuICAgYXV0aG9ySWQsXG59OiBQcm9wcykgPT4ge1xuICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktMyBweC01IHRleHQtZ3JheS05MCBtdC01IG1iLTEwXCI+XG4gICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTIwMCBmb250LXRpdGxlIHRleHQtNXhsXCI+e3RpdGxlfTwvaDE+XG4gICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMjAwIGZvbnQtc2FucyBsZWFkaW5nLWxvb3NlIHRleHQteGxcIj5cbiAgICAgICAgICAgIHtieWxpbmV9XG4gICAgICAgICA8L3A+XG4gICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMjAwIGZvbnQtc2FucyBsZWFkaW5nLWxvb3NlIHRleHQteGxcIj5cbiAgICAgICAgICAgIFdyaXR0ZW4gYnk6IHthdXRob3J9XG4gICAgICAgICA8L3A+XG4gICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMjAwIGZvbnQtc2FucyBsZWFkaW5nLWxvb3NlIHRleHQteGxcIj5cbiAgICAgICAgICAgIERhdGUgUHVibGlzaGVkOiB7cHVibGlzaGVkQXR9XG4gICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvZ0FydGljbGVIZWFkZXJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbnRlcmZhY2Ugc2VyaWFsaXplciB7XG4gICBub2RlOiB7XG4gICAgICBjb2RlOiBzdHJpbmdcbiAgICAgIGxhbmd1YWdlPzogc3RyaW5nXG4gICB9XG59XG5cbmNvbnN0IHNlcmlhbGl6ZXJzID0ge1xuICAgdHlwZXM6IHtcbiAgICAgIENvZGU6ICh7IG5vZGUgPSB7IGNvZGU6ICdqYXZhc2NyaXB0JyB9IH06IHNlcmlhbGl6ZXIpID0+IHtcbiAgICAgICAgIGNvbnN0IHsgY29kZSwgbGFuZ3VhZ2UgfSA9IG5vZGVcbiAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8cHJlIGRhdGEtbGFuZ3VhZ2U9e2xhbmd1YWdlfT5cbiAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT17YGxhbmd1YWdlLSR7bGFuZ3VhZ2V9YH0+e2NvZGV9PC9jb2RlPlxuICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICApXG4gICAgICB9LFxuICAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplcnNcbiJdLCJzb3VyY2VSb290IjoiIn0=