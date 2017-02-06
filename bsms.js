var allCourses = [];
var allLinks = [];
var courseTypes = ['breadth_courses', 'depth_courses'];
var allConcentrations = [
    bsms_communications_control_and_signal_processing,
    bsms_computer_networks_and_security,
    bsms_computer_systems_and_software,
    bsms_computer_vision_and_machine_learning,
    bsms_electromagnetics_plasma_and_optics,
    bsms_microsystems_materials_and_devices,
    bsms_power_systems];

function createAllCoursesArray () {
    for (j = 0; j < allConcentrations.length; j=j+1) {
        for (i = 0; i < courseTypes.length; i=i+1) {
            for (h = 0; h < allConcentrations[j][courseTypes[i]].length; h=h+1) {
                if (allCourses.indexOf(allConcentrations[j][courseTypes[i]][h]) === -1) {
                    allCourses.push(allConcentrations[j][courseTypes[i]][h]);
                }
            }
        }
    }
}

function createAllLinksArray () {
}

function displayConcentrations () {
    createAllCoursesArray();
    
    var width = window.innerWidth,
        height = window.innerHeight;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var courseNodes = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(allCourses)
        .enter().append("circle")
        // .attr("id", function(d) { return d.code; } )
        .style("fill", "orange")
        .attr("r", "5") //courseNode size
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

    var forceSim = d3.forceSimulation(allCourses)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(collideRadius).strength(1));
        // .force("charge", d3.forceManyBody());
    function collideRadius (d) {
        return 5;//courseNode size
    }

    forceSim.on("tick", 
        function tick (e) {
            courseNodes
                .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; })
                // .attr("transform", "translate(50, 50)");
                // .attr("transform", function(d) { console.log(d); return "translate(50, 50)"; })
                ;
        }
    );
}

displayConcentrations();
