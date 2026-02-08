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
