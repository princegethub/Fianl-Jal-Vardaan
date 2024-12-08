import React from 'react'
import Footer_PHED from '../FooterLoginKeBaadWala'

import { Outlet } from 'react-router'
import UserNavbar from './UserNavbar'

export default function UserLayout() {
    return (
        <div>
            <UserNavbar />
            <Outlet />
            <Footer_PHED />
        </div>
    )
}
