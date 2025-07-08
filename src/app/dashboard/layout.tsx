'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import outputs from '@/../amplify_outputs.json'

Amplify.configure(outputs)

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-800 text-white p-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm">Welcome, {user?.username}</p>
            <button
              onClick={signOut}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </header>
          <main className="flex-grow p-4">{children}</main>
        </div>
      )}
    </Authenticator>
  )
}
