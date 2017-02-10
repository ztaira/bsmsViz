var allNodes = [];
var allNodeCodes = [];
var allLinks = [];
var courseTypes = [];
// courseTypes.push('breadth_courses');
courseTypes.push('depth_courses');
var allConcentrations = [
    {"data": bsms_communications_control_and_signal_processing, "name": "bsms_communications_control_and_signal_processing"},
    {"data": bsms_computer_networks_and_security, "name": "bsms_computer_networks_and_security"},
    {"data": bsms_computer_systems_and_software, "name": "bsms_computer_systems_and_software"},
    {"data": bsms_computer_vision_and_machine_learning, "name": "bsms_computer_vision_and_machine_learning"},
    {"data": bsms_electromagnetics_plasma_and_optics, "name": "bsms_electromagnetics_plasma_and_optics"},
    {"data": bsms_microsystems_materials_and_devices, "name": "bsms_microsystems_materials_and_devices"},
    {"data": bsms_power_systems, "name": "bsms_power_systems"}
];

function nodeSearchUrl(code) {
    var url;
    if (code.slice(0, 4) != "bsms") {
        url = "http://catalog.northeastern.edu/search/?P=";
        url = url + code.slice(0, -4) + "%20" + code.slice(-4);
        return url;
    } else {
        url = "http://catalog.northeastern.edu/search/?P=";
        searchstring = code.slice(5).replace(/_/g, " ");
        url = url + searchstring;
        return url;
    }
}

// create the nodes array
function createAllNodesArray () {
    var tempVar;
    for (j = 0; j < allConcentrations.length; j=j+1) {
        for (i = 0; i < courseTypes.length; i=i+1) {
            for (h = 0; h < allConcentrations[j].data[courseTypes[i]].length; h=h+1) {
                if (allNodeCodes.indexOf(allConcentrations[j].data[courseTypes[i]][h].code) === -1) {
                    tempVar = allConcentrations[j].data[courseTypes[i]][h];
                    tempVar.id = tempVar.code;
                    tempVar.searchUrl = nodeSearchUrl(tempVar.code);
                    allNodes.push(tempVar);
                    allNodeCodes.push(tempVar.id);
                }
            }
        }
    }
    for (j = 0; j < allConcentrations.length; j=j+1) {
        tempVar = {"code": allConcentrations[j].name};
        tempVar.name = tempVar.code;
        tempVar.id = tempVar.code;
        tempVar.searchUrl = nodeSearchUrl(tempVar.code);
        allNodes.push(tempVar);
    }
    console.log({"nodes": allNodes});
}

// create the links array
function createAllLinksArray () {
    var sourceName, targetName;
    for (i = 0; i < allConcentrations.length; i=i+1) {
        for (j = 0; j < courseTypes.length; j=j+1) {
            for (k = 0; k < allConcentrations[i].data[courseTypes[j]].length; k=k+1) {
                sourceName = allConcentrations[i].name;
                targetName = allConcentrations[i].data[courseTypes[j]][k].code;
                allLinks.push({"source": sourceName, "target": targetName});
            }
        }
    }
    console.log({"links": allLinks});
}

function displayConcentrations () {
    // Create the nodes and links arrays
    createAllNodesArray();
    createAllLinksArray();
    
    var width = window.innerWidth,
        height = window.innerHeight;

    // create the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("-webkit-user-select", "none")
        .style("-moz-user-select", "none")
        .style("-ms-user-select", "none")
        .html("Hello World");

    // create the svg
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // create all the links
    var graphLinks = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(allLinks)
        .enter().append("line")
        .style("stroke", "silver")
        .style("stroke-width", "1.5px");

    // create all the nodes
    var graphNodes = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(allNodes)
        .enter().append("circle")
        // .attr("id", function(d) { return d.code; } )
        .style("fill", nodeColor)
        .attr("r", nodeSize) //courseNode size
        .attr("class", "node")
        .attr("id", function(d) { return d.code; })
        // functions to call when dragged
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        // show the tooltip on mouseover
        .on("mouseenter", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0.8);
            div.html(tooltipLabel(d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            d3.select("#"+d.code).style("fill", "firebrick");
        })
        // hide the tooltip on mouseleave
        .on("mouseleave", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select("#"+d.code).style("fill", nodeColor);
        })
        // when clicked, open the repository the node represents
        .on("click", function(d) {
            d3.event.stopPropagation();
            window.open(d.searchUrl);
            console.log(d);
        });

    // function to determine node size
    function nodeColor(d) {
        if (d.name.slice(0, 4) != "bsms") {
            return "silver";
        } else {
            return "grey";
        }
    }

    function tooltipLabel(d) {
        if (d.name.slice(0, 4) != "bsms") {
            return "Course: " + d.code + "<br>" + d.name;
        } else {
            var words = d.name.split("_");
            var return_array = ["Concentration:<br>"];
            for (i = 1; i < words.length; i=i+1) {
                return_array.push(words[i][0].toUpperCase() + words[i].slice(1));
            }
            return return_array.join(" ");
        }
    }

    // function to determine node size
    function nodeSize(d) {
        d.state = 0;
        if (d.name.slice(0, 4) != "bsms") {
            return 6;
        } else {
            return 15;
        }
    }

    // what to do when dragged
    function dragstarted(d) {
        if (!d3.event.active) forceSim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    function dragended(d) {
        if (!d3.event.active) forceSim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // create the force simulation
    var forceSim = d3.forceSimulation(allNodes)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(nodeSize).strength(1))
        .force("charge", d3.forceManyBody().strength(-30))
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(50))
        .alphaDecay(0.02);

    // link stuff
    forceSim.force("link").links(allLinks);

    // tick function
    forceSim.on("tick", 
        function tick (e) {
            graphLinks
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            graphNodes
                .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
        }
    );
}

displayConcentrations();
