const fs = require('fs');
const csv = require('csv-parser');

let results = []

fs.createReadStream('./airport.csv')
    .pipe(csv({ headers: false }))
    .on('data', (row) => {
        // results.push(row)
        results.push(`{code:\`${row[0]}\`,name:\`${row[1]}\`,country_code:\`${row[2]}\`,timezone:\`${row[3]}\`,created_at: new Date(),},`)
    })
    .on('end', () => {
        console.log(results) // preview results to log
        results.shift() // To delete header row from results
        fs.writeFileSync('./seed.txt', results.join('\n'))
    })