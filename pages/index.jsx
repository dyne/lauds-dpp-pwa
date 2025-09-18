import Head from 'next/head'
import Link from 'next/link'
import { Page, Navbar } from 'konsta/react'

export default function Home() {
  return (
    <Page>
      <Navbar
        title="LAUDS DPP APP"
      />
      <Head>
        <title>LAUDS DPP App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="px-2 my-3 text-2xl font-bold text-center">
        🤗 to the <a href="https://lauds.eu/" target="_blank" rel="noopener noreferrer" className="text-green-400">LAUDS</a> DPP App
      </h1>
      <p className="p-4 m-3 text-sm">
        This app is used to generate and verify Digital Product Passports as part of the <a href="https://lauds.eu" target="_blank" rel="noopener noreferrer"> LAUDS project </a>
      </p>
      <div className="flex flex-col ">
        <div className="max-w-md p-8 m-4 bg-white border rounded-lg shadow hover:text-green-400 hover:border-green-400 hover:shadow-xl">
          <Link href="/generate">
            <p className="mt-2 text-xl">Generate a Digital Product Passport and a QR Code</p>
          </Link>
        </div>

        <div className="max-w-md p-8 m-4 bg-white border rounded-lg shadow hover:text-green-400 hover:border-green-400 hover:shadow-xl">
          <Link href="/verify">
            <p className="mt-2 text-xl">Verify the information by scanning the QR Code</p>
          </Link>
        </div>
      </div>
      <footer className="p-4 text-center">
        <span>Powered by <a target="_blank" rel="noopener noreferrer" href="https://dyne.org" className="font-medium text-green-300 hover:underline font-dyne">Dyne.org</a>.
        </span>
      </footer>
    </Page>
  );
}
