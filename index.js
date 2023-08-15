import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Write the Item object to the JSON file
const writeItems = (url, item) => {
    let file;
    let _url = "data";

    if (url === "/work"){
        _url = "work";
    }

    file = fs.readFileSync(`./${_url}.json`, "utf8")

    let obj = JSON.parse(file);

    // check if the item is not empty
    if (!item) return;

    // Create the new item
    obj[obj.length] = {id: obj.length + 1, item: item, done: false};
    fs.writeFileSync(`./${_url}.json`, JSON.stringify(obj), "utf8");
};

// Update the Item object in the JSON file
const updateItem = (url, id, done) => {
    let file;
    let _url = "data";

    if (url === "/work"){
        _url = "work";
    }

    // check from where the item was given
    file = fs.readFileSync(`./${_url}.json`, "utf8")


    let obj = JSON.parse(file);
    console.log(id, done, _url, url)

    // Update the item
    obj[id - 1] = {id: id, item: obj[id - 1].item, done: done};
    fs.writeFileSync(`./${_url}.json`, JSON.stringify(obj), "utf8");
    return (obj);
};

// Home Page
app.get('/', (req, res) => {
    const file = fs.readFileSync("./data.json", "utf8");
    let obj = JSON.parse(file);
    res.render('index.ejs', {items: obj});
});

// Create the item and redirect to the Home Page
app.post('/', (req, res) => {
    writeItems(req.url, req.body.item);
    res.redirect('/');
});

// Update the item and Render to the Home Page
app.put('/', (req, res) => {
    const items = updateItem(req.body.url, req.body.id, req.body.done);
    res.render('index.ejs', {items})
});

// Work Page
app.get('/work', (req, res) => {
    const file = fs.readFileSync("./work.json", "utf8");
    let obj = JSON.parse(file);
    res.render('index.ejs', {items: obj});
});

// Create the item and redirect to the Work Page
app.post('/work', (req, res) => {
    writeItems(req.url, req.body.item);
    res.redirect('/work');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});