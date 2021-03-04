const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString,'text/xml')

const studentNode = xmlDOM.querySelectorAll('student');
const nameNode = xmlDOM.querySelectorAll('name');
const firstNode = xmlDOM.querySelectorAll('first');
const secondtNode = xmlDOM.querySelectorAll('second');
const ageNode = xmlDOM.querySelectorAll('age');
const profNode = xmlDOM.querySelectorAll('prof');

const arrStudensObject = [];

for(let i=0; i<studentNode.length; i++) {
  arrStudensObject.push(createStudentObject(i));
}

function createStudentObject(num){
  return {
    name: `${firstNode[num].textContent} ${secondtNode[num].textContent}`,
    age: ageNode[num].textContent,
    proof: profNode[num].textContent,
    lang: nameNode[num].getAttribute('lang')
  };
};

const result = {
  list: arrStudensObject
};

console.log(result);


