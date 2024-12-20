const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { layoutProcess } = require('./bpmn-auto-layout/src/index'); // Adjust path if necessary

const app = express();
app.use(bodyParser.text({ type: 'application/xml' })); // We expect XML files as input

// Route to process and layout the BPMN file
app.post('/layout', async (req, res) => {
  try {
    const diagramXML = req.body;

    // Call layout function from bpmn-auto-layout
    const layoutedDiagram = await layoutProcess(diagramXML);
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(layoutedDiagram);
  } catch (error) {
    console.error('Error processing BPMN layout:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Default route for health check
app.get('/', (req, res) => {
  res.send('BPMN Auto Layout Service is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
