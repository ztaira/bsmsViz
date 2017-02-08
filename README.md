# bsmsViz
Hack-A-Week 16: Visualizing the BS/MS offerings in the Northeastern's
Department of Electrical and Computer Engineering

### Usage:
- Visit https://ztaira14.github.io/bsmsViz/ for hosted version
- Open index.html in the browser of your choice for local version

### Features:
- Easily visualize the depth courses in the various BS/MS offerings in the
ECE department at Northeastern 
- Mouseover for class codes and class titles

### What it does:
- Uses data from the js files in the data directory to construct a graph
of the depth courses
- Visualises this data using the d3 visualization library

### What it doesn't do:
- Check that course namings are consistent (As of Feb. 7th, 2017, the class
EECE 5698 has three different titles in three different concentrations)

### Included Files:
```
- README.md..................This readme file
- index.html.................HTML/CSS file
- bsms.js....................JS file linked to by index.html
- d3.min.js..................d3, a cool visualization library
- data/......................Data used to generate the graph. Originally
obtained by pulling down the HTML using Python and formatting it into json
with vim.
```

### Example Output:
- See https://ztaira14.github.io/bsmsViz/
