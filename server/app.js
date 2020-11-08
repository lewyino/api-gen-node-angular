const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

/**
 * @swagger
 * components:
 *  schemas:
 *      DataItem:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int32
 *              name:
 *                  type: string
 */
let data = [{id: 1, name: 'Mateusz'}];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
    console.log(`API app listening at http://localhost:${port}`);
});

/**
 * @swagger
 *  /:
 *      get:
 *          responses:
 *              200:
 *                  description: List of DataItem
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/DataItem'
 */
app.get('/', (req, res) => {
    res.send(data);
});

/**
 * @swagger
 *  /:id:
 *      get:
 *          responses:
 *              200:
 *                  description: Specified DataItem
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DataItem'
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *                type: integer
 *                format: int32
 */
app.get('/:id', (req, res) => {
    res.send(findItemById(req.params.id));
});

/**
 * @swagger
 *  /:
 *      post:
 *          responses:
 *              201:
 *                  description: Created DataItem
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/DataItem'
 *              400:
 *                  description: Error while add item
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/DataItem'
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *                type: integer
 *                format: int32
 */
app.post('/', (req, res) => {
    if (!req || !req.body || !req.body.id || findItemById(req.body.id)) {
        res.status(400).send('error while add item');
        return;
    }
    data.push(req.body);
    res.status(201).send(req.body);
});

/**
 * @swagger
 *  /:id:
 *      put:
 *          responses:
 *              204:
 *                  description: Successful edit specified DataItem
 *              400:
 *                  description: Error while edit item
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/DataItem'
 */
app.put('/:id', (req, res) => {
    const editedItem = findItemById(req.params.id);
    if (!editedItem) {
        res.status(400).send('error while edit item');
        return;
    }
    if (!req || !req.body || !req.body.id) {
        res.status(400).send('error while edit item');
        return;
    }
    data = data.map((item) => item.id !== editedItem.id ? item : req.body);
    res.status(204).send();
});

/**
 * @swagger
 *  /:id:
 *      delete:
 *          responses:
 *              204:
 *                  description: Successful delete specified DataItem
 *              400:
 *                  description: Error while delete item
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *                type: integer
 *                format: int32
 */
app.delete('/:id', (req, res) => {
    const deletedItem = findItemById(req.params.id);
    if (!deletedItem) {
        res.status(400).send('error while delete item');
        return;
    }
    data = data.filter((item) => item.id !== deletedItem.id);
    res.status(204).send();
});

function findItemById(id) {
    return data.find((item) => item.id === parseInt(id));
}
