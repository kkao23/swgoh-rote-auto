const fs = require('fs');
const path = require('path');

const dataDirectory = path.join(__dirname, '../data');
const leads = new Set();

// A regex to find the 'lead' key and its string value
const leadRegex = /lead:\s*['"](.*?)['"]/g;

// A function to recursively read files and extract leads
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // If it's a directory, recurse into it
      processDirectory(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.ts')) {
      // If it's a TypeScript file, read and process it
      console.log(`Processing file: ${fullPath}`);
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      
      let match;
      while ((match = leadRegex.exec(fileContent)) !== null) {
        // The first capturing group (index 1) is the lead value
        leads.add(match[1]);
      }
    }
  }
}

// Start the process from the 'data' directory
if (fs.existsSync(dataDirectory)) {
  processDirectory(dataDirectory);
  
  console.log('\nExtracted unique leads:');
  leads.forEach(lead => console.log(lead));
  
  if (leads.size === 0) {
    console.log('No leads found.');
  }

} else {
  console.error(`Error: The directory '${dataDirectory}' does not exist.`);
}