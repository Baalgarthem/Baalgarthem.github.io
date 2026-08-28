const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_FILE = path.join(__dirname, '../src/data/software.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return [];
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function generateId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function addProject() {
  console.log('\n--- Añadir Nuevo Proyecto ---');
  const title = await askQuestion('Título del proyecto: ');
  const description = await askQuestion('Descripción general: ');
  const image = await askQuestion('URL de la imagen (deja en blanco para ninguna): ');
  const youtube = await askQuestion('URL de YouTube (deja en blanco para ninguna): ');
  const github = await askQuestion('URL de GitHub (deja en blanco para ninguna): ');

  const newProject = {
    id: generateId(title) || Date.now().toString(),
    title,
    description,
    image,
    youtube,
    github
  };

  const data = loadData();
  data.push(newProject);
  saveData(data);
  console.log(`\n¡Proyecto "${title}" añadido exitosamente!\n`);
}

async function listProjects(data) {
  if (data.length === 0) {
    console.log('No hay proyectos registrados.');
    return;
  }
  console.log('\n--- Lista de Proyectos ---');
  data.forEach((p, idx) => {
    console.log(`[${idx + 1}] ${p.title} (ID: ${p.id})`);
  });
  console.log('--------------------------\n');
}

async function editProject() {
  const data = loadData();
  if (data.length === 0) {
    console.log('\nNo hay proyectos para editar.\n');
    return;
  }
  await listProjects(data);
  const idxStr = await askQuestion('Introduce el número del proyecto a editar (o 0 para cancelar): ');
  const idx = parseInt(idxStr) - 1;
  
  if (idx >= 0 && idx < data.length) {
    const p = data[idx];
    console.log(`\nEditando: ${p.title}. Deja el campo en blanco para mantener el valor actual.`);
    const title = await askQuestion(`Título [${p.title}]: `);
    const description = await askQuestion(`Descripción [${p.description}]: `);
    const image = await askQuestion(`Imagen URL [${p.image}]: `);
    const youtube = await askQuestion(`YouTube URL [${p.youtube}]: `);
    const github = await askQuestion(`GitHub URL [${p.github}]: `);

    if (title) p.title = title;
    if (description) p.description = description;
    if (image) p.image = image;
    if (youtube) p.youtube = youtube;
    if (github) p.github = github;
    p.id = generateId(p.title);

    saveData(data);
    console.log(`\n¡Proyecto "${p.title}" actualizado exitosamente!\n`);
  } else {
    console.log('\nOperación cancelada.\n');
  }
}

async function deleteProject() {
  const data = loadData();
  if (data.length === 0) {
    console.log('\nNo hay proyectos para eliminar.\n');
    return;
  }
  await listProjects(data);
  const idxStr = await askQuestion('Introduce el número del proyecto a ELIMINAR (o 0 para cancelar): ');
  const idx = parseInt(idxStr) - 1;
  
  if (idx >= 0 && idx < data.length) {
    const confirm = await askQuestion(`¿Seguro que deseas eliminar "${data[idx].title}"? (s/n): `);
    if (confirm.toLowerCase() === 's') {
      const removed = data.splice(idx, 1);
      saveData(data);
      console.log(`\n¡Proyecto "${removed[0].title}" eliminado!\n`);
    } else {
      console.log('\nOperación cancelada.\n');
    }
  } else {
    console.log('\nOperación cancelada.\n');
  }
}

async function main() {
  let exit = false;
  while (!exit) {
    console.log('\n==================================');
    console.log('   GENERADOR DE PROYECTOS SOFTWARE');
    console.log('==================================');
    console.log('1. Añadir proyecto');
    console.log('2. Editar proyecto');
    console.log('3. Eliminar proyecto');
    console.log('4. Listar proyectos');
    console.log('5. Salir');
    
    const option = await askQuestion('\nElige una opción (1-5): ');

    switch (option) {
      case '1':
        await addProject();
        break;
      case '2':
        await editProject();
        break;
      case '3':
        await deleteProject();
        break;
      case '4':
        const data = loadData();
        await listProjects(data);
        break;
      case '5':
        exit = true;
        console.log('Saliendo...');
        break;
      default:
        console.log('Opción no válida.');
    }
  }
  rl.close();
}

main();
