//use d3 to read in json
d3.json("/samples.json", function(data) 
{
        
    //sample data
    var samples = data.samples;

    //populate dropdown with IDs
    var optionID = []
    //get data from the selection
    var dropOption = d3.select("#selDataset");
    //populate dropdown menu with all of the IDs
    for (j = 0;j < samples.length;j++)
    {
        dropOption
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
    
    //bar chart -  turn into a helper function?
    var traceBar = {
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
    var dataBar = [traceBar];
  
    var layoutBar = {
        title: "Bar Chart"        
    };
  
    //go to the html item with id called plot so know where to place it
    Plotly.newPlot("bar", dataBar, layoutBar);

    //bubble chart - turn into helper function?
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

      //display sample meta data
      //read in meta data
      var patientMeta = data.metadata;
      //access the panel body
      var sampleMetaData = d3.select("#sample-metadata");
      //populate panel body - turn into a helper function?
      sampleMetaData
        .append("p")
        .text(`id:${patientMeta[0].id}\n
        ethnicity:${patientMeta[0].ethnicity}\n
        gender: ${patientMeta[0].gender}\n
        age:${patientMeta[0].age}\n
        location:${patientMeta[0].location} \n
        bbtype:${patientMeta[0].bbtype}\n
        wfreq:${patientMeta[0].wfreq}`);

      // if (patientMetaArray.includes(d3.select("#selDataset")))
      // {
      //   console.log(indexOf(patientMetaArray.id))
      // }
      // while(patientMeta.includes(dropOption.text))
      // {
      //   console.log(data.metadata[dropOption]);
      //   break;
      // }
});


