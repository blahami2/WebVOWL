module.exports = function () {

    var app = {},
        graph = webvowl.graph(),
        options = graph.graphOptions(),
        languageTools = webvowl.util.languageTools(),
        graphSelector = "#graph",
    // Modules for the webvowl app
        ontologyMenu,
        exportMenu,
        gravityMenu,
        filterMenu,
        modeMenu,
        resetMenu,
        pauseMenu,
        sidebar = require("./sidebar")(graph),
        setupableMenues,
    // Graph modules
        statistics = webvowl.modules.statistics(),
        focuser = webvowl.modules.focuser(),
        selectionDetailDisplayer = webvowl.modules.selectionDetailsDisplayer(sidebar.updateSelectionInformation),
        datatypeFilter = webvowl.modules.datatypeFilter(),
        subclassFilter = webvowl.modules.subclassFilter(),
        disjointFilter = webvowl.modules.disjointFilter(),
        nodeDegreeFilter = webvowl.modules.nodeDegreeFilter(),
        setOperatorFilter = webvowl.modules.setOperatorFilter(),
        nodeScalingSwitch = webvowl.modules.nodeScalingSwitch(graph),
        compactNotationSwitch = webvowl.modules.compactNotationSwitch(graph),
        pickAndPin = webvowl.modules.pickAndPin();

    app.initialize = function () {


        options.graphContainerSelector(graphSelector);
        options.selectionModules().push(focuser);
        options.selectionModules().push(selectionDetailDisplayer);
        options.selectionModules().push(pickAndPin);
        options.filterModules().push(statistics);
        options.filterModules().push(datatypeFilter);
        options.filterModules().push(subclassFilter);
        options.filterModules().push(disjointFilter);
        options.filterModules().push(setOperatorFilter);
        options.filterModules().push(nodeScalingSwitch);
        options.filterModules().push(nodeDegreeFilter);
        options.filterModules().push(compactNotationSwitch);

        exportMenu = require("./menu/exportMenu")(options.graphContainerSelector());
        gravityMenu = require("./menu/gravityMenu")(graph);
        filterMenu = require("./menu/filterMenu")(graph, datatypeFilter, subclassFilter, disjointFilter, setOperatorFilter, nodeDegreeFilter);
        modeMenu = require("./menu/modeMenu")(graph, pickAndPin, nodeScalingSwitch, compactNotationSwitch);
        pauseMenu = require("./menu/pauseMenu")(graph);
        resetMenu = require("./menu/resetMenu")(graph, [gravityMenu, filterMenu, modeMenu,
            focuser, selectionDetailDisplayer, pauseMenu]);
        ontologyMenu = require("./menu/ontologyMenu")(loadOntologyFromText);

        d3.select(window).on("resize", adjustSize);

        // setup all bottom bar modules
        setupableMenues = [exportMenu, gravityMenu, filterMenu, modeMenu, resetMenu, pauseMenu, sidebar, ontologyMenu];
        setupableMenues.forEach(function (menu) {
            menu.setup();
        });

        graph.start();
        //mos = require("./mockOntologySupplier")(loadOntologyFromText);
        //mos.load();


        loadData(function (data) {
            loadOntologyFromText(data, undefined);
        });

        //var reader = new FileReader();
        //var mockedJsonString = reader.readAsText("../data/mocked.json");
        //console.log(jsonString);
        adjustSize();


    };

    function loadOntologyFromText(jsonText, filename, alternativeFilename) {
        pauseMenu.reset();
        //console.log(jsonText);
        var data;
        if (jsonText) {

            data = JSON.parse(jsonText);

            if (!filename) {
                // First look if an ontology title exists, otherwise take the alternative filename
                var ontologyNames = data.header ? data.header.title : undefined;
                var ontologyName = languageTools.textInLanguage(ontologyNames);

                if (ontologyName) {
                    filename = ontologyName;
                } else {
                    filename = alternativeFilename;
                }
            }
        }

        exportMenu.setJsonText(jsonText);

        options.data(data);
        graph.reload();
        sidebar.updateOntologyInformation(data, statistics);

        exportMenu.setFilename(filename);
    }

    function adjustSize() {
        var graphContainer = d3.select(graphSelector),
            svg = graphContainer.select("svg"),
            height = window.innerHeight - 40,
            width = window.innerWidth - (window.innerWidth * 0.22);

        graphContainer.style("height", height + "px");
        svg.attr("width", width)
            .attr("height", height);

        options.width(width)
            .height(height);
        graph.updateStyle();
    }

    function loadData(callback) {
        request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:8000/data/mocked.json', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText);
            } else {

            }
        };

        request.onerror = function () {
        };

        request.send();

    }

    return app;
};
