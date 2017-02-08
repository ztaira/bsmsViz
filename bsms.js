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

// create the nodes array
function createAllNodesArray () {
    var tempVar;
    for (j = 0; j < allConcentrations.length; j=j+1) {
        for (i = 0; i < courseTypes.length; i=i+1) {
            for (h = 0; h < allConcentrations[j]["data"][courseTypes[i]].length; h=h+1) {
                if (allNodeCodes.indexOf(allConcentrations[j]["data"][courseTypes[i]][h]["code"]) === -1) {
                    tempVar = allConcentrations[j]["data"][courseTypes[i]][h];
                    tempVar["id"] = tempVar["code"];
                    allNodes.push(tempVar);
                    allNodeCodes.push(tempVar["id"]);
                }
            }
        }
    }
    for (j = 0; j < allConcentrations.length; j=j+1) {
        var tempVar = allConcentrations[j]["name"];
        allNodes.push({"code": tempVar, "name": tempVar, "id": tempVar});
    }
    console.log({"nodes": allNodes});
}

// create the links array
function createAllLinksArray () {
    var sourceName, targetName;
    for (i = 0; i < allConcentrations.length; i=i+1) {
        for (j = 0; j < courseTypes.length; j=j+1) {
            for (k = 0; k < allConcentrations[i]["data"][courseTypes[j]].length; k=k+1) {
                sourceName = allConcentrations[i]["name"];
                targetName = allConcentrations[i]["data"][courseTypes[j]][k]["code"];
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
        .style("stroke", "grey")
        .style("stroke-width", "1.5px");

    // create all the nodes
    var graphNodes = svg.append("g")
        .attr("class", "courses")
        .selectAll("circle")
        .data(allNodes)
        .enter().append("circle")
        // .attr("id", function(d) { return d.code; } )
        .style("fill", nodeColor)
        .attr("r", nodeSize) //courseNode size
        // functions to call when dragged
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
        // show the tooltip on mouseover
        .on("mouseenter", function (d) {
          div.transition()
            .duration(200)
            .style("opacity", .8);
          div.html(d.code + "<br>" + d.name)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        // hide the tooltip on mouseleave
        .on("mouseleave", function (d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
        })
        // when clicked, open the repository the node represents
        .on("click", function (d) {
            console.log(d);
        });

    // function to determine node size
    function nodeColor(d) {
        if (d.name.slice(0, 4) != "bsms") {
            return "orange";
        } else {
            return "grey";
        }
    }

    // function to determine node size
    function nodeSize(d) {
        if (d.name.slice(0, 4) != "bsms") {
            return 5;
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
        .force("collide", d3.forceCollide(5).strength(1))
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
