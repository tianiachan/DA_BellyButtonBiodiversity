//use d3 to read in json
d3.json("/samples.json", function(data) 
{
        
    //sample data
    var samples = data.samples;

    //populate dropdown with IDs
    var optionID = []
    for (j = 0;j < samples.length;j++)
    {
        var dropOption = d3.select("#selDataset")
        .append("option").
        text(samples[j].id).
        attr("value",samples[j].id);
        //append ids
        optionID.push(samples[j].id);
    }
    //ids
    //declare empty array
    var otuIDs = [];
    var otuIDstring= [];
    //get the first 10 since those are the highest OTU
    for ( i = 0; i <samples[0].otu_ids.length; i++)
    {
        //put OTU in front of the ID and put to string
        var tempID = samples[0].otu_ids[i].toString();
        //push to array
        otuIDs.push(tempID);
        otuIDstring.push("OTU "+ tempID);
    }

    //labels
    var otuLabels = samples[0].otu_labels;

    //values
    var sampleValues = samples[0].sample_values;
    
    //bar chart
    var trace1 = {
        //set ID to string  to read as labels
        x: sampleValues.slice(0,10),
        y: otuIDstring.slice(0,10),
        mode: 'markers',
        marker: {size:16},
        text: otuIDstring.slice(0,10),
        type: "bar",
        orientation: "h"
    };
  
    //this is an array and allows for you to pass  more than one trace at a time
    var data = [trace1];
  
    var layout = {
        title: "Bar Chart"        
    };
  
    //go to the html item with id called plot so know where to place it
    Plotly.newPlot("bar", data, layout);

    //bubble chart
    var traceBubble = {
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
      
      var layoutBubble = {
        title: "Bubble Chart",
        showlegend: false,
        height: 600,
        width: 600,
        xaxis: {title: "OTU ID"}
      };
      
      Plotly.newPlot('bubble', dataBubble, layoutBubble);
});


