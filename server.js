import express from 'express';
import bodyParser from 'body-parser';
import { layoutProcess } from './dist/index.js'; // Path to bpmn-auto-layout's main file

const app = express();
app.use(bodyParser.text({ type: 'application/xml' }));

// Route for auto-layout processing
app.post('/layout', async (req, res) => {
  try {
    const diagramXML = req.body;
    const layoutedXML = await layoutProcess(diagramXML);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(layoutedXML);
  } catch (err) {
    console.error('Error during layout:', err);
    res.status(500).send('Error processing layout');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
