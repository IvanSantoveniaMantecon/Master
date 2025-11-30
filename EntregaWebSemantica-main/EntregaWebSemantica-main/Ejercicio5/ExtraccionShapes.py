from shexer.shaper import Shaper
from shexer.consts import TURTLE, SHEXC

# Archivo de entrada con el grafo RDF
archivo_rdf = "datos.ttl"  # Asegúrate de que este archivo existe en el mismo directorio

# Configurar el extractor
shaper = Shaper(
    graph_file_input=archivo_rdf,  # Se usa 'graph_file_input' en vez de 'target_graph'
    input_format=TURTLE,  # Formato del archivo (TURTLE, NT, JSON_LD, etc.)
    namespaces_dict={"ex": "http://example.org/"},  # Agregar prefijos si es necesario
    all_classes_mode=True  # Extraer shapes para todas las clases encontradas
)

# Extraer en formato ShEx
shex_shapes = shaper.shex_graph(string_output=True)
with open("shapes.shex", "w", encoding="utf-8") as f:
    f.write(shex_shapes)

print("Shapes generadas y guardadas en 'shapes.shex'")
