import './components/TaskInput.js';
import './components/TaskList.js';
import './components/TaskItem.js';
import './components/TableWrapper.js';
import './components/TableHeader.js';
import './components/TableBody.js';

const body = document.querySelector('table-body');
if (!body) {
    console.error('TableBody element not found in DOM!');
} else {
    console.log('TableBody found:', body);
}


document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table-wrapper');
    const body = document.querySelector('table-body');

    if (!body) {
        console.error('TableBody element not found!');
        return;
    }

    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            console.log('JSON data:', data);
            table.setColumns(Object.keys(data[0]));
            table.setData(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
});


console.log("Application Loaded.");
