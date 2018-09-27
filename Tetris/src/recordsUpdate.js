function resetRecords()
{
    localStorage["tetris.records"] = '';
}

let records = localStorage["tetris.records"];

if (!records)
    records = 'Table of records <br>';

if (localStorage["tetris.gamePlayed"] === 'true' )
{
    records = records + localStorage["tetris.username"] + ': ' + localStorage["tetris.score"];
    localStorage["tetris.gamePlayed"] = 'false';


    let recs = records.split('<br>');
    let recList = [];

    for (let i = 1; i < recs.length; i++) {
        let name = recs[i].split(': ')[0];
        let score = recs[i].split(': ')[1];
        recList.push({name, score});
    }

    recList.sort((a, b) => b.score - a.score);
    records = 'Table of records<br>';
    for (let i = 0; i < recList.length && i < 10; i++)
        records = records + recList[i].name + ': ' + recList[i].score + '<br>';
    localStorage["tetris.records"] = records;
}

document.getElementById("recTable").innerHTML = records;