import {withAuth} from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn:"/"
    }
})

export const config = {
    matcher:[
        "/books/:path*",
        "/courses/:path*",
        "/(course)/:path*",
    ]
}