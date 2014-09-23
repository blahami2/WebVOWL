webvowl.nodes.BaseNode = (function () {

	var base = function () {
		webvowl.elements.BaseElement.call(this);

		var that = this,
		// Basic attributes
			complement,
			instances,
			intersection,
			union,
		// Additional attributes
			disjointWith,
		// Fixed Location attributes
			locked = false,
			frozen = false,
			pinned = false,
		// Element containers
			nodeElement;


		// Properties
		this.complement = function (p) {
			if (!arguments.length) return complement;
			complement = p;
			return this;
		};

		this.disjointWith = function (p) {
			if (!arguments.length) return disjointWith;
			disjointWith = p;
			return this;
		};

		this.instances = function (p) {
			if (!arguments.length) return instances;
			instances = p;
			return this;
		};

		this.intersection = function (p) {
			if (!arguments.length) return intersection;
			intersection = p;
			return this;
		};

		this.nodeElement = function (p) {
			if (!arguments.length) return nodeElement;
			nodeElement = p;
			return this;
		};

		this.union = function (p) {
			if (!arguments.length) return union;
			union = p;
			return this;
		};


		// Functions
		this.locked = function (p) {
			if (!arguments.length) return locked;
			locked = p;
			applyFixedLocationAttributes();
			return this;
		};

		this.frozen = function (p) {
			if (!arguments.length) return frozen;
			frozen = p;
			applyFixedLocationAttributes();
			return this;
		};

		this.pinned = function (p) {
			if (!arguments.length) return pinned;
			pinned = p;
			applyFixedLocationAttributes();
			return this;
		};

		function applyFixedLocationAttributes() {
			if (that.locked() || that.frozen() || that.pinned()) {
				that.fixed = true;
			} else {
				that.fixed = false;
			}
		}

		/**
		 * Returns css classes generated from the data of this object.
		 * @returns {Array}
		 */
		that.collectCssClasses = function () {
			var cssClasses = [];

			if (typeof that.styleClass() === "string") {
				cssClasses.push(that.styleClass());
			}

			if (typeof that.visualAttribute() === "string") {
				cssClasses.push(that.visualAttribute());
			}

			return cssClasses;
		};


		// Reused functions TODO refactor
		this.addMouseListeners = function () {
			// Empty node
			if (!that.nodeElement()) {
				console.warn(this);
				return;
			}

			that.nodeElement().selectAll("*")
				.on("mouseover", onMouseOver)
				.on("mouseout", onMouseOut);
		};

		function onMouseOver() {
			if (that.mouseEntered()) {
				return;
			}

			var selectedNode = that.nodeElement().node(),
				nodeContainer = selectedNode.parentNode;

			// Append hovered element as last child to the container list.
			nodeContainer.appendChild(selectedNode);

			that.setHoverHighlighting(true);

			that.mouseEntered(true);
		}

		/**
		 * Sets the hover highlighting of this node.
		 * @param enable
		 */
		this.setHoverHighlighting = function (enable) {
			that.nodeElement().selectAll("rect, circle").classed("hovered", enable);
		};

		function onMouseOut() {
			that.setHoverHighlighting(false);

			that.mouseEntered(false);
		}

		/**
		 * Generates a distinct css class for a node id.
		 * @returns {string}
		 */
		this.cssClassOfNode = function () {
			return "node" + that.id();
		};

	};

	base.prototype = Object.create(webvowl.elements.BaseElement.prototype);
	base.prototype.constructor = base;

	// Define d3 properties
	Object.defineProperties(base, {
		"index": {writable: true},
		"x": {writable: true},
		"y": {writable: true},
		"px": {writable: true},
		"py": {writable: true},
		"fixed": {writable: true},
		"weight": {writable: true}
	});


	return base;
}());