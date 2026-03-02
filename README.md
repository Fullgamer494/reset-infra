# ReSet Infra

Repositorio destinado a la infraestructura de base de datos, migraciones y generacion automatica de esquemas de validacion para el ecosistema ReSet. Este proyecto esta disenado para ser consumido como un paquete NPM por otras aplicaciones (como una API Backend), actuando como la unica fuente de verdad para los modelos de datos y sus respectivas validaciones.

## Arquitectura

El proyecto aisla la capa de persistencia y las definiciones de tipos estaticos del resto de la logica de negocio. Se rige por el principio de unica fuente de verdad (Single Source of Truth), donde el archivo `schema.prisma` define todas las entidades relacionales. A partir de este manifiesto, se genera tanto el cliente de acceso a datos para PostgreSQL como los esquemas de validacion estrictos, los cuales se compilan y exportan para su consumo transparente en otros repositorios.

## Estructura de Directorios

- `/postgres/`: Contiene scripts SQL crudos de inicializacion (`init.sql`) y archivos de configuracion del motor de base de datos (`postgresql.conf`). Estos recursos son consumidos exclusivamente por Docker al levantar el servidor de desarrollo local.
- `/prisma/`: Almacena el manifiesto `schema.prisma`, configuraciones del generador de codigo y los historiales de migraciones estructurales de la base de datos.
- `/src/`: Directorio raiz del codigo fuente TypeScript. Su principal componente es `index.ts`, el cual re-exporta los esquemas autogenerados alojados en `/src/schemas/index.ts`.
- `/dist/`: Directorio de salida generado tras el proceso de compilacion. Contiene los archivos JavaScript finales y las declaraciones de tipos (`.d.ts`) requeridas para que el paquete funcione adecuadamente mediante NPM.

## Tecnologias y Librerias

- **PostgreSQL**: Motor de base de datos relacional utilizado. Su orquestacion local se realiza mediante Docker y `docker-compose.yml`.
- **Prisma ORM**: Responsable del modelado declarativo de tablas, relaciones y aplicacion de migraciones a la base de datos (`@prisma/client`, `prisma`).
- **Zod**: Utilizado para la declaracion estricta y analisis (parsing) de esquemas de datos orientados a TypeScript (`zod`).
- **Zod Prisma Types**: Generador automatico que parsea las definiciones de Prisma y crea representaciones fidedignas en esquemas Zod (`zod-prisma-types`), evitando la desincronizacion manual.
- **TypeScript**: Provee tipado estatico durante el proceso de desarrollo y construccion de la libreria.

## Uso del Paquete

Al ser un paquete NPM para consumo interno, exporta estrictamente los tipos y validaciones a traves de su build de TypeScript. Para evitar conflictos de referencias en ejecucion, dependencias como `zod` y `@prisma/client` estan asignadas como `peerDependencies`. 

El backend consumidor puede importar las validaciones de la siguiente forma:

```typescript
import { NombreDelModeloSchema } from 'reset-infra';
```

## Comandos

- `npm run build`: Transpila el codigo fuente de TypeScript hacia JavaScript y declaraciones de tipos ubicadas en `dist/`.
- `npm run db:up`: Crea e inicia el contenedor de bases de datos PostgreSQL en segundo plano.
- `npm run db:down`: Detiene y elimina el contenedor de PostgreSQL.
- `npm run db:migrate`: Aplica los cambios estructurales detectados en `schema.prisma` hacia la base de datos en desarrollo.
- `npm run db:generate`: Invoca el generador del ORM para reconstruir la instancia local de Prisma e invocar dependencias de generacion secundarias (como los esquemas de Zod).

## Integración con MongoDB (Foro)

Además de la base de datos relacional PostgreSQL, esta infraestructura orquesta localmente un servicio secundario de **MongoDB** para alojar de forma ágil y eficiente los datos dinámicos generados por el módulo del foro (publicaciones, comentarios, reacciones e hilos de anidación).

### Relación entre Bases de Datos (SQL vs NoSQL)

Este ecosistema adopta un modelo híbrido intencional donde las tablas estructuradas (usuarios, pagos, configuración) se mantienen firmes y seguras en PostgreSQL, mientras que el volumen transaccional de lectura/escritura del foro se desplaza a MongoDB. 

**Dado que MongoDB opera de forma independiente y sin llaves foráneas reales hacia PostgreSQL**, la relación se establece y se aplica lógicamente en la **capa del Backend**.

El flujo de integración ocurre de la siguiente forma:
1. El backend (ej. usando Node.Js con Mongoose o el adaptador NoSQL de Prisma) decodifica la sesión activa o el token JWT del usuario emisor del Post/Comentario.
2. Identifica su Primary Key proveniente de PostgreSQL (un string `UUID`).
3. El Backend persiste este string `UUID` dentro del documento JSON de MongoDB, almacenándolo en el campo estricto designado llamado `authorId`.

Al momento de consultar un hilo del foro, el Backend extrae de MongoDB la colección de Posts/Comentarios, obtiene el array de `authorId` resultantes y lanza una consulta en bloque hacia PostgreSQL para obtener y mapear el alias o avatar de los respectivos usuarios.

### Componentes de Infraestructura NoSQL

- **Contenedor MongoDB (`mongo:7.0`)**: Base de datos documental corriendo en el puerto 27017.
- **Script de Inicialización**: Existe un archivo `mongo/init-mongo.js` inyectado automáticamente en el volumen de Docker que fuerza la creación asíncrona de las colecciones `posts` y `comments`. Este script también estipula reglas de **JSON Schema Validation** que blindan la base de datos a un nivel nativo; obligando a que, por ejemplo, los campos `authorId` (que actúan como el vínculo virtual a Postgres) no puedan ser nulos ni obviar su tipado tipo cadena (String).
- **Contenedor Mongo Express**: Despliegue local de una herramienta con Interfaz Gráfica (GUI) servida en el puerto **`8081`**. Si deseas administrar registros, visualizar colecciones o purgar foros localmente por medio del navegador web, deberás acceder e ingresar credenciales listadas en el archivo local `.env` (usuario por defecto: `admin` / clave: `password`).
