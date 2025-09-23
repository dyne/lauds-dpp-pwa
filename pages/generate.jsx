import base45 from 'base45';
import { Block, Button, List, ListInput, Navbar, NavbarBackLink, Page, Preloader } from 'konsta/react';
import { useState } from 'react';
import QRCode from "react-qr-code";
import getTrace from './api/utils'

export default function Generate() {
  const [rid, setRid] = useState('');
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const json = await getTrace(rid);
    if (json != null){
      console.log(json);
      const compressed = base45.encode(JSON.stringify(json.data.economicResource.traceDpp[0].node));
      setResult(compressed);
    }
  }

  return (
    <Page>
      <Navbar left={
        <NavbarBackLink text="Back" onClick={() => history.back()} />
      } title="Generate DPP" />

      <List className="p-2">
        <form onSubmit={onSubmit}>

          <ListInput
            label="Valueflows ID"
            floatingLabel
            type="text"
            placeholder= {rid ==''? "Please insert a valid ID":rid}
            onChange={(e) => { setRid(e.target.value) }}
            required
          />
          <Button large outline type="submit">
            GENERATE 💌
          </Button>
        </form>
      </List>
      <Block className="flex justify-center w-full">
        {loading && !result && <Preloader />}
        {result && <QRCode value={result} className="mx-auto" />}
      </Block>
    </Page>
  )
}
