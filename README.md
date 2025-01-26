## Build
Para la descarga e instalacion de dependencias.
```bash

git clone 
cd CorrelatiAPP
npm install
```
### Correr proyecto

```shell

npm run dev
```


## Tecnologias

- Next.js 15.1
- Typescript
- Tailwind
- Docker
- Deployer 
## Docker
Para correr en docker ejecutar.
Utilizando docker para correr dentro de contenedor el proyecto.
En caso de ser renecesario se puede utilizar docker-compose para tener db o servicios externos.

```shell
docker build -t nextjs14-docker:v1 .   
docker run -p 3000:3000 nextjs14-docker:v1
```

CorrelatiAPP es una aplicacion pensada para estudiantes universitarios open source
