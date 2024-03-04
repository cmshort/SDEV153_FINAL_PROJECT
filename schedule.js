async function getSchedule(){
  const response = await fetch('data/20240304_report_20240229.txt');
  const schedule = await response.text();
  const rows = schedule.split('\n');
  const cells = [];

  //Split row data by multi-whitespace seperation using regex pattern: /\s{2,}/g
  for (let i = 0; i < rows.length; i++){
    cells[i] = rows[i].split(/\s{2,}/g);
    //console.log(cells[i]);
  }

  generateTable(cells);
}

function generateTable(cells){
    const table = document.getElementById('scheduleTable');
    const queryStart = "<a href='https://www.stsci.edu/cgi-bin/get-proposal-info?id=";
    const queryEnd = "&observatory=JWST&pi=1'>";
    const labels = [];

    //create headers
    const row = document.createElement("tr");
    table.append(row);
    for (var i = 0; i < 9; i++){
        const header = document.createElement('th');
        labels[i] = cells[2][i];
        header.innerText = cells[2][i];
        row.append(header);
    }
    
    //create rows
    for(var i = 4; i < cells.length-1; i++){
        if (cells[i].length == 9){
            const row = document.createElement('tr');
            table.append(row);
            for (var j = 0; j < 9; j++){
                const value = document.createElement('td');
                value.setAttribute('data-title',labels[j]);

                var content = "";
                if (j==0){
                    //Generate link to observation details based on Visit ID
                    //cells[i][j].substring(0,4) extracts the 4 digit target ID from the "Visit ID" field and creates a well-formed link to the offsite source.
                    content = queryStart + cells[i][j].substring(0,4) + queryEnd + cells[i][j] + "</a>";
                } else {
                    content = cells[i][j];
                }                
                value.innerHTML = content;                
                row.append(value);            
            }
        }
    }
}