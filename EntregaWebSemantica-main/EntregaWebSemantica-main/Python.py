from SPARQLWrapper import SPARQLWrapper, JSON

# URL del endpoint SPARQL
sparql = SPARQLWrapper("http://156.35.95.58:3030/DatasetR6/query")

# Consulta SPARQL
query = """
PREFIX ex: <http://example.org/characters/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?character WHERE {
  ?character ex:Armor "3"^^xsd:integer .
}
"""

# Configurar la consulta
sparql.setQuery(query)
sparql.setReturnFormat(JSON)

# Ejecutar la consulta y obtener resultados
results = sparql.query().convert()

# Imprimir resultados
print("Resultados de la consulta SPARQL:")
for result in results["results"]["bindings"]:
    print(result["character"]["value"])
