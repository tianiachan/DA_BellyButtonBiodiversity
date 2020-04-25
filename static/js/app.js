var samples = [];
var sampleMetadata = [];
//use d3 to read in json
d3.json("./samples.json", function (data) {
  //sample data
  samples = data.samples;
  //metadata data
  sampleMetadata = data.metadata;
  //populate dropdown with IDs
  // var optionID = [];
  //get dropdown menu on html
  var dropOption = d3.select("#selDataset");
  // default option
  dropOption
    .append("option")
    .text("select option")
    .attr("value", "none");
  //populate dropdown menu with all of the IDs using forEach
  samples.forEach(sample => {
    //using dropdown, append the text and value as the id
    dropOption
      .append("option")
      .text(sample.id)
      .attr("value", sample.id);
    // append ids for future use?
    // optionID.push(sample.id);
  });
});

// helper to print metadata to the panel on html
function printMetadata(patientMeta) {
  
  //access the panel body
  var pulledMetaData = d3.select("#sample-metadata");
  //clear old data before populating with new data
  pulledMetaData.text(" ");
  //populate panel body - turn into a helper function?
  pulledMetaData
    .append("p")//append p to make new line every time - better solution?
    .text(`id: ${patientMeta.id}`)
    .append("p")
    .text(`ethnicity: ${patientMeta.ethnicity}`)
    .append("p")
    .text(`gender: ${patientMeta.gender}`)
    .append("p")
    .text(`age: ${patientMeta.age}`)
    .append("p")
    .text(`location: ${patientMeta.location}`)
    .append("p")
    .text(`bbtype: ${patientMeta.bbtype}`)
    .append("p")
    .text(`wfreq: ${patientMeta.wfreq}`);
}

//helper for bubble chart population
function makeBubble(otuIDs, otuLabels, sampleValues) {
  //trace for bubble chart
  var traceBubble =
  {
    x: otuIDs,
    y: sampleValues,
    mode: 'markers',
    marker:
    {
      size: sampleValues,
      color: otuIDs
    },
    text: otuLabels
  };

  var dataBubble = [traceBubble];

  //make layout
  var layoutBubble =
  {
    title: "Bubble Chart",
    showlegend: false,
    height: 600,
    width: 600,
    xaxis: { title: "OTU ID" }
  };
  //populate the bubble chart
  Plotly.newPlot('bubble', dataBubble, layoutBubble);
}

//helper to make bar chart
function makeBar(otuIDstring, sampleValues) {
  //make trace  
  var traceBar = {
    //set ID to string  to read as labels
    x: sampleValues.slice(0, 10).reverse(),
    y: otuIDstring.slice(0, 10).reverse(),
    mode: 'markers',
    marker: { size: 16 },
    text: otuIDstring.slice(0, 10).reverse(),
    type: "bar",
    //this is what is needed to make a horizontal bar 
    orientation: "h"
  };

  //this is an array and allows for you to pass  more than one trace at a time
  var dataBar = [traceBar];

  var layoutBar = {
    title: "Bar Chart"
  };

  //   //go to the html item with id called plot so know where to place it
  Plotly.newPlot("bar", dataBar, layoutBar);
}

//helper to make gauge chart
function makeGauge(washingF) {
  var data =
    [{
      domain: { x: [0, 1], y: [0, 1] },
      value: washingF,
      title: { text: "Belly Button Washing Frequency -  Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: {range: [0, 10]}}
    }];

  var layout = 
    { 
      width: 600, 
      height: 500, 
      margin: { t: 0, b: 0 } 
    };
  Plotly.newPlot('gauge', data, layout);
}


//get information from page on the option selected and execute method called optionChanged
d3.select("#selDataset").on("change", optionChanged(this.value));

// //take value from when option is changed to populate maps using helper functions
function optionChanged(sampleID) {
  samples.forEach(patientSample => {
    // if the id in the array matches the Id that was brought in, call bar and bubble
    if (sampleID === patientSample.id) {
      //declare empty array to store the ids and string version of ID
      var otuIDs = [];
      var otuIDstring = [];
      //change all OTU ids to strings to use in bargraph
      for (i = 0; i < patientSample.otu_ids.length; i++) {
        //put OTU in front of the ID and put to string
        var tempID = patientSample.otu_ids[i].toString();
        //push to array
        otuIDs.push(tempID);
        otuIDstring.push("OTU " + tempID);
      }

      //labels
      var otuLabels = patientSample.otu_labels;

      //values
      var sampleValues = patientSample.sample_values;
      makeBar(otuIDstring, sampleValues);
      makeBubble(otuIDs, otuLabels, sampleValues);
    }
  })
  //populate meta data using forEach
  sampleMetadata.forEach(patientMetaData => {
    // if id matches, call the metadatafunction
    if (sampleID === patientMetaData.id.toString()) {
      printMetadata(patientMetaData);
      // console.log(patientMetaData.wfreq);
      makeGauge(patientMetaData.wfreq);
    }
  })
}
