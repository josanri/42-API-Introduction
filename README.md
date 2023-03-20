# API
Una API (Application Programming Interface) es, como dice su nombre, una interfaz para comunicarse con una aplicación y los datos que esta pueda guardar.
En los últimos años se ha popularizado el tipo de APIs REST donde un sistema ofrece entrypoints (direcciones URLs) a las que se pueden acceder con métodos de HTTP(S) (GET, POST, PUT) resolviéndose las comunicaciones con el intercambio de objetos .json.
Por lo general, se usa las peticiones GET para realizar consultas que no modifican el estado del sistema y las cuales se pueden cachear en un servidor de reverse proxy, mientras que las peticiones POST ocultan los datos por parte de la URL y suponen cambios en los datos o búsquedas protegidas de scrapping.
# OAuth
OAuth (Open Authorization) es un estándar de autenticación para APIs basado en tókenes que permite no compartir la identidad al completo para ser autenticado.
# ¿Cómo crear una aplicación desde la Intranet de 42?
Desde la siguiente URL tenemos acceso al menú para el registro de una aplicación, será necesario especificar un nombre inicialmente y redirección (https://profile.intra.42.fr/, por ejemplo), si bien se podrá aportar información de más como imágenes, descripción...
 https://profile.intra.42.fr/oauth/applications/new
## UID
Es un código que empieza con u-xxx... que se puede compartir.
## Secret
Es un código que empieza con s-xxx... que no se debe compartir y solo hará uso de él el servidor.