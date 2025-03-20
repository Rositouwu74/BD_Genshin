const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Console } = require('console');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())
require('dotenv').config(); // Cargar variables de entorno

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Convertir a booleano
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
  },
};

module.exports = dbConfig;

// Probar conexión con la base de datos
sql.connect(dbConfig)
  .then(() => console.log('Conexión a SQL Server exitosa'))
  .catch(err => console.error('Error al conectar a SQL Server:', err));

// Endpoint Personajes
app.get('/', async (req, res) => {
  const rareza = req.query.rareza || ''; // Leer rareza desde los query params
  const arma = req.query.arma || ''; // Leer arma desde los query params
  const elemento = req.query.elemento || ''; // Leer elemento desde los query params
  const rol = req.query.rol || ''; // Leer rol desde los query params
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('rareza', sql.NVarChar, `%${rareza}%`) // Usar rareza como parámetro
      .input('arma', sql.NVarChar, `%${arma}%`) // Usar arma como parámetro
      .input('elemento', sql.NVarChar, `%${elemento}%`) // Usar elemento como parámetro
      .input('rol', sql.NVarChar, `%${rol}%`) // Usar rol como parámetro
      .query(`
        SELECT * 
        FROM Personajes
        WHERE Rareza LIKE @rareza
          AND Arma LIKE @arma
          AND Elemento LIKE @elemento
          AND Rol LIKE @rol
        ORDER BY ID_Personaje ASC
      `); // Filtrar por rareza, arma, elemento y rol
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).send('Error en el servidor');
  }
});


// Nuevo endpoint para artefactos
app.get('/Artefactos', async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query(`SELECT * FROM artefactos`);
      res.json(result.recordset);
    } catch (err) {
      console.error('Error en la consulta de artefactos:', err);
      res.status(500).send('Error en el servidor');
    }
  });
  
  app.get('/builds', async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query(`
        SELECT 
          b.UIDs,
          b.ID_Build,
          b.ID_Personaje,
          p.NOMBRE as NOMBRE_PERSONAJE,
          b.Artefacto_Flor,
          b.Artefacto_Pluma,
          b.Artefacto_Reloj,
          b.Artefacto_Caliz,
          b.Artefacto_Corona,
          b.Arma_Recomendada,
          b.Talentos,
          b.Descripcion
        FROM Builds b
        LEFT JOIN Personajes p ON b.ID_Personaje = p.ID_Personaje
        ORDER BY b.ID_Build ASC
      `);
      res.json(result.recordset);
    } catch (err) {
      console.error('Error en la consulta de builds:', err);
      res.status(500).send('Error en el servidor');
    }
  });

  app.get('/domains', async (req, res) => {
    let pool;
    try {
      pool = await sql.connect(dbConfig);
  
      const region = req.query.region || ''; // Filtro de región
      const reward = req.query.reward || ''; // Filtro de recompensa: "Materiales" o "Artefactos"
  
      const result = await pool.request()
        .input('region', sql.NVarChar, `%${region}%`)
        .input('reward', sql.NVarChar, reward) // Pasar directamente "Materiales" o "Artefactos"
        .query(`
          SELECT 
            ID_Dominio,
            Nombre,
            Recompensas,
            Requerimientos,
            Ubicacion
          FROM Dominios
          WHERE 
            (@region = '' OR Ubicacion LIKE @region) AND
            (@reward = '' OR Recompensas LIKE '%' + @reward + '%')
          ORDER BY ID_Dominio ASC
        `);
      
      res.json(result.recordset);
    } catch (err) {
      console.error('Error en la consulta de dominios:', err);
      res.status(500).send('Error en el servidor');
    } finally {
      if (pool) {
        try {
          await pool.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  });  

  app.get('/build_personaje', async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig); // Conexión a la base de datos
      const result = await pool.request().query(`
        SELECT * 
        FROM Build_Personaje
        ORDER BY ID_Build ASC
      `); // Consulta a la vista
      res.json(result.recordset); // Devuelve los datos como JSON
    } catch (err) {
      console.error('Error al consultar la vista Build_Personaje:', err.message || err);
      res.status(500).send('Error en el servidor: ' + (err.message || 'Error desconocido'));
    }
  });

  app.delete('/builds/delete-last', async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig);
  
      // Ejecutar el procedimiento almacenado
      await pool.request().execute('EliminarUltimaBuild');
  
      res.status(200).send('Última build eliminada correctamente.');
    } catch (err) {
      console.error('Error al eliminar la última build:', err);
      res.status(500).send('Error al eliminar la última build.');
    }
  });

  app.post('/register', async (req, res) => {
    const { UID, NOMBRE, Correo, AR, Nivel_Mundo } = req.body;
  
    try {
      const pool = await sql.connect(dbConfig);
  
      // Validar datos requeridos
      if (!UID || !NOMBRE || !Correo) {
        return res.status(400).send('Por favor, completa todos los campos obligatorios.');
      }
  
      // Insertar usuario en la tabla Usuarios
      await pool.request()
        .input('UID', sql.Int, UID)
        .input('NOMBRE', sql.VarChar(30), NOMBRE)
        .input('Correo', sql.VarChar(40), Correo)
        .input('AR', sql.Int, AR || null) // Valor opcional
        .input('Nivel_Mundo', sql.Int, Nivel_Mundo || null) // Valor opcional
        .query(`
          INSERT INTO Usuarios (UIDs, NOMBRE, Correo, AR, Nivel_Mundo)
          VALUES (@UID, @NOMBRE, @Correo, @AR, @Nivel_Mundo)
        `);
  
      res.status(201).send('Usuario registrado exitosamente.');
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).send('Hubo un error al registrar el usuario.');
    }
  });

  app.get('/usuarios-ar-minimo', async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig);
  
      const result = await pool.request().query(`
        SELECT * 
        FROM Mostrar_Usuarios_AR_Minimo
      `);
  
      res.json(result.recordset);
    } catch (err) {
      console.error('Error al consultar la vista Mostrar_Usuarios_AR_Minimo:', err);
      res.status(500).send('Error en el servidor');
    }
  });  

  // Endpoint para filtrar usuarios en América
app.get('/filtrar-america', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('FiltrarUsuariosAmerica');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado para América:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Endpoint para filtrar usuarios en Europa
app.get('/filtrar-europa', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('FiltrarUsuariosEuropa');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado para Europa:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Endpoint para filtrar usuarios en Asia
app.get('/filtrar-asia', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('FiltrarUsuariosAsia');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado para Asia:', err);
    res.status(500).send('Error en el servidor');
  }
});

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
