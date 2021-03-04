const btnReport = document.querySelector('.btnReport');
const resultTable = document.querySelector('.resultTable');
const btnGraph = document.querySelector('.btnGraph');
const graph = document.querySelector('.graph');

let dataForGraph = [];
let select = document.querySelector('.years');
btnGraph.disabled = true;

function request(url, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
        if(xhr.status != 200) {
            console.log(`Статуc ответа: ${xhr.status}`);
        } else {
            const result = JSON.parse(xhr.response);
            if(cb) {
                cb(result);  
            };
        };   
    };
    xhr.send();
};

function displayResult(result) {
    if(select.value === '') {
        resultTable.innerHTML = '';
        alert('Выберите год');
        return false;
    };
    const foundedYear = result.filter(el => el.year === +select.value);

    let table = createTable(foundedYear);
    resultTable.innerHTML = table;
};

function createTable(year) {
    let tableBody = ''; 
    let tableStart = `<table class="tableSales"><thead><th>1 кв.</th><th>2 кв.</th><th>3 кв.</th><th>4 кв.</th></thead>`;
    for (let res in year) {
        tableBody = renderBodyTable(year[res].sales)
    };
    let tableEnd = `</table>`;
    return tableStart + tableBody + tableEnd;
};

function renderBodyTable(sales) {
    let arrSales = Object.values(sales);
    let tableBody = '';
    dataForGraph = [];
    arrSales.forEach(el => {
        tableBody += `<td>${el}</td>`;
        dataForGraph.push(el); 
    });
    return `<tr>${tableBody}</tr>`;
};


btnReport.addEventListener('click', () => {
    graph.innerHTML = '';
    request('https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440',displayResult);
    btnGraph.disabled = false;
});

btnGraph.addEventListener('click', () => {
    if(select.value !== '' && dataForGraph.length > 0) {
        let src = `https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'], datasets:[{label:'Выручка за ${select.value} год',data: [${dataForGraph}]}]}}`;
        let result = `<iframe class="graph" scrolling="no" frameborder="0" src="${src}"></iframe>`;
        graph.innerHTML =  result;
    };
});


