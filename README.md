API-vinador

Página web que utiliza diferentes API para intentar adivinar los datos del usuario usando solo su nombre (edad, género y nacionalidad).

Esta página web utiliza 4 API:

1.- Agify.io API: https://agify.io/
"Agify.io predice la edad de una persona a partir de su nombre."

2.- Genderize.io API: https://genderize.io/
"Una API simple para predecir el género de una persona dado su nombre"

3.- Nationalize.io API: https://nationalize.io/
"Nationalize.io predice la nacionalidad de una persona a partir de su nombre."

4.- REST Countries API v3.1: https://restcountries.com/
"Obtenga información sobre países a través de una API RESTful"

API n° 3 (nationalize.io API) solo devuelve el código del nombre del país (Código Internacional de Paises ISO 3166-1 alpha 2), entonces se necesita API n° 4 (REST Countries API) para obtener los datos específicos del país a partir de ese código.