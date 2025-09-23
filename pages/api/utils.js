export default async function getTrace(rid){

const variables = {
        "id": rid
    };
    const query = `query($id:ID!){
        economicResource(id: $id) {
            traceDpp
        }
    }`;

    const data = {
      "query": query,
      "variables": variables
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
        }
    };
    const url = "https://zenflows.interfacer-staging.dyne.im/api";
    const res = await fetch(url, options);
    if (res.status === 200) {
      const json = await res.json();
      return json;
    }else{
        return null;
    }
}