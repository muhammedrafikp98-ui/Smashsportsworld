const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const defaultDescription = "India's premier destination for professional badminton equipment. Shop rackets, shuttlecocks, and more from Kerala to the court.";

files.forEach(file => {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');

  // Skip if already has meta description
  if (content.includes('name="description"')) {
    console.log(`Skipping ${file} - already has description`);
    return;
  }

  // Extract title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'Smash Badminton Store';

  const metaTags = `
  <meta name="description" content="${defaultDescription}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${defaultDescription}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Smash Badminton">
`;

  // Insert before </head>
  if (content.includes('</head>')) {
    content = content.replace('</head>', metaTags + '</head>');
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
