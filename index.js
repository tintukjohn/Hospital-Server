const express = require('express');
const app = new express();

app.use(express.json());
var fs = require('fs');
const { exit } = require('process');

require('dotenv').config();
const PORT = process.env.PORT;

//  --get the list--
app.get('/getHospitals', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        console.log(data);
        //res.send(data);
        res.end(data);
    });
})

//  --add a hospital-- 
app.post('/addHospital', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        let hospitals = JSON.parse(data);
        hospitals.push(req.body);
        console.log(hospitals);
        let hosp = JSON.stringify(hospitals);
        res.end(hosp);

        fs.writeFile(__dirname + "/" + "data.json", hosp, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
            }
        });
    });
})

//  --get a single hospital by id--
app.get('/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        hospitals = JSON.parse(data);
        let hosp;
        var id = "";
        const getObjectById = (hospitals, id) => {
            const requiredIndex = hospitals.findIndex(el => {
                id = (+req.params.id);
                if (el.id == id) {
                    return id;
                }
            });
            if (requiredIndex === -1) {
                return false;
            };
            hosp = hospitals[requiredIndex];
            return hosp;
        };
        getObjectById(hospitals, id);
        console.log(hosp);
        res.end(JSON.stringify(hosp));
    });
})

//  --update a single hospital by id--
app.put('/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        let hospitals = JSON.parse(data);
        let hosp;
        var id = "";
        const updateById = (hospitals, id) => {
            const requiredIndex = hospitals.findIndex(el => {
                id = (+req.params.id);
                if (el.id == id) {
                    return id;
                }
            });
            if (requiredIndex === -1) {
                return false;
            };
            hosp = hospitals[requiredIndex];
            hosp.hospital = req.body.hospital;
            hosp.patients = req.body.patients;
            hosp.location = req.body.location;
            return hosp;
        };
        updateById(hospitals, id);
        console.log(hosp);
        res.end(JSON.stringify(hosp));
        try {
            fs.writeFile(__dirname + "/" + "data.json", hosp, (err) => {
                console.log("File written successfully\n");
            });
        } catch (error) {
            console.log(error);
        }
    });
})

//  --delete a hospital by id--
app.delete('/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        hospitals = JSON.parse(data);
        var id = "";
        const removeById = (hospitals, id) => {
            const requiredIndex = hospitals.findIndex(el => {
                id = (+req.params.id);
                if (el.id == id) {
                    return id;
                }
            });
            if (requiredIndex === -1) {
                return false;
            };
            return !!hospitals.splice(requiredIndex, 1);
        };
        removeById(hospitals, id);
        console.log(hospitals);
        let hosp = JSON.stringify(hospitals);
        res.end(hosp);

        try {
            fs.writeFile(__dirname + "/" + "data.json", hosp, (err) => {
                console.log("File written successfully\n");
            });
        } catch (error) {
            console.log(error);
        }
    });
});

app.listen(PORT, () => {
    console.log(`your console is running on port ${PORT}`);
});