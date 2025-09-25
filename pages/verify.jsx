import base45 from 'base45';
import {
  Block, Button, Checkbox, Link, List, ListItem, Navbar, NavbarBackLink, Page, Popup, Preloader
} from 'konsta/react';
import { useState } from 'react';
import {JSONTree} from "react-json-tree";
import getTrace from './api/utils'
import BarcodeScanner from "react-qr-barcode-scanner";


const format = (data) => {
  // This function need to extract the resource id from the url in the QR code
  // At the moment it returns a fixed id
  return '06CH9N09XX97B24A1AJ6ZKCWK0';
}

export default function Verify() {
  const [dpp, setDpp] = useState('No result');
  const [verification, setVerification] = useState('Not verified yet');
  const [happy, setHappy] = useState(false);
  const [timestamp, setTimestamp] = useState('');



  const verifyLocalDpp = async (result) => {
    setDpp(result);
    const rid = format(result.text);
    
    const json = await getTrace(rid);

    if (json !== null) {
      setVerification(JSON.stringify(json.data.economicResource.traceDpp[0].node));
      setHappy(true);
      setTimestamp(new Date().toTimeString().split(' ')[0]);
    } else {
      setVerification('🤯 Verification failed');
    }
  }

  return (
    <Page>
      <Navbar left={
        <NavbarBackLink text="Back" onClick={() => history.back()} />
      } title="Verify DPP" />

      <List>
        <ListItem
          label
          after={timestamp || ''}
          title={verification}
          text={''}
          media={
            <Checkbox
              readOnly
              component="div"
              name="verified-checkbox"
              checked={happy}
            />
          }
        />
      </List>

      {!happy && <Block className="text-center">
        <BarcodeScanner
          width={500}
          height={500}
          facingMode="environment"
          onUpdate={(err, result) => {
            if (err){
              if (typeof(err) == 'object' && 
                  err.name == 'NotFoundException' && 
                  err.message == 'No MultiFormat Readers were able to detect the code.'){
                // Ignore
              }else{
                console.error(err);
              }
              
            }else if (result) {
              console.info("Result is " + result);
              // setDpp(result.text);
              verifyLocalDpp(result.text);
            }else {
              setDpp("Not Found");
            }
          }}
        />
        <Preloader />
      </Block>
      }

      <Block>
        {dpp && <pre className="overflow-scroll w-200">{dpp}</pre>}
        {happy &&
          <>
            <Button outline className="mt-8">
              BLOCKCHAIN DETAILS
            </Button>
            <Button outline className="mt-8">
              VIEW VALUEFLOWS
            </Button>
          </>
        }
      </Block>

    </Page >
  );
}
