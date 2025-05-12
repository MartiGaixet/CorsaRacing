# Selepass

## 📖 Idea del Proyecto
SelePass es una plataforma web dirigida a estudiantes de 17 a 20 años que buscan mejorar su preparación para la Selectividad. Junto con un diseño moderno, la aplicación ofrece seguimiento de fechas clave, recordatorios personalizados, todos los exámenes de la EBAU hasta la fecha y apuntes para poder ir bien preparado.

## 🎯 Nuestros Objetivos
Nuestros objetivos con esta web serían principalmente un uso completamente funcional y útil, además de conseguir cierta escalabilidad para crear un proyecto en el futuro debido al hueco de mercado que le vemos a nuestra competencia en cuanto a estudio de selectividad se refiere.

## 🌐 Tecnologías Usadas
Las tecnologías que usaremos para crear nuestro proyecto se dividen en las siguientes partes:

- **Frontend:** React
- **Backend:** C# usando Entity Framework
- **Base de Datos:** SQL (SQL Server, SQL Workbench, etc.)

## 💻 Página Web

### 💭 Mockup
[Ver en Figma](https://www.figma.com/design/m1nGkAvGkDCec9DQfVK4Da/SelePass?node-id=0-1&t=9kfdj9fZRGpYd9RT-1)

### 🎨 Paleta De Colores
| Color | HEX | RGB |
|--------|--------|----------------|
| WHITE | #FFFFFF | (255,255,255) |
| COLUMBIA BLUE | #C4D7F2 | (196,215,242) |
| GLAUCOUS | #708ABA | (112,138,186) |
| PIGMENT GREEN | #009D2F | (0,157,47) |

### 👀 Logo
[Ver en Canva](https://www.canva.com/design/DAGcD2iawhE/hbo78PWuoMGw2k1kDTBnmw/edit?utm_content=DAGcD2iawhE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## 🔗 Funcionalidades Web

| ID | Prioridad | Requisito | Funcionalidad |
|----|----------|-----------|---------------|
| ID0 | Media | Se quiere registrar usuarios en la página | Deberá crearse un sistema de registro de usuarios y posterior login que guarde información individual del usuario |
| ID1 | Alta | Se quiere crear una colección de todos los exámenes de todas las asignaturas | Deberá crearse una tabla en la base de datos para guardar exámenes y posteriormente la vista en la web que lo muestre y lo pueda filtrar por diferentes requisitos |
| ID2 | Media | Se quiere crear una colección de apuntes para cada asignatura | Deberá crearse una tabla en la base de datos para guardar apuntes y posteriormente la vista en la web que lo muestre y lo pueda filtrar por diferentes requisitos |
| ID3 | Baja | Se quiere crear un sistema de envío de emails | Deberá crearse un sistema de envío de emails para avisar a los usuarios registrados sobre fechas clave e información adicional |
| ID4 | Baja | Se quiere implementar una calculadora | Se deberá implementar una calculadora para calcular notas de corte, medias de bachillerato y fase general, etc. |
| ID5 | Baja | Se quiere implementar una lista de favoritos | Deberá crearse un sistema de guardado de exámenes y apuntes como favoritos para que sean más accesibles |
| ID6 | Media | Se quiere implementar un sistema de subida de archivos | Se deberá implementar un sistema de subida de archivos para que los usuarios puedan poner sus propios apuntes y así tener más contenido al alcance de nuestros usuarios |
| ID7 | Baja | Se quiere implementar un sistema de revisión de archivos | Se deberá implementar un sistema de revisión de archivos para poder controlar que los apuntes subidos por los usuarios sean de calidad |

## 📅 Roadmap
[Trello](https://trello.com/invite/b/67a9c39dc234b43d41638421/ATTIc2bcb962e34d1d953872ece5d60da616D042CCE0/selepass)

## Guía de implementación

1. Clonar el repositorio del frontend
2. Clonar el repositorio del backend
3. Acceder a la BBDD y dar acceso a la IP del ordenador para que el backend pueda hacer solicitudes
4. Compilar el backend
5. Instalar nodejs
6. Hacer npm install dentro de la terminal de la carpeta del frontend
7. Poner "npm start" dentro de la terminal de la carpeta del frontend
8. Abrir en chrome el localhost que sale en la terminal del frontend