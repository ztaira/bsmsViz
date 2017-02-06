var allNodes = [];
var allLinks = [];
var courseTypes = ['breadth_courses', 'depth_courses'];
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
    for (j = 0; j < allConcentrations.length; j=j+1) {
        for (i = 0; i < courseTypes.length; i=i+1) {
            for (h = 0; h < allConcentrations[j]["data"][courseTypes[i]].length; h=h+1) {
                if (allNodes.indexOf(allConcentrations[j]["data"][courseTypes[i]][h]) === -1) {
                    allNodes.push(allConcentrations[j]["data"][courseTypes[i]][h]);
                }
            }
        }
    }
    for (j = 0; j < allConcentrations.length; j=j+1) {
        var tempVar = allConcentrations[j]["name"];
        allNodes.push({"code": tempVar, "name": tempVar});
    }
}

// create the links array
function createAllLinksArray () {
    for (i = 0; i < allConcentrations.length; i=i+1) {
    }
}

function displayConcentrations () {
    createAllNodesArray();
    createAllLinksArray;
    
    var width = window.innerWidth,
        height = window.innerHeight;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

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
        // .on("mouseenter", function (d) {
          // div.transition()
            // .duration(200)
            // .style("opacity", .8);
          // div.html("Name: " + d.name + "<br>Size: " + d.size + "<br>Language: " + languageIndex[d.language])
            // .style("left", (d3.event.pageX) + "px")
            // .style("top", (d3.event.pageY - 28) + "px");
        // })
        // hide the tooltip on mouseleave
        // .on("mouseleave", function (d) {
          // div.transition()
            // .duration(500)
            // .style("opacity", 0);
        // })
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

    var forceSim = d3.forceSimulation(allNodes)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(nodeSize).strength(1));
        // .force("charge", d3.forceManyBody());

    forceSim.on("tick", 
        function tick (e) {
            graphNodes
                .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
        }
    );
}

displayConcentrations();
