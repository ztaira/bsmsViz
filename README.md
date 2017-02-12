# bsmsViz
Hack-A-Week 16: Visualizing the BS/MS program's depth courses in 
Northeastern's Department of Electrical and Computer Engineering

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
- Check that course namings are consistent

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

### Source URLs:
- [ECE Programs Homepage](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/#programstext)
- [Communications, Control, and Signal Processing](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/electrical-computer-engineering-concentration-communications-control-signal-processing-msece/#programrequirementstext)
- [Computer Systems and Software](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/computer-systems-software/#programrequirementstext)
- [Computer Networks and Security](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/computer-networks-security/#programrequirementstext)
- [Computer Vision, Machine Learning, and Algorithms](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/computer-vision-machine-learning-algorithms/#programrequirementstext)
- [Electromagnetics, Plasma, and Optics](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/electrical-computer-engineering-concentration-electromagnetics-plasma-optics-msece/#programrequirementstext)
- [Microsystems, Materials, and Devices](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/electrical-computer-engineering-concentration-microsystems-materials-devices-msece/#programrequirementstext)
- [Power Systems](http://catalog.northeastern.edu/graduate/engineering/electrical-computer/electrical-computer-engineering-concentration-power-systems-msece/#programrequirementstext)
