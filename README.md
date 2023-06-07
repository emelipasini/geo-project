# Geo Project

Un proyecto con la oportunidad de aprender nuevas tecnologias y compartir el conocimiento.

Para el proyecto use las siguientes tecnologias:

-   TypeScript que es un superconjunto de JavaScript que agrega tipado estatico y otras funcionalidades. Se puede utilizar en los mismo casos que se utiliza JavaScript. Como por ejemplo al trabajar con React, Node, Angular, programas de consola, etc. En mi opinion siempre que sea posible se deberia utilizar TypeScript, en el apartado de IA.md se le pregunta a ChatGPT cuales son las ventajas.
-   GraphQL que es un lenguaje de consulta y manipulacion de datos. Se utiliza para definir la estructura de los datos que se van a utilizar en la aplicacion y para hacer consultas a la base de datos. En mi opinion es una tecnologia muy potente y hacia rato que queria aprenderla. En este caso tambien se le pregunta a ChatGPT cuando es una buena idea utilizar GraphQL. GraphQL se puede utilizar en otros lenguajes tambien como Python, yo elegi Node porque me da la posibilidad de trabajar con TypeScript y tener tipado.
-   Node es un entorno de ejecucion de JavaScript. Se utiliza para correr programas de consola, servidores, etc. Esta ya fue una decision personal porque me gusta mas que Python por lo ya mencionado en el punto anterior.

Me parecio interesante poder aprender GraphQL que como ya dije se puede implementar con Python y me parece que puede sernos util para implementar en algun proyecto de la empresa. A la vez, como ya mencione me parece que siempre que sea posible se deberia utilizar TypeScript y me parecio buena idea mostrarlo para fomentar su uso.

## Instalacion y configuracion

Se necesita tener instalado Node y npm.

```bash
cp _.env .env

npm install
npm run build
```

## Levantar el proyecto

Tener en cuenta que el proyecto cuenta con 2 servidores que deben correr a la vez porque el de GraphQL levanta la informacion de la API generada con json-server.

```bash
npm run json-server
npm run start
```
