//src/app/components/unauth-page/index.js

'use Client'

import { signIn } from "next-auth/react"

export default function UnauthPage (){
    return <div>
        <button onClick={() => signIn("github")} >Sign In</button>
    </div>
}