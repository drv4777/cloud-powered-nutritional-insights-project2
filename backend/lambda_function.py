from azure.storage.blob import BlobServiceClient
import pandas as pd
import io
import json
 

def process_nutritional_data_from_azurite():

    connect_str = "AZURE_CONNECTION_STRING"

    blob_service_client = BlobServiceClient.from_connection_string(connect_str)

    container_name = "datasets"
    blob_name = "All_Diets.csv"

    blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

    stream = blob_client.download_blob().readall()
    df = pd.read_csv(io.BytesIO(stream))

    avg_macros = df.groupby('Diet_type')[['Protein(g)', 'Carbs(g)', 'Fat(g)']].mean()

    result = avg_macros.reset_index().to_dict(orient='records')

    with open('results.json', 'w') as f:
        json.dump(result, f)

    return "Data processed successfully"

#Run the function
print(process_nutritional_data_from_azurite())
