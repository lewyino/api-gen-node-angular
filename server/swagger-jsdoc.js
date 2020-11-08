const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "api-gen-node-angular",
        version: "1.0.0"
    }
};

const options = {
    swaggerDefinition,
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);
fs.writeFile('swagger.json', JSON.stringify(swaggerSpec, null, 2), (err) => {
    if (err) {
        console.error('error while save swagger.json', err);
        return;
    }
    console.log('swagger.json saved!');
});

console.log(swaggerSpec);
